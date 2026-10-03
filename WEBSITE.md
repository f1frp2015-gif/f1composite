# F1 Composite 网站总览

> 最后更新: 2026-10-03（新上线应用页与产品页审核）

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
| `/tools/thermal-expansion-calculator` | "FRP thermal expansion calculator" | 伸缩缝、与钢/混凝土/玻璃的差异变形 |
| `/tools/handrail-load-calculator` | "FRP handrail load calculator" / "guardrail load OSHA IBC" | 护栏立柱与扶手校核，锚栓反力 |
| `/tools/access-geometry-checker` | "ladder stair walkway requirements checker" | OSHA 1910 / EN ISO 14122 / AS 1657 / IBC 尺寸校核 |
| `/tools/gfrp-rebar-calculator` | "GFRP rebar size conversion" / "ACI 440.11 design strength" | 钢筋规格对照、ACI 440.11 设计值 |
| `/tools/frp-column-calculator` | "FRP column buckling calculator" / "pultruded column capacity" | 整体屈曲、翼缘/腹板/管壁局部屈曲、压碎，最轻可用目录规格 |
| `/tools/frp-cut-list-optimizer` | "FRP cut list optimizer" / "profile stock length nesting" | 按 5.8/6/11.8/12 m 定尺排料，下料图、余料、重量、CSV |
| `/tools/frp-unit-converter` | "MPa to ksi" / "GPa to Msi" / "kg/m to lb/ft" | 公英制换算，英制型材尺寸对应最近的公制目录规格 |
| `/tools/frp-life-cycle-cost-calculator` | "FRP vs steel life cycle cost" / "galvanized steel maintenance cost" | ISO 15686-5 现值法，镀锌寿命按 ISO 9223 / ISO 1461 估算 |

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
| `/resources/evidence` | "FRP test reports" / 证据库索引 |
| `/resources/evidence/[slug]` | 报告编号长尾："Intertek 240821010SHF-001"、"SGS GZMR260702529004" 等：持证方、机构核验方式、文件 SHA-256 |

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
- **标准版次**：页面写的标准版次以发布机构或标准商店的当前记录为准。审核时先检索核实，不得凭记忆把较新的版次改回旧版；2026-10-03 审核中 IEC 60112:2025、ASTM B987-25、F711-26、F2503-26、ISO 10993-1:2025 等都被审核代理误判为不存在。已撤销的标准不得引用（如 ASTM D4435、D4436，2022 年撤销）。审核记录见 `docs/audits/2026-10-03-applications-products-review.md`。
- **专业指南**（`content/data/pultrusion*Guides.ts`）：页内导航由 section id 生成，缩写自动大写（MR、OEM、GFRP、CFRP、FRP），id 写成可读的 `x-and-y` 形式；改了指南后运行 `npm run guides:index` 并提交 `pultrusionGuideIndex.ts`。同一路由的链接文字全站统一（定制型材页写 “Custom pultruded profiles”，行业页写行业名）。全站用美式拼写和 “agree on X”。
- **检测报告数据**：证据页（`/resources/evidence`）的结果表来自 `content/data/engineeringEvidence.ts` 的 `reportedResults`；光伏边框和 UL 94 报告的数据在 `content/data/pvFrameEvidence.ts`，光伏页和证据库共用。TÜV Rheinland 和 Intertek 报告限制摘录复制，结果表只写报告结论，不新增测量值摘录（测试检查）。
- **报告核验页与原件**：每份第三方报告/证书在 `/resources/evidence/[slug]` 有核验页，数据在 `content/data/reportVerification.ts`（持证方、报告号、机构印在报告上的核验方式，全部照原文）。实验室原件必须原样发布，不加水印、不改字节：多份带数字签名，Intertek 和无锡检测院写明涂改无效；`scripts/evidence-protection.test.mjs` 锁定原件哈希。F1 的英文注释副本可以加注，用 `scripts/stamp-annotated-reports.py` 在右侧注释栏底部写持证方和核验网址。核验页的 SHA-256 和文件大小在构建时从 `public/` 读取。
- **价格与目录接口**：`/api/profile-price` 只接受本站页面的请求（`lib/browserRequest.ts` 同源校验），每个 IP 5 分钟 90 次、每天 400 次；`/api/catalog` 每个 IP 10 分钟 30 次。限流计数在单个实例内存中（`lib/rateLimit.ts`），要全局生效需换 Upstash 或 Vercel KV。
- **图片使用条款**：`/terms#image-use` 说明自有照片的版权和授权方式，是照片元数据里的权利说明网址，改动锚点时同步改 `ownedPhotos.ts`（测试检查）。
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


## 工具的设计基础（2026-09-26 审查，2026-09-28 第二轮）

