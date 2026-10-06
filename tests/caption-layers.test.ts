import { test } from 'node:test'
import assert from 'node:assert/strict'
import { captionMaskRules, isColumnSpanning, layersToBackground, layersToBlur, type CaptionLayer } from '../src/client/caption-layers.ts'

const layer = (bg = '', blur = ''): CaptionLayer => ({ bg, blur })

test('same-colour layers are kept, not collapsed', () => {
  // A column's material is routinely the same colour stacked twice; dropping the
  // duplicate makes the band ~25 levels brighter than the column.
  const bg = layersToBackground([layer('rgba(41,41,41,.31)'), layer('rgba(41,41,41,.31)')], '')
  assert.equal(bg, 'linear-gradient(rgba(41,41,41,.31),rgba(41,41,41,.31)),linear-gradient(rgba(41,41,41,.31),rgba(41,41,41,.31))')
})

test('stack order is reversed so the innermost layer paints on top', () => {
  const bg = layersToBackground([layer('rgb(1,1,1)'), layer('rgb(2,2,2)')], '')
  assert.equal(bg, 'linear-gradient(rgb(2,2,2),rgb(2,2,2)),linear-gradient(rgb(1,1,1),rgb(1,1,1))')
})

test('a blur-only layer contributes no background but keeps its frost', () => {
  const bg = layersToBackground([layer('rgb(9,9,9)'), layer('')], '')
  assert.equal(bg, 'linear-gradient(rgb(9,9,9),rgb(9,9,9))')
  assert.equal(layersToBlur([layer('rgb(9,9,9)'), layer('', 'blur(30px)')], ''), 'blur(30px)')
})

test('an empty stack falls back to the plugin variable instead of going transparent', () => {
  assert.equal(layersToBackground([], 'rgba(46,46,46,.35)'), 'linear-gradient(rgba(46,46,46,.35),rgba(46,46,46,.35))')
})

test('an empty stack with no fallback yields none rather than a bogus colour', () => {
  assert.equal(layersToBackground([], ''), 'none')
})

test('frost comes from the topmost layer that has one', () => {
  assert.equal(layersToBlur([layer('rgb(1,1,1)', 'blur(8px)'), layer('rgb(2,2,2)', 'blur(30px)')], ''), 'blur(30px)')
})

test('frost falls back to the part-blur variable when no layer frosts', () => {
  assert.equal(layersToBlur([layer('rgb(1,1,1)')], 'blur(30px)'), 'blur(30px)')
})

test('a zero-sized column (collapsed sidebar) spans nothing', () => {
  assert.equal(isColumnSpanning({ width: 100, height: 100 }, { width: 0, height: 1352 }), false)
})

test('a full-height wrapper narrower than the column still counts as material', () => {
  // 60% wide is the real-world case that a stricter 80% bound used to miss.
  assert.equal(isColumnSpanning({ width: 120, height: 1352 }, { width: 200, height: 1352 }), true)
})

test('a full-width content block stays out of the stack', () => {
  // This is the shape that broke a previous attempt: a full-width code block is
  // white with `blur(30px)`, and copying it painted the whole band white.
  assert.equal(isColumnSpanning({ width: 1704, height: 135 }, { width: 1704, height: 1352 }), false)
})

test('a tall narrow sidebar widget stays out of the stack', () => {
  assert.equal(isColumnSpanning({ width: 40, height: 1200 }, { width: 280, height: 1352 }), false)
})

// ── the settings-panel mask strip ───────────────────────────────────────────

test('every mask rule stays scoped to the Windows caption', () => {
  // The whole feature is Windows-only: macOS keeps its own window strip.
  const rules = captionMaskRules('dab-caption-mask')
  const selectors = rules.match(/[^{}]+\{/g) ?? []
  assert.equal(selectors.length, 2)
  for (const selector of selectors) assert.match(selector, /\[data-windows-titlebar\]/)
})

test('the mask strip never takes the pointer', () => {
  // Without this the strip swallows the caption's hit test and the window can no
  // longer be dragged by it while the panel is open.
  assert.match(captionMaskRules('dab-caption-mask'), /pointer-events:none/)
})

test('the mask strip shows itself from CSS, not from a listener', () => {
  // A listener/observer would race the panel's mount; `:has()` cannot.
  const rules = captionMaskRules('dab-caption-mask')
  assert.match(rules, /:has\(/)
  assert.doesNotMatch(rules, /dsh-any/)
})

test('the mask material is read from the host tokens, not hard-coded', () => {
  const rules = captionMaskRules('dab-caption-mask')
  assert.match(rules, /var\(--dsw-alias-bg-mask-1\)/)
  assert.match(rules, /var\(--dsw-mask-blur\)/)
  assert.doesNotMatch(rules, /rgba?\(/)
})
