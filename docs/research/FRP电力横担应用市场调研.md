---
type: customer-research
topic: FRP电力横担应用
biz: f1composite
version: v1.0
last_updated: 2026-09-28
maintainer: F1 Composite
update-cadence: on-event
changelog:
  - "v1.0 (2026-09-28): 基于指定供应商、国际同行技术资料和 ASTM 标准建立应用页面内容依据。"
sensitivity: 内部
tags:
  - type/research
  - biz/f1composite
  - topic/frp-crossarm
related: []
---

> [!NOTE] 目的与整合声明
> 本文件是 FRP 电力横担应用的单一维护版调研记录（v1.0）。用途是支持 F1 英文应用页面、销售询盘和工程边界审查；受众为销售与产品团队。后续更新请追加 `changelog`，不要新建日期前缀文件。

## § 0 结论

1. 页面主场景定为 **overhead distribution crossarms（架空配电横担）**。输电 H-frame 可在 FAQ 指出需单独设计，不能把大型输电业绩移植到 F1 的通用型材。
2. 商品形态应从杆上**总成**描述：横担本体、孔位、绝缘子、中心安装件、斜撑、金属硬件和杆体的荷载路径。ASTM D8019 直接针对带中心支架的完整横担测试，而非单根无孔梁。
3. F1 的公开供货边界写成“拉挤型材及经确认的切割、钻孔构件；完整硬件、测试和工程范围以报价为准”。未获取 F1 横担专用型录或试验报告前，不发布 F1 电压等级、载荷、寿命或认证数值。
4. 工程询盘最小输入：utility drawing、tangent/angle/dead-end 类型、线路与绝缘子布置、设计荷载、限挠度、孔位、材料/表面与电气测试要求、数量和目的地。

## § 1 场景与同行证据

| 来源 | 核实的产品/应用信息 | 对 F1 页面启示 |
| --- | --- | --- |
| [Income Pultrusion · FRP Crossarm](https://incomepultrusion.com/frp-crossarm/) | 页面列出 11 kV 与 33 kV 横担/顶帽示例及方形箱型截面、长度和孔位；也介绍横担支撑架空导线。 | 可据此组织几何与孔位询盘字段；示例尺寸仅属于该供应商，不作为 F1 规格。 |
| [Wagners CFT · Composite Crossarms](https://www.wagnerscft.com/solutions/utility-infrastructure/crossarms/) 与[技术指南](https://www.wagnerscft.com/app/uploads/2024/05/crossarm-technical-information-guide.pdf) | 覆盖配电替换、海岸环境、杆上安装；技术指南区分型材、树脂/表面、压溃衬件、端盖、钻孔、机械/电气/环境试验。 | 页面应把“构件 + 接头 + 耐候 + 检验资料”放在同一工作流，并要求现场加孔另行批准。同行配方、设计寿命和性能数字不可转用于 F1。 |
| [PUPI / GEOTEK · Distribution mounts and braces](https://pupi.com/distribution/mounts-and-braces/) | 区分 tangent 与 dead-end 中心安装件，说明斜撑和金属附件是独立构件。 | 明确中心安装件、斜撑与金属硬件的供货和责任边界。 |
| [PUPI / GEOTEK · Transmission products](https://pupi.com/transmission/) | 单/双横担、H-frame、davit、monopole 等输电布局独立成产品体系。 | 配电与大型输电页面不能混作同一“标准横担”。 |
| [FCI Composites · FRP Cross Arms](https://fcicomposites.com/our-products/cross-arm) | 将木/钢替换和配电、输电、杆装设备列作应用，并让客户提供电压、荷载和数量。 | 页面需强化改造场景和初始 RFQ 字段，但不照搬其“maintenance-free”等绝对描述。 |

## § 2 规范与证据矩阵

| 项目 | 可核实的标准范围 | 询盘/资格审查所需资料 |
| --- | --- | --- |
| 总成弯曲 | [ASTM D8019-23e1](https://store.astm.org/d8019-23e01.html) 测定 tangent 和 dead-end FRP 横担在中心安装件及相关硬件装配下的弯曲模量和强度；标准指出孔位、支架、紧固件和载荷方向会影响结果。 | 试样截面、跨度、孔位、支架、加载方向、失效模式及结果；不能用裸梁结果替代总成能力。 |
| 表面耐漏电起痕 | [ASTM D2303-20e1](https://store.astm.org/d2303-20e01.html) 为液体污染条件下绝缘固体的相对 tracking/erosion 试验。 | 指定表面系统的测试条件与报告；不把材料绝缘性等同于线路额定电压。 |
| 紫外与湿气 | [ASTM G154-23](https://store.astm.org/g0154-23.html) 是荧光 UV/水分暴露的操作方法，不独立规定使用寿命。 | 暴露循环、时长和暴露后性能/外观验收标准。 |
| 线路设计 | [IEEE · NESC 范围](https://standards.ieee.org/products-programs/standards-related/) 包含架空电力和通信线路的安装、运行与维护安全规则；适用版本、荷载和间隙由项目方确认。 | 业主标准图、当地规范、设计荷载组合、绝缘配合和最终批准职责。 |

## § 3 页面措辞边界

- 指定供应商页面除示例表格外，还有“50+ 年寿命”“50–70% 节省”“2026 年 45% 新输电项目采用”“Miami 事故”“FPL 引言”等大段数字和案例，未见可核查的原始试验、项目或官方报告链接。**不采用**。
- 同行专有涂层、压溃衬件、特定尺寸、扭矩和现场钻孔工序只能作为审查议题；F1 未经供货和测试确认，不作同等能力承诺。
- “非导电”是玻璃纤维复材在适合条件下的材料特性。跨相/对地间隙、污秽、金属配件、接地和带电作业仍由线路电气设计管理。页面避免“免接地”“防鸟故障”“可替代绝缘子”等绝对说法。
- 示意图仅表示典型 tangent 架构，标注不是施工图、不按比例，也不构成 F1 已交付项目照片。

## § 4 F1 内容与商务机会

- 路由：`/applications/frp-utility-crossarms`；从应用索引和能源行业页进入。
- 读者路径：应用适配 → 完整总成 → 四项设计检查 → 标准与证据 → 询盘清单 → FAQ。
- 转化目标：收集业主标准图及孔位、荷载、电气和环境要求，进而判断现有方管/矩管、定制模具、二次加工或完整总成合作范围。
- 后续收到真实 F1 横担图纸、材料清单或第三方试验报告时，再升级为具体规格或产品页，并在本文件追加来源与版本记录。
