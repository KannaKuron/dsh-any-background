/**
 * Adapter for the DSH `0.2.1-alpha` line, verified at `0.2.1-alpha.1`.
 *
 * A new MINOR line opened with a prerelease, and the answer is the `0.2.0-rc.2`
 * folder's — which is a statement this file has to earn, because "same as the
 * release before" is exactly the reasoning that went wrong when `0.1.7-rc.2` moved
 * the menu paint. Read at the tag instead:
 *   · `ui-theme/src/styles/design-platform.css` is BYTE-IDENTICAL to `0.2.0-rc.2`
 *     (`git diff --numstat` empty), so every token this plugin writes — the menu
 *     pair, the specific-menu alias, the turn-trigger chain — resolves to the same
 *     values.
 *   · `MenuGroup.tsx`, `MenuGroup.module.css`, `MenuSurface.tsx` and
 *     `MenuSurface.module.css` are byte-identical too, and `MenuGroup` is still the
 *     only consumer of `--dsw-alias-menu-group-header-fill`. That is why the menus
 *     here answer with `LAYERED_MENU_SURFACE_WITH_GROUP_HEADER`, the same facts the
 *     rc.2 folder checked, and not by re-typing them.
 *   · `ui-sidebar-right/shell/SidebarRight.module.css` and
 *     `ui-dockkit/src/components/TabLayout.tsx` unchanged (only `.tsx` service
 *     wiring moved), so the panel stays a stationary frame with sliding dockkit
 *     children and no promotion.
 *   · the five `conversation.session.header*` slot keys, still no `…leading`.
 *   · `PluginManagerPage.tsx` still emits the three anchors of the card list.
 *   · `TextShimmer` still marks its root `data-shimmer`, so the stroke exemption
 *     written for rc.1 stands.
 *
 * What did move, and why none of it needs a fact from this folder:
 *
 *  1. `ui-layout/AppFrame` gains a second grid row, `div.bottomRow[data-shell-bottom]`
 *     holding the new `shell.bottom` slot, and it paints `--dsw-alias-bg-base` —
 *     the main-background token, which `applyCustomTokensNow` already re-emits on
 *     `body`, so the strip follows the main-bg slider with no new binding. The row
 *     is `min-height:0` and empty unless a plugin fills the slot, so an untouched
 *     install shows nothing. It also sits AFTER `RightbarColumn` in the frame's
 *     children, which is the side `discoverParts()` does not count from: it anchors
 *     on `data-rightbar-col` and reads `rightIdx-2` / `rightIdx-1`, so the sidebar
 *     and center column are still the same two children.
 *  2. `ui-primitives/InlineEditor.module.css` is the new home of the inline editor's
 *     `.editor{background:var(--dsw-alias-bg-base)}`. Same token, so the same slider
 *     reaches it wherever the component moved to.
 *  3. `modules/system.ts` narrowed `claimStyles` to the tags a factory itself added
 *     (see `ensureUiCss` for what that changed about our own sheet).
 *  4. `@deepseek-ai/dsh-invariants` is DELETED at this tag — `git ls-tree` shows no
 *     `packages/runtime-diagnostics/invariants`, and the boot/app plugin loader never
 *     looked for a plugin's `invariant` export. This plugin's no-op companion was
 *     therefore already dead weight here, and it goes rather than claiming a peer
 *     version for a package the host no longer ships.
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
    promotion: '',
    blur: panelBlurRule(DOCKKIT_SLIDERS),
  }
}

export function createAdapter(host: HostInfo): HostAdapter {
  return {
    id: '0.2.1-alpha.1',
    channel: '0.2.1-alpha',
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
