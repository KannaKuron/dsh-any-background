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

/** The rules for the strip that carries the settings panel's mask up over the
 *  caption, given the class of the element they style.
 *
 *  The host insets that mask with `var(--dsh-frame-chrome-top)`, which on
 *  Windows equals the caption height: the mask therefore starts one caption
 *  below the top edge and the strip above it stays bare while everything else
 *  dims. Three properties are load-bearing:
 *
 *   · the material is *read* from the host's own `--dsw-alias-bg-mask-1` /
 *     `--dsw-mask-blur` rather than copied, so a host that retints or re-frosts
 *     its mask carries this strip along;
 *   · visibility is a CSS condition (`body:has(...)`) rather than a listener,
 *     so there is no mount/unmount race to lose and nothing to poll — the strip
 *     appears and disappears with the panel itself. A host too old for `:has()`
 *     drops the declaration and leaves the element at `display:none`;
 *   · `pointer-events:none` keeps the strip's hit test falling through to the
 *     frame's `-webkit-app-region:drag` hot zone, so the window can still be
 *     dragged by its caption while the panel is open. The window buttons are
 *     painted by the OS (`titleBarOverlay`), so page content can neither cover
 *     nor swallow them.
 *
 *  A `::before` on the host's own mask would have been one element cheaper and
 *  does not work: `.mask` carries a `backdrop-filter`, which makes it a backdrop
 *  root, and anything nested inside a backdrop root can only blur what is inside
 *  that root. A pseudo-element hanging outside the mask's box therefore blurs
 *  nothing — the strip came out dimmed but sharp, which is what the pixel
 *  comparison showed. */
export function captionMaskRules(className: string): string {
  return `[data-windows-titlebar] .${className}{position:fixed;top:0;left:0;right:0;` +
    `height:var(--dsh-windows-titlebar-height,40px);z-index:2;pointer-events:none;display:none;` +
    `background:var(--dsw-alias-bg-mask-1);-webkit-backdrop-filter:var(--dsw-mask-blur);backdrop-filter:var(--dsw-mask-blur)}` +
    `[data-windows-titlebar] body:has([class$="_overlay"]>[class$="_mask"]) .${className}{display:block}`
}
