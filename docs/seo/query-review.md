# 8 周页面归属审定：只读 CSV 工具

工具：`scripts/seo-query-review.mjs`。目标是让销售/内容/SEO 审阅相同查询下的实际页面表现；它不判断“关键词蚕食”，不生成 301，不修改关键词归属或网站。

本轮主代理已只读查看 F1 的 GSC 三个月聚合及部分筛选结果。**这些观察不是 query × page × country × device × date 的联合逐日数据，本工具尚未导入真实数据。** 聚合截图和不同标签页不能拼接成逐日联合记录；空模板也不是零流量证明。真实导出和输出应保存在受控工作目录，不提交到 Git 或公开网站。

## 输入与运行

先复制 `docs/seo/templates/gsc-query-page-daily.csv`。它只有表头，没有模拟业务记录。

```sh
node scripts/seo-query-review.mjs \
  --input /absolute/private/path/gsc-query-page-daily.csv \
  --output /absolute/private/path/query-review.json \
  --as-of 2026-10-11
```

上面的日期只是命令格式示例；实际应选导出已完整结算的结束日期。若不传 `--as-of`，取输入中最大日期；无数据时取系统当天，并明确 `asOfSource=system-date-no-data`。不因日期较新就认定数据已结算。工具不连接网络、不登录 GSC、不调用 AI、不改后台。`--output` 必须是 `.json`，不能覆盖输入；无效输入不写报告，退出码为 1。

| 必需列 | 定义与校验 |
|---|---|
| query | 原始查询；非空。只去两端空白，保留大小写和内部字符，不合并 FRP/GRP 或同义词。 |
| page | 完整 http/https URL，不带账号、密码或 fragment。保留协议、host、路径、斜杠和参数差异，不擅自 canonicalize。 |
| country | 真实来源维度；非空。建议统一 API 的三字母国家代码；不要混合 `usa`、`USA` 与 `United States` 后期待自动合并。 |
| device | 真实设备维度；非空。保持同一导出命名，通常为 DESKTOP/MOBILE/TABLET；不会把设备汇总成全部。 |
| date | 必需的真实日粒度 `YYYY-MM-DD`，验证实际日历日期；缺失或非法即拒绝。保留 GSC 的 PT 日历日期，不转换成访问者当地日期。 |
| clicks、impressions | 非负整数。空格/空单元格表示 missing；明确写 `0` 才是实测零。拒绝 NaN、Infinity、负数、百分号、千分位、科学记数法及非整数。 |
| position | GSC 行级平均排名，正展示时至少 1。空白表示 missing；零展示时可空白或 0，汇总排名仍为 null。不能填 SERP 人工观察位置或 Ahrefs 排名。 |

支持 UTF-8 BOM、CRLF/LF、标准引号字段、逗号和换行在引号中、双引号转义；表头不区分大小写，顺序可变，额外列忽略。逗号分隔，不支持本地化分号格式。记录宽度错误、重复表头、非法引号会拒绝。

同一 **query/page/country/device/date** 重复，哪怕指标完全一样，也拒绝整次输入，防止重复计算。不得以删重掩盖不同 property、search type、过滤器、数据状态的混合。先回源确定唯一导出和重叠批次；如查询 API 使用了更多维度，应在受控预处理时正确聚合，再导入，不能删掉额外维度后留下重复行。

## 如何取得真正的联合数据

1. 在单一 property、`web` search type、相同过滤器和结算状态下，导出相邻两个 56 天窗口。复制 `templates/gsc-export-manifest.json`，填写请求/导出元信息：property、日期范围、时间口径、过滤器、dataState、实际导出时间、分页/截断情况、操作者、来源文件 hash。此清单供人工复核，CLI 不自动认证其完整性。
2. 已授权的数据拥有者可通过 Search Analytics API 使用联合维度 `query,page,country,device,date`，按返回 keys 的实际顺序映射。涉及 page 时选择 `aggregationType:auto`；使用 `dataState:final`。需要分页时检查各页，不只取默认首批结果。工具本身不执行 API 请求。
3. API 省略无数据的日期，且受内部限制，不保证返回全部行。缺行不能自动补 0；查询隐私过滤、截断、筛选、来源差异都要随审定保留。即使有每一天的行，也不等于完整查询集合。
4. 常规 GSC UI 的 Queries、Pages、Countries、Devices、Dates 各自导出并不是联合表。不能将它们横向配对，更不能将三个月总量均摊到日期。带 query 条件的 Pages 抽样可以作个案证据，不能冒充整套联合数据。

