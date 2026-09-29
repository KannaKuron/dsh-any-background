/**
 * Adapter for the DSH `0.1.7-rc` channel, verified at `0.1.7-rc.2` (npm `latest`).
 *
 * Same patch line as `v0-1-7-alpha-1-2-rc-1`, DIFFERENT ANSWERS — which is why this
 * folder exists at all rather than another row on that one. Everything the alpha
 * folder says about panel mechanics still holds here (checked by diffing the panel
 * CSS, dockkit, the slot renderer and the plugin-manager page tag to tag: no anchor
 * line moved, and `TabLayout.tsx` / `SidebarRight.module.css` are unchanged from
 * rc.1). What moved is where a MENU gets its paint.
 *
 * Two host changes reach this plugin:
 *
 *  1. `ui-primitives/src/MenuSurface.tsx` is NEW, and `TabMenu`, `MenuView`,
 *     `PopupSelectView`, `ModelSelect` and `Menu` all render through it. The element
 *     that carries `role="menu"` no longer paints anything: a `z-index:-1` child
 *     layer does, reading `--dsw-menu-surface-fill` for the fill and
 *     `--dsw-menu-backdrop-filter` for the frost. And `design-platform.css` flipped
 *     its alias — `--dsw-specific-menu:var(--dsw-menu-surface-fill)`, where every
 *     earlier release declared it the other way round. Consequence, read off those
 *     two files rather than guessed: retinting `--dsw-specific-menu` alone now fades
 *     nothing on a shared menu, so the card and header opacity sliders go inert on
 *     exactly the surfaces they were built for. `LAYERED_MENU_SURFACE` is the answer.
 *     Filtering the menu element would also have kept working, sort of — but the
 *     child layer's own comment says it exists so that no ANCESTOR becomes a
 *     backdrop root, so that arm stops being offered here.
 *
 *  2. `ui-settings-general/src/client/SettingsRoot.tsx` now renders the dialog
 *     through `createPortal`, beside `#root`, instead of inline in the column. It
 *     costs this plugin nothing, recorded so nobody re-derives it:
 *     `SETTINGS_PANEL_SEL` tests the dialog's own identity (its hashed `_panel`
 *     class plus `role`/`aria-modal`/`aria-labelledby`, all unchanged), never an
 *     ancestor, so the retint and the blur land the same way one level higher up.
 *     The one rule that DID care — `PART_BLUR_RULE`'s
 *     `:has([role="dialog"]){isolation:auto}` valve, written because a modal mounted
 *     inside a column kept its z-index local to that column — now never matches, and
 *     that is fine: the modal it existed to release is no longer inside a column
 *     either, so the trap and the valve left together.
 *
 * Still `0.1.7` facts, restated for the reader who only opens this folder:
 *   · the panel is a stationary frame; the dockkit children slide, so the blur goes
 *     on the children and nothing is promoted.
 *   · `conversation.session.header.leading` is gone; `--dsw-specific-menu` is a
 *     literal translucent rgba, not an alias of a layer token.
 *   · the shimmer primitive is STILL `data-text-shimmer` (checked: `data-shimmer`
 *     does not exist at this tag) — that rename belongs to 0.2.0.
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
    // Re-verified against rc.2: the wrapper carries no transform and no z-index, so
    // `backdrop-filter` on it resolves against the page unaided and the lift the
    // pre-0.1.7 folders emit would only knock the panel off its animation track.
    promotion: '',
    blur: panelBlurRule(DOCKKIT_SLIDERS),
  }
}

export function createAdapter(host: HostInfo): HostAdapter {
  return {
    id: '0.1.7-rc.2',
    channel: '0.1.7-rc',
    host,
    panelFragments,
    // `renderGroup` is byte-identical to the alpha folder's at this tag; what rc.2
    // added around it is the install dialog, which portals to body.
    pluginPageRule: PLUGIN_PAGE_FROST_RULE,
    menus: LAYERED_MENU_SURFACE,
    surface: {
      ownsSidebarGuideSurface: true,
      headerSlotKeys: BASE_HEADER_SLOT_KEYS,
    },
  }
}
