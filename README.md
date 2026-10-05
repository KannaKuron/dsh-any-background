# dsh-any-background

<p align="center">
  <a href="https://www.npmjs.com/package/dsh-any-background"><img alt="npm version" src="https://img.shields.io/npm/v/dsh-any-background?color=4d6bfe"></a>
  <a href="https://www.npmjs.com/package/dsh-any-background"><img alt="npm monthly downloads" src="https://img.shields.io/npm/dm/dsh-any-background?color=4d6bfe"></a>
  <a href="https://github.com/Tkingxiao/dsh-any-background/blob/main/LICENSE"><img alt="License: MIT" src="https://img.shields.io/npm/l/dsh-any-background?color=4d6bfe"></a>
  <a href="https://www.npmjs.com/package/@deepseek-ai/dsh?activeTab=versions"><img alt="Supported DSH versions: 0.1.5-rc.2 ~ 0.2.1-alpha.1 and above" src="https://img.shields.io/badge/DSH-0.1.5--rc.2%20~%200.2.1--alpha.1%2B-4d6bfe" /></a>
  <a href="https://github.com/topics/dsh-better-sidebar"><img alt="Plugin ecosystem: GitHub topic dsh-better-sidebar" src="https://img.shields.io/badge/plugin%20ecosystem-topic%20dsh--better--sidebar-4d6bfe" /></a><br /><br />
  <a href="https://github.com/Tkingxiao/dsh-any-background"><img src="https://img.shields.io/github/stars/Tkingxiao/dsh-any-background?style=social" alt="GitHub stars"></a>
  <a href="https://dsh.directory/plugins/tkingxiao/dsh-any-background"><img src="https://dsh.directory/badges/listed.svg" alt="dsh.directory listed"></a>
</p>

English | [中文](README.zh.md)

A **DeepSeek Harness** appearance plugin: custom theme color, background wallpaper (image / video / algorithmically generated), and fine-grained per-surface opacity & blur controls. Compatible with **DSH 0.1.5-rc.2 through `0.2.1-alpha.1` — and every host release above it** (official-Sidebar UI such as the "Theme" card enables itself where the host exposes the Sidebar registry extension point, and is skipped silently where it does not).

---

## Screenshots

<p align="center">
  <img src="example_img/image.png" alt="Custom homepage" width="720">
  <br/>
  <em>Custom homepage · wallpaper + theme color applied</em>
</p>

<p align="center">
  <img src="example_img/image-2.png" alt="Theme color picker" width="720">
  <br/>
  <em>Theme color picker · PS-style wheel + precise HSL/RGB inputs</em>
</p>

<p align="center">
  <img src="example_img/image-3.png" alt="Per-part opacity and blur" width="720">
  <br/>
  <em>Per-part opacity and blur · main background, sidebar, cards, settings</em>
</p>

<p align="center">
  <img src="example_img/image-4.png" alt="Background editor" width="720">
  <br/>
  <em>Background editor · image/video wallpapers support drag-to-pan and scroll-to-zoom</em>
</p>

<p align="center">
  <img src="example_img/image-6.png" alt="Generated dynamic background" width="720">
  <br/>
  <em>Generated dynamic background · mesh gradient / Shader / geometric presets</em>
</p>

<p align="center">
  <img src="example_img/image-9.png" alt="Geometric background, low-poly mode" width="720">
  <br/>
  <em>Generated dynamic background · geometric low-poly mode preview</em>
</p>

<p align="center">
  <img src="example_img/image-10.png" alt="Config export and import" width="720">
  <br/>
  <em>Export and import configs to share</em>
</p>

## Features

