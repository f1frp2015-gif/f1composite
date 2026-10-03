# 应用图示与动画准确性审查

日期：2026-10-03。目标是让图中的构件、连接、受力、流向和运动关系与页面所讲的应用一致，并明确概念示意与实拍、工程设计、性能证明之间的边界。本文合并电气、精密应用、工艺、动画和交叉复审记录。

## 范围与产出

覆盖 25 个应用页、应用导航中的 3 个产品页，以及共享专题图的 11 个产品页；共享素材的影响范围不限于 `/applications/`。

| 范围 | 内容 |
| --- | --- |
| 12 个基础应用页 | 农业支撑、桥架支撑、电力横担、冷却塔、桥面板、光伏支架、化工平台、人行桥上部结构、滨水挡墙、矿山隧道、围栏、泳池 |
| 13 个专题应用页 | 开关设备、复合导线芯、机器人梁、MRI 支撑、除雾器、澄清池、纸浆造纸、变压器、第三轨、带电工具、混凝土加固、工业辊筒、轨道车辆内饰 |
| 应用导航的 3 个产品页 | 幕墙/遮阳、声屏障、风电叶片增强板；另检查共享动画的门窗增强型材页 |
| 共享图的 11 个产品页 | 与专题应用图共用 `pultrusionGuideArtwork` 映射；产品页与应用页同步使用修正后的图、替代文本和图注 |
| 相关动态与桥梁概念图 | `ConceptAnimations`、`FrpProcessShowcase`、`PultrusionAnimation`、`BridgeConceptDiagram`，以及引用这些组件的门窗比较、增强型材、梁计算器和工艺页面 |

共修正 18 张原生 SVG：13 张专题图、横担图，以及挡墙、矿山、围栏、泳池 4 张应用图。保留品牌配色与原有画布比例。

新增两张用于说明布置关系的栅格图，图注说明设计接口和适用边界：

- `public/images/products/fiberglass-stakes/fiberglass-tree-stakes-loose-ties-concept.webp`：树木支撑采用留有余量的绑带，避免将支撑杆画成紧束树干的构造。
- `public/images/products/facade-sunshade/frp-horizontal-louvers-concept.webp`：水平遮阳百叶的构件与布置关系。

生成提示词与素材生成过程见 [图片记录](../image-prompts/application-accuracy-2026-10-03.md)。新图不作为已交付项目或产品性能的证明。原有光伏项目照片、用户提供的桥梁参考照片及风电板材试验照片保留；不从参考照片推定 F1 供货。

## 关键技术修正

| 图示组 | 已修正的关系 |
| --- | --- |
| 电力横担与导线芯 | 横担改为端视图，三相导线彼此独立并落在各自绝缘子上；导线芯引线准确指向中心，区分芯的承拉作用与铝层的导电作用，不把某种专有层数或端接构造画成通用事实。 |
| 开关设备、变压器、第三轨、带电工具 | 分开绝缘支撑与操作连杆；变压器采用局部绕组间隔型材，标明轴向冷却通道；第三轨分清保护罩支架、承轨绝缘件和集电靴空间；工具尺寸只表示裸露绝缘段，不表示安全工作距离。 |
| 澄清池与除雾器 | 澄清池上下链路分别布置刮板，取消跨接两条链路的不可能长板；底部污泥向泥斗、上部浮渣向收集装置运动，挡渣板和溢流堰固定。除雾器显示向上气流与向下排液，后部承托梁明确标为投影，连接至壳体支承座，避免误读为封死气路的整板。 |
| 纸浆造纸、围栏、挡墙、矿山、泳池 | 补齐独立设备支座、平台/围栏锚固与基础；挡墙拉杆埋入土体并连接锚块，标明河床及入土段；矿山改为岩体—灌浆—杆体—承压板—螺母的局部剖面；泳池增强筋放在混凝土内部，显示保护层、工厂成型转角和搭接区。 |
| 机器人、MRI、加固、辊筒、车辆内饰 | 机器人梁给出固定端与工具端的连续载荷路径；MRI 改用纵剖面，支撑台进入开放孔道而非穿过外壳；加固图的荷载、支座、胶层与受拉面碳板接触正确；辊筒显示端塞、轴颈、轴承和切向进出带材；车辆内饰明确为连接车体的次结构。 |
| 桥梁概念图 | 模块桥只在首个外露端显示多腔截面，取消内部接缝处穿出相邻模块的端面；曲线桥的工艺引线落到梁体侧壁。250 mm、970 mm 等仍是页面既有概念参考几何，不是本次确认的可用截面或承载能力。 |

## 动画校核

