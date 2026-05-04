# F1 Composite 网站总览

> 最后更新: 2026-03-29

---

## 基本信息

| 项目 | 详情 |
|------|------|
| 网站地址 | https://f1composite.com |
| 备用地址 | https://www.f1composite.com |
| Vercel 地址 | https://f1composite.vercel.app |
| 技术栈 | Next.js 16.2.1 + Turbopack + Tailwind CSS v4 + Framer Motion |
| 部署平台 | Vercel (team: f1composite) |
| 代码路径 | `/Users/ori/Projects/f1composite` |
| 域名 DNS | 阿里云万网 (A → 76.76.21.21, CNAME www → cname.vercel-dns.com) |
| 页面总数 | 27 个路由页面 |

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
│   ├── /quality-testing           质量检测 — ISO 9001 / EN 13706 / ASTM
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
│   └── /downloads                 下载中心 — 6个文件 (PDF/CAD, 待上传实际文件)
│
├── /about                         关于我们 — 使命/愿景/故事/里程碑/认证/全球覆盖
├── /contact                       联系方式 — 表单 + 公司信息 (电话地址待更新)
├── /robots.txt                    SEO robots
├── /sitemap.xml                   SEO sitemap
└── /llms.txt                      LLM 元数据
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

## 待办事项

| 优先级 | 事项 | 状态 |
|--------|------|------|
| 高 | 联系方式页面填入真实电话和地址 | 待更新 |
| 高 | 下载中心上传6个实际文件 (产品目录/证书/CAD等) | 待上传 |
| 高 | Google Search Console + GA4 配置 | 待配置 |
| 中 | 补充3个案例内容 (化工厂/门窗住宅/太阳能) | 待补充 |
| 中 | 替换 public/images/ 中的 .docx 占位文件为实际图片 | 待替换 |
| 中 | 添加 Product/FAQ/Article Schema 结构化数据 | 待开发 |
| 中 | 每页独立 OG 图片 (1200x630) | 待制作 |
| 低 | Git 仓库推送到 GitHub (当前仅本地) | 待确认 |
| 低 | Phase 1: FRP 选型 AI 助手上线 | 待启动 |
