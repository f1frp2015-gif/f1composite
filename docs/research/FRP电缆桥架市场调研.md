---
type: customer-research
topic: FRP电缆桥架与支撑系统页面对标
biz: f1composite
version: v1.2
last_updated: 2026-09-21
maintainer: F1 Composite
update-cadence: on-event
sensitivity: 内部
changelog:
  - "v1.2 (2026-09-21): 按用户新增 Sai Seeya 与 Eaton 供应商参考，将 tray 与 ladder 合并为一个双产品页面，重做灰色拉挤材质产品图，增加独立参数与询盘入口。"
  - "v1.1 (2026-09-21): 根据用户反馈恢复可辨认的纵向玻纤与拉挤纹理，减弱金属反光；以现有 FRP 角材为参考，替换两张图片并更换文件名避免旧图缓存。"
  - "v1.0 (2026-09-21): 复核全球五家系统厂商资料，完成应用页面方案、选型内容、询盘清单与应用图；按用户反馈微调材料真实性。"
related:
  - "frp-cable-tray-trunking-ladder-sources.md"
  - "frp-cable-tray-trunking-ladder-article.md"
---

# FRP电缆桥架市场调研

> [!info] 整合声明
> 本文件整合本次官网对标、页面定位、证据边界和视觉决策，作为长期维护记录。既有博客研究保留为不同交付物的关联资料。后续更新追加 changelog，不新建日期文件。

> [!abstract] 目的
> 为 `/applications/frp-cable-tray-supports` 建立面向全球 EPC、工程师和采购的英文应用与选型页。重点是帮助用户定义系统、确认支撑和连接、提交可比询盘。厂商样本按公开技术资料完整度选择，不声称获得全球销售额或市场份额排名。

## 1. 结论与定位

旧页主要介绍槽钢、角钢等支架型材，图片也是宽泛的水处理场景。对“FRP cable tray / fiberglass cable ladder”的访客而言，缺少类型选择、配件、安装限制和验收证据，不能支持完整的采购判断。

五家国际系统厂商的共同方法是把直段、弯通、连接、支架和技术资料放在一起。页面应由“材料优点”转为“项目如何选型”：先说明系统类别，再说明环境、荷载、配件与证据，最后形成清晰的询盘范围。

F1 当前可直接支撑的表述是拉挤型材及约定加工件供应。完整桥架系统的供货、配件和测试报告需逐项目确认。不能将同行的跨距数据、认证或应用项目移植为 F1 的能力或业绩。

## 2. 国际厂商对标

| 厂商 / 资料 | 已核实页面做法 | 可借鉴内容 | F1 实施方式 |
| --- | --- | --- | --- |
| Eaton / B-Line，美国体系、全球供应 | 选型目录把荷载、树脂、横档间距、宽度与长度对应到产品；有连接板、弯通等配件 | 让客户按设计条件选型，而非仅按外形采购 | 类型表、树脂条件、几何和荷载输入；不复制 Eaton 额定值 |
| Enduro / Creative Composites Group，美国 | 区分桥架、梯架、线槽、玻纤支撑槽钢；提供规格、目录与案例入口 | 以系统组成和技术文档支持询盘 | 明确供货边界，补配件清单与可下载 RFQ |
| Øglænd System，挪威 | FOE 页面并列产品零件、兼容系统、荷载数据和测试条件 | 荷载必须连同支撑配置、接头和端跨条件说明 | 增加完整传力路径与“读懂荷载表”说明 |
| Mita / Wibe Group，英国与欧洲 | 产品系列配安装手册；说明接头位置、固定夹、扭矩和人员使用限制 | 安装要求应进入选型和订单，而非交货后再补 | 订单前、安装中、交付后三阶段指南 |
| Niedax Ebo Systems，欧洲 | 区分压制与拉挤 GRP 槽道、桥架、支撑和轨交系列 | 制造工艺和用途不能全部合并成一个“FRP”概念 | 类型与适用范围分开描述，不默认槽式结构都由同一工艺生产 |

上述是网页与公开资料的观察，不是对质量、价格、排名或认证有效性的独立审计。

## 3. 页面内容决策

1. 保留网址，标题覆盖 cable trays、ladders、supports；避免破坏现有博客和导航内链。
2. 顶部用真实比例的应用示意图展示桥架本体、横档、电缆及支撑关系。
3. 区分开放梯架、通风/冲孔托盘、实底/带盖托盘、封闭线槽，说明每类选型条件。
4. 场景覆盖水处理、化工、海岸/海工和电力/隧道；每类提供要询问的环境条件。
5. 拆解墙装、吊装和落地支撑，以及弯通、拼接、伸缩、盖板、固定夹和 cable cleats。
6. 对比树脂和 FRP/镀锌钢/不锈钢/铝的使用条件，不宣称全场景更便宜或寿命固定。
7. 荷载从电缆经过横档、侧梁、支架传到锚固；区分材料强度、挠度、长期荷载和连接承载。
8. 单独列标准适用范围与需要提交的证据。
9. 提供安装和检查内容、8 个 FAQ、预填询盘和纯文本清单。
10. 保留资料出处，避免把同行认证、案例图片当成 F1 自有资产。

