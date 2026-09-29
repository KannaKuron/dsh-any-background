/**
 * Selector + declaration vocabulary shared by every per-version adapter.
 *
 * These are the ANCHORS, not the decisions. What varies between releases (which
 * element slides, whether the panel needs promoting, which header slot keys
 * exist) is answered in the version folders; what is stable across all of them
 * lives here so no adapter has to re-type a host selector and get it subtly wrong.
 *
 * Verified against the harness release tags (dsh-v0.1.5-rc.2 … dsh-v0.2.0-rc.1),
 * not inferred:
 *   · `[data-sidebar-right-panel]` — emitted by `ui-sidebar-right/shell/SidebarRight.tsx`
 *     on every release in range, with values `push` | `fullscreen`.
 *   · `[data-dockkit-host]` / `[data-dockkit-empty]` — emitted ONLY by
 *     `ui-dockkit/components/TabLayout.tsx`, a file that first appears at
 *     0.1.7-alpha.1. Dockkit itself EXISTS earlier (its `TabMenu` carries
 *     `[data-dockkit-tab-menu]` on every release), so only these two attributes
 *     are the 0.1.7 marker — never test "is dockkit installed".
 *   · `[data-dsh-bottom-panel]` — the optional dsh-better-sidebar workbench, not
 *     a host element at all. It is a single element on every release, which is
 *     why it needs no version arm.
 *   · `[data-plugin-panel]` / `[data-plugin-scope] > ul` — emitted by
 *     `ui-plugin-manager/src/client/PluginManagerPage.tsx`. That package is NEW AT
 *     0.1.6-alpha.2: `git ls-tree` shows it absent from 0.1.5-rc.2, 0.1.5-rc.3 and
 *     0.1.6-alpha.1, where the plugin list lived in `ui-settings-plugin-inventory`
 *     under `[data-plugin-scope]` alone — no `[data-plugin-panel]`, and no card
 *     `ul` in that group either. From alpha.2 on, the group markup (`section` →
 *     `div.groupHead` + `ul.cards`) is byte-identical through 0.2.0-rc.1, so the
 *     ONE rule below serves every tag that emits the page.
 *
 * @module
 */

import type { MenuSurfaceFacts } from './types'

/** The host's own right Sidebar wrapper. */
export const PANEL_WRAPPER = '[data-sidebar-right-panel]'

/** The same wrapper in its fullscreen state; the host raises its own z-index to 40. */
export const PANEL_FULLSCREEN = '[data-sidebar-right-panel="fullscreen"]'

/** The docked children a 0.1.7+ panel slides — the panel itself stays put. */
export const DOCKKIT_SLIDERS =
  '[data-sidebar-right-panel] [data-dockkit-host="dock"],[data-sidebar-right-panel] [data-dockkit-empty]'

/** The third-party workbench panel, one element on every release. Owned by the
 *  PRODUCED slider (0.3.2): a conversation artifact that happens to open in a
 *  panel, not a page column — so it fades and frosts with the produced surfaces. */
export const BETTER_SIDEBAR_PANEL = '[data-dsh-bottom-panel]'

/** Every surface the panel opacity slider owns — the host's own right Sidebar.
 *  Layout-neutral token re-scope. (The dsh-better-sidebar workbench used to be
 *  listed here; it moved to the produced group, see `PRODUCED_RULE`.) */
export const PANEL_SURFACES = PANEL_WRAPPER

/** DOM-shape test for "this is NOT a 0.1.7-style frame". Used ONLY by the
 *  unresolved adapter, where the DOM is the authority because the release is not. */
export const WITHOUT_DOCKKIT_FRAME = ':not(:has([data-dockkit-host],[data-dockkit-empty]))'

/** The panel blur declaration pair. Both prefixes because Safari needs the
 *  `-webkit-` one and the cascade must not let them disagree. */
export function panelBlurRule(selectors: string): string {
  return `${selectors}{` +
    '-webkit-backdrop-filter:var(--dsh-any-blur-panel,none);' +
    'backdrop-filter:var(--dsh-any-blur-panel,none)}'
}

