# dsh-any-background

<p align="center">
  <a href="https://www.npmjs.com/package/dsh-any-background"><img alt="npm 版本" src="https://img.shields.io/npm/v/dsh-any-background?color=4d6bfe"></a>
  <a href="https://www.npmjs.com/package/dsh-any-background"><img alt="npm 月下载量" src="https://img.shields.io/npm/dm/dsh-any-background?color=4d6bfe"></a>
  <a href="https://github.com/Tkingxiao/dsh-any-background/blob/main/LICENSE"><img alt="License: MIT" src="https://img.shields.io/npm/l/dsh-any-background?color=4d6bfe"></a>
  <a href="https://www.npmjs.com/package/@deepseek-ai/dsh?activeTab=versions"><img alt="支持的 DSH 版本：0.1.5-rc.2 ~ 0.2.0-rc.1" src="https://img.shields.io/badge/DSH-0.1.5--rc.2%20~%200.2.0--rc.1-4d6bfe" /></a>
  <a href="https://github.com/topics/dsh-better-sidebar"><img alt="插件生态：GitHub topic dsh-better-sidebar" src="https://img.shields.io/badge/%E6%8F%92%E4%BB%B6%E7%94%9F%E6%80%81-topic%20dsh--better--sidebar-4d6bfe" /></a><br /><br />
  <a href="https://github.com/Tkingxiao/dsh-any-background"><img src="https://img.shields.io/github/stars/Tkingxiao/dsh-any-background?style=social" alt="GitHub stars"></a>
  <a href="https://dsh.directory/plugins/tkingxiao/dsh-any-background"><img src="https://dsh.directory/badges/listed.svg" alt="dsh.directory listed"></a>
</p>

[English](README.md) | 中文

一个 **DeepSeek Harness** 外观插件：自定义主题色、背景壁纸（图片 / 视频 / 算法动态生成），以及逐表面的透明度与模糊度控制。兼容 **DSH 0.1.5-rc.2 起、0.2.0 之前的整条 0.1.7 线，外加 `0.2.0-rc.1`**（官方右侧栏「主题」卡片等界面按宿主是否提供右侧栏注册表扩展点自动启用，缺失时静默跳过）。

---

## 截图

<p align="center">
  <img src="example_img/image.png" alt="自定义主页" width="720">
  <br/>
  <em>自定义主页 · 壁纸与主题色同时生效</em>
</p>

<p align="center">
  <img src="example_img/image-2.png" alt="主题色选择器" width="720">
  <br/>
  <em>主题色选择器 · PS 风格色轮 + 精确 HSL/RGB 输入</em>
</p>

<p align="center">
  <img src="example_img/image-3.png" alt="分部位透明度与模糊度" width="720">
  <br/>
  <em>分部位透明度与模糊度 · 主背景、侧边栏、卡片、设置面板</em>
</p>

<p align="center">
  <img src="example_img/image-4.png" alt="背景编辑器" width="720">
  <br/>
  <em>背景编辑器 · 图片/视频壁纸支持拖动平移与滚轮缩放</em>
</p>

<p align="center">
  <img src="example_img/image-6.png" alt="动态生成背景" width="720">
  <br/>
  <em>动态生成背景 · 网格渐变 / Shader / 几何图案预设</em>
</p>

<p align="center">
  <img src="example_img/image-9.png" alt="几何背景 低多边形模式" width="720">
  <br/>
  <em>动态生成背景 · 几何 低多边形模式预览</em>
</p>

<p align="center">
  <img src="example_img/image-10.png" alt="配置导出导入" width="720">
  <br/>
  <em>配置的导出和导入进行分享</em>
</p>

## 功能特性

