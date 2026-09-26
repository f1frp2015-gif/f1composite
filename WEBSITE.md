# F1 Composite 网站总览

> 最后更新: 2026-09-26

---

## 基本信息

| 项目 | 详情 |
|------|------|
| 网站地址 | https://f1composite.com |
| 备用地址 | https://www.f1composite.com |
| Vercel 地址 | https://f1composite.vercel.app |
| 技术栈 | Next.js 16.2.9 (App Router) + Turbopack + Tailwind CSS v4 |
| 部署平台 | Vercel (team: f1composite) |
| 代码仓库 | GitHub `f1frp2015-gif/f1composite`（`main` = 生产，流程见 AGENTS.md） |
| 域名 DNS | 阿里云万网 (A → 76.76.21.21, CNAME www → cname.vercel-dns.com) |
| 页面总数 | 约 156 个可索引页面（以 sitemap.xml 为准） |

---

## 网站地图

```
f1composite.com
│
├── /                              首页
│   ├── Hero                       主标语 + 信任数据 (15年/200+型材/30+国家)
│   ├── Solutions Snapshot         4大产品线概览
│   ├── Value Proposition          3大核心优势 (供应链/KNOWHOW/全系统)
│   ├── Social Proof               欧洲桥面板案例展示
│   └── CTA                        行动号召
│
├── /products                      产品中心
│   ├── /standard-profiles         标准型材 — I型材/槽钢/角钢/方管/扁条/圆棒
│   │                              含规格尺寸表 + 材料性能表 + FAQ
│   ├── /custom-pultrusions        定制拉挤 — 5步流程 (询价→工程→模具→试产→量产)
│   ├── /fenestration-systems      门窗系统 — 70/80/90系列, U值0.8-1.2
│   └── /gratings                  格栅 — 模压格栅 + 拉挤格栅
│
├── /technology                    技术中心
│   ├── /pultrusion-process        拉挤工艺流程详解
│   ├── /frp-vs-traditional-materials  FRP vs 钢/铝/木/混凝土 对比
│   ├── /quality-testing           质量检测 — EN 13706 / ASTM 测试方法
│   └── /knowhow-services         KNOWHOW 技术服务/咨询
│
├── /industries                    行业应用
│   ├── /construction              建筑 — 幕墙/结构型材
│   ├── /infrastructure            基础设施 — 桥梁/栈道/市政
│   ├── /energy                    能源 — 电力/可再生能源/绝缘
│   ├── /marine                    海洋 — 码头/海上平台/船舶
│   └── /industrial                工业 — 化工厂/制造业/防腐
│
├── /case-studies                  案例中心 (5个项目)
│   ├── /european-bridge-deck      欧洲桥面板 — 荷兰, 1200m², 减重40%, 100年寿命
│   ├── /coastal-marina-walkway    海滨码头栈道 — 英国, 500m, 全生命周期省60%
│   ├── /chemical-plant-platform   化工厂平台 — (内容待补充)
│   ├── /fenestration-residential  门窗住宅项目 — (内容待补充)
│   └── /solar-farm-mounting       太阳能支架 — (内容待补充)
│
├── /resources                     资源中心
│   ├── /blog                      博客 (3篇)
│   │   ├── what-is-pultrusion                    拉挤工艺完整指南 (8min)
│   │   ├── frp-vs-steel-structural-profiles      FRP vs 钢材数据对比 (10min)
│   │   └── frp-fenestration-thermal-performance  FRP门窗隔热优势 (7min)
│   ├── /technical-data            技术数据 — 力学性能表 (ASTM标准)
│   ├── /design-guides             设计指南 — 部分在建
│   └── /downloads                 下载中心 — 目录、数据表、已公开的测试报告；证书按需提供
│
├── /about                         关于我们 — 风渡出口公司定位 / 产能 / 里程碑 / 已公开报告
├── /contact                       联系方式 — 表单 + 公司信息 (电话地址待更新)
├── /robots.txt                    SEO robots
├── /sitemap.xml                   SEO sitemap
├── /llms.txt                      LLM 索引（llmstxt.org 格式）
└── /llms-full.txt                 LLM 完整简报（与 /api/ai-context 同源）
```

---

## 内容管理 (Obsidian)

