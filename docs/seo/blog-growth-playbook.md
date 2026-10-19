# Blog SEO 持续运营手册

审查日期：2026-10-19。范围：F1 英文 Blog 的主题组织、查询归属、证据质量与人工运营；本文件是内部中文工作说明。公开页面保持英文。

目标是让工程师与采购人员更容易找到、核验和使用内容，再进入相关产品或询盘流程。本轮建立可维护的内容体系，不承诺排名、点击或询盘增长，不创建自动发布或定时任务。

## 1. 改造前基线与证据边界

| 项目 | 改造前观察 | 解读 |
| --- | --- | --- |
| Blog 内容 | `content/data/blogPosts.ts` 共 52 篇、29 个分类标签 | 标签较分散；不等于需要新增 29 个可索引分类页。 |
| 来源字段 | 32 篇设置 `sourceLinks` | 其余 20 篇需要逐篇核查；没有此字段不等于正文完全没有来源。字段存在也不等于证据有效。 |
| 明确查询归属 | `content/data/seoQueryTargets.ts` 中 3 个 Blog 主归属 | 分别是 fiberglass reinforced plastic、FRP material、FRP full form；并非全站只有 3 个归属。 |
| 流量与需求 | 本次 Ahrefs 可用 units 为 0；GSC 关键词与页面查询（2026-07-18 至 2026-10-16）均返回空数组 | 尚无可比较的本轮完整基线；空结果不能解释为零流量，不能填造搜索量、难度或增长率。 |