## 4. 关键技术证据与边界

| 主题 | 核实结果 / 页面表达 | 来源 |
| --- | --- | --- |
| 系统标准 | IEC 61537 针对电缆托盘/梯架，公开 scope 排除 trunking/ducting；不引用未购买条文 | [IEC 61537:2023](https://webstore.iec.ch/en/publication/31963) |
| 北美非金属桥架 | UL 568 属相关评价路径；项目要求认证时，应核验准确型号和记录 | [UL Mechanical Support](https://www.ul.com/services/mechanical-support-and-assembly-services) |
| 历史标准 | CTI 明确 NEMA FG 1 已于 2017 年 11 月撤销，旧目录仍可能保留分级 | [CTI Codes and Standards](https://www.cabletrays.org/codes-and-standards/) |
| 荷载配置 | FOE 表下注明 IEC 试验条件：端跨为支撑间距的 3/4，端跨无接头；仅示范读表方法，不作为 F1 设计规定 | [Øglænd FOE](https://www.oglaend-system.com/products/cableladders/foe/) |
| 火性能 | ASTM E84 是表面燃烧试验，不等于结构耐火或电路完整性 | [ASTM E84](https://store.astm.org/e0084-24.html) |
| 电缆固定 | Cleats 和短路电动力不是托盘重力荷载试验的自动覆盖范围 | [IEC 61914:2021](https://webstore.iec.ch/en/publication/64504) |
| 拉挤件 | EN 13706 和 ASTM D3917 在页面中作为型材层面的要求/尺寸公差入口；不声称替代整套桥架试验 | [BSI EN 13706](https://landingpage.bsigroup.com/LandingPage/Series?UPI=BS+EN+13706)、[ASTM D3917-23](https://store.astm.org/d3917-23.html) 公开范围，未引用付费标准具体条款 |
| 安装 | 采用所供系统说明书；托盘/梯架不能作为人员步道或攀爬梯 | [Mita Flex 安装指南](https://wibe-group.com/storage/F64D7FB7D1BD9F1508EDB6BF414E0695504492403D9B917B803B2D5A34E42BF6/5d542bd1a3634fa085951e197d189cc2/pdf/media/3a3a9d7f7bae48a596a25149080d862a/MitaFlex_Installation_Guidelines.pdf) |

树脂、材料比较和 RFQ 条目是根据资料形成的编辑综合，不能替代针对供应牌号的工程设计。页面没有发布 F1 未经证实的载荷、尺寸系列、使用寿命、节省百分比或系统认证。

## 5. 主要资料入口

- [Eaton B-Line cable tray catalogue](https://www.eaton.com/content/dam/eaton/products/support-systems/cable-management/cable-tray-management-catalog.pdf)：本次检索读取官方目录选型摘要；直接 PDF 读取可能受站点限制。
- [Eaton fiberglass cable channel](https://www.eaton.com/us/en-us/catalog/support-systems/fiberglass-cable-channel-tray.html)
- [CCG / Enduro electrical cable management](https://www.creativecompositesgroup.com/industries-products/electrical-cable-management)
- [Øglænd FOE](https://www.oglaend-system.com/products/cableladders/foe/)
- [Mita / Wibe Group](https://wibe-group.com/brand/mita?page=1)
- [Niedax Group / Ebo](https://www.niedax-group.com/en/products-solutions/)
- [Fibrolux GRP cable ladders](https://fibrolux.com/en/products/grp-profiles/cable-support-systems/cable-ladders.html)：仅用来观察真实成品外观。

## 6. 图片方案与用户修正

两张图片均用内置 image_gen 生成，页面显示 AI-generated application concept，不作为交付项目或施工图。

- `public/images/applications/frp-cable-ladder-water-treatment-pultruded-texture.webp`：滨海水处理路线全景。
- `public/images/applications/frp-cable-tray-wall-support-pultruded-texture.webp`：墙装支撑与连接近景。

用户反馈初版细节过于 AI、材质需要接近实际产品。修订以真实 Fibrolux 安装照片作材料观察参考：平滑树脂富集表面、较弱纵向痕迹、无夸张玻纤丝和金属拉丝感、合理壁厚与拼接。外部照片仅作参考，不复制或发布其原图。

参考原图：[Fibrolux 官方安装图](https://fibrolux.com/fileadmin/user_upload/GFK_Systeme/kabeltragsysteme/KL_leiter_3.png)。另检查了仓库内槽钢和角钢图片。完整生成与修订提示词见本目录 `frp-cable-tray-image-prompts.md`。

## 7. 验收记录

完成后记录构建、布局、图片加载、锚点、询盘预填、下载和 Git 状态。

- 本地 production build 通过，目标路由静态生成；lint 无错误，仅保留既有 `SectionViewer3D.tsx` hook dependency warning。
- sitemap 检查通过；复用 FAQ 和产品询盘相关 6 项测试通过。
- 浏览器检查桌面 1280px、移动端 390px：单个 H1、无页面横向溢出、全部目录锚点存在、两张图正常加载。
- 检查 FAQ 展开和询盘跳转：产品名称、应用路径、技术消息正确传递；没有提交测试询盘。
- RFQ 下载使用本地静态 `.txt` 文件；图片为 WebP，主图 1672×941 / 138,446 bytes，节点图 1536×1024 / 86,620 bytes。
- 两张修订图均使用真实安装照片作材质参考；概念图仍需与最终供货几何区别，不能作为施工细节。
- 从新获取的 `origin/main` 建立 `codex/frp-cable-tray-guide`。`main` 已由另一工作树占用，因此不切换或修改该工作树；当前任务直接基于远程生产分支。

### v1.1 图片验收

用户认为上一版纹理不足、过于像金属。本次以内置 image_gen 编辑，参考仓库实际 FRP 角材图，恢复沿各型材轴向的玻纤束和模具痕迹，降低镜面反光，保持原构图。两张图片使用新文件名避免 CDN/浏览器旧图缓存。WebP quality 88：主图 1672×941 / 205,424 bytes，节点图 1536×1024 / 151,172 bytes。完整提示词已追加到图片记录。


## 8. v1.2：两类产品整合与供应商实物参考

用户要求 FRP cable tray 与 cable ladder 同页展示。保留现有 URL，以「FRP Cable Trays & Cable Ladders」为标题、导航和询盘主线；顶部并列产品图，下设两类产品独立锚点与询盘参数，支架和配件作为共同系统内容。

| 供应商参考 | 核实到的做法 | 对本页的应用 |
| --- | --- | --- |
| [Eaton fiberglass cable ladder and cable channel tray](https://www.eaton.com/us/en-us/catalog/support-systems/fiberglass-cable-channel-tray.html) | 同页分开 ladder 与 channel，分别组织直段、弯通、连接板和盖板；描述富树脂表面 veil、机械固定与粘接横档；channel 区分 ventilated / non-ventilated | 采用同页双产品结构，槽式强调底板，梯式强调侧梁和横档，附件共同列清单。Eaton 树脂代码、规格、承载值和认证不移植为 F1 参数 |
| [Sai Seeya ladder-type FRP cable trays](https://www.frpcabletrays.com/ladder-type-frp-cable-trays.html) | 灰色槽形侧梁、规则横档、简单连接；照片显示克制的树脂表面，而非金色金属反光 | 用实物照片作几何和材质参考生成原创梯式图；说明 ladder-type cable tray 与 cable ladder 的术语关系 |
| [Sai Seeya perforated cable trays](https://www.frpcabletrays.com/perforated-cable-trays.html) | 连续槽形底板，与开放横档结构明确区分；配套路线与安装内容 | 槽式产品图使用灰色开孔底板；参数增加底板类型、开孔、壁厚、盖板，不虚构标准尺寸 |

frpcabletrays.com 页脚主体为 Sai Seeya Composite Pvt. Ltd.，部分图片替代文本与旧目录保留 Sharda 名称。本次按页面当前主体标注来源，不将其当作两家独立同行。Eaton 文本已读取；其原图下载超时，未作为生成工具输入。

### 图片与内容决策

- 两张新图为内置 image_gen 生成的产品示意图。仅以供应商照片观察形态，不把供应商原图发布成 F1 项目照片。
- 灰色、低光泽富树脂表面，弱纵向拉挤痕迹，切口可见复材厚度。去除早期过强金属感以及后续夸张粗糙纹理。
- 两类产品使用相同角度和光线，便于比较连续底板与开放横档。移除本页原有大型应用图和支架细节图，避免两类产品被泛场景遮蔽；旧资源保留为历史版本。
- 页面说明产品图为生成示意，孔型和连接需按所供型号确认。
- 槽式询盘独立收集底板/开孔；梯式询盘独立收集横档间距；公共清单区分横档间距、成品长度与支架跨距。
- 尚无已验证的 F1 整套系统规格与认证目录，因此完整供货范围和测试资料仍需在报价中确认。

### 本次验证

- lint 无错误，仍有既有 SectionViewer3D hook dependency warning。
- 图片 1536×1024，槽式 63,360 bytes、梯式 63,094 bytes。完整提示词保存于 `frp-cable-tray-image-prompts.md`。
- production build 通过；导航 4 项与询盘 3 项现有测试通过，git diff --check 通过。
- 浏览器验证 1280px / 390px 无页面横向溢出，单个 H1，全部页内锚点存在，两张图加载成功。分别实际点击 tray 与 ladder CTA，询盘产品名及差异化参数正确，无提交测试询盘。