- **PS 风格色轮** — 在色相环上选取色相，在内嵌方形中调整饱和度与明度，实时生成 30+ 个 CSS 设计令牌。
- **精确 HSL / RGB 输入** — 通过数值精确输入颜色，与色轮实时双向同步。
- **智能取色** — 一键从壁纸提取主题色：采样可见区域、量化像素、剔除灰色/近黑/近白，选出现量最大的鲜亮色。视频壁纸自动截帧参与取色。纯客户端完成。
- **吸管取色** — 在壁纸上悬停预览颜色，点击即可选为主题色。
- **背景壁纸** — 上传任意图片作为壁纸，在视口比例的编辑器中拖动平移、滚轮缩放（触屏上单指拖动、双指捏合缩放）。
- **视频壁纸** — 上传视频作为动态壁纸：静音循环播放、刷新不丢失（落盘持久化 + HTTP 流式播放，支持 Range seek）；自动截取一帧用于预览、主题色提取与位置编辑参考。
- **位置编辑器** — 图片与视频共用同一套编辑器：拖动平移、滚轮或双指缩放、一键重置；图片与视频的位置状态各自独立保存，互不覆盖。
- **布局模式** — 适应 / 填充 / 拉伸 / 平铺 / 居中五种排布，图片与视频通用；「适应」模式下编辑器提交的构图在窗口缩放、跨屏移动后保持一致。
- **动态生成背景** — 支持网格渐变、Shader、几何图案，可调节扩散范围、色彩强度并锁定种子。
- **分部位界面透明度** — 主背景、侧边栏、卡片面板（含对话框周围的选项框/菜单）、输入框与控件（发送框、Cordis 插件面板）、设置面板、对话文本框、轨迹页、右方侧边栏（或 bettersidebar）、产出物/高亮内容，以及顶栏选项（Agent Team 面板、后台任务列表与会话头部下拉菜单）各自独立滑块。
- **分部位界面模糊度** — 每个界面部位可独立调整毛玻璃 `backdrop-filter` 模糊（0–60 px），并通过宿主的稳定选择器为发送框、Cordis 面板与弹出层提供真实背景模糊。
- **产出物 / 高亮内容** — 对话正文里的代码块（含语言顶栏）、行内 `code` 高亮芯片与产出物 chip 共用一支滑块：透明度只**调制这些表面原本的背景色**（不会在旧背景上再叠一层新色），模糊度给同一层表面加磨砂，壁纸从内容后方透出来。
- **右方侧边栏 / bettersidebar 表面** — 同一对滑块（`panelOpacity` / `blurs.panel`）按宿主环境自动切换目标：未安装 dsh-better-sidebar 时叫「右方侧边栏」，驱动官方右侧栏的表面令牌与毛玻璃模糊（0.1.5-rc.2 至 0.1.7 均适用）；安装了 dsh-better-sidebar 时改叫「bettersidebar」，接管其底部工作台面板（官方右侧栏同样生效）。该行现在始终显示。
- **顶栏选项** — 会话头部的下拉浮层获得了独立的透明度 + 模糊滑块：Agent Team 面板、后台任务列表、「用其它应用打开」与「会话日志」菜单、子代理血缘树。由于这些浮层被 portal 到 `<body>`（与头部 DOM 断开），且 0.1.7 把「用其它应用打开」改成 portal、把会话行菜单改成动态槽位，插件改为在运行时监听稳定的 `conversation.session.header*` 槽位锚点来标记当前展开的浮层，不再依赖类名形状。
- **侧边栏「主题」页面（双模式）** — 同一套五页（色彩 / 界面 / 字体 / 背景 / 配置）注册到两处：未安装 dsh-better-sidebar 时，通过官方右侧栏的公开扩展点（`sidebarRightTabs` + `sidebar.right.pane.tab`）在**官方侧边栏**的引导页挂一张「主题」卡片，点开即五页；安装了 dsh-better-sidebar 时，改为在它的侧边栏注册同名页面，官方引导页上的卡片自动撤下，避免重复。两处（加设置面板共三处）共用同一套页面代码与同一份状态，改一处处处同步；外壳按面板宽度自适应，窄面板收紧内边距并回到单列。宿主没有右侧栏扩展点时静默不注册，不影响任何其它功能。
- **对话视图卡片** — 消息列表自动包裹为半透明卡片，轨迹页可整页调节透明度与模糊，让壁纸从内容后方透出来。
- **主题导出 / 导入** — 一键导出为自包含的 `dsh-any-theme.json`（配置 + 壁纸，视频以 data URL 内嵌），可随时导入还原。
- **外观预设与配置档案** — 六套一键预设（默认 / 毛玻璃 / 极简白 / 暗夜紫 / 赛博 / 暖阳），外加自定义命名档案：随时保存当前观感、随时套回，删除有二次确认保护。
- **壁纸轮换** — 把多张图片加入轮换池（缩略图选择器），按随机或顺序、每次刷新 / 每天 / 每周的频率自动更换；切换时服务端把所选图片复制进当前壁纸槽，导出/导入与取色管线完全不用改。
- **昼夜自动切换** — 指定日间与夜间两套配置，按固定时段或跟随系统深色模式自动切换。
- **自定义字体** — 上传一个 ttf / otf / woff / woff2 字体文件（上限 100 MB），通过 `@font-face` 应用到整个界面的文字；可随时停用或移除。字体按原始字节流式上传并持久化到插件数据目录，代码块仍保持等宽字体。
- **分组文字描边** — 沿用界面页的分组（现为十组，含顶栏选项），为每个分组单独加 `-webkit-text-stroke` 描边：粗细 0–4 px（0 = 关闭），颜色支持自动反色 / 灰 / 黑 / 白 / 主题色 / 自定义。代码块、`inline code`、图标，以及宿主那类 `background-clip: text` 的流光文字（「深度求索中」状态行与轮次过程行）自动豁免——多色语法不会糊成一团，渐变文字也不会被描边压成一坨纯色。
- **强制界面明暗** — 无论主题色明暗如何，都能强制生成亮色/暗色整套令牌；「自动」下配色与字体方向由主题色明度驱动（深色 → 浅字，浅色 → 深字），未选主题色时按壁纸画面亮度判断。
- **文件持久化** — 所有设置保存到文件系统 `~/.dsh/.dsh-any-background-data/`，不再依赖 `localStorage`。
- **中英双语** — 完整的中英文界面，自动跟随语言设置。
- **主题守护** — 宿主重置主题后自动重新激活自定义主题。

