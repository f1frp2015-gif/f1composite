# 设计手册审核与 Rev. B 修订（2026-10-01）

审核对象：`FRP Profile Design Manual`，DOC-PF-2026-EN Rev. A（2026-04，24 页，2026-09 撤下）。对照基准：f1composite.com 当前的数据文件（`lib/catalog/en13706.ts`、`lib/catalog/seed.ts`、`lib/catalog/standardProfiles.ts`、`lib/frpDesignBasis.ts`、`lib/spanTables.ts`、`content/data/company.ts`、`content/data/engineeringEvidence.ts`、`lib/applicationPages.ts` 等）和 `WEBSITE.md` 的内容与事实规则。产出：Rev. B（`public/downloads/f1composite-frp-profile-design-manual-2026-rev-b.pdf`，47 页），由 `scripts/build-design-manual.mjs` 从站内数据生成。

## 一、方法

- Rev. A 的全文从 PDF 提取后，按七个视角逐条核对：材料与树脂、截面几何与性能、挠度表、耐久（化学、防火、紫外、寿命）、商务与联系信息、标准引用、应用与措辞。截面性能用站内截面引擎（`lib/catalog/shapes.ts`）重算；挠度表用 δ = PL³/(48EI) 和 5wL⁴/(384EI) 按手册自己印的 I 和 E = 23 GPa 复算。
- 共得 196 条原始发现（严重 54、主要 97、次要 45）。对抗性复核阶段只完成了 13 条（会话额度在复核中途用尽），其余发现未经第二人复核，下文按原始发现整理，数值类发现均可用引擎复算。
- Rev. B 不是在 Rev. A 上修改，而是重新从站内数据生成：手册里每个数值都来自网站同一份数据，`scripts/design-manual.test.mjs` 把 114 个规格、层合板数值、跨度表、设计基础和公司事实逐一对回数据文件。

## 二、Rev. A 的主要问题