内容文件统一存放在 Obsidian:
```
~/Documents/Obsidian Vault/02-工作与商业/f1composite-海外增长/网站内容/
├── 网站架构总览.md
├── 首页/内容.md
├── 产品/
│   ├── 标准型材/内容.md     ← 6类型材完整规格
│   ├── 定制拉挤/内容.md
│   ├── 门窗系统/内容.md
│   └── 格栅/内容.md
├── 技术/
│   ├── 拉挤工艺/  FRP对比传统材料/  质量检测/  技术服务/
├── 行业/
│   ├── 建筑/  基础设施/  能源/  海洋/  工业/
├── 案例/
│   ├── 欧洲桥面板/  海滨码头栈道/  化工厂平台/  门窗住宅项目/  太阳能支架/
├── 博客/
│   ├── What is Pultrusion.md
│   ├── FRP vs Steel.md
│   └── FRP Fenestration Performance.md
├── 资源/
│   ├── 技术数据/  设计指南/  下载中心/
├── 关于我们/内容.md
├── 联系方式/内容.md
├── 图片素材/
└── SEO/配置.md
```

**更新流程:** 编辑 Obsidian 中的 `内容.md` → 告诉 Claude「更新 XX 到网站」→ 自动同步代码 → 部署

---

## 代码结构

```
/Users/ori/Projects/f1composite/
├── app/                           Next.js App Router 页面
│   ├── page.tsx                   首页 (组合5个Section组件)
│   ├── layout.tsx                 根布局 (DM Sans字体, JSON-LD, OG)
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── products/*/page.tsx        4个产品页
│   ├── technology/*/page.tsx      4个技术页
│   ├── industries/*/page.tsx      5个行业页
│   ├── case-studies/[slug]/       动态案例页 (generateStaticParams)
│   ├── resources/*/               博客/技术数据/设计指南/下载
│   ├── api/contact/route.ts       联系表单API
│   ├── robots.ts                  SEO
│   └── sitemap.ts                 SEO
│
├── components/
│   ├── layout/                    Navbar, Footer, PageHeader, Breadcrumbs
│   ├── sections/                  Hero, SolutionsSnapshot, ValueProposition, SocialProof, CTABand
│   ├── ui/                        Button, SectionTag, LinkArrow, SolutionCard, FAQ
│   ├── seo/JsonLd.tsx
│   └── ContactForm.tsx
│
├── content/data/                  集中数据文件
│   ├── products.ts                产品分类数据
│   ├── industries.ts              行业数据
│   └── navigation.ts              导航结构
│
└── public/
    ├── images/                    200+ 图片
    │   ├── hero/ (5张)
    │   ├── products/ (型材/方管/角钢/槽钢/门窗/透明渲染图)
    │   ├── technology/
    │   ├── case-studies/
    │   └── about/
    ├── brand/                     Logo + VI素材
    ├── downloads/                 (待上传实际文件)
    └── og/                        OpenGraph 图片
```

---

## URL Intent Map (防 cannibalization)

每个 URL 锁定一个主搜索意图 + 次要意图。新增页面或重写文案时对照本表，**不要让多个 URL 抢同一个 query**。

### Top of funnel (教育/研究)
| URL | 主意图 | 次要意图 | 一句话锁定 |
|---|---|---|---|
| `/` | 品牌词 "F1 Composite" + "pultruded FRP profiles manufacturer" | 全产品族首屏 | F1 Composite 是谁 + 卖什么 + 为什么选 F1 |
| `/what-is-frp` | "what is FRP" / "fiberglass reinforced polymer" | "advanced composites" | 完整教育长文，定义+材料+工艺；不卖货 |
| `/technology` | "pultrusion technology" | 技术中心入口 | 索引页：把人路由到 process / vs-materials / quality |
| `/technology/pultrusion-process` | "pultrusion process" | "how is FRP made" | 工艺流程 deep dive |
| `/technology/frp-vs-traditional-materials` | "FRP vs steel/aluminum/timber/concrete" | 材料选型 | 顶层对比 hub，分流到具体对比页 |
| `/technology/frp-vs-aluminum-windows` | "FRP vs aluminum window frames" | passive house aluminum 替代 | 窗框竞品对比 |
| `/technology/frp-vs-pvc-windows` | "FRP vs PVC window frames" | 替换 PVC 选 FRP | 窗框竞品对比 |
| `/technology/frp-vs-steel-gratings` | "FRP vs steel grating" | 化工厂格栅替代 | 格栅竞品对比 |