- **PS-style Color Wheel** — Pick hue on the ring, adjust saturation & lightness in the inscribed square. Generates 30+ CSS design tokens in real time.
- **Precise HSL / RGB Input** — Enter exact color values numerically with instant bidirectional sync to the wheel.
- **Smart Color Extraction** — One click derives a theme color from your wallpaper by sampling the visible region, quantizing, and filtering out gray / near-black / near-white pixels. Video wallpapers contribute via an auto-captured frame. Fully client-side.
- **Eyedropper** — Hover the wallpaper to preview a color and click to pick it as the theme color.
- **Background Wallpaper** — Upload any image as your wallpaper. Drag to pan and scroll to zoom inside a viewport-proportional editor (one finger to pan, two to pinch-zoom on touchscreens).
- **Video Wallpaper** — Use a video as a live wallpaper: muted looping playback that survives refreshes (file persistence + HTTP streaming with Range seek), with an auto-captured frame powering the preview, theme-color extraction, and the position editor.
- **Position Editor** — One shared editor for images and videos: drag to pan, scroll or pinch to zoom, one-click reset. Image and video placements are stored separately and never overwrite each other.
- **Layout Modes** — Fit / Fill / Stretch / Tile / Center for both images and videos; in Fit mode the editor-committed framing stays consistent across window resizes and cross-monitor moves.
- **Generated Dynamic Backgrounds** — Choose mesh gradient, Shader, or geometric patterns with adjustable spread, intensity, and seed locking.
- **Per-surface Interface Opacity** — Independent sliders for the main background, sidebar, cards & panels (including the dropdowns and menus around the dialog), the input & controls (composer box, Cordis panel), the settings panel, the conversation text frame, the trajectory view, the right sidebar (or bettersidebar), produced / highlighted content, the header popovers (Agent Team panel, background-job list and the session-header dropdowns), and the header bar (the conversation's title / view-tab row).
- **Per-surface Interface Blur** — Frosted-glass `backdrop-filter` blur (0–60 px) per surface, including a real backdrop on the composer, the Cordis panel and popover surfaces via stable host selectors.
- **Produced / Highlights** — Code blocks in conversation content (with their language banner), inline `code` highlight chips and produced chips share one opacity + blur slider. The opacity is the alpha of **each surface's own background color** (no second color stacked on top of the original), and the blur frosts that same layer so the wallpaper shows through the content.
- **Right sidebar / bettersidebar surface** — One slider pair (`panelOpacity` / `blurs.panel`), two identities: without dsh-better-sidebar it reads "右方侧边栏" (Right sidebar) and drives the official right Sidebar's surface tokens and frosted blur (works on 0.1.5-rc.2 through 0.1.7); with dsh-better-sidebar installed it reads "bettersidebar" and takes over that plugin's bottom workbench panel (the official sidebar keeps responding too). The row is always visible.
- **Header popovers** — The session-header dropdowns get their own opacity + blur pair: the Agent Team panel, the background-job list, the open-in-app / session-log menus and the subagent lineage tree. On 0.1.7 the open-in-app picker moved to a portal and the session-row menu became a dynamic slot, so the plugin observes the stable `conversation.session.header*` slot anchors and tags the open popover at runtime instead of relying on class shapes.
- **Header bar (the session title row)** — The row carrying the session title, its actions and the view tabs gets a slider pair of its own. The host paints nothing there (the centre column's background shows straight through), so once a wallpaper is up the title and tabs sat on the raw picture while every masked surface around them did not. It now paints as a region tint, the same recipe as the chat column's card: the material is the plugin's main-background surface at this part's own opacity, so the bar reads as one band over the column rather than a second colour stacked on it, and the frost rides the row's own `backdrop-filter` — the row hosts no in-place overlay of its own (its dropdowns portal to `body`), so the backdrop root costs nothing and no underlay node is injected into a host element. The anchor is expressed in CSS (the row is the `conversation.session.header` slot's direct parent) instead of guessing a hashed class or tagging a host element at runtime; before `0.1.7-alpha.1` the host mounts that slot bare with no such element, so there the rule matches nothing and the part is simply inert.
- **Sidebar "Theme" page (dual mode)** — The same five pages (Color / Interface / Font / Background / Profiles) register into two surfaces: without dsh-better-sidebar, a "Theme" card is contributed to the **official right Sidebar's guide page** through its public extension points (`sidebarRightTabs` + the `sidebar.right.pane.tab` keyed seat); with dsh-better-sidebar installed, the page registers in that plugin's sidebar instead and the official guide card withdraws itself, so the two never duplicate. Settings panel, official sidebar and better-sidebar all share one page implementation and one state store — a change in any of them shows up everywhere. The shell adapts to the panel width, and a narrow panel tightens padding and falls back to a single column. On a host without the right Sidebar the registration silently never happens.
- **Conversation View Cards** — The message list is wrapped in a translucent card automatically, and the trajectory page gets whole-page opacity & blur controls, letting the wallpaper shine through the content.
- **Theme Export / Import** — One-click export to a self-contained `dsh-any-theme.json` (config + wallpaper, video embedded as a data URL) and import to restore it anywhere.
- **Appearance Presets & Profiles** — Six one-click presets (Default / Frosted glass / Minimal / Midnight / Cyber / Warm daylight) plus named profiles: save the current look and re-apply it anytime. A two-step confirm guards deletion.
- **Wallpaper Rotation** — Add images to a rotation pool (thumbnail picker included) and let the wallpaper change by shuffle or order on every refresh, daily, or weekly. Advancing copies the chosen image into the active wallpaper slot, so export/import and color extraction keep working unchanged.
- **Day/Night Auto Switch** — Assign a day profile and a night profile; the plugin switches automatically at fixed clock times or by following the OS dark mode.
- **Custom Font** — Upload a ttf / otf / woff / woff2 file (up to 100 MB) and apply it to the whole interface through `@font-face`; toggle it off or remove it at any time. Fonts stream as raw bytes and persist in the plugin data dir; code blocks keep their monospace stack.
- **Per-part Text Outline** — The same surface groups as the interface page (now eleven, including the header popovers and the header bar), each with its own `-webkit-text-stroke`: width 0–4 px (0 = off) and a color of auto-contrast / gray / black / white / accent / custom. Code blocks, inline `code`, icons and the host's `background-clip: text` shimmer chrome (the "深度求索中" turn-status line and the turn-process rows) are exempted automatically, so multi-color syntax never smears and gradient text is never flattened into a stroke-coloured blob.
- **Forced Interface Scheme** — Force light or dark token palettes regardless of the accent color's lightness; in `Auto` both the surface and font directions follow the accent's lightness (dark pick → light fonts, light pick → dark fonts), falling back to the wallpaper's perceived brightness when no color is picked.
- **File-based Persistence** — All settings are stored on the filesystem under `~/.dsh/.dsh-any-background-data/`, not `localStorage`.
- **Bilingual** — Full Chinese / English UI with automatic locale detection.
- **Theme Watchdog** — Re-asserts the custom theme if the host resets it.

## Changelog (latest two releases)

### v0.3.4 (Two new host lines: `0.2.0-rc.2` and `0.2.1-alpha.1`)

- **A sticky menu group heading got its own token on `0.2.0-rc.2`** (`--dsw-alias-menu-group-header-fill`, replacing `ModelSelect`'s `.groupTitle{background:var(--dsw-specific-menu)}`), so the model list's heading follows the card / header opacity slider and the picked theme color again instead of sitting on the faded menu as an untinted, near-opaque band. This is the first patch line that needed two folders — rc.1 and rc.2 are the same prerelease channel with different facts — so its folder is named for the build.
- **The turn-event row now fades in its own color**: since rc.2 it fills from `--dsw-alias-turn-trigger-bg` (dark mode points that at the interactive-hover fill, not the code-block one). The plugin reads the same chain the host writes, fallback included, so a newer host takes its new color, an older one takes the code-block color, and no release test enters the styling code.
- **DSH `0.2.1-alpha.1` is supported**: `design-platform.css`, `MenuGroup` and `MenuSurface` are byte-identical to rc.2, and the new `shell.bottom` strip paints `--dsw-alias-bg-base` — the main-background token — so the existing slider already owns it.
- **Small host releases no longer need a plugin release**: `engines.dsh`, the six gated `@deepseek-ai/dsh-*` peers and `dsh.compatibility` now close with `|| 0.2.1-alpha.1 || >=0.1.7-alpha.1` — the umbrella has no upper bound. From `0.1.7-rc.1` the host disables any plugin whose peer ranges do not name the running release, and a range that runs out is a wall in front of a plugin that would have kept working: an uncapped range hands a future 0.2.x or 0.3.x build the closest verified adapter plus a log line saying how far from `exact` that is, and the worst a wrong guess can cost is one slider not fading a surface it no longer recognizes. Installing on a new host still needs a `dsh web` restart — the peer check runs while the profile is composed.
- **The cards that take the composer seat now frost with the input blur.** Approval, plan review and the question composer render *beside* `[data-composer-card]` and fill from the same `--dsw-specific-input-major`, so they faded with the input slider while the blur slider had nothing to act on — the card you are meant to read went straight onto the wallpaper. They now get the capsule's `::before` underlay, gated on a non-zero blur so the plugin still adds no stacking context for free, and the answer field joins the input group's stroke and placeholder bindings. The anchors (`[data-approval-key]`, `[data-plan-review-key]`, `[data-question-key]`) are unchanged from `0.1.5-rc.2` through `0.2.1-alpha.1`, so this is a range-wide binding in shared host facts, not a per-version one.
- **The `invariant` companion is gone** (`lib/invariant.js`, its `exports` entry, its `@deepseek-ai/dsh-invariants` peer): nothing ever loaded it, and `0.2.1-alpha.1` deletes that package.
- **The settings page's stylesheet now carries the plugin tag the other sheets have.** Through rc.2 the host's module system claimed *any* untagged `<style>` present while a plugin materialized and deleted it if that plugin failed; `0.2.1-alpha.1` narrowed the claim to the tags a factory added itself. Tagged, the sheet is safe on both.

### v0.3.5 (The takeover-card frost no longer races the host for the card's position — issue #24)

- **The plugin no longer decides `position` for a host card.** The host positions none of the three takeover cards (approval / plan review / question) on any supported release — checked per tag: zero `position:` hits across their three stylesheets — so v0.3.4's `.dab-input-frost [data-approval-key]>div{position:relative;isolation:isolate}` was really the plugin deciding the card's positioning for the host. Once the host's own styles position that card too (issue #24's desktop shell pins it with `position:absolute` plus a percentage `max-height`), the decision becomes a specificity race: at equal weight the plugin wins by source order and turns the host's absolute card into an in-flow one — seat height, card box and the reported collapse along with it — and none of that is the plugin's to decide (both outcomes measured locally against a rule of the same weight). The frost now rides a runtime per-card class (`dab-takeover-frost`): attached only while the blur is non-zero, and writing `position:relative` inline **only where the card's computed position is `static`** (the `setBlur` guard, remembered with `data-dab-pos-patched`). A card the host positioned keeps its own position — which is then the containing block the underlay rides, so the frost still lands. A host box's position is no longer a contest this plugin can take part in.
- **The takeover selectors are gone from the stylesheet**: the recipe is now just `.dab-takeover-frost{isolation:isolate}` and its `::before`; `applyTakeoverFrost` attaches the class and rides `watchParts`' existing throttled pass to claim cards the host mounts later (the value signature gained the card's identity, or that pass would be skipped exactly when an approval appears and the card would stay bare). The `role="dialog"` valve follows `PART_BLUR_RULE`: a dialog inside the card gives up the `isolation` first.
- **Everything on those three cards stays paint-level**: the `--dsw-specific-input-major` rewrite stays global — the host only ever uses that token as a `background` (verified per tag, so it cannot move a box) — the input opacity slider still owns their fade, and the blur slider now reaches them through the new path.
- **A new 「标题栏」 (Header bar) card**: the row carrying the session title, its actions and the view tabs had no slider of its own — the host paints nothing there, so the centre column's background showed straight through and a wallpaper put the row on the raw picture. It now has its own opacity + blur: a region tint painted from the plugin's main-background surface at this part's opacity (the chat column's card recipe), with the frost on the row's own `backdrop-filter`; the row is CLAIMED AT RUNTIME — the plugin walks from a `conversation.session.header*` slot anchor up to the nearest `<header>` and tags it with its own class (the same idiom the view cards and the frame use), so no hashed class is guessed and no assumption is made about how deep the host nests the slot; before `0.1.7-alpha.1` the host mounts that slot bare with no such row, so nothing is ever claimed and the part is inert. It is the eleventh part, and the Font page's outline groups gained the same row.
- **The native window-buttons block no longer trails the sidebar slider**: that block is drawn by Windows from a single colour the desktop preload measures off `--dsw-specific-sidebar-fill`, and this plugin re-emits that token with the sidebar slider's alpha — which left the block looking washed out and translucent (issue #23, symptom 2). The plugin now pins only the host's own measurement probe back to the material's opaque colour: the page keeps following its sliders, the block keeps the host's own colour.