| # | 范围 | Rev. A 写法 | 问题 | 站内依据 |
|---|---|---|---|---|
| 1 | 标准树脂 | 八处写 "supplied as standard in Epoxy resin (FL-P22 formulation)"，第 4、5 节又写 "thermosetting polyester / Fibreglass Reinforced Polyester" | 标准层合板是间苯型不饱和聚酯；环氧只按项目供应；"FL-P22" 在站内任何数据里都不存在；手册自相矛盾 | `en13706.ts` E23_ISO_PUBLISHED.resin；`seed.ts` E23-ISO 与 EP-E23 |
| 2 | 材料数据 | 玻纤 60%、ILSS 25 MPa、"full-section tensile modulus averaging 30 GPa"、"tested ≈ 30 GPa" | 公布值为玻纤 65–70%（重量比）、ILSS 30 MPa；站内只有两份 SGS 方管全截面报告（40.8 / 41.5 GPa，仅限样品，内部参考），没有 30 GPa 的证据；E23 由全截面弯曲模量定义，不是拉伸模量 | `en13706.ts`；`e40Evidence.ts` |
| 3 | 标准引用 | ILSS 方法 "EN ISO 1430"；等级引 "BS EN 13706-2" | 短梁法为 EN ISO 14130；E17/E23 要求在 EN 13706-3:2002 表 1 | — |
| 4 | 截面规格 | 15 个英制尺寸（角钢 50/76/102/152、方管 50/64/76/101、槽钢 100/203/254 和 "box channel"、Ø50×6 圆管、顶扶手 71×60×4.5、宽翼缘 152/203/305） | 其中 13 个不在目录里（目录 114 个规格）；圆棒和扁条两个族完全缺失；顶扶手、box channel、踢脚板不是标准型材 | `standardProfiles.ts` |
| 5 | 截面性能 | 角钢 50×50×6.35 MOI 49,900 mm⁴；76×76×9.5 258,382；102×102×12.7 832,120；152×152×12.7 1,856,039 | 引擎按形心轴算得 137,567 / 724,775 / 2,343,900 / 8,218,608 mm⁴，差 2.8–4.4 倍；角钢挠度表反推的 I 与引擎一致，说明表旁印的 MOI 是另一套数 | `shapes.ts` 重算 |
| 6 | 质量 | 每个 Mass = Area × 2.05 g/cm³；305×305×12.7 写 23.18 kg/m | 公布密度 1.9；该尺寸目录公布 16.0 kg/m（差 45%）；顶扶手 2,004 mm² 对 1.42 kg/m 相当于 0.71 g/cm³，物理上不可能 | `standardProfiles.ts` |
| 7 | 挠度表 | 简支梁中点挠度，L/200、"L/100 用于临时结构"，点荷载经 200×200 mm 板施加 | 没有强度、稳定、连接校核，没有 φ、λ、环境系数和剪切变形；站内公布的设计基础是 LRFD（ASCE/SEI 74-23 φ 0.65、λ 0.8、γ 1.6、室外 0.85）、L/250、含 Timoshenko 剪切修正；200×200 板是 EN ISO 14122-2 格栅工况，不是梁工况；"L/100" 无出处 | `frpDesignBasis.ts`、`spanTables.ts` |
| 8 | 耐化学 | 55 行"环氧 FL-P22"最高使用温度表（含 Avtag/Avtur 航空燃油、硫酸 70% 40–45 °C、次氯酸钠 60 °C、多项 100–120 °C） | 站内没有 F1 的耐化学数据，只有四个明确标注来源的供应商筛查示例；表格数值属于间苯聚酯特征却标为环氧；100–120 °C 高于间苯聚酯 HDT 80–110 °C；缺暴露方式、时长、应力 | `pultrudedPerformance.ts` |
| 9 | 防火 | "Fire Rated — BS 476 Part 7 Class 2 standard, Class 1 on request"；分级表含 "B fl s1"、Type 40/100 平台 39/58 min 绝热、"Aluminium Deck & Cladding A2 fl s1"；"All standard profiles are tested" | 标准聚酯不阻燃、无防火等级；站内唯一防火报告是 E-TS-AB 材料 10.1 mm 的 UL 94 V-0（内部参考）；"fl" 是 EN 13501-1 地板分级下标；F1 不卖铝板也没有 Type 40/100 平台；BS 476-7 已于 2025-03 退出英格兰 Approved Document B | `seed.ts` FIRE_*；`pvFrameEvidence.ts` |
| 10 | 寿命与维护 | "Design life 60 years"、"25-year warranty"、"maintenance free / virtually maintenance-free"、"low-intervention operation across 60 years" | 站内已撤回通用寿命和免维护说法，无质保条款；`check-copy.mjs` 拦截 | `commercialFacts.serviceLife` |
| 11 | 紫外 | "ISO 4892-2 Xenon Arc 5,000 hrs — Passed" | 没有任何耐候报告；站内列为待委托的 ASTM G154 5,000 h 项目；ISO 4892-2 是暴露方法，没有合格判据 | `technical-data/page.tsx` plannedTests |
| 12 | 公司与联系 | "F1 Composites Co., Ltd."、f1frp2015@gmail.com、Doris.li@f1composite.com、"operates one of the most comprehensive pultrusion lines in the region"、"standard stock colour RAL 7043" | 法定名称 Chongqing F1 Composites Co., Ltd.；公开邮箱 inquiry@f1composite.com；F1 是风渡的出口公司，产能是 5 个基地、370 条线、15 万吨；目录规格不是库存；颜色为灰、安全黄或 RAL（约 200 m 起） | `company.ts` |
| 13 | 应用 | rail refuge platforms、embankment staircases、trestles、Type 40 平台等 | 站内没有这些应用；站内 8 个应用指南（电缆桥架、电力横担、冷却塔、桥面板、光伏支架、化工平台等）手册一个都没提 | `applicationPages.ts` |
| 14 | 来源 | Avtag/Avtur、road-traffic film cleaners、FFP3、BS 476-7/-20/-21、psi、"in the region" | 整体是英国通道系统供应商目录的改写 | — |

次要发现 45 条：英式拼写（fibre、colour、aluminium、kickplate）、破折号密度、虚构的 F1-ANG-050 等型号体系、角钢"典型跨度"列只是表格最后一列、"WFB 305 远低于 L/200" 与自身表格矛盾等。

## 三、站内发现并已修正的问题

审核同时发现站内自身的几处不一致，本次一并修正：