- **共享设计基础**：`lib/frpDesignBasis.ts` 集中了材料数据（EN 13706 E17/E23 最小值、各国钢材和铝材）、设计方法系数、环境折减（强度和刚度）和 ASCE 时间效应系数 λ。型材计算器、跨度表和护栏校核都从这里取值，改系数只改这一个文件；`scripts/engineering-tools.test.mjs` 会检查关键数值。
- **法规数值**：各工具只写入核对过的规范数值，并在界面上标明条款。2026-09-28 起，英国 BS 6180 / NA.8 的工业类荷载、加拿大 NBC 4.1.5.14、AS 1657:2018 和 AS/NZS 1170.1 表 3.3 的办公和作业区荷载改为预设。这些数值只核对到二手资料（B 级），所以备注里写明“请按正版核对”。其他类别仍由用户按条款输入。AS 1657 的爬梯护笼高度各资料说法不一，只作提示，不判定合格与否。审查记录见 `docs/audits/2026-09-26-tools-standards-audit.md` 和 `docs/audits/2026-09-28-tools-round-2.md`。
- **柱屈曲**（`lib/frpColumn.ts`）：只用可推导的力学公式，包括 Engesser 剪切修正的欧拉屈曲、简支正交异性板局部屈曲（下限值）和压碎。ASCE/SEI 74-23 的受压 φ 未能核实，所以各破坏模式一律取受弯 φ，结果偏安全。槽钢和角钢会发生弯扭屈曲，不在筛查范围内。局部与整体屈曲接近时给出交互提示。
- **成本与单位**：全寿命成本工具的所有费用都由用户输入，默认值以钢材安装费 = 100 为指数，结果如实显示钢材在 C2/C3 环境更便宜。单位换算用精确定义和 NIST SP 811 系数。
- **菜单**：主菜单链接总数上限 76（测试检查）。热膨胀、GFRP 筋材、柱屈曲、下料、单位换算和全寿命成本这六个工具只放在 `/tools` 和相关产品页，没有进主菜单。

## 站内搜索、型材筛选器、导航和文件库（2026-09 阶段 2）

**业务层级（2026-10-02 业主确认）**：设备、模具和原材料是 Know-How & Services 下的技术转移/生产支持配套，不作为主要产品业务。入口放在 `/technology/knowhow-services#sourcing`；不得在产品总目录、首页产品线或全局导航中作为独立业务并列展示。保留 `/sourcing/*` 地址，其面包屑、页面标签和搜索标签归属 Know-How。
- **供应商图片（2026-10-02 业主确认）**：FRPZS/河南众晟是 F1 供应商之一，获业主明确要求在必要位置使用其产品图。按业主最新要求，公开页面只使用 `Supplier image` 通用标识，caption/alt 不出现 FRPZS 名称，保持 Know-How 配套归属，不冒充 F1 工厂/项目照片；源页面、原图 URL、SHA-256 和原始尺寸保存在 `docs/frpzs-image-sources.json`；优先选择供应商已公开的无署名原图，不修去水印。

- **Know-How 交付支持**：现有 `/sourcing/*` 页面通过 `content/data/knowhowSupport.ts` 补充配置、预成型/工装与验收章节；不另建主要业务入口。`lib/knowhowInquiry.ts` 和 `KnowHowProjectBrief` 将目标、模块和工厂背景带入现有 Contact 表单。配套页可用 `?module=preforming#project-brief` 等有效模块参数预选；模板位于 `public/downloads/knowhow-*.txt`。FAT/SAT 与最终产品资格验证分开说明，周期、IP 和支持责任按项目确认。


- **搜索索引**：`lib/search/buildIndex.ts` 在构建时生成 `/search-index.json`，包含 114 个目录规格（公布单重、按名义截面计算的 Ix 或 A、规格书和 DXF 链接）、全部静态页、博客、应用页、案例、术语、作者和文件库。页面标题和描述写在各页面文件里，由 `scripts/search-pages.mjs` 读出，存进 `lib/search/pages.generated.json`。改了页面标题或描述、或新增页面后，运行 `npm run search:pages` 并提交这个文件，否则 `npm test` 会失败。
- **查询规则**（`lib/search/query.ts`）：认得 100x100、100 × 100 × 8 mm、I152、rod Ø25 这类写法，矩形管两边顺序可以颠倒；没有精确尺寸时列出最接近的规格（壁厚权重低于外形尺寸）；E23、D7957 这类代号整体匹配。这个文件在浏览器里运行，不能用正则后行断言（旧版 Safari 会让整段脚本报错），测试会检查。
- **入口**：导航栏搜索框、Ctrl/⌘ K 或 "/"、手机页头的放大镜和手机菜单顶部；完整结果页 `/search` 设为 noindex。GA4 事件：选中结果记 `search`（带 search_term），零结果记 `search_no_results`。零结果词可作为补充规格和内容的依据。
- **型材筛选器** `/tools/profile-finder`：数据来自 `lib/profileFinder.ts`，与规格书同源。可按形状、尺寸、单重上限和 Ix 下限筛选，最多勾选 4 个并排对比，询价链接带上所选型号。筛选状态写在网址参数里，可以直接分享；所有参数组合共用一个 canonical。目录里没有逐个规格的树脂和等级数据，所以没有这两个筛选项。
- **导航**：`content/data/navigation.ts` 分产品、行业、工具、资源、公司五个栏目，网址都没有变。产品菜单右侧的快捷入口（筛选器、规格书、下载、检测报告）放在 `productShortcuts`，它们必须同时出现在其他菜单里，`scripts/navigation-ia.test.mjs` 会检查。页脚五列与五个栏目对应。
- **文件库**：`lib/documents.ts` 组装下载页的文件，并按类型、出具机构、产品分类，下载页可按这三项筛选。新增检测报告或证书时，先登记到 `content/data/engineeringEvidence.ts`（结果和日期登记到 `reportedResults`），出具方、日期和适用产品会自动显示。