frpzs 的可读版本为 [www.frpzs.com](https://www.frpzs.com/)。裸域请求曾返回 HTTP 444；命令行后续出现 DNS 失败。以下是页面内容抽样，不是其完整抓取、技术审计或流量证明：

- [News](https://www.frpzs.com/News/) 展示 68 个分页入口，首页覆盖工程指南、材料比较、采购和故障排查；尚未遍历全部分页，不能据此报准确文章数。
- [型材指南](https://www.frpzs.com/News/Pultruded-FRP-Profiles-Engineering-Guide-to-Structural-Composite-Shapes-Performance-B2B-Selection.html) 有形状分类、对比表、问答和正文产品链接。借鉴问题覆盖与产品连接；其绝对耐腐蚀、免维护等表述缺少可见条件，不能直接作为 F1 技术依据。
- [管材比较](https://www.frpzs.com/News/FRP-vs-Steel-Pipes-Which-Material-Offers-Better-Corrosion-Resistance-and-Lifetime-ROI.html) 混合结构管与流体管路场景。F1 必须区分拉挤结构管与经验证的承压管系统。
- [定制型材文章](https://www.frpzs.com/News/Custom-FRP-Profiles-The-Versatile-Choice-for-Industrial-Applications.html) 标注 2025-02-05，正文提及 2026，未见独立更新日期。F1 只在实质修订后更新 `updatedAt`。

参考 Google 的 [helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)、[站内链接](https://developers.google.com/search/docs/crawling-indexing/links-crawlable) 和 [面包屑](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb) 指南：提供原创价值与准确来源，使用自然锚文本和可抓取链接，清楚表达页面层级。文章数量、字数或日期更新本身不是质量验收项。

## 2. 七个主题入口与查询归属

统一入口格式：`/resources/blog/topics/[topic]`。主题页帮助读者选择下一篇文章；有独立简介、精选阅读路径和相关产品，不抢产品页或核心指南的主查询。

| topic | 覆盖问题 | 承接产品 / 核心页面 |
| --- | --- | --- |
| `materials-and-process` | FRP 定义、密度、树脂、火性能、制造与回收 | `/what-is-frp`、`/technology/pultrusion-process`、`/pultruded-frp-profiles` |
| `structural-design-and-procurement` | 结构选型、成本输入、规格、供应商与采购 | `/products/fiberglass-structural-shapes`、`/products/custom-pultruded-profiles` |
| `windows-and-thermal-performance` | 窗型材、加工、传热、测试与采购 | `/products/window-door-profiles`、`/products/fiberglass-windows-doors` |
| `grating-and-access` | 格栅荷载、安装、栏杆与固定梯 | `/products/frp-gratings`、`/products/molded-frp-grating`、`/products/frp-handrail-systems`、`/products/frp-ladders` |
| `cable-management` | 桥架类型、支撑、安装与项目规格 | `/applications/frp-cable-tray-supports`；相关槽、角型材产品 |
| `gfrp-rebar` | 钢筋规格、弯筋、网片、安装与检验 | `/products/frp-rebar`、`/technology/fiberglass-rebar-vs-steel` |
| `infrastructure-and-energy` | 桥梁、海岸、风电、光伏及其他工程应用 | `/products/frp-deck-panels`、`/products/wind-turbine-blade-panels`、`/products/frp-solar-mounting-systems` |

维护规则：

1. 每篇设一个主查询、明确读者任务、主要主题、相关产品和来源状态。近义词放在同一篇自然解释，不按单复数、FRP/GRP 拼写或年份复制页面。
2. manufacturer / supplier / custom 等商业查询由已登记产品页承接；what is FRP、pultrusion process、FRP grating vs steel 等现有核心页面保留主意图。Blog 解决更具体的选型、安装、证据和采购问题，并链接主页面。
3. `seoQueryTargets.ts` 是既有主归属依据；新 Blog 映射用于完整盘点，并已接入 `seo:query-review` 的准确主查询匹配。主题页、文章和产品的职责不等于实测排名归属，更不能据此自动判定蚕食。
4. 修改 URL、合并或 301 前，另核历史点击、有效外链、索引、内容差异及询盘路径；本轮不凭标题相似执行合并。
5. 内容地图输出：`docs/seo/blog-keyword-map.csv`。新增或改稿后运行 `npm run seo:blog-map` 并人工审查差异；运行 `npm run seo:blog-audit` 检查遗漏和链接。命令通过不替代技术审稿。

## 3. 90 天执行队列

节奏上限：每周 1 篇实质刷新，另加最多 1 篇经过来源审查的新稿或扩写。无证据、无差异化价值时不发布；不把上限当产量任务。编辑负责意图和可读性，技术人员核参数与边界，销售核承接产品和询盘要求，发布者人工复核预览。

下面路径均省略 `/resources/blog/` 前缀。优先级先按风险、意图重叠与业务关联暂排；获得真实查询和销售数据后再调整。

| 周 | 现有内容刷新优先项 | 并行产出 / 验收 |
| --- | --- | --- |
| 1 | `pultruded-frp-pipe-oil-and-gas`：核对结构管、流体、压力和认证边界 | 固定 52 篇清单与查询归属；保存 GSC 导出条件，核查空结果原因。 |
| 2 | `frp-pipe-for-coal-mine-gas-drainage`：核适用标准、试验和产品能力 | 补齐本篇来源与实物证据；审查下表候选 A，不直接开新稿。 |
| 3 | `frp-fire-resistance-ratings-guide`：分清测试方法、评级与成品适用范围 | 根据差距验证结果，新建或扩写 A；无独立意图则并入已有树脂/工艺指南。 |
| 4 | `frp-vs-steel-structural-profiles`：补刚度、方向、挠度和选择边界 | 第一轮滚动 28 天观察；候选 B 证据和历史页面查重。 |
| 5 | `frp-profile-cost-benchmarks-and-lead-times-2026`：核日期、假设、单位和报价边界 | 新建或扩写 B；真实成本数据不能公开时用明确标注的计算输入。 |
| 6 | `how-to-source-pultruded-frp-profiles-from-china-2026-buyers-guide`：加强 RFQ 与交付清单 | 候选 C 查重，检查与安装、荷载表及夹具页面的边界。 |
| 7 | `how-to-read-frp-grating-load-table`：核跨度方向、荷载类型和数据来源 | 新建或扩写 C；图示需要与实际产品和安装说明一致。 |
| 8 | `frp-cable-tray-specifications-advantages`：区分托盘/梯架与完整系统证据 | 运行 56 天窗口归属复盘；候选 D 评审。没有合格数据则记录缺口。 |
| 9 | `gfrp-rebar-specification-guide-aci-440-astm-d7957`：核当前版本、设计与产品验收区别 | 新建或扩写 D；避免与现有安装步骤重复。 |
| 10 | `en-iso-10077-window-u-value-calculation`：核输入、边界和报告对应 | 候选 E 资料审查；核对系统 U 值与材料导热率的区别。 |
| 11 | `qualify-chinese-fiberglass-window-profile-supplier`：增加样件与试制验收要求 | 新建或扩写 E；若意图与供应商审查重复，则扩写本篇。 |
| 12 | `frp-bridge-deck-design-guide`：补荷载、连接、案例出处和设计责任边界 | 审查候选 F；完成另一轮 28 天复盘与下一季度队列。 |

第 85–90 天：核已发布版本、来源失效、询盘质量和未完成材料；只在候选 F 已验证且审稿通过时发布，或延后。总结采用实测结果与缺失状态，不把同期变化直接归因于此次改造。

## 4. 仅在验证缺口后启用的 6 个选题 brief

启用门槛：真实查询/销售问题或明确研究证据支持；检查现有 52 篇、产品页和 pultrusion guides；确认新增交付物与现有页面不同。目标为 4–6 个合格 brief，不要求全部变成新 URL。下面的查询只是候选，不是已验证搜索需求。

| 候选主查询与读者任务 | 必需来源与资产 | 目标产品 / 意图边界 |
| --- | --- | --- |
| A. `polyester vs vinyl ester pultruded profiles`：按介质与环境选树脂 | 树脂制造商耐化学资料、当前 TDS、温度/浓度条件；原创选型表与真实样件图 | `/products/custom-pultruded-profiles`；先查工艺指南，避免另写泛泛材料优劣文。 |
| B. `pultruded FRP profile tolerances`：把尺寸、直线度和孔位写进图纸 | 适用产品标准、工厂已确认能力、量测方法；脱敏图纸和实测记录 | `/products/fiberglass-structural-shapes`；只讲验收公差，不重复 supplier 或 machining 主查询。 |
| C. `FRP grating inspection checklist`：到货与使用阶段如何识别需处理的问题 | 产品安装/维护说明、项目验收条件；真实夹具、支承、切边缺陷照片与检查表 | `/products/frp-gratings`、`/products/molded-frp-grating`；区分两类产品，不重复安装教程。 |
| D. `GFRP rebar receiving inspection checklist`：核批次、尺寸、标签与试验文件 | 当前 ASTM D7957、项目规范、供应方批次文件；脱敏报告与验收表 | `/products/frp-rebar`；聚焦到货追溯，不重复设计规格和绑扎安装。 |
| E. `fiberglass window profile sample approval`：从型材样件到试制组件确认什么 | 真实样件协议、量测与配合记录、加工说明、适用整窗测试资料；剖面图和样件实拍 | `/products/window-door-profiles`；型材通过样件检查不能等同整窗认证。 |
| F. `FRP cable tray expansion joint spacing`：热位移需要哪些设计输入 | 系统制造商安装说明、适用 IEC/NEMA 文件、实测/验证热膨胀资料；伸缩连接示意图 | `/applications/frp-cable-tray-supports`，相关 `/products/fiberglass-structural-shapes/frp-channel`；不在无完整系统证据时给通用间距。 |

每个 brief 保存：目标读者、主查询与补充词、既有主归属、独特问题、计划图表、可核验来源及访问日期、目标产品、审稿人和发布条件。竞争对手文章可作为题材线索，不能作为 F1 能力或性能证据。

## 5. 数据复盘与业务验收

- 每周检查收录、抓取、链接和真实询盘反馈；每 28 天比较相邻、已完整结算的 28 天区间，保持 property、web 类型、国家、设备与筛选条件一致。
- 按主题、页面及 query × country × device 分别看展示、点击、CTR 和排名；CTR 用总点击 / 总展示，排名按展示加权。低展示、小样本或国家/设备占比变化必须保留说明。
- 按现有 [query-review.md](./query-review.md) 使用 `npm run seo:query-review -- --input /absolute/private/path/gsc-query-page-daily.csv --output /absolute/private/path/query-review.json --as-of YYYY-MM-DD`。输入必须是真实 `query,page,country,device,date` 联合日数据。
- 工具比较相邻 previous/current 两个 56 天窗口，并记录主展示页切换；不能把各 GSC 标签页拼成联合数据，也不能把缺行补为 0。遵守工具的 missing / partial / insufficient 规则。
- 询盘另记数量、可关联落地页、产品、规格完整度和销售判定的 qualified / quotable；只有真实归因记录才能连接搜索与询盘。点击增长不自动等于合格询盘增长。
- 获取可用基线前，验收是映射完整、页面可发现、内容可核验、承接路径可用。后续增长目标需基于可比较基线，由业务与 SEO 共同设定。
- 真实查询导出和询盘记录保存在受控位置，不提交至 Git，不嵌入公开页面。本手册和关键词地图不含个人询盘数据。

## 6. 每次发布的人工检查清单

- [ ] 意图：一个主查询；明确主题、既有主页面和目标产品；无近义重复、无无依据年份包装。
- [ ] Metadata：title、description、单一 H1 与正文相符；canonical、分享图、面包屑和结构化数据匹配实际可见内容。
- [ ] 内容：先回答核心问题；术语一致；单位、表头、假设、方向、边界与例子清楚；法规和标准版本回源核对。
- [ ] 来源：关键主张有对应原始证据，链接可打开，记录发布日期/版本/访问日期；转载、供应商典型值和实测数据分清。
- [ ] 时间与身份：published / updated 真实；只有实质内容修订才改更新时间；作者、审核者和资历有事实依据。
- [ ] 视觉：优先使用获授权实物照片、原始图纸和自制工程图；标注示意或图库图；不得将生成图片表现为 F1 实际测试或项目证据。
- [ ] 链接：主题页可到文章，正文可到相关指南/产品，推荐阅读与当前问题相关；锚文本具体，不机械堆关键词；无失效来源或站内链接。
- [ ] 可读性：移动端目录、表格、图片、长标题与询盘入口可用；摘要表达结论及条件，正文不靠问答重复凑字数。
- [ ] 盘点：运行 `npm run seo:blog-audit` 与 `npm run seo:blog-map`，审查地图变更及未解决项；结构检查不能代替上述人工核查。
- [ ] 交付：相关文件单独提交，经 PR 与 Preview 人工检查；合并/上线前 lint、build、必需检查通过。发布后核 canonical domain，记录 Git SHA 和 Vercel deployment ID。

本手册规定后续人工工作流程；它本身不触发抓取服务、消息发送、自动化、外部发布或生产部署。
