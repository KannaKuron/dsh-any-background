/**
 * Adapter for the DSH `0.2.0-rc` channel, verified at `0.2.0-rc.1`.
 *
 * A new MINOR line, and the panel is not what changed. Checked by reading the
 * emitting source at the tag rather than a changelog:
 *   · `ui-sidebar-right/src/client/shell/SidebarRight.module.css` is BYTE-IDENTICAL
 *     to `0.1.7-rc.2`, and `ui-primitives/src/MenuSurface.tsx` is byte-identical
 *     too. So the slide owner, the layer variable and where a menu gets its paint
 *     all answer the same as the `0.1.7-rc` folder — nothing below re-derives them.
 *   · the five `conversation.session.header*` slot keys are the same five;
 *     `conversation.session.header.leading` is still deleted.
 *   · `ui-settings-general/SettingsRoot.tsx` is byte-identical, so the settings
 *     dialog is still a body-level `createPortal` and `SETTINGS_PANEL_SEL`'s
 *     identity test still reaches it.
 *   · the boot peer gate (`app-boot/src/plugin-compatibility.ts`,
 *     `compatibility-preflight.ts`) is byte-identical, which is what makes the
 *     manifest change below a HARD requirement rather than metadata: an unlisted
 *     peer version disables the plugin at profile composition and its modules are
 *     never imported.
 *
 * What did move, and reaches this plugin:
 *
 *  1. `ui-dockkit/components/TabLayout.tsx` clamps a FLOATING pane's `top` with
 *     `max(var(--dsh-dockkit-float-top, 0px), Ypx)`. Only floats: the attributes
 *     this plugin matches, `data-dockkit-host="dock"` and `data-dockkit-empty`,
 *     are on unchanged lines (verified by grep at both tags), so the blur arm
 *     stands as the rc.2 folder wrote it.
 *
 *  2. `ui-primitives/src/TextShimmer.tsx` is REWRITTEN. The old primitive set
 *     `data-text-shimmer` and painted the element itself with a clipped gradient
 *     (`background-clip:text` + `-webkit-text-fill-color:transparent`) sized by an
 *     inline `--dsh-text-shimmer-spread`, which no longer exists anywhere in the
 *     repo. The new one marks its root `data-shimmer` and moves the highlight onto
 *     an absolutely-positioned overlay (`.decoration` / `.sweep` / `.highlight`)
 *     tinted by `--dsw-alias-label-shimmer`, so the real glyphs keep their own
 *     color. Consequence for the stroke sliders: the old failure mode — a stroke
 *     repainting transparent-filled glyphs as one flat blob — is gone, but
 *     `-webkit-text-stroke` is still inherited, so the chat stroke would now land
 *     on BOTH the real text and the sweeping copy and double every glyph while it
 *     animates. Progress chrome still is not conversation prose, so the exemption
 *     stays and gains the new attribute (`STROKE_RULE`).
 *     More rows use it now: `ReasoningRow` and `GenericCommandCard` join
 *     `ChatGroupSeat` / `MessageItem` / `RunningStatus` / `DisclosureRow`.
 *
 *  3. `ui-plugin-manager` gains a first-read `ListSkeleton`. Its card `ul` carries
 *     the same `.cards` class but sits under `section[data-plugin-loading]`
 *     instead of `section[data-plugin-scope]`, so the shared frost rule had to
 *     grow or the plugin page would show an unfrosted list for the length of the
 *     first read and then re-frost it — see `PLUGIN_PAGE_FROST_RULE`.
 *
 * @module
 */
import {
  BASE_HEADER_SLOT_KEYS,
  DOCKKIT_SLIDERS,
  LAYERED_MENU_SURFACE,
  PLUGIN_PAGE_FROST_RULE,
  panelBlurRule,
} from '../shared'
import type { HostAdapter, HostInfo, PanelFragments } from '../types'

function panelFragments(): PanelFragments {
  return {
    // Re-verified: the wrapper CSS is byte-identical to rc.2, so the panel is
    // still a stationary frame, the dockkit children still slide, and promoting
    // the wrapper would still knock it off the host's animation track.
    promotion: '',
    blur: panelBlurRule(DOCKKIT_SLIDERS),
  }
}

export function createAdapter(host: HostInfo): HostAdapter {
  return {
    id: '0.2.0-rc.1',
    channel: '0.2.0-rc',
    host,
    panelFragments,
    // The page markup that decides the frost target is unchanged apart from the
    // new loading skeleton, which the shared rule now covers for every line that
    // ships the page (older hosts never emit `[data-plugin-loading]`).
    pluginPageRule: PLUGIN_PAGE_FROST_RULE,
    menus: LAYERED_MENU_SURFACE,
    surface: {
      ownsSidebarGuideSurface: true,
      headerSlotKeys: BASE_HEADER_SLOT_KEYS,
    },
  }
}