## 产品页模板（2026-09 阶段 3）

7 个标准型材页（工字梁、槽钢、角钢、方矩管、圆管、圆棒、扁条）用同一套骨架，顺序固定：

1. **页头**：产品线标签、一句话结论、4 项关键数据、询价和"Find a size"按钮、更新日期；右侧是截面图版和两张小图（渲染图或工厂照片）。手机上图版排在按钮之后，首屏就能看到询价按钮。
2. **吸顶页内导航**（`components/products/ProductPageNav.tsx`）：概览、规格、性能、应用、文件、常见问题、询价，滚动时高亮当前段落。
3. **规格表**（`components/products/FamilySizeTable.tsx`）：可点表头排序；型号链接规格书，每行有 DXF 下载和单个规格的询价链接；管材在毫米值下显示近似英寸。数据来自 `lib/catalog/familySizes.ts`：数据库有目录数据时用数据库，否则用 `lib/catalog/standardProfiles.ts` 的公布目录，截面性能（A、Ix、Wx 等，按名义截面计算）和型材筛选器共用 `lib/catalog/sectionRows.ts`。
4. **性能**（`LaminateProperties`）：E23 标准层合板的关键值和测试方法、树脂选项，数值取自 `lib/catalog/en13706.ts`，和规格书、技术数据页同源。
5. **应用**（`lib/familyApplications.ts`）：自动列出推荐该型材的应用页（卡片文字就是应用页里的那句推荐），以及用到该型材的案例。卡片只写来源里写过的内容。
6. **文件**（`ProductDocuments`）：该型材的规格书和 DXF、文件库里归到该产品或标准型材的文件、按需提供的证书，卡片样式与下载页一致（`components/downloads/DocumentCard.tsx`）。
7. **常见问题**（默认折叠）、**其他型材**（`RelatedProfiles`）、**询价**（`ProductRfq`，深色底）。

格栅（总览、模压、拉挤）、GFRP 筋材和门窗（总览、型材、成窗）页面保留各自的专用内容（选型器、规格表、采购流程），只统一页头（产品线标签、关键数据、带图号的图版）、吸顶页内导航和收尾询价区。格栅三页共用 `GratingHero`，门窗两页共用 `WindowProcurementPage`，改一处即可。筋材和紧固件没有产品线名称，页头标签用 `line={{ name, mark: false }}`，不显示亮绿方块。

规则：

- **页脚询价条**：页面里有 `ProductRfq`（带 `data-page-rfq`）时，页脚的通用询价条自动隐藏（`app/globals.css`），避免两个询价区块连在一起。注意 `main:has(...) ~ footer` 这种写法会被构建丢掉，要写成 `body:has(...)`。
- **横向滚动容器**要加 `relative`：容器里的绝对定位元素（如 `sr-only` 文字）如果定位参照在容器外，会撑宽手机页面。单列网格要写 `grid-cols-1`，否则表格会把列撑出屏幕。
- **锚点偏移**：全站有 88px 的 `scroll-padding-top`，段落再加 40px（`ProductSection` 已处理），标题正好落在吸顶导航下面。
- **内链归属**：改写这些页面时，`seoQueryTargets.ts` 要求的链接必须保留（如扁条页链到玻璃钢板、圆棒页链到植物支撑杆、方管页链到爬梯和护栏系统），`npm run check:owner-links` 会检查。
- **图片**：圆棒和扁条目前没有对应的产品图（原圆棒图其实是金属角码，原扁条图是带筋板材），页头用工厂照片；拍到实物后替换 `HeroPhotos`。

### 行业页