## 更新日志（只保留最近两个版本）

### v0.3.3（菜单按版本交出绘制事实，支持 DSH 0.2.0-rc.1）

- **`0.1.7-rc.2` 上「卡片」「顶栏选项」两组滑块对菜单又有效了**：那个构建把菜单的底色与磨砂移到子层，并把 `--dsw-specific-menu` 改成别名，插件一直在写的令牌在菜单上再没有别的读者。「菜单从哪些令牌取色、磨砂由哪一层承担」现在由每个版本目录各自交出，公共代码里不再留假设。
- **支持 DSH `0.2.0-rc.1`**：逐 tag 核对后给它自己的目录与渠道。清单只点名这一个构建，不放开整条 0.2.0 线——没人比对过的版本就是另一个宿主。
- **流光文字跟上 0.2.0 的重写**：描边豁免补入 `[data-shimmer]`，进度文字不再被勾成叠放的两份。
- **插件页首屏的加载骨架屏**拿到与它所代替的那张卡片列表相同的磨砂底。
- 装到 0.2.0 宿主上要重启 `dsh web`：从 `0.1.7-rc.1` 起宿主按 peer 范围决定插件能不能加载，没被点名的版本在导入任何模块之前就被整行禁用。

### v0.3.2（产出物表面全量绑定，0.1.7-rc.2 恢复加载）