来源：[Google Search Analytics query API](https://developers.google.com/webmaster-tools/v1/searchanalytics/query)。本工具读取 API 已计算的行级 position；若另用 BigQuery 导出，应按其官方字段口径预处理，不能将位置总和直接填入 position。

## 窗口和计算

`--as-of` 是最近窗口的**包含式结束日期**。以 `2026-10-11` 为示例：

- previous：2026-06-22 至 2026-08-16，56 天。
- current：2026-08-17 至 2026-10-11，56 天。
- 每个窗口拆为 8 个连续 7 天桶；以窗口起点对齐，不强制自然周。JSON 中每周都给出实际 start/end。
- 窗口外行计入 `excludedRows`，不参与指标。没有相关行的组不被虚构；完全没有窗口内记录时 `status=missing`，`groups=[]`。

每组保持 **query + country + device** 独立，每个窗口还列出各 page 的数据：

```text
clicks = 该组窗口中已输入 page 行的点击和
impressions = 同范围 page 行的展示和
weightedPosition = Σ(行 position × 行 impressions) / Σ(行 impressions)
```

这些是 **输入页面行层面的汇总**，不能冒充 GSC property 层面的平均排名、独立搜索次数或月搜索量。不同页面共同出现可使页面展示和与 property 口径不同。不会用简单算术平均汇总平均排名。

| 输出 | 如何解读 |
|---|---|
| status=missing；指标 null | 该窗口/周无输入行。不能解释成零。 |
| status=partial_metrics | 至少一个必要指标缺失；受影响汇总为 null。缺失行数单独给出，不用其余行替代完整总量。 |
| observedDays / allDatesObserved | 日期存在性检查，非完整导出证明。查询可能只在部分日期被观察到。 |
| multiplePagesObserved | 同组记录了不止一个页面，包括明确零展示记录。仅列出待审观察。 |
| multiplePagesWithImpressions | 该周两个以上页面存在正展示。不是“有害竞争”的自动判断。 |
| dominantPage | 每周展示最高的唯一页面；按展示而非点击确定。平局、无数据、缺展示、全零均没有强制赢家。 |
| adjacentWeekDominantPageSwitches | 仅两个相邻且有唯一赢家的周可记录切换；不跨缺失周或平局推断切换。仍需看 observedDays 和样本大小。 |
| ownership.references | 只读载入现有 `content/data/seoQueryTargets.ts`；primaryQuery 忽略大小写与重复空白后精确对照，不作模糊词簇匹配。不匹配显示 unmatched，交人工归类。 |
| comparison | 两个窗口都观察到 56 个日期且所需指标完整时才给描述性差值；否则为 insufficient，差值 null。缺数据时没有提升百分比。 |

上述差值的资格检查很保守；很多低频 B2B 查询会保持 insufficient，这正是应保留的不确定性。**不要为通过检查而制造零值行。** 只有回源能证明某个粒度确为零时才可输入零。position delta 为负只是观察到的平均位置数字下降，并不证明发布导致排名提升。两个窗口都全零时，位置差仍为 null。

## 每周与第 8 周人工审定

1. 固定 property、国家、设备、查询集合和基准发布记录，每周保存本地输出及导出元信息。不要把变更结束日期等同于同一次实验的固定前后窗口；需要固定前后对比时保存该次发布前完整基线，再在第 8 周选择匹配的结束日期。
2. 检查未知日期、导出截断、partial/missing、分母和国家/设备是否一致；先解决数据口径，再看变化。
3. 对多页和切换组逐个核验：查询意图、内容/交付物区别、canonical、索引、内链、现有归属、SERP 组成与证据；附上实际 URL 和记录时间。不要凭两周排名波动下结论。
4. 在 `templates/query-ownership-decisions.csv` 记录 keep-distinct / improve-linking / revise-intent / investigate / insufficient-data、理由、证据和复核人。工具不会修改这张表。
5. 如另行提出合并/301，必须经过独立内容、历史流量、有效外链、询盘路径及技术评审和用户授权。本工具从不产生重定向建议或文件。
6. 点击、展示、引用、成功 RFQ、qualified、quotable 是不同指标。只有真实来源关联和销售审定数据才能连接它们；不能把窗口点击差换算成收入或报价提升。

## 验证

```sh
node --test scripts/seo-query-review.test.mjs
```

测试内的所有记录均为 **test-only synthetic fixtures**，没有真实网站流量。覆盖 CSV 转义/BOM、非法数字与日期、重复粒度、缺数据与实测零、加权位置、周平局/缺失/切换、窗口边界、空模板、归属读取及 CLI 失败不写输出。测试成功仅证明处理逻辑，不证明 SEO/GEO 成效。