能源、基础设施、水处理 3 个行业页共用 `components/industries/IndustryPage.tsx`，内容在 `content/data/industryPages.ts`。海洋、工业化工、交通行业页因需要逐场景展开部件、设计输入和概念图，分别在各自的 `page.tsx` 实现；`industryPages.ts` 保留这些页面的搜索标题等索引信息。建筑行业页也保留独立页面，按应用区组织产品目录和设计指南。

- **写什么**：每一句都要能在产品页、应用页、案例、`company.ts` 或证据库里找到出处。认证、使用寿命、节省比例和测试结果不对整个产品线下结论，只说"按指定配方和产品提供报告"。文件头注释写了这条规则。
- **图片**：图库照片在图版右上角标明 "Illustrative photo"，图注说明不是 F1 项目；AI 生成图和渲染图不加标注（见"封面图"一节）。交通行业页原来用的新干线图库照片换成了工厂拉挤生产线照片。待核实的三个案例（见待办事项）不放进行业页的案例卡片。
- **搜索索引**：行业页的 H1 在数据文件里，`scripts/search-pages.mjs` 从 `industryPages.ts` 读取作为搜索别名；改了 H1 或 metadata 要运行 `npm run search:pages`。
- **内链归属**：`seoQueryTargets.ts` 要求行业页保留的链接（如能源页链到风电叶片板、工业页链到声屏障、爬梯和格栅对比页、基础设施页链到桥面板、梁桥指南和筋材对比页、建筑页链到成窗和筋材对比页）写在数据文件的产品、案例或延伸阅读里。

### 案例页

9 个数据驱动的案例（`app/case-studies/[slug]/page.tsx`）用同一套页头、章节导航（挑战、F1 供货、结果、产品、文件、类似项目询价）和带图号的图版。每个案例的 `summary` 是页头下的一句话，只能复述正文里已有的内容。图版右上角写明照片来源：Project photo 或 Illustrative photo，建筑效果图不加标注；三个待核实案例（见待办事项）的图库照片标为 Illustrative photo，alt 文字描述画面本身，不再写成项目实景。文件区用下载页同款卡片，文件在文件库里时沿用库里的类型、签发方和大小。

梁桥指南页（`/case-studies/beam-bridge`）保留自己的版式，配色已改成品牌色：强调色、链接和按钮用 teal-text / teal，深色区块用品牌海军蓝，浅蓝底色改成中性冷灰，图中的构件由钢蓝改为青灰（与建筑概念图里"青绿色 = FRP 构件"一致）。以后不要再往 `beam-bridge.css` 里加蓝色。

### 首页

顺序：页头（搜索框、按截面找型材的 7 个图标入口和规格总数、工厂照片）→ 产能数字 → 产品族卡片 → 定制型材 → 行业入口 → 项目 → 生产与质检 → 工具与资料。手机上截面入口排在照片前面，首屏就有搜索和产品。

- **产品族卡片**（`components/sections/ProductFamilyCards.tsx`，首页和 /products/product-lines 共用）以截面图标开头，不再用灰色渲染图；卡片上的数字（规格数、截面族数、新模具周期、首单起订量、门窗系列、筋材直径、螺杆规格）都从目录和数据文件计算，不要手写。
- **项目卡片**只用有项目实拍或自己绘图的内容（工厂楼梯、重庆屋顶光伏、梁桥指南），卡片数据在 `lib/familyApplications.ts`，行业页共用。
- 各段标题不再加"— PRODUCTS"这类小标签；编号只用于真实步骤（定制流程、质检环节）。


## 页面模板与细节规则（2026-09 阶段 4）

阶段 4 把其余页面（行业指南、应用页、技术文章、资源指南、博客、工具、地区页、公司页、规格书、法律页）都移到同一套组件上。新页面从这些组件开始搭，不要再手写页头和段落间距。

