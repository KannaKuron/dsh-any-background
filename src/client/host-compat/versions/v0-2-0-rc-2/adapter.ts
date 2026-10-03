/**
 * Adapter for the DSH `0.2.0-rc` line from `0.2.0-rc.2` on, verified at `0.2.0-rc.2`.
 *
 * The first case where one patch line AND one prerelease channel carry two
 * answers, so this folder opens a second channel (see the note on `HostChannel`).
 * What it took was one renamed token, and it is a menu token, which is the class of
 * fact this table exists for:
 *
 *   · `ui-primitives/src/MenuGroup.tsx` + `.module.css` are NEW at rc.2 and the
 *     headings of both grouped popups (`ModelSelect`, `PopupSelectView`) now come
 *     from them. `ModelSelect.module.css` loses `.groupTitle{background:var(
 *     --dsw-specific-menu)}` in the same breath — the sticky heading's paint moved
 *     to `--dsw-alias-menu-group-header-fill`, a token that does not exist before
 *     this tag (`git grep` at `0.1.7-rc.2` and `0.2.0-rc.1`: absent). Hence
 *     `LAYERED_MENU_SURFACE_WITH_GROUP_HEADER` rather than the rc.1 constant: the
 *     old claim set stayed true, it just stopped covering one element.
 *   · the rest of the menu layer is the same code — `MenuSurface.tsx` and
 *     `MenuSurface.module.css` are byte-identical to `0.2.0-rc.1`, and so is every
 *     consumer of `--dsw-menu-backdrop-filter`.
 *
 * Also verified at this tag, and NOT a reason for a folder of its own:
 *   · `SidebarRight.module.css` and `ui-dockkit/src/components/TabLayout.tsx` are
 *     unchanged, so the panel is still a stationary frame whose dockkit children
 *     slide (`panelBlurRule(DOCKKIT_SLIDERS)`, no promotion).
 *   · the five `conversation.session.header*` slot keys, and still no `…leading`.
 *   · `PluginManagerPage.tsx` still emits `section[data-plugin-panel]` with the card
 *     `ul` under `[data-plugin-scope]` and `[data-plugin-loading]`.
 *   · `TextShimmer` keeps the rc.1 shape (`data-shimmer`), so the stroke exemption
 *     stands as written.
 *
 * What moved that reached this plugin WITHOUT a version branch, because the host
 * wrote it as a chain with a fallback:
 *   · `TurnTriggerNodeView.module.css` now fills from
 *     `var(--dsw-alias-turn-trigger-bg, var(--dsw-alias-markdown-code-block))` and
 *     hovers with `var(--dsw-alias-turn-trigger-bg-hover, var(--dsw-alias-interactive-bg-hover))`,
 *     both aliases declared in `design-platform.css` at this tag. The produced
 *     slider's arm reads the SAME chain (see `PRODUCED_RULE`), so older hosts take
 *     the fallback and this one takes the new alias — without any release test. That
 *     matters here rather than being pedantry: dark mode repoints the alias at
 *     `--dsw-alias-interactive-bg-hover`, so an arm still mixing on the code-block
 *     token would keep overriding the row with the OLD color and the row would stop
 *     tracking its own hover.
 *
 * @module
 */
import {
  BASE_HEADER_SLOT_KEYS,
  DOCKKIT_SLIDERS,
  LAYERED_MENU_SURFACE_WITH_GROUP_HEADER,
  PLUGIN_PAGE_FROST_RULE,
  panelBlurRule,
} from '../shared'
import type { HostAdapter, HostInfo, PanelFragments } from '../types'

function panelFragments(): PanelFragments {
  return {
    // Re-verified at this tag: the wrapper CSS is byte-identical to rc.1.
    promotion: '',
    blur: panelBlurRule(DOCKKIT_SLIDERS),
  }
}

export function createAdapter(host: HostInfo): HostAdapter {
  return {
    id: '0.2.0-rc.2',
    channel: '0.2.0-rc.2',
    host,
    panelFragments,
    pluginPageRule: PLUGIN_PAGE_FROST_RULE,
    menus: LAYERED_MENU_SURFACE_WITH_GROUP_HEADER,
    surface: {
      ownsSidebarGuideSurface: true,
      headerSlotKeys: BASE_HEADER_SLOT_KEYS,
    },
  }
}