| 文件 | 问题 | 修正 |
|---|---|---|
| `lib/catalog/en13706.ts`、`app/datasheets/[slug]/page.tsx`、`lib/pdf/datasheet.tsx` | 销承压强度方法写成 "EN 13706-2 Annex D"（Annex D 是全截面弯曲模量，Annex E 才是销承压） | 改为 Annex E，三处同步 |
| `app/pultruded-frp-profiles/page.tsx` | 等级表把全截面模量方法写成 EN ISO 14125、ISO 14130 写成面内剪切、E17 的 ILSS 25 MPa / 密度 1.9 / 玻纤 60–65% 与 seed（15 MPa / 1.8 / 55–60%）不符；交期 FAQ 手写"stock … 3–6 weeks for die"，与 `supplyTerms`（模具 4–8 周）不符 | 方法改为 EN 13706-2 Annex D 和短梁 ILSS；E17 值对齐 seed；交期和起订量 FAQ 改为读 `supplyTerms`，不再写 "stock" |
| `app/what-is-frp/page.tsx` FAQ | "Standard polyester FRP is self-extinguishing (UL 94 V-0)" 与目录"标准聚酯不阻燃"矛盾 | 改为按配方说明，分级来自所报配方的检测报告 |
| `content/data/blogPosts.ts` | 桥面板文"Design life is 75–100 years with zero corrosion maintenance"（绕过了 `75+` 的拦截规则）；防火文"F1's Class 1 ratings" 把等级写成已持有 | 改为项目规范用语和按配方出报告 |
| `content/data/faq-100.md`（未被引用） | "Standard polyester FRP achieves Class 1 … BS 476" | 改正 |
| `lib/frpDesignBasis.ts` | 各国规范表和荷载工况表只在计算方法页里 | 提升为 `MARKET_CODES`、`BEAM_LOAD_CASES` 导出，方法页和手册共用 |
| `lib/catalog/seed.ts` | 树脂配方表为模块私有 | 导出 `SEED_FORMULATIONS`，手册的树脂表直接读取 |

## 四、Rev. B 的内容

47 页，九个章节：公司与产品线（供货条款、定尺长度、颜色与公差）；材料（E23 公布值与 EN 13706-3 E23/E17 最小值并列、SGS 全截面报告及其范围、七种树脂配方、热/电参考值）；设计基础（各国规范、φ/λ/环境系数、荷载工况与剪切修正、挠度限值、工字梁算例、柱屈曲算例、连接与热胀）；截面表（114 个规格，公布单重 + 名义截面性能，带尺寸的截面图）；许用均布荷载表（65 个规格 × 8 个跨度，与网站跨度表同一代码）；应用与系统（选型矩阵、7 个应用指南、护栏与爬梯目录数据、各国护栏荷载）；耐久（按树脂配方说明化学、防火、紫外、温度、电气，列出已有证据和待做试验）；加工、安装、维护、安全数据；订购与文件、联系方式。

每个数值带状态标签：Published（F1 公布）、EN minimum、Typical（行业典型值，待 F1 实测）、Reference（有出处的外部参考）、Calculated（名义截面或公式）、Test report（指定报告及范围）。不写设计寿命、质保和免维护。

### 复核与校验

- `node scripts/build-design-manual.mjs` 检查每页无溢出、PDF 页数等于生成页数；算例结果与跨度表格子交叉核对（偏差 > 2% 即报错）。
- `npm test`（含 `scripts/design-manual.test.mjs`）、`npm run lint`、`npm run check:copy`、`npm run check:sitemap`、`npm run build`、`npm run check:owner-links` 全部通过。
- Rev. B 的多视角审阅（数值溯源、工程、标准、文案规则、版面、内部一致性）结果见第六节。

## 五、留给业主的事项

| 事项 | 说明 |
|---|---|
| 公布单重与密度 | 目录公布单重除以名义截面积得到的"隐含密度"为 1.35–2.0 g/cm³（中位数 1.56），低于公布的 1.9 g/cm³，例如 I 305×305×12.7：11,298 mm² 对 16.0 kg/m → 1.42；I 76×38×6.4 → 1.35。手册按规则只印公布单重并注明"名义截面为直角、等壁厚，生产截面有圆角，单重以公布值为准"。请核对公布单重来源（实测、供应商目录或估算），必要时修正 `standardProfiles.ts`，重新生成手册即可 |
| 护栏立柱 | 50×50×6.4 方管立柱按 OSHA 200 lb 在 1,067 mm 高度、ASCE 系数筛查利用率超过 100%（见 2026-09-26 审查）；手册如实写明需整体试验或项目设计。建议准备整体加载试验报告 |
| 爬梯净宽 | 目录外宽 500 mm、梯梁 50.8 mm 时净宽约 398 mm，低于 OSHA 406 mm 和 EN ISO 14122-4 400 mm；手册写明按图纸确认 |
| 耐化学、耐候、防火数据 | 手册只印四个标注来源的筛查示例和一份 UL 94 V-0 材料报告；2,000 h 浸泡、5,000 h 紫外、EN 45545-2 / ASTM E84 项目完成后，把报告登记到 `engineeringEvidence.ts`，重新生成手册 |
| 螺栓连接承载力 | ASCE/SEI 74-23 第 8 章和 CEN/TS 19101 的几何要求与公式未能用正版核实，手册只给边距经验值和销承压最小值，不列螺栓群承载力表（同 2026-09-28 审查） |
| Rev. A 旧文件 | 已从仓库删除，旧网址 301 跳转到 Rev. B；如有外发文件，请以 Rev. B 替换 |

## 六、Rev. B 审阅结果

（审阅工作流完成后补充。）