- **页头**（`PageHeader`）：`tag` 写页面类型（Tools、Company、Legal、Datasheet、Author、Case studies 等），标题用句子大小写；`facts` 最多 4 项，带 `figure` 时最多 3 项，否则数值会在窄栏里折行；`updated` 与 JSON-LD 的 `dateModified` 用同一个常量。
- **段落**（`PageSection`）：页头下第一段为白底，之后白底和浅灰底（`muted`）交替；深蓝底只留给收尾询价区（`InnerCTA`、`ProductRfq`），页面中间不再放深蓝卡片。列表类段落用 `count` 标数量。长页面加 `PageNav`，回到第一段上方时自动滚回起点。
- **工具页**：页头 → `PageNav` → `ToolSection`（工作面板，白底、无标题，只有 `aria-label`）→ 说明段落 → 常见问题 → `RelatedLinks` → `InnerCTA`。面板样式：`rounded-card border border-border-default bg-bg2 p-[20px]`；输入框 `rounded-control border … bg-white px-[12px] py-[8px] text-f14`，获焦 `border-teal`；标签 `font-mono text-f12 uppercase tracking-[0.06em] text-t3`；结果块 `rounded-control bg-white p-[12px]`，重点结果加 `border-teal-border bg-teal-bg`。工具里不用深蓝底。
- **工程助手**（`/ask`，`components/chat/ChatPanel.tsx` 的 `fullPage`）：空状态显示页面自己的起始问题；开始对话后面板撑到窗口高度并滚入视野；第一条回答前不抢焦点（避免把读页头的访客拉到输入框）；用户气泡用 `bg-teal-text`（白字对比度 5.2:1）；输入框 16px（iOS 不缩放）、随内容增高，回车发送时忽略输入法组字；外框用 `overflow-clip` 而不是 `overflow-hidden`，否则 `scrollIntoView` 的 `scroll-margin` 失效。
- **标题大小写**：H1、段落标题和按钮一律用句子大小写；专有名词（Passive House、公司名、地名）和缩写保留大写。`lib/typography.ts` 的 `holdDash` 在页头、段落标题和常见问题里把 "U-value""I-beam""E-glass" 这类字母连字词包成不换行（DM Sans 没有不换行连字符），并让带空格的破折号跟在前一个词后面。
- **表格**：外框 `relative overflow-x-auto rounded-card border border-border-default bg-white`；表头行 `border-b bg-bg2`，单元格 `px-[14px] py-[8px]`；行首用 `th scope="row"`；数值列右对齐加 `tabular-nums`；末行 `last:border-b-0`。
- **记号与单位**：U 值按 EN ISO 10077-1 写下标（U<sub>w</sub>、U<sub>f</sub>、Ψ<sub>g</sub>，线传热系数用大写 Ψ），单位写 W/m²·K、W/m·K。公式行用等宽字体，手机上只在除号处换行。门窗框、玻璃、间隔条和各国 U 值目标集中在 `lib/windowUValueData.ts`。
- **拼写和标点**：美式拼写（color、meter、aluminum）；新文件的破折号密度控制在每千词 6 个以下（`npm run check:copy` 提示）。

### 封面图

- **规则**：卡片显示它所链接页面自己的主图；产品显示产品本身。封面登记在 `lib/covers.ts` 的各个注册表（产品、行业、应用、工具、案例、技术、地区、资源），卡片用 `coverFor(href)` 取图，`CoverCard` 负责版式。案例总览、首页资源区、作者页文章、案例页的"Products used"、建筑行业页的补充部件都已改用封面卡。
- **图片来源标签**：照片的 `note` 写来源：Project photo、Production photo、Supplier photo、Reference photo、Catalog photo，图库照片写 Illustrative photo；图纸写图纸状态（默认 Schematic · not to scale，或 Concept drawing、Manual drawing 等）。博客文章封面若是文章自己的数据表或证书（自带标题），`coverNote` 留空，否则角标会盖住文件抬头。
- **AI 生成图和渲染图不加提示**（2026-09-28 起）：角标、图注和 alt 都不写 "AI concept"、"AI-generated"、"Rendering"、"Visualization"、"Concept …" 之类的字样，只描述画面和设计要求（如"最终构件和连接按项目设计确定"）。文字也不能把这类图说成 F1 的项目、工厂或实拍照片。`Figure` 的照片图版（`bleed`）不传 `note` 就没有角标；产品视图等非照片图版用 `note={null}`，否则会显示默认的 Schematic。带生成工具水印的图片不要上线，也不要裁掉或修掉水印，换一张图。`scripts/covers.test.mjs` 会检查这些字样。
- **公司与生产照片**：只用集团自己的照片，说明写"FengDu 工厂"；图库照片不能代表 F1 的工厂或项目。集团自有照片登记在 `content/data/ownedPhotos.ts`，放在 `/images/f1-photos/`，带右下角 "© f1composite.com" 水印和 XMP/EXIF 版权信息（`node scripts/mark-owned-photos.mjs` 生成，位置规则在 `lib/photoMark.ts`，保证各种裁切下水印不会只露半截）。图库、供应商、目录和来源有争议的照片不进这个清单。
- **更换图片内容时换文件名**：Next 的图片优化按网址缓存，覆盖同名文件后开发环境和线上都可能继续显示旧图。
- **测试**：`scripts/covers.test.mjs` 检查每个注册封面的文件都存在、alt 文字完整、`coverFor` 取到的是它；52 篇博客的封面各不相同，也不与任何卡片封面重复；图片标注里没有 AI 生成或渲染的字样。
- **概念图**：`components/sections/ConceptAnimations.tsx` 的动画图在页面里用 `bare` 属性放进带编号的 `Figure`，标题和图号由图版提供。

### 各类页面

