# 8 周 GEO 采购问题观测规范

本规范只建立内部测量方法和空白记录模板；没有执行 AI 云调用，没有获得 20 题的实际回答或引用数据，也没有配置后台、自动监控、schema 或 llms.txt。主代理本轮已只读查看 F1 GSC，具体采样证据保存在外部研究材料；公开代码仓库不保存客户查询、账号截图或业务表现导出。

## 1. 先固定问题和运行条件

使用 `templates/geo-questions.csv` 中 20 个英文采购问题，版本 `frp-procurement-v1`：标准/定制型材 G01–G04、工程与材料证据 G05–G08、加工与首件 G09–G12、应用供货范围 G13–G16、采购及销售交接 G17–G20。它们是**测量题目，不是新建页面清单**。每一题都能在该 CSV 查看完整固定措辞。

先登记条件组合，再从第 1 周保持至第 8 周：

- 工具和具体 surface：Google AI Overviews、Google AI Mode、ChatGPT Search、Bing/Copilot 分开。普通 Google 搜索结果不是 AI 回答，不替代 AIO 未触发记录。
- 模型：记录界面实际显示的模型和版本；未显示时填 `unknown`，不要从产品名猜模型。模型变化单独记录，必要时分组比较。
- 国家/地区与语言：记录实际已知条件，无法核实时 `unknown`；在问题中写“美国”不等于运行地点在美国。英文、中文或译文分别建 cohort，不混合比较。
- 联网状态：工具实际启用/确认的 `on`、`off` 或 `unknown`，区分 search 模式与普通对话。不能因回答有网址就推断联网成功。
- 会话与账号条件：采用新对话/无历史内容的固定方式；记录 logged-in/logged-out 和个性化条件，不保存姓名、邮箱、cookie 或令牌。不把不同会话状态默认为等价。
- 默认计划为每题每条件每周 **3 次独立新会话**，尽量在固定时间段。3 是重复测量计划，不是已完成次数；资源不足时先调整计划并留版本记录，不只选择有利结果。
- 固定 prompt 原文，不追加“请推荐 F1”或追问来补出引用。若需要品牌核验实验，建立独立题组，不能并入无品牌提示的自然发现分母。

题目、国家或时间安排改变时升级协议版本，记录原因和生效周；无法同口径的记录不强行拼成趋势。此协议为人工执行约定，不是已创建的定时任务。

## 2. 保存一条运行，而不是只保存有引用的截图

每次在 `templates/geo-runs.csv` 添加一行。表头为空白模板，不包含虚构结果。

| 字段 | 记录要求 |
|---|---|
| run_id / question_id / prompt_version | 唯一 run ID，引用固定题 ID 与版本。每次重试是独立 ID，不覆盖失败记录。 |
| week_start / repetition / planned_repetitions | 预先确定的周与重复编号；实际未执行的计划可留 `run_status=not_run`，结果字段留空。 |
| executed_at_utc | 实际时间戳，未执行留空。 |
| tool / surface / model_version | 实际工具、功能表面及模型标识；未知明确填 unknown。 |
| country / language / network_mode | 实际条件，不能猜位置/联网。 |
| session_context / account_context | 新会话、个性化条件等最少必要说明，不记账号身份。 |
| run_status | `completed`、`completed_refusal`、`no_ai_surface`、`technical_failure`、`not_run`、`incomparable`；异常必须说明原因。 |
| answer_file | 完整回答/截图的受控本地路径或内部证据链接。保留完整内容与所有来源链接，不只裁有利片段。 |
| f1_mentioned / f1_cited | 完成且可判断时用 yes/no；未执行、工具失败、不可判断留空。品牌提及和真实引用分别计数。 |
| cited_urls_json | 回答实际显示的全部来源 URL 的 JSON 数组。完成但无任何链接可记 `[]`；未执行/未能读取留空。不要把回答文字中未形成引文的品牌名当引用。 |
| verification_status | pending / checked / partial / unavailable；不能用“看起来合理”当 checked。 |
| notes | 拒答、地域不明、工具降级、回答截断、搜索未触发、模型变化或其他限制。 |