- **产出物滑块覆盖 0.1.7 渲染的每一件产物**：工具详情卡片、事件行、diff 块、变更文件卡片、内联 `code` 磨砂，以及悬浮预览窗——它把卡片 portal 到 `<body>`，所以此前不归任何滑块管。
- **代码卡片的头部横幅恢复跟随主题**，不再是一块无视滑块的近白条。
- **dsh-better-sidebar 的工作台改由产出物滑块接管**；面板行现在只代表宿主自己的右侧栏。
- **一张产物卡片不再同时听两个滑块**：它的根节点改读产出物自己的原始层级令牌。
- **输入框模糊回到 0 之后不再残留层叠上下文。**
- **antd 的确认弹窗不再被当成设置面板**：它原先继承了设置表面色、磨砂与描边分组，因为旧选择器只认那三个 antd 同样会发出的 ARIA 属性。
- **`0.1.7-rc.2` 恢复加载，其后的 0.1.x 一并放行**：`engines.dsh`、七个 `@deepseek-ai/dsh-*` peer 与 `dsh.compatibility` 都以 `|| 0.1.7-rc.2 || >=0.1.7-alpha.1 <0.2.0-alpha.0` 收尾——只写 `>=0.1.7` 一个预发布构建都匹配不到。

## 安装

### 方式一：npm 安装（推荐）

```sh
# 已发布到 npm registry
dsh plugin --profile web add dsh-any-background

# 或直接安装 GitHub 仓库
dsh plugin --profile web add github:Tkingxiao/dsh-any-background
```

然后启动：

```sh
dsh web
```

插件会出现在设置面板的 **“主题”** 分类中。

### 方式二：npx（无需全局安装）

```sh
npx @deepseek-ai/dsh plugin --profile web add dsh-any-background
npx @deepseek-ai/dsh web
```

### 方式三：本地构建（开发）

`lib/` 目录已提交，安装后无需构建。修改 `src/` 后重新构建：

```sh
git clone https://github.com/Tkingxiao/dsh-any-background.git
cd dsh-any-background
pnpm install
pnpm run bundle
pnpm dsh plugin --profile web add "dsh-any-background"
pnpm dsh web
```

## 兼容性