/**
 * The plugin-manager page's frosted card block, for the releases that ship it.
 *
 * `设置 → 插件` lists each group's plugins in a `ul` that has NO surface of its
 * own — measured live on 0.1.7-alpha.1: a transparent flex column, 2px gaps, each
 * `li` transparent with a 12px radius. With the settings surfaces faded, the whole
 * table floats straight on the wallpaper. This frames each group's list the way the
 * composer capsule is framed: a rounded block on an `::before` underlay.
 *
 * Which releases emit the page decides who gets this string — see `pluginPageRule`
 * in each version folder.
 *
 * The card `ul` is matched through TWO scopes. `0.2.0-rc.1` added a first-read
 * `ListSkeleton` that reuses `.cards` under `section[data-plugin-loading]`, so a
 * rule keyed on `[data-plugin-scope]` alone would show the real list frosted and
 * the loading list bare, then re-frost the block when the data lands. Hosts before
 * that never emit the attribute, so the extra selector is inert rather than a
 * version branch.
 *
 * BINDING, and why it is not just "put it in the dialog": the block paints from
 * `--dsh-any-bg-settings-surface` and frosts from `--dsh-any-blur-settings`, i.e.
 * the settings-opacity / settings-blur pair. On 0.1.7 the page is a child of
 * `centerCol`, NOT of the settings dialog (and from `0.1.7-rc.2` the dialog is a
 * `createPortal` beside `#root`, so it is further away still), therefore
 * `SETTINGS_STYLE_RULE`'s token
 * re-scope never reaches it and the list would otherwise follow the homepage card
 * alpha; reading the plugin-owned variables off `:root` puts them under the slider
 * that owns this page. The `var(--dsw-alias-bg-layer-2)` fallback covers the window
 * before the first `applySettingsOverrides` write.
 *
 * The frost rides an underlay because backdrop-filter must never sit directly on a
 * host part (containing block + backdrop root), and the `isolation` is what keeps
 * the underlay's `z-index:-1` inside the block instead of escaping behind the frame.
 * The `:has([role="dialog"])` valve matters here more than anywhere else: every row
 * carries a `plugins.item` slot that third-party plugins fill with their own
 * controls, so a dialog can legitimately open inside the list.
 */
export const PLUGIN_PAGE_FROST_RULE =
  '[data-plugin-panel] [data-plugin-scope]>ul,[data-plugin-panel] [data-plugin-loading]>ul{' +
  'position:relative;isolation:isolate;padding:8px;border-radius:14px}' +
  '[data-plugin-panel] [data-plugin-scope]>ul:has([role="dialog"]),' +
  '[data-plugin-panel] [data-plugin-loading]>ul:has([role="dialog"]){isolation:auto}' +
  '[data-plugin-panel] [data-plugin-scope]>ul::before,' +
  '[data-plugin-panel] [data-plugin-loading]>ul::before{' +
  'content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;border-radius:inherit;' +
  'background:var(--dsh-any-bg-settings-surface,var(--dsw-alias-bg-layer-2));' +
  '-webkit-backdrop-filter:var(--dsh-any-blur-settings,none);' +
  'backdrop-filter:var(--dsh-any-blur-settings,none)}'

/** The host's own `ui-theme` name for "dropdowns, popovers, suggestion lists", and
 *  the token the plugin has always remapped onto the card slider. Whether it still
 *  reaches a menu's paint is the question `MenuSurfaceFacts` below answers — from
 *  `0.1.7-rc.2` the host aliases it AWAY from the menu layer, so declaring it alone
 *  fades the non-`MenuSurface` overlays and nothing else. */
export const MENU_FILL_TOKEN = '--dsw-specific-menu'

/** Frost by filtering the element itself — the only option where the element is the
 *  thing that paints, and the shape every release up to `0.1.7-rc.1` presents. Both
 *  prefixes because Safari needs the `-webkit-` one and the cascade must not let
 *  them disagree. */
export function elementFrostDecl(value: string): string {
  return `-webkit-backdrop-filter:${value};backdrop-filter:${value}`
}

/**
 * ── Where a menu's paint lives ────────────────────────────────────────────────
 * Verified by reading the emitting source at each tag, not inferred from a changelog.
 *
 * `dsh-v0.1.5-rc.2` … `dsh-v0.1.7-rc.1`: the menu ELEMENT paints itself. Its own
 *   CSS module declares `background:var(--dsw-specific-menu)` — 11 files at
 *   0.1.5-rc.2/rc.3 and 0.1.6-alpha.1/alpha.2, 15 at 0.1.7-alpha.1/alpha.2, 16 at
 *   rc.1 (`Menu`, `MenuView`, `PopupSelectView`, `ModelSelect`, `dockkit` TabMenu,
 *   `stat-dialog`, `QueueDock`, `ContextMeter`, `TodoPanel`, `GoalBar`,
 *   `JobListAction`, `HoverCard`, `ScheduleCatalogAction`, `SubagentHeaderLineage`,
 *   `TeamAction`, `CordisPanel`). One token therefore paints every menu, and
 *   filtering the element is the arm that reaches it.
 *   Frost is a separate, later fact, and worth recording because it changes what
 *   the plugin is doing on the older tags: `--dsw-menu-backdrop-filter` has ZERO
 *   consumers before `0.1.7-alpha.1` (15 there, 16 at rc.1). On `0.1.5`/`0.1.6` the
 *   host frosts no menu at all, so the card/header blur sliders are the only reason
 *   a menu has a frost there — which is why the declaration goes on the element
 *   rather than into a host token the host does not read.
 *
 * `dsh-v0.1.7-rc.2` (npm `latest`) and `dsh-v0.2.0-rc.1`: `TabMenu`, `MenuView`,
 *   `PopupSelectView`, `ModelSelect` and `Menu` all render through the new
 *   `ui-primitives/src/MenuSurface.tsx` (byte-identical between the two tags),
 *   which leaves the element unpainted and draws on a `z-index:-1` child instead
 *   (`MenuSurface.module.css` `.material`: `background:var(--dsw-menu-surface-fill)`
 *   + `backdrop-filter:var(--dsw-menu-backdrop-filter)`). The four menu stylesheets
 *   that used to paint the old token (Menu/MenuView/PopupSelectView/dockkit TabMenu)
 *   drop it at rc.2, which is why the painter count goes 16 → 14.
 *   Two consequences, both measured from those files:
 *     · the host FLIPPED ITS ALIAS — `design-platform.css` now declares
 *       `--dsw-specific-menu:var(--dsw-menu-surface-fill)` where every earlier
 *       release declared the reverse. So a plugin that retints only the old token
 *       writes a value nothing on a menu any longer reads, and the card / header
 *       opacity sliders go inert on exactly the surfaces they were built for.
 *     · that child layer exists on purpose: its comment says filtering only the
 *       background "keeps nested menus and fixed overlays free of an ancestor
 *       backdrop root", and the surface sets `isolation:isolate`. Filtering the
 *       element anyway installs the backdrop root the layer was written to avoid.
 *   The frost therefore rides `--dsw-menu-backdrop-filter`, whose consumer set is
 *   the same 14 stylesheets at both tags (stat dialog, queue dock, context meter,
 *   todo panel, goal bar, job list, `HoverCard`, `PickerPopover`/`TaskMenu`/
 *   `ScheduleCatalogAction`, the subagent lineage, `TeamAction`, `CordisPanel`,
 *   `MenuSurface` itself) — re-declaring the token reaches the frost whoever ends up
 *   applying it, and does not depend on any element being the painting element.
 */