### Product family (按几何/品类找型材)
| URL | 主意图 | 次要意图 | 一句话锁定 |
|---|---|---|---|
| `/pultruded-frp-profiles` | "pultruded FRP profiles" / "fiberglass structural shapes manufacturer" | 全产品族 hub | 产品总入口；分流到 4 个子族 |
| `/products/standard-profiles` | "FRP I-beam / channel / angle / tube" 库存 | 工程师已知几何，找规格 | Stock catalog 性质 |
| `/products/standard-profiles/{i-beam,channel,angle,square-tube,tube,flat-bar,rod}` | 单几何长尾："FRP I-beam supplier" | 该几何的规格表 / 价格 | 7 条单几何长尾页 |
| `/products/custom-pultrusions` | "custom FRP pultrusion" / "custom fiberglass profile manufacturer" | 模具/MOQ/工艺 | 卖工程能力，不卖现货 |
| `/products/fenestration-systems` | "FRP window frames" / "pultruded fiberglass window frames" / "passive house window frame" | PHI 认证 / U 值 | 主窗框 hub |
| `/products/gratings` | "FRP grating" / "pultruded fiberglass grating" | molded vs pultruded | 格栅/deck 主页 |

### Application (按用途/结构找方案)
| URL | 主意图 | 次要意图 | 一句话锁定 |
|---|---|---|---|
| `/applications` | "FRP applications" / use-case 索引 | — | 5 张卡片导流 |
| `/applications/frp-cable-tray-supports` | "FRP cable tray support" | 变电站/隧道腐蚀环境 | 场景词锁定，不抢 industry 行业词 |
| `/applications/frp-cooling-tower-profiles` | "FRP cooling tower" | wet/chlorinated 结构 | 场景词 |
| `/applications/frp-bridge-deck-panels` | "FRP bridge deck" / "FRP deck panel" | 行人桥 / AASHTO | 场景词 |
| `/applications/frp-solar-mounting-profiles` | "FRP solar mounting" / "PV FRP" | 海岸/agri-PV | 场景词 |
| `/applications/frp-chemical-plant-platforms` | "FRP chemical plant platform" | acid splash / wastewater | 场景词 |

### Industry (按行业画像)
| URL | 主意图 | 次要意图 | 一句话锁定 |
|---|---|---|---|
| `/industries` | "FRP industries" 行业索引 | — | 6 行业卡 |
| `/industries/construction` | "FRP for construction / facade" | 建筑客户找 fenestration | **不抢** "FRP window frames"（那是 product 的） |
| `/industries/infrastructure` | "FRP for bridges/walkways" | 公共工程客户 | **不抢** "FRP bridge deck"（那是 application 的） |
| `/industries/energy` | "FRP for substation/solar" | 电力客户 | **不抢** "FRP solar mounting" / "FRP cable tray" |
| `/industries/marine` | "FRP for marine/saltwater" | 海工客户 | 锁定客户画像，不锁结构词 |
| `/industries/industrial` | "FRP for chemical/industrial" | 工业客户 | **不抢** "FRP chemical plant platform" |
| `/industries/vehicle` | "FRP for vehicle/rail/bus" | 交通客户 | 行业唯一，无 application 重叠 |

### AI surfaces (转化/工具)
| URL | 主意图 | 次要意图 |
|---|---|---|
| `/ask` | "FRP advisor" / "ask AI about FRP" | 通用 AI 入口 |
| `/ai/sourcing` | "FRP sourcing assistant" | 结构化推荐 (profile family / resin / standards / RFQ) |
| `/ai/passive-house` | "passive house FRP window selector" | 按 climate zone + U-value 选型 |
| `/technology/calculator` | "FRP profile calculator" / "FRP beam deflection" | 工程师自助 |
| `/technology/u-value-calculator` | "window U-value calculator" | EN ISO 10077-1 |

### Resources (内容营销 / 证据)
| URL | 主意图 |
|---|---|
| `/case-studies` | "FRP case studies" 索引 |
| `/case-studies/[slug]` | 项目名长尾："FRP Antarctic station passive window" 等 |
| `/resources/blog` | 博客索引 |
| `/resources/blog/[slug]` | 单文长尾：每篇锁一个独立 query |
| `/resources/technical-data` | "FRP mechanical properties" / 数据表 |
| `/resources/design-guides` | "FRP design guide" |
| `/resources/downloads` | "FRP catalog PDF" / "FRP CAD download" |