## Installation

### Method 1: npm install (Recommended)

```sh
# published on the npm registry
dsh plugin --profile web add dsh-any-background

# or straight from the GitHub repository
dsh plugin --profile web add github:Tkingxiao/dsh-any-background
```

Then launch:

```sh
dsh web
```

The plugin appears as a **"Theme"** section in Settings.

### Method 2: npx (No Global Install)

```sh
npx @deepseek-ai/dsh plugin --profile web add dsh-any-background
npx @deepseek-ai/dsh web
```

### Method 3: Local Build (Development)

The `lib/` directory is committed, so installs need no build step. To rebuild after editing `src/`:

```sh
git clone https://github.com/Tkingxiao/dsh-any-background.git
cd dsh-any-background
pnpm install
pnpm run bundle
pnpm dsh plugin --profile web add "dsh-any-background"
pnpm dsh web
```

## Compatibility

- **[`dsh web`](https://github.com/deepseek-ai/deepseek-harness) 0.1.5-rc.2 ~ `0.2.1-alpha.1`, and everything above it with it** — `engines.dsh`, the six gated `@deepseek-ai/dsh-*` `peerDependencies` and `dsh.compatibility.dsh` name the `0.1.5-rc` / `0.1.6-alpha` builds this plugin was checked against one by one — those have to be listed, since the umbrella starts above them — keep naming every build it has since diffed (`0.1.7-rc.1`, `0.1.7-rc.2`, `0.2.0-rc.1`, `0.2.0-rc.2`, `0.2.1-alpha.1`) for the record, and close with an uncapped `>=0.1.7-alpha.1`, so every 0.1.7, 0.2 and later release loads. The uncapped umbrella is the deliberate choice: from `0.1.7-rc.1` the host enforces exactly this peer list — a release it does not name is disabled before a single module is imported — so a range that runs out is a wall in front of a plugin that would have gone on working. An unseen release gets the closest verified adapter plus a log line saying how far from `exact` that is, and the worst a stale guess can cost is one slider no longer fading a surface the host has since moved; a version check that failed closed would have cost the whole plugin. `dsh.compatibility.dshReleases` records which builds were checked and how: `0.1.7-rc.1` / `0.1.7-rc.2`, `0.2.0-rc.1` / `0.2.0-rc.2` and `0.2.1-alpha.1` were checked by diffing their tags, the builds before them hands-on. That enforcement still means a `dsh web` restart when the plugin is installed or updated — the check runs while the profile is composed, not when the plugin is updated — but the uncapped umbrella is what spares a machine that has already moved to a newer host from needing a plugin release or a manual exact-version exemption (`dsh plugin allow-version`) first. The host release is resolved on the Node half at runtime, and features that depend on a specific host release channel (the right Sidebar's panel blur, the official Sidebar's "Theme" card) enable themselves only where the corresponding host structure exists; everything else behaves identically across the range.
- **Isolated per-version adaptation**: the release is resolved on the Node half from the app manifest the process was composed from (`ctx.profileContext.installAnchor`, with the launcher's on-disk layout behind it — the client context exposes no version) and, once handed down through the `read` RPC, is routed only by the front-layer adapter — `src/host-compat/` detects and buckets channels, while `src/client/host-compat/versions/` holds **one folder per set of verified facts** (`v0-1-5-rc-2-3` / `v0-1-6-alpha-1-2` / `v0-1-7-alpha-1-2-rc-1` / `v0-1-7-rc-2` / `v0-2-0-rc-1` / `v0-2-0-rc-2` / `v0-2-1-alpha-1` / `unknown`), each describing that version's panel mechanics, header slot keys, plugin-page shape and where a menu's paint lives. A folder is keyed to what its facts cover, not to the shape of the version number: `0.2.0-rc.1` and `0.2.0-rc.2` are one prerelease channel, but rc.2 renamed the token a sticky menu group heading paints from, so the line carries two folders and the newer one is named for the build that opened it. Base code just asks the adapter questions (who owns the guide surface, which layer carries the blur, which token fades a menu) and never compares version strings. Another build on a verified patch line (`0.1.6-alpha.4` against a table checked at `alpha.2`) keeps that line's adapter, and a patch line nothing was checked against clamps to the nearest one with a log line saying so — which is the arm that now serves every release above `0.2.1-alpha.1`. Only a release that will not parse at all falls into `unknown` and probes the DOM shape instead of guessing (`:has()` dual arms); supporting a new host means adding one folder and registering it.
- **[DSHA](https://github.com/DSH-APP/DSHA)** — DeepSeek Harness Android launcher (ROOT-free, Termux-free). Its bundled `dsh` is `0.1.5-rc.2`, inside the supported range; the mobile UI shell is provided by `dsh-web-mobile`.
- **[deepseek-harness-desktop](https://github.com/anywhere-labs/deepseek-harness-desktop)** — Supported

## Permissions, side effects & boundaries

- **Integration form**: official Profile Bundle — `package.json` declares `dsh.bundle.patch: ./cordis.patch.yml` (a loader insert layer), the repository ships prebuilt runtime artifacts ready to use (`lib/index.js`, `lib/client.js`), and there are no install scripts, no `postinstall`, no native binaries, and no build step at install time.
- **Filesystem**: the server half reads and writes only inside `<dsh home>/.dsh-any-background-data/` (config JSON, wallpaper, rotation pool, video, font) and touches nothing outside it; config writes are atomic (temp file + rename). These files live on the real disk, so they are **outside generation restore — it neither captures nor rolls them back**; deleting the directory is a full plugin reset.
- **Network**: one outbound fetch happens only when the user pastes an http/https image or video URL and presses Apply; no telemetry, no other external calls.
- **Shell / native**: none. No `child_process`, no native modules, no dynamically downloaded executables.
- **HTTP surface**: registers only `/dsh-any-background/{video,wallpaper,font}` (GET/HEAD streaming) with matching `*/upload` POST routes (100 MB cap) and the dedicated RPC channel `/dsh-any-background` under the local dsh web server; no extra listening ports.
- **Restart requirements**: the first install needs a (re)start of `dsh web` to load the client bundle; settings changes afterwards apply live and persist automatically. Updating the plugin requires a restart to pick up the new `lib/client.js`.
- **Tests & verification**: `pnpm run typecheck` (full tsc check) and `pnpm run bundle` (tsdown emits `lib/`); no automated unit tests — behavior is verified manually.
- **Known limitations**: the styling relies on stable host DOM markers (`[data-sidebar-right-panel]`, `[data-dsh-bottom-panel]`, …) and CSS token names; a host restyle of those layers can leave a slider ineffective for its surface (cosmetic only — nothing breaks). The version-specific half of those selectors lives inside its own version folder, so a host revision normally means editing that one file. `-webkit-text-stroke` may clip about 1px at the edge of some single-line ellipsis containers.

## Star History

[![Star History Chart](https://api.star-history.com/chart?repos=Tkingxiao/dsh-any-background&type=timeline&legend=bottom-right&sealed_token=f5MhnHibC049CC0Ed_nZX8rYpIq2wPTdTXUsPPafAiYxYKOeqyKyMFirxKppeLNJygxv1iw2BlsnCYOWgu9zN6ffr7kJlAG1SlRoQRmQivCIkPzZ2lhSBQ)](https://www.star-history.com/?repos=Tkingxiao%2Fdsh-any-background&type=timeline&legend=bottom-right)

## License

MIT