- **地区页**：7 个市场页和总览页共用地区模板，页头图从 `regionCovers` 读取，总览卡片和页头因此是同一张图、同一个标签。
- **公司页**：`/about` 用集团自己的生产照片、竖向里程碑和"文件与覆盖范围"段；`/contact` 页头列回复时效、语言和工作时间，表单区带 `data-page-rfq`，页脚通用询价条不再出现在询价页本身。
- **作者页**：没有照片，用姓名首字母的圆形标记，不用彩色底标签；作者页的文章用博客同款封面卡，按发表日期从新到旧。
- **规格书**：总览页按截面族分组，每组配截面图（`SectionSvg`），公布单重按小数点对齐、保留原精度；详情页用 `PageSection`，页头列型号、EN 13706 等级、公布单重和截面积。句中出现族名用 `familyInSentence()`，不要直接 `toLowerCase()`（曾把 "I-Beams" 变成 "i-beams"）。
- **案例总览**：卡片标题用短名，结构化数据保留案例页的完整标题；图片来自 `caseStudyCovers`，梁桥卡片用页面 Figure 01 的分解图。
- **报价与成本数字**：模具费写在 `company.ts` 的 `supplyTerms.dieCostUsd`，用 `usdRange()` 输出，不在页面里另写一套区间。

---

## 设计手册（2026-10）

`public/downloads/f1composite-frp-profile-design-manual-2026-rev-b.pdf`（DOC-PF-2026-EN Rev. B，46 页）不是手工编辑的文件，由 `scripts/build-design-manual.mjs` 生成：`npm run build:manual` 把站内数据渲染成 HTML（DM Sans / DM Mono、站内配色、同一截面引擎画的带尺寸截面图），再用无头 Chromium 打印成 A4 PDF，并检查每一页都没有溢出、PDF 页数等于生成的页数。

- **数据来源**：层合板数值和试验方法 `lib/catalog/en13706.ts`；树脂体系 `lib/catalog/seed.ts` 的 `SEED_FORMULATIONS`；114 个规格和公布单重 `lib/catalog/standardProfiles.ts`，截面性能由 `lib/catalog/sectionRows.ts` 按名义截面计算；许用荷载表 `lib/spanTables.ts`；设计基础（φ、λ、环境系数、各国规范、荷载工况）`lib/frpDesignBasis.ts`；柱屈曲算例 `lib/frpColumn.ts`；公司事实和供货条款 `content/data/company.ts`；应用指南 `lib/applicationPages.ts`；护栏、爬梯目录数据和护栏荷载 `content/data/frpHandrailSpecs.ts`、`frpLadderSpecs.ts`、`lib/guardrailLoads.ts`；证据 `content/data/engineeringEvidence.ts`、`e40Evidence.ts`、`pvFrameEvidence.ts`；参考性能值 `content/data/pultrudedPerformance.ts`。改了这些数据就重新生成并提交 PDF；不要在脚本里手填数字。
- **文档编号**：`MANUAL` 常量（编号、修订号、发布月份、文件名）在脚本顶部；改版时换修订号和文件名，旧网址在 `next.config.ts` 加 301。
- **数值标注**：手册里每个数值带状态标签：Published（F1 公布值）、EN minimum（EN 13706-3 表 1 最小值）、Typical（行业典型值，待 F1 实测）、Reference（有出处的外部参考值）、Calculated（按名义截面或公式计算）、Test report（指定报告的结果及范围）。不写设计寿命、质保、"免维护"；防火和耐化学按树脂配方说明并注明证据状态。
- **测试**：`scripts/design-manual.test.mjs`（在 `npm test` 里）用无浏览器模式生成 HTML，核对 114 个规格和单重、E23 数值和试验方法（销承压为 EN 13706-2 Annex E）、跨度表数值、设计基础、公司事实，并检查已撤回的说法没有回流，以及已发布的 PDF 页数与生成页数一致、文件已登记到证据库和下载列表。
- **发布记录**：2026-10-02 合并 PR #145（squash 提交 `f814823`）后由 Vercel 自动发布生产，GitHub deployment 6803085103，部署地址 `f1composite-hnw92wwrm-ori-project-workspace.vercel.app`。云会话的网络策略拦截 `f1composite.com`，正式域名上的三项核验（Rev. B 文件可下载、旧网址 301、下载页/设计指南/What is FRP/证据库链接）由业主在浏览器完成。
- **Rev. A 的问题**（2026-10 审核）：标准树脂写成环氧"FL-P22"（目录是间苯聚酯）；"免维护 / 60 年设计寿命 / 25 年质保"；BS 476 防火表含铝制品和 Type 40/100 平台；无出处的环氧耐化学表；ILSS 方法写成"EN ISO 1430"；只有 5 个英制尺寸且截面性能和挠度表不可复现；联系邮箱为私人邮箱。审核记录见 `docs/audits/2026-10-01-design-manual-rev-b.md`。