本地回答与截图可能含查询或会话信息，放到受控研究目录，不放 `public/`、Git、营销案例或下载资源。题目不引用客户图纸、客户名称或私有规格。

## 3. 每条引用分别核实

使用 `templates/geo-citations.csv`，按 run_id + citation_index 关联：记录原始 cited_url、实际 final_url、检查时间、抓取状态、发布方、支持的论断/产品范围、真实性和核验人。

- URL 存在与内容支持论断是两件事。逐条打开原始来源，确认它是否支持回答的具体内容；同域链接到首页不能自动支持某一公差或认证。
- 区分 `supported`、`partially_supported`、`unsupported`、`unverifiable`。链接不可访问可能是技术限制，记 unverifiable，不直接断言伪造。
- `identity_match` 核对是否真是目标公司/产品；`current_applicability` 核对材料、型号、厚度、试验方向、报告版本、适用地区等。厂商声明与独立证据分开记录。
- F1 引用必须实际指向 F1 官方页面/文件，且能识别。竞品引用谈到 F1 只是提及，不等于引用 F1 官网。跟踪跳转保留原始 URL，不自行把同一公司其他域名纳入白名单。
- 回答错误、夸大或没有 F1 都是有效实验结果，不能因为不好看而从分母剔除。核验只判断真实性，不改变原始回答。

## 4. 分母、缺失与 8 周比较

按 **question_id + prompt_version + tool + surface + model/version + country + language + network/session 条件** 分层；不要把 20 个题、国家、平台和联网方式混成一个“GEO 得分”。可以在固定同一题组内做汇总，但同时列逐题结果与有效分母。

每周至少报告：planned runs、attempted runs、completed answers、completed refusals、no-AI-surface、technical failures、incomparable、not run、valid-answer denominator、verified-citation denominator。计数是本地观测记录数，不能冒充用户搜索次数。

| 指标 | 分子 / 分母 | 限制 |
|---|---|---|
| F1 提及率 | 有明确 F1 相关品牌提及的完成回答 / valid-answer runs | 完成但未提及为 no；拒答若已形成可读回答也保留在有效回答分母，通常为 no。 |
| F1 引用率 | 至少有一个实际 F1 官方 URL 引文的完成回答 / valid-answer runs | 多次引用同一回答不增加 run 分子；引用其他来源谈到 F1 不算。 |
| 已核验支持率 | verdict=supported 的引用条目 / 已有明确 supported、partially_supported 或 unsupported 判断的条目 | pending/unverifiable 不纳入已核验分母，但必须单列其数量；低核验覆盖不能称“引用准确率高”。 |
| F1 来源论断支持情况 | F1 引文中 supported/partial/unsupported/unverifiable 各数量 | 不把“被引用”自动当作“被正确引用”。 |
| AIO 触发率（仅相应 surface） | 显示 AIO 的技术成功观察 / 技术成功的预定 AIO 检查 | 未触发要记录 no_ai_surface。可另外报告 F1 引用/全部技术成功检查，不能与条件于 AI 回答的引用率混用。 |

`valid-answer runs = completed + completed_refusal`，前提是实际返回可读回答、题目与条件符合预登记配置。technical_failure、not_run、incomparable 不进入回答分母；对 AIO 的 no_ai_surface 进入技术成功检查分母，但不是 AI 回答分母。记录失败率，禁止用不断重试到有 F1 的方式挑选样本。

没有有效分母时率为 **missing/null**，不是 0%。有有效回答且确无 F1 时才是实测 0%。题目/条件改变、只跑一部分题或缺周时，展示缺口，不填趋势线、不年化。第 8 周对比固定同口径题组，公布实际重复次数及失败/核验覆盖；3 次重复样本很小，不能宣称统计显著或因果提升。

GEO 引文观测、GSC 展示、网站 referral 点击、成功 RFQ、qualified 与 quotable 应分开记录。除非有真实关联证据，不能将 AI 回答提及当作引荐访问，不能把 direct/unknown 猜成 AI，也不能由引用率推算销售额。

## 5. GSC：先核验真实设置与继承