- **传热与门窗：** 两种材料均从热侧向冷侧传热，采用相同运动周期，箭头数量/粗细仅作定性比较；不把导热率画成传播速度，不再使 GRP 内的热流凭空消失。移除“零热桥”“必然无结露”等图示保证；整窗 U 值与材料导热率分开说明。窗扇先回到关闭状态再切换开启模式，铰链位置固定，推拉窗说明不同轨道。
- **梁、拉伸与弯曲：** 梁采用接触正确的铰/滚支座，荷载随挠曲面移动；拉伸试样与夹具保持重叠和一致位移；弯曲压头在整个周期内接触试样。形变量明确夸张，不呈现为计算结果。移除未经证明的强度范围、特定标准试验外观及逐批试验/证书暗示。
- **工艺图标：** 拉挤连续出料并保持与模具连接；手糊滚轮持续接触平模；模压先接触再压缩，开模时材料不自动恢复；灌注/RTM 先前进、停留，再按下一批次重置，不反向“退胶”。
- **详细拉挤线：** 相同直径卷盘转速一致；牵引轮位于带端并与带面接触，上下接触面共同向下游运动；飞锯切割期间与型材同步，刀头抬起后回程；复材切割采用灰色粉尘而非金属火花。去掉没有来源的温度、压力、速度及公差示例值。
- **播放控制：** 共享概念动画增加键盘可操作的播放/暂停；初始静止，减少动态效果偏好不会自动开启动画。详细拉挤线保留离屏暂停，并响应减少动态效果设置。减少动态效果的静止视图隐藏瞬态切割粉尘和热流纹，避免抬起刀头时出现切割效果。

箭头、颜色、运动速度、截面比例和示意间距均不构成定量设计结果。图示不赋予电气等级、耐火等级、MR 资格、排放效率、结构容量或安全工作距离；资格认定仍需对应产品、装配及使用条件的证据。

## 核对依据与来源边界

先核对仓库现有应用文案与产品范围，再用以下一手资料核对构件功能。资料说明相关应用和物理关系存在，不将第三方的认证、专利构造或性能转移为 F1 的证明。

- [Brentwood Polychem 链条刮板系统](https://www.brentwoodindustries.com/products/water-wastewater/polychem-systems/)及[四轴收集器资料](https://www.brentwoodindustries.com/mybrentwood/download/310/)：刮板、链条、污泥及浮渣收集接口。
- [Munters DV 880](https://www.munters.com/globalassets/digizuite/6054-en-dv-880-ps-en-200408.pdf)：垂直气流、液滴聚并及重力排液。
- [DSI FASLOC](https://www.dsiunderground.com/fileadmin/downloads/dsi-schaumchemie-fasloc.pdf)：锚杆与灌浆/树脂锚固接口；[Strongwell 板桩](https://www.strongwell.com/products/sheet-piling-round-pile/)：板桩应用范围。
- [Röchling 开关设备](https://www.roechling.com/industrial/electrical-industry/switchgear)、[干式变压器](https://www.roechling.com/us/industrial/electrical-industry/transformer/dry-transformers)：绝缘支撑、操作构件及绕组间隔型材。
- [CTC Global 导线工程手册](https://ctcglobal.com/wp-content/uploads/2023/01/Engineering_Transmission_Lines_with_ACCC_Conductor.pdf)：复合芯承拉与外围铝层导电的分工；专有保护层和绞线细节不泛化。
- [L.B. Foster 第三轨罩板与支架](https://lbfoster.com/rail/rail-products/transit-products/third-rail-accessories/coverboards-and-brackets)、[Hubbell CHANCE 工具](https://www.hubbell.com/hubbellpowersystems/en/products/power-utilities/tools-dies-accessories/insulated-hand-tools/sticks/cl/560200)：构件范围与布置类型，不用于推定整机/成品合格。
- [FDA MRI 行业信息](https://www.fda.gov/radiation-emitting-products/mri-magnetic-resonance-imaging/mri-information-industry)及[MR 测试与标识指南](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/testing-and-labeling-medical-devices-safety-magnetic-resonance-mr-environment)：导电部件、感应与发热风险需要系统评估。
- [Sika CarboDur S](https://can.sika.com/en/construction/concrete-repair-protection/structural-strengtheningsystems/prf-fabrics/sika-carbodur-s.html)：混凝土、胶层与外贴增强系统的关系。
- [美国能源部整窗选购指南](https://www.energy.gov/cmei/femp/purchasing-energy-efficient-residential-windows-doors-and-skylights)及[ENERGY STAR 门窗说明](https://www.energystar.gov/products/res_windows_doors_skylights)：整窗传热由多个因素决定，结露涉及表面温度与露点，节能窗也不能保证免于结露。

## 验证状态

- 已完成：18 张 SVG 修改前后 Sharp 渲染及目视检查；跨分组复审；桥梁四个变体服务端渲染及检查；动画初始/峰值状态静态渲染，以及支座、压头、夹具、铰链和飞锯接触/速度关系的代码校核。
- 整仓检查：lint 0 错误、1 条既有 SectionViewer3D hook 警告；207/207 测试通过；生产构建通过，生成 439 个页面；文案检查 0 错误、14 条既有警告。
- 页面检查：25 个应用页的手机端（390 px）和桌面端单 H1、无页面横向溢出，首图完成加载。异步图片加载完成后复核了 7 个栅格主图。18 个 SVG 页面均提供原尺寸入口，目录缩略图使用 contain，保留标注。
- 浏览器控制：热流、增强芯、梁挠度、三工艺图的播放与暂停按钮切换正常；热流截图确认两个材料均向冷侧运动，暂停后箭头停在图内；整线 CSS 实际状态依次为 paused → running → paused。共享动画在没有播放前保持静止。
- 减少动态效果响应、峰值接触及飞锯同步关系经代码/静态几何复核；没有将这些复核夸大为完整设备仿真或跨浏览器认证。
- Git PR、Preview 与最终生产提交和部署 ID 记录在本任务交付及 PR 描述中；本文在提交前记录本地验收，不预先宣称生产已上线。