## 待办事项

| 优先级 | 事项 | 状态 |
|--------|------|------|
| 最高 | GitHub 仓库 `f1frp2015-gif/f1composite` 目前是公开的：整站源码、价格引擎系数和无水印原图任何人都能下载。请在 GitHub → Settings → General → Danger Zone 改为 Private，改后确认 Vercel 正常部署、Actions 用量在套餐内。说明见 `docs/audits/2026-10-02-photo-marks-and-trademark-plan.md` 第〇节 | 待操作 |
| 高 | 商标申请：先定申请人、中国基础注册、logo 文字（logo 写 "F1 COMPOSITES"，品牌是 "F1 Composite"）和产品线名，再由代理按方案提交（建议第 19、17 类，马德里指定美、欧、英、澳、加，海湾国家视预算）。方案、官费和 Formula One 冲突风险见同一文档第二节 | 待决定 |
| 中 | 照片标签冲突：`f1-composite-quality-testing-laboratory.webp` 在关于我们页标为集团实验室的 Production photo，其他页标为 Illustrative photo；`frp-passive-house-windows-canada.jpg` 封面标为 Production photo，画面是摆拍雪景窗户。请确认来源后统一标签 | 待确认 |
| 低 | 重庆屋顶光伏案例照片（`frp-chongqing-rooftop-solar-mounting-colored-steel-tile.webp`）如为 F1 自拍，可加入 `ownedPhotos.ts` 打标 | 待确认 |
| 高 | 把 116 张未引用图片移出 `public/`，之后把 `test:images` 加入 CI。2026-09-26 已先删除 `/images/hero/` 下 5 张与公司无关的图片（头灯、音频线广告等）。2026-09-28 桥面板设计文章的配图 `public/images/case-studies/frp-bridge.jpg` 右下角带生成工具的 "ai" 水印，已换成应用页的桥面板图，该文件随未引用图片一并移出 | 待确认 |
| 高 | 风渡的英文法定名称（目前 schema 只用品牌名 FengDu New Material） | 待确认 |
| 中 | 三个保留案例（european-bridge-deck / coastal-marina-walkway / water-treatment-cable-tray）的事实核实。码头案例（英国）配图仍是沙漠峡谷里的湖泊码头（标为 Illustrative photo），需换成项目实拍。水厂案例总览卡片已改用案例页的水厂航拍（Illustrative photo）；原烟囱排污图库照片 `public/images/case-studies/frp-water-treatment-cable-tray-handrail.jpg` 已无引用，可随未引用图片一并移出 | 待核实 |
| 中 | 价格对标文章（F1 vs Strongwell/CPI/Bedford）是否保留竞品报价 | 待决定 |
| 中 | 隐私政策由法务审阅 | 待审阅 |
| 高 | 在 GA4 把 `whatsapp_click`、`email_click`、`phone_click` 标为关键事件，再导入 Google Ads 作为次要转化 | 待操作 |
| 高 | 设计手册 PDF：Rev. A 已于 2026-10 由 Rev. B 取代（`f1composite-frp-profile-design-manual-2026-rev-b.pdf`，由 `npm run build:manual` 从站内数据生成，见"设计手册"一节）。旧文件已删除，旧网址 301 跳转到新文件；下载页、设计指南、拉挤型材页、What is FRP、案例页、证据库、AI 知识数据和目录 seed 的链接已恢复；`withdrawnDownloads` 清空，noindex 规则删除；技术数据页和 seed 注明 Rev. B | 已完成 |
| 高 | EPD 与绿色建材三星证书英文版把持证方写成 "F1 Composite Co., Ltd."，与 Intertek 报告上的 Fengdu New Material (Yancheng) Co., Ltd. 及法定主体不一致，需按原证书核对 | 待核实 |
| 高 | 光伏页（`/products/frp-solar-mounting-systems`）摘录了 TÜV 报告 CN24KZ3A 002/003 的强度和保持率数值，下载页也写了 Intertek 窗报告的部分结果；TÜV 报告封面写明未经检测机构许可不得摘录复制，Intertek 报告也只允许整份复制。请向两家机构确认许可，或删去这些摘录。2026-09-25 业主决定暂时保留 | 暂时保留 |
| 中 | 化学耐腐蚀选型页：需要树脂供应商授权的耐腐蚀数据或自测浸泡数据 | 待提供数据 |
| 中 | 格栅载荷/挠度表页面：需要各格栅系列的载荷表（目前只有尺寸、重量和开孔率） | 待提供数据 |
| 中 | 尺寸页收录试点（`lib/datasheetContent.ts` 中 24 个尺寸）上线 4–8 周后在 Search Console 复盘，再决定是否扩大 | 待复盘 |
| 中 | 视觉系统阶段 1 的两个默认选择待业主确认：信号色用标志渐变末端的 lime #BBDF35（备选：安全黄）；产品线沿用站内已有的 F1-STRUX / F1-GRID / F1-THERM / F1-FORM，未新起线名。改色只需改 `app/globals.css` 的 `--color-lime` | 待确认 |
| 高 | 工具中标为 B/C 级的规范数值（ASCE/SEI 74-23 的 φ 和 λ、CEN/TS 19101 的 γ_M、EN ISO 14122 尺寸、英国/加拿大/澳新护栏荷载、AS 1657、新西兰窗户 R 值、ACI 440.11 的 C_E）需用正版标准复核，清单见 `docs/audits/2026-09-26-tools-standards-audit.md` 第四节 | 待复核 |
| 高 | 采购 ASCE/SEI 74-23 和 CEN/TS 19101（或其开放获取的官方注释本），核实受压 φ、λ 表和螺栓连接条款，再决定是否做螺栓连接校核工具、是否把柱屈曲的 φ 提高到规范值。清单见 `docs/audits/2026-09-28-tools-round-2.md` | 待采购 |
| 高 | 目录公布单重按名义截面折算密度为 1.35–2.0 g/cm³（中位 1.56），与公布密度 1.9 g/cm³ 不符；设计手册 Rev. B 和规格书照印公布单重并注明。需按实际截面或过磅复核 `lib/catalog/standardProfiles.ts` 的单重或公布密度 | 待核实 |
| 中 | 设计手册待补数据：螺栓连接承载力（手册不列承压值，等 ASCE/SEI 74-23 第 8 章核实）；紫外（ISO 4892-2 / ASTM G154）、防火（按配方的 ASTM E84 / UL 94 报告）、浸泡（ASTM D543 / ISO 175）试验结果。数据进站内数据文件后 `npm run build:manual` 重新生成并提交 PDF | 待提供数据 |
| 高 | 目录护栏立柱按 OSHA 200 lb 筛查超限（50×50×6.4 方管 119%，50×5 圆管 237%），建议准备整体试验报告，并复核圆管立柱规格；目录爬梯外宽 500 mm 时净宽约 398 mm，低于 OSHA 406 mm 和 EN ISO 14122-4 400 mm，需按图纸确认 | 待决定 |
| 高 | TÜV Rheinland 报告 CN24KZ3A 002/003：报告写明"仅数字签名"，但站上的 PDF 没有内嵌签名，买家无法在 Acrobat 里核验。请向 TÜV 索取带签名的原版替换（替换后更新 `scripts/evidence-protection.test.mjs` 中的哈希），核验页现已如实说明 | 待提供文件 |
| 高 | 报告使用许可：TÜV 报告附加条款第 4 条要求客户为广告目的公开或复制须事先取得书面同意；Intertek 声明第 5 条要求在销售或广告中使用 Intertek 名称须事先书面批准。网站公开这些报告并在标题中使用机构名称，请向两家机构取得书面许可 | 待确认 |
| 中 | 核验页写明 Fengdu New Material (Yancheng) Co., Ltd.（Intertek 报告申请方）和 Chongqing Fengdu New Material Co., Ltd.（TÜV 报告委托方）属于风渡集团，请确认 | 待确认 |
| 中 | PHI 证书 2491wi03 有效期到 2026-12-31，续证后替换 PDF、`reportVerification.ts` 和测试中的哈希 | 2026-12 前 |
| 中 | 价格接口的人机验证：可在 Vercel 后台开启防火墙的机器人防护或接入 BotID，需在预览环境确认估算器仍能出价后再上线 | 待操作 |
| 中 | 锚杆供货方式：F1 拉挤杆体、螺纹和螺母托板外购组装，还是整套外购？`/products/frp-rock-bolts` 和矿山隧道应用页目前只写“采购与验证评审”，并链到实心圆棒页。确认后写明 | 待确认 |
| 低 | 汽车与轨道页引用的美国能源部轻量化页面网址为 `/cmei/` 路径（2025 年机构调整后），云端无法打开核实；打不开时改回 `/eere/vehicles/vehicle-technologies-office-lightweight-materials-cars-and-trucks` | 待核实 |
| 低 | CFRP 加固页写的 ACI CODE-440.13-24 适用范围（不含砌体、B–F 抗震类别）和 EAD 160086-01-0301 的限制（不含现场裁切、抗震加固）无法从公开渠道核实，请对照原文 | 待核实 |
| 中 | 德国和英国地区页的法规表述（GEG 2024、Future Homes Standard）需按 2026 年新情况核实更新 | 待核实 |
| 中 | 阶段 2 菜单结构按改版方案图 19 调整（产品、行业、工具、资源、公司；技术文章并入资源的知识库，质量体系和技术服务放在公司下），请确认或提出修改 | 待确认 |