### 链接规则（在 PR review 时检查）
1. **Application page (`/applications/*`) 永远不写"who buys this"画像**——那是 industry 的工作。Application 写"用什么型材+哪种树脂+哪些标准"。
2. **Industry page (`/industries/*`) 永远不写具体的工程参数**——那是 application/product 的工作。Industry 写"这个行业的痛点 + F1 在该行业的能力"。
3. **Product page 不写竞品对比深内容**——那是 `/technology/frp-vs-*` 的工作。Product 提一句"see vs-aluminum"即可。
4. **Hub `/pultruded-frp-profiles`** 是 4 product family 的索引，不写每族的深内容；不抢任何子族的 query。
5. **`/what-is-frp`** 是教育页，**不卖货**；底部链到 `/pultruded-frp-profiles` + AI 入口即可。
6. 任何新页面上线前，把它的主 query 加入本表。如果撞到现有 URL，要么改 query 锁定，要么不上线。

### 内部链接的优先方向
```
/ → /pultruded-frp-profiles → /products/{family} → /products/{family}/{geometry}
/ → /applications → /applications/{slug}
/ → /industries → /industries/{slug}
/applications/{slug} → /products/{related family}（只链相关）
/industries/{slug} → /applications/{relevant 1-2}（行业内的典型 use case）
/products/{family} → /technology/frp-vs-{competitor}（仅一次互链，避免 cannibalization）
/case-studies/{slug} → /applications/{relevant} + /products/{relevant}（双向）
/resources/blog/{slug} → /applications + /products（按文章主题精挑）
```

---

## SEO/GEO 优化 & AI 建设

详细方案见 Obsidian: `网站内容/SEO-GEO优化与AI建设方案.md`

### 命名规则速查

| 类型 | 格式 | 示例 |
|------|------|------|
| 图片 | `[产品]-[材料]-[场景].jpg` | `frp-i-beam-wide-flange-profile-305mm.jpg` |
| PDF | `f1-composite-[类型]-[内容]-[年份].pdf` | `f1-composite-product-catalog-2024.pdf` |
| 博客slug | `[核心词]-[长尾词]` (3-7词) | `frp-vs-steel-structural-profiles` |
| Alt文本 | `[主体] [材料] [场景] [品牌]` | `"Pultruded FRP I-beam 305mm by F1 Composite"` |

### AI 建设路线图

| Phase | 功能 | 优先级 | 预估 |
|-------|------|--------|------|
| 1 | FRP 选型助手 (AI Chat) | 🔴 高 | 1-2天 |
| 2 | 型材计算器 | 🟡 中 | 3-5天 |
| 3 | 行业知识库 (RAG) | 🟢 低 | 1-2周 |

---

## 内容与事实规则（2026-09 全站体检后）