[Google Search generative AI control](https://support.google.com/webmasters/answer/16908024?hl=en) 官方说明该控制自 2026-08-31 全球推出。Settings → Search generative AI 有 Include、Exclude、Inherit；默认不等于 F1 当前已核实状态。后台仅查看，不自动改变：

- [ ] 记录只读核验时间、操作者和准确 property（域名或 URL-prefix），不公开账号身份。
- [ ] 查看域名属性，以及与 canonical host 对应的 URL-prefix 属性；记录显示选项与实际生效值。
- [ ] 如果 Inherit，确认最近的人工配置父属性；检查子属性是否覆盖父设置。www、apex、http/https 的 URL-prefix 范围不可混淆。
- [ ] 记录 Include/Exclude/继承状态的证据。无法访问时填 missing/unverified，不能根据 robots.txt、默认值或普通 Search 展示推断已开启。
- [ ] 如发现 Exclude 或不明确继承，提交给属性所有者审定；此清单不授权更改设置。

该控制涉及 AIO、AI Mode 和相应 Discover 生成式体验；它与普通 Search 排名/纳入及模型训练控制不同，不替代索引、snippet 或 Googlebot 网络可达性检查。Google-Extended 与 Search 控制不能混为一项。

## 6. 官方报告与人工观测各测量什么

| 来源 | 本轮已核对的口径 | 不能据此推断 |
|---|---|---|
| [Google Generative AI performance report](https://support.google.com/webmasters/answer/16984139?hl=en) | 2026-08-31 全球推出；以 impressions 为主，可按页面、国家、日期、设备及文本/多模态等查看。未显示报告也可能因为展示不足。 | 不等于全部 AI 点击/转化归因，不等于所有模型引用份额；未见报告不能自动计 0。 |
| GSC 常规 Search performance | 按真实 property、日期与筛选读取其报告值；本轮只读采样与联合逐日导出分开。 | 不可将全部 Web 点击认作 AI，也不可把国家/页面分别导出拼成联合逐日表。 |
| [Bing AI Performance](https://blogs.bing.com/search/2026/6/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare/) | 官方 2026-06-16 预览更新含 Intents、Topics、Citation Share、Compare，用于其覆盖的 AI 体验引文信号。 | 不等于全网 AI 市场份额、F1 获客量或查询月搜索量。 |
| 本规范人工固定题 | 特定时间、工具/模型/地域/语言/联网条件下的重复回答与来源观察。 | 不代表普通用户全部个性化回答，更不代表搜索量或排名保证。 |
| [OpenAI 爬虫控制](https://developers.openai.com/api/docs/bots) | OAI-SearchBot 是搜索用途，GPTBot 是训练用途，可独立控制；ChatGPT-User 用于用户触发访问。 | 允许抓取不保证搜索纳入或引用；不把一次用户触发抓取当搜索索引状态证明。 |

Google AI 报告的额外核验点：日期为 PT；Search 报告覆盖 AIO/AI Mode，Discover 另有报告，Search Labs 实验不在其中。页面表与 property 汇总的聚合口径不同，不能要求二者简单求和相等；它的展示属于常规 Web performance 所包含的数据，不能再相加算“新增总展示”。当前文档列出 pages/countries/dates/devices，不提供本工具需要的 query 联合逐日表。

尤其保留 UI 原始缺失状态：官方说明，UI 中 `~` 或 `-`（不可用/非数字）导出后可能变为 **0**。因此不能仅凭下载文件里的 0 判断实测零；保存 UI/来源上下文，无法还原时标 missing/unverified，不能把这类导出直接当作完整观测。

[Google 当前 AI 优化指南](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) 保留基础 SEO、独特有用内容和可访问性要求，并明确 GSC inclusion 条件。它不要求特殊 schema、llms.txt 或为 fan-out 批量造页。本测量规范不会新增这些文件或修改公开内容，也不以 FAQ schema 数量代替证据。

官方口径复核日期：2026-10-11。实际 property 设置、报告是否可见及数值必须来自当次账号的只读证据，不能从这份文档的规则说明反推已完成核验。