- **[`dsh web`](https://github.com/deepseek-ai/deepseek-harness) 0.1.5-rc.2 ~ &lt;0.2.0，外加 `0.2.0-rc.1`** — `engines.dsh`、七个 `@deepseek-ai/dsh-*` 的 `peerDependencies` 与 `dsh.compatibility.dsh` 先逐一列出本插件核对过的 `0.1.5-rc` 与 `0.1.6-alpha` 各构建，再以 `>=0.1.7-alpha.1 <0.2.0-alpha.0` 收尾让 0.1.7 全线加载，最后单独写上 `0.2.0-rc.1`——总括刻意停在 0.2.0 之前，因为没比对过的 0.2.0 构建就是另一个宿主，它的事实要由它自己的目录来写。`0.1.7-rc.1`、`0.1.7-rc.2`、`0.2.0-rc.1` 以逐包比对 tag 核对，它们之前的构建是实测过的。从 `0.1.7-rc.1` 起宿主自己强制这份 peer 列表——范围没写到的版本会在模块被导入之前整个禁用——所以列不列决定插件能不能跑，它不是写给人看的说明；`dsh.compatibility.dshReleases` 里则记录哪些构建真的核对过。同一道门禁也解释了为什么已经在 0.2.0 上的机器需要插件发版（或手工授予精确版本豁免）**并**重启宿主：检查发生在 profile 组装时，而不是插件更新时。宿主版本在运行时由 Node 半侧解析，依赖特定宿主版本渠道的功能（右侧栏面板模糊、官方侧栏「主题」卡片）只在对应宿主结构存在时启用，其余功能在整个范围内表现一致。
- **版本适配隔离**：release 由 Node 半侧从进程自身那份 `@deepseek-ai/dsh/package.json` 读出（客户端上下文不暴露版本；`ctx.profileContext.installAnchor` 指不到时退回启动器的磁盘布局），经 `read` RPC 下发后只由前置适配层路由——`src/host-compat/` 负责探测与渠道归类，`src/client/host-compat/versions/` 下**每个版本一个目录**（`v0-1-5-rc-2-3` / `v0-1-6-alpha-1-2` / `v0-1-7-alpha-1-2-rc-1` / `v0-1-7-rc-2` / `v0-2-0-rc-1` / `unknown`），各自描述该版本的面板力学、头部槽位键、插件页形状，以及菜单的底色与磨砂落在哪一层。底码只向适配层提问（引导页表面归谁、模糊挂在哪一层、菜单该重写哪些令牌），不比较版本字符串。同一补丁行内的其它构建（`0.1.6-alpha.4` 之于核对基准 `0.1.6-alpha.2`）用该行的档位；整条补丁行都不在已核对范围内才收边取最近的一档并写日志。只有解析不到 release 时归入 `unknown`，回退到按 DOM 形状探测（`:has()` 双臂）而不是猜一个版本；适配新宿主 = 新增一个版本目录并在注册表登记。
- **[DSHA](https://github.com/DSH-APP/DSHA)** — DeepSeek Harness 安卓启动器（免 ROOT、免 Termux）。其包内 dsh 为 `0.1.5-rc.2`，落在兼容范围内；移动端界面由 `dsh-web-mobile` 提供。
- **[deepseek-harness-desktop](https://github.com/anywhere-labs/deepseek-harness-desktop)** — 支持

## 权限、副作用与边界

- **接入形态**：官方 Profile Bundle——`package.json` 声明 `dsh.bundle.patch: ./cordis.patch.yml`（loader 插入层），仓库提交可直接使用的预构建运行时制品（`lib/index.js`、`lib/invariant.js`、`lib/client.js`），无安装脚本、无 postinstall、无 native 二进制、安装时不执行任何构建。
- **文件系统**：服务端仅在 `<dsh 主目录>/.dsh-any-background-data/` 内读写（配置 JSON、壁纸、轮换池、视频、字体），不触碰该目录之外的任何路径；配置写入为原子写（临时文件 + rename）。这些文件落在真实磁盘上，**不受 generation 恢复影响，也不会被其回滚**——清除它们即彻底重置插件。
- **网络**：仅在用户主动粘贴 http/https 图片或视频网址并点击「应用」时发起一次出站请求下载该资源；除此之外无遥测、无外部服务调用。
- **Shell / native**：无。不使用 `child_process`、不加载 native 模块、不运行动态下载的二进制。
- **HTTP 面**：仅在本机 dsh web 服务下注册 `/dsh-any-background/{video,wallpaper,font}`（GET/HEAD 流式服务）与对应 `*/upload`（POST，上限 100 MB）及专用 RPC 通道 `/dsh-any-background`；无新增对外监听端口。
- **是否需要重启**：首次安装后需（重新）启动 `dsh web` 加载客户端 bundle；此后的设置变更实时生效、自动落盘。更换插件版本后需重启以加载新的 `lib/client.js`。
- **测试与验证**：`pnpm run typecheck`（tsc 全量类型检查）与 `pnpm run bundle`（tsdown 产出 `lib/`）；无自动化单测，接口行为以手动验证为准。
- **已知限制**：依赖宿主 DOM 结构的稳定标记（如 `[data-sidebar-right-panel]`、`[data-dsh-bottom-panel]`）与 CSS 令牌名，宿主大版本重构样式层时选择器可能失效（表现为相关滑块不再作用于对应表面，不影响稳定性）；版本相关的那部分选择器集中在对应的版本目录里，宿主改版通常只需改那一份；`-webkit-text-stroke` 在部分单行省略号容器边缘约有 1px 裁切。

## Star History

[![Star History Chart](https://api.star-history.com/chart?repos=Tkingxiao/dsh-any-background&type=timeline&legend=bottom-right&sealed_token=f5MhnHibC049CC0Ed_nZX8rYpIq2wPTdTXUsPPafAiYxYKOeqyKyMFirxKppeLNJygxv1iw2BlsnCYOWgu9zN6ffr7kJlAG1SlRoQRmQivCIkPzZ2lhSBQ)](https://www.star-history.com/?repos=Tkingxiao%2Fdsh-any-background&type=timeline&legend=bottom-right)

## 许可

MIT