- **公司事实唯一来源**：`content/data/company.ts`（法律名称、与风渡/纤居的关系、产能、交期、回复时效、证书说明）。页面、Organization schema、llms.txt、/api/ai-context 和 AI 助手提示词都从这里读取，不要在页面里手写这些数字。
- **主体关系**：Chongqing F1 Composites Co., Ltd. 是风渡新材料的出口公司；风渡是重庆纤居新材料有限公司的母公司，负责生产。
- **证书**：ISO 9001、CE、ASTM E84、BS 476、运营商认可等一律写"按需提供"（附持证方、编号、范围）；PHI 2491wi03 是 PHI 证书，不是 PHIUS。
- **寿命与维护**：不写"50+/75+/100 年设计寿命""免维护"之类的通用承诺；有产品目录依据的具体数值（如管材系列）可以写。
- **文案检查**：`npm run check:copy`（CI 中运行）会拦截已撤回的说法，并提示破折号密度和"不是 X——而是 Y"句式。
- **内链归属**：`content/data/seoQueryTargets.ts` 为每个核心搜索词指定一个主页面，列在 `supportingUrls` 里的辅助页必须在正文里链回主页面。`npm run check:owner-links`（CI 在构建后运行）检查这一点；新增辅助页或改动相关链接时同步更新这个文件。
- **页头日期**：`PageHeader` 的 `updated` 显示 "Last updated"，必须和该页 JSON-LD 的 `dateModified` 用同一个常量（`scripts/geo-citability.test.mjs` 检查）。只有改写文案、增删内容区块时才更新日期；只加链接不算。
- **检测报告数据**：证据页（`/resources/evidence`）的结果表来自 `content/data/engineeringEvidence.ts` 的 `reportedResults`；光伏边框和 UL 94 报告的数据在 `content/data/pvFrameEvidence.ts`，光伏页和证据库共用。TÜV Rheinland 和 Intertek 报告限制摘录复制，结果表只写报告结论，不新增测量值摘录（测试检查）。
- **Cookie**：Consent Mode v2，欧洲经济区/英国/瑞士默认拒绝；横幅按欧洲时区显示，页脚"Cookie settings"可随时修改。隐私政策在 `/privacy`。
- **联系渠道与事件**：WhatsApp 号码写在 `company.ts` 的 `contact.whatsapp`，按钮统一用 `components/contact/WhatsAppButton`（产品页标题区、手机底部条、InnerCTA、联系页、页脚）。点击 WhatsApp、邮件、电话链接分别发送 GA4 事件 `whatsapp_click`、`email_click`、`phone_click`（参数 `link_location`、`page_path`）；询价成功发送 `rfq_submit_success` 和 Google Ads 转化。
- **CSP**：`next.config.ts` 的 Content-Security-Policy 已放行 Google Ads 转化和再营销请求。新增第三方脚本、像素或嵌入内容时，同时更新 CSP，否则浏览器会静默拦截。

## 设计规则（2026-09 阶段 0 技术修复、阶段 1 视觉系统）

Tailwind 遇到主题里不存在的类名不会报错，只是不生成样式。以下规则由 `scripts/theme-classes.test.mjs` 检查（`npm test`，CI 运行）。

- **字体**：`app/globals.css` 的 `--font-sans` 必须写成 `var(--font-dm-sans)`。这是 `app/layout.tsx` 里 next/font 注册的变量；直接写 `"DM Sans"` 匹配不到自托管字体，2026-09 之前全站因此一直显示系统字体。
- **字号**：只用 9 档，类名就是像素值：`text-f12`、`f14`、`f16`、`f18`、`f20`、`f24`、`f32`、`f44`、`f56`。链接和按钮文字不小于 14px。`text-f12` 不带字距，大写小标签自己加 `tracking-[0.06em]` 一类的字距。大标题可以继续用 `text-[clamp(…)]`。
- **版心**：页面级容器一律用 `site-container`（最宽 1280px，两侧 20 / 24 / 32px），导航、页头、正文和页脚因此左边缘对齐。不要再写 `mx-auto max-w-[…px] px-[…]`。嵌入式工具（`/embed` 页和 `EmbedShell`）除外。
- **颜色**：只用 `@theme` 里定义的颜色变量（`teal`、`teal-text`、`deep`、`t1`–`t3`、`bg2` 等）和 Tailwind 默认色。
- **标题**：h1–h3 默认均衡断行（`text-wrap: balance`）；标题字距不要紧于 `-0.02em`，DM Sans 再紧就会粘连。
- **信号色**：`lime`（#BBDF35，取自标志渐变的末端）只用于状态点、产品线标记和深色底上的强调，不用于白底文字（对比度 1.5:1）。浅色底上需要文字时用 `lime-ink`。`whatsapp`（#128C53）只给 WhatsApp 图标用。
- **圆角**：只有三档：`rounded-tag`（2px，标签、表格角标）、`rounded-control`（6px，按钮、输入框）、`rounded-card`（12px，卡片、面板、图片、图版），另可用 `rounded-full` 和 `rounded-none`。
- **阴影**：只有三种：`shadow-card`（卡片静止或悬停抬起）、`shadow-pop`（菜单、弹窗、浮动媒体）、`shadow-bar`（贴底的手机操作栏）。不写任意值阴影，按钮不加光晕。
- **等宽字体**：`font-mono`（DM Mono）只用于小号大写标签：图号、产品线、数据标签。数值一律用 DM Sans：DM Mono 的 0 带斜杠，100 会读成 1ØØ，和直径符号 Ø 混淆。
- **产品线标签**：`components/ui/LineTag.tsx`，沿用站内已有的线名 F1-STRUX（标准型材）、F1-GRID（格栅）、F1-THERM（门窗型材）、F1-FORM（定制拉挤）。GFRP 筋材和紧固件没有线名，首页卡片只显示等宽小标签。
- **截面图标**：`components/ui/SectionGlyph.tsx`。型材截面由 `lib/catalog/shapes.ts` 的截面引擎绘制，其余（板材、格栅、筋材、门窗、紧固件、定制）为手绘路径；统一描边粗细，浅青色填充。
- **图版**：`components/ui/Figure.tsx`，编号用 "FIG. 1"，不补零（同样因为斜杠 0）。标准型材页头的图版由 `components/datasheets/ProfileFigure.tsx` 生成：截面图、截面积 A、惯性矩 Ix（按名义截面计算）和目录单重，数值全部取自 `lib/catalog`，不要手填。
- **产品页头**：`PageHeader` 可传 `line`（产品线标签，替代 tag）、`facts`（最多 4 个关键数据）和 `figure`（图版）。标准型材页的 facts 由 `lib/profileFacts.ts` 从本页尺寸表算出，页头因此不会和下面的表格矛盾；改尺寸表后页头自动更新，但描述文字和 JSON-LD 里的尺寸范围仍需手工同步。
- **尺寸表**：规格表加 `spec-table` 类：第一列左对齐且不换行（型号不会断成两行，手机上表格横向滚动），其余列右对齐并用等宽数字（`tabular-nums`）。只在第一列之后全是数值或型号的表格上用。
- **手机底栏**：产品页滚过页头按钮后，底部固定栏只放两个操作：报价按钮和 WhatsApp 图标（`lib/mobileBar.ts` 的 `pickBarAction` 优先选指向 `/contact` 的报价链接）。其他操作留在页头。
- **WhatsApp 按钮**：品牌绿只用在图标上。按钮本身用站内样式：`solid` 为深蓝底白字，`outline` 为白底描边，悬停变青色。

