// Pure helpers behind the Windows caption band (see `applyNativeCaption` in
// wallpaper.ts). They live in their own module because the regressions fixed
// here were silent and easy to reintroduce:
//
//   · collapsing same-colour layers. A column's material is routinely the SAME
//     colour stacked twice (`rgba(41,41,41,.31)` over itself composites to
//     alpha .52, not .31). Deduplicating by colour drops one and the band comes
//     out ~25 levels brighter than the column below it.
//   · inverting the stack order. The layers arrive outermost-first; the
//     innermost one is the one you actually see, so the emitted
//     `background-image` list has to start there.
//
// Keeping these as pure functions lets `node --test` cover them without a DOM.

/** One painted layer of a column's surface. `blur` is a ready-to-use
 *  `backdrop-filter` value or '' when the layer does not frost.
 *
 *  Deliberately carries no `background-image`: see `layersToBackground`. */
export interface CaptionLayer {
  bg: string
  blur: string
}

/** Build a `background-image` value that reproduces the column's stack.
 *
 *  Layers are expected **outermost-first** (the order they are collected by
 *  walking from the column element inwards). CSS paints the first
 *  `background-image` entry on top, so the list is emitted in reverse.
 *
 *  Only colours are reproduced, never the source elements' own
 *  `background-image`. That was tried and it broke: a column's decorative
 *  gradient (a `color-mix()` wash, say) also satisfies the "spans half the
 *  column" test once the window is narrow — a 424px-wide column makes that bar
 *  trivial — and being painted on top it buried the two real translucent layers
 *  underneath, so the band looked transparent in a non-maximised window while
 *  the same document looked correct maximised. Material is essentially always a
 *  flat translucent colour, so dropping that path is the cheap side of the
 *  trade.
 *
 *  When nothing could be read, `fallback` (the plugin's own master-layer
 *  variable) stands in. Returning '' would be far worse than an approximate
 *  colour: an empty band shows the raw wallpaper. */
export function layersToBackground(layers: readonly CaptionLayer[], fallback: string): string {
  const imgs: string[] = []
  for (let i = layers.length - 1; i >= 0; i -= 1) {
    const layer = layers[i]
    if (layer === undefined) continue
    if (layer.bg !== '') imgs.push(`linear-gradient(${layer.bg},${layer.bg})`)
  }
  if (imgs.length === 0 && fallback !== '') imgs.push(`linear-gradient(${fallback},${fallback})`)
  return imgs.length === 0 ? 'none' : imgs.join(',')
}

/** The column's frost, taken from the topmost layer that has one.
 *
 *  Falls back to the part-blur variable the plugin already wrote on the
 *  column, so "could not read the stack" never degrades into "band is not
 *  frosted while the column below it is". */
export function layersToBlur(layers: readonly CaptionLayer[], fallback: string): string {
  for (let i = layers.length - 1; i >= 0; i -= 1) {
    const blur = layers[i]?.blur ?? ''
    if (blur !== '') return blur
  }
  return fallback
}

/** Whether this rectangle is big enough to be considered part of a column's
 *  material rather than content.
 *
 *  Both bounds matter. The width bound catches the wrapper layers that are
 *  narrower than the column (inner padding, scrollbar gutter) — missing them
 *  was worth ~47 levels of band/column mismatch. The height bound is what keeps
 *  content out: a message card or code block can be full-width, but it never
 *  covers a fifth of the column's height.
 *
 *  A zero-sized column (collapsed sidebar) matches nothing, which is correct:
 *  there is no band segment to paint for it. */
export function isColumnSpanning(
  rect: { width: number; height: number },
  column: { width: number; height: number },
): boolean {
  if (column.width <= 0 || column.height <= 0) return false
  return rect.width >= column.width * 0.5 && rect.height >= column.height * 0.2
}