/** The answer for the releases whose menus paint themselves: `0.1.5-rc`,
 *  `0.1.6-alpha`, `0.1.7-alpha`. The unresolved bucket is its own variant below. */
export const LEGACY_MENU_SURFACE: MenuSurfaceFacts = {
  fillTokens: [MENU_FILL_TOKEN],
  frostDecl: elementFrostDecl,
}

/** The answer for `0.1.7-rc` (`0.1.7-rc.2` onward) and `0.2.0-rc`. The old token
 *  stays in the list on purpose: 14 surfaces in the same claim set still paint their
 *  fill from it — the lineage tree, `CordisPanel`, the stat dialog, `QueueDock`,
 *  `TodoPanel`, `ContextMeter`, `GoalBar`, `JobListAction`, `HoverCard`, `TeamAction`,
 *  `ModelSelect`'s own card and the schedule trio (`PickerPopover`, `TaskMenu`,
 *  `ScheduleCatalogAction`) — while the shared menus moved to
 *  `--dsw-menu-surface-fill`. Dropping either name fades one half of that set. */
export const LAYERED_MENU_SURFACE: MenuSurfaceFacts = {
  fillTokens: [MENU_FILL_TOKEN, '--dsw-menu-surface-fill'],
  frostDecl: value => `--dsw-menu-backdrop-filter:${value}`,
}

/** The answer when the release could not be resolved, and neither of the two
 *  verified shapes can be asserted. Each half is chosen so that being on the
 *  wrong line costs an inert declaration rather than a wrong pixel:
 *    · BOTH fill tokens. A custom property nothing reads costs nothing, so this
 *      half always lands: the fade reaches a self-painting menu through the old
 *      token and a `MenuSurface` layer through the new one.
 *    · the ELEMENT's frost, and not the host's blur token, because on `0.1.5` and
 *      `0.1.6` `--dsw-menu-backdrop-filter` has no consumer at all (verified: zero
 *      files before 0.1.7-alpha.1) — the token arm would leave those hosts with no
 *      menu frost whatsoever, while filtering the element frosts every release.
 *      On a `MenuSurface` host it does not stack: the surface root IS the element
 *      that carries `role="menu"`, so our filter makes it a backdrop root, and the
 *      `z-index:-1` layer inside it then has only the (unpainted) surface to sample
 *      and its own default `blur(40px)` becomes inert. One frost — ours — plus a
 *      `position:relative` element that hosts nested menus the way the layer was
 *      written not to. Accepted for a bucket that by definition cannot know. */
export const UNRESOLVED_MENU_SURFACE: MenuSurfaceFacts = {
  fillTokens: LAYERED_MENU_SURFACE.fillTokens,
  frostDecl: elementFrostDecl,
}

/** Session-header slot anchors present on EVERY release in range. The slot
 *  renderer stamps `data-slot="<key>"` unconditionally (`ui-renderer/scoped-slots.tsx`),
 *  and all five keys are registered from 0.1.5-rc.2 through 0.2.0-rc.1 —
 *  verified per tag. Adapters append the keys their own release adds. */
export const BASE_HEADER_SLOT_KEYS = [
  'conversation.session.header',
  'conversation.session.header.actions',
  'conversation.session.header.utilities',
  'conversation.session.header.corner',
  'conversation.session.header.lineage',
] as const