`scripts/theme-classes.test.mjs` 同时检查圆角和阴影：`rounded-*` 只能是 tag / control / card / full / none，阴影只能是 card / pop / bar / none。


## 站内搜索、型材筛选器、导航和文件库（2026-09 阶段 2）

- **搜索索引**：`lib/search/buildIndex.ts` 在构建时生成 `/search-index.json`，包含 114 个目录规格（公布单重、按名义截面计算的 Ix 或 A、规格书和 DXF 链接）、全部静态页、博客、应用页、案例、术语、作者和文件库。页面标题和描述写在各页面文件里，由 `scripts/search-pages.mjs` 读出，存进 `lib/search/pages.generated.json`。改了页面标题或描述、或新增页面后，运行 `npm run search:pages` 并提交这个文件，否则 `npm test` 会失败。
- **查询规则**（`lib/search/query.ts`）：认得 100x100、100 × 100 × 8 mm、I152、rod Ø25 这类写法，矩形管两边顺序可以颠倒；没有精确尺寸时列出最接近的规格（壁厚权重低于外形尺寸）；E23、D7957 这类代号整体匹配。这个文件在浏览器里运行，不能用正则后行断言（旧版 Safari 会让整段脚本报错），测试会检查。
- **入口**：导航栏搜索框、Ctrl/⌘ K 或 "/"、手机页头的放大镜和手机菜单顶部；完整结果页 `/search` 设为 noindex。GA4 事件：选中结果记 `search`（带 search_term），零结果记 `search_no_results`。零结果词可作为补充规格和内容的依据。
- **型材筛选器** `/tools/profile-finder`：数据来自 `lib/profileFinder.ts`，与规格书同源。可按形状、尺寸、单重上限和 Ix 下限筛选，最多勾选 4 个并排对比，询价链接带上所选型号。筛选状态写在网址参数里，可以直接分享；所有参数组合共用一个 canonical。目录里没有逐个规格的树脂和等级数据，所以没有这两个筛选项。
- **导航**：`content/data/navigation.ts` 分产品、行业、工具、资源、公司五个栏目，网址都没有变。产品菜单右侧的快捷入口（筛选器、规格书、下载、检测报告）放在 `productShortcuts`，它们必须同时出现在其他菜单里，`scripts/navigation-ia.test.mjs` 会检查。页脚五列与五个栏目对应。
- **文件库**：`lib/documents.ts` 组装下载页的文件，并按类型、出具机构、产品分类，下载页可按这三项筛选。新增检测报告或证书时，先登记到 `content/data/engineeringEvidence.ts`（结果和日期登记到 `reportedResults`），出具方、日期和适用产品会自动显示。

---

## 待办事项

| 优先级 | 事项 | 状态 |
|--------|------|------|
| 高 | 把 116 张未引用图片移出 `public/`，之后把 `test:images` 加入 CI。2026-09-26 已先删除 `/images/hero/` 下 5 张与公司无关的图片（头灯、音频线广告等） | 待确认 |
| 高 | 风渡的英文法定名称（目前 schema 只用品牌名 FengDu New Material） | 待确认 |
| 中 | 三个保留案例（european-bridge-deck / coastal-marina-walkway / water-treatment-cable-tray）的事实核实。其中码头案例（英国）配图是沙漠峡谷里的湖泊码头，水厂案例（泰国）配图是烟囱排污的图库照片，需换成项目实拍，或先撤下图片 | 待核实 |
| 中 | 价格对标文章（F1 vs Strongwell/CPI/Bedford）是否保留竞品报价 | 待决定 |
| 中 | 隐私政策由法务审阅 | 待审阅 |
| 高 | 在 GA4 把 `whatsapp_click`、`email_click`、`phone_click` 标为关键事件，再导入 Google Ads 作为次要转化 | 待操作 |
| 高 | 设计手册 PDF（`f1composite-frp-profile-design-manual-2026.pdf`）需修订后再做网页版：标准树脂前后矛盾（环氧 vs 间苯聚酯，目录数据为间苯聚酯）、"免维护 / 60 年设计寿命 / 25 年质保"、防火分级表（含铝制品）、化学耐腐蚀表的来源和树脂。2026-09 起全站已撤下它的链接（下载页、设计指南、拉挤型材页、What is FRP、案例页、证据库和 AI 知识数据）；文件保留在原地址，已发出的链接仍能打开，但带 noindex。修订版请换新文件名上传，再恢复链接，并删除 `content/data/engineeringEvidence.ts` 的 `withdrawnDownloads` 条目和 `next.config.ts` 里对应的 noindex 规则；技术数据页和尺寸页仍以文字注明数据出自 DOC-PF-2026-EN Rev. A（`app/resources/technical-data/page.tsx`、`lib/catalog/seed.ts`），届时一并更新版本号 | 待修订 |
| 高 | EPD 与绿色建材三星证书英文版把持证方写成 "F1 Composite Co., Ltd."，与 Intertek 报告上的 Fengdu New Material (Yancheng) Co., Ltd. 及法定主体不一致，需按原证书核对 | 待核实 |
| 高 | 光伏页（`/products/frp-solar-mounting-systems`）摘录了 TÜV 报告 CN24KZ3A 002/003 的强度和保持率数值，下载页也写了 Intertek 窗报告的部分结果；TÜV 报告封面写明未经检测机构许可不得摘录复制，Intertek 报告也只允许整份复制。请向两家机构确认许可，或删去这些摘录。2026-09-25 业主决定暂时保留 | 暂时保留 |
| 中 | 化学耐腐蚀选型页：需要树脂供应商授权的耐腐蚀数据或自测浸泡数据 | 待提供数据 |
| 中 | 格栅载荷/挠度表页面：需要各格栅系列的载荷表（目前只有尺寸、重量和开孔率） | 待提供数据 |
| 中 | 尺寸页收录试点（`lib/datasheetContent.ts` 中 24 个尺寸）上线 4–8 周后在 Search Console 复盘，再决定是否扩大 | 待复盘 |
| 中 | 视觉系统阶段 1 的两个默认选择待业主确认：信号色用标志渐变末端的 lime #BBDF35（备选：安全黄）；产品线沿用站内已有的 F1-STRUX / F1-GRID / F1-THERM / F1-FORM，未新起线名。改色只需改 `app/globals.css` 的 `--color-lime` | 待确认 |
| 中 | 阶段 2 菜单结构按改版方案图 19 调整（产品、行业、工具、资源、公司；技术文章并入资源的知识库，质量体系和技术服务放在公司下），请确认或提出修改 | 待确认 |
