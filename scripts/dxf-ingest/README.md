# DXF → 异形截面录入管线（离线 · 人工确认制）

把客户/工厂的异形拉挤断面 DXF 变成后台可用的 polygon geometry JSON。

## 用法

```bash
# 一次性：建 venv 装 ezdxf
python3 -m venv ~/.venvs/dxf && ~/.venvs/dxf/bin/pip install ezdxf

# 每张图
~/.venvs/dxf/bin/python scripts/dxf-ingest/ingest.py 断面图.dxf \
    --layer PROFILE            # 推荐：只读轮廓所在图层 \
    --published-weight 4.2     # 有发布米重时必传，做交叉核对 \
    --scale 25.4               # 英寸图纸时
```

产出：
- `断面图.geometry.json` — 打开 `/admin` → Products → geometry → custom polygon，整段粘贴
- `断面图.preview.svg` — **先开这个**，和图纸对照轮廓是否正确
- 控制台报告 — A / Ix / Iy / 计算米重 vs 发布米重偏差（>8% 会标 ⚠）

## 铁律

1. **preview 不核对不入库** —— 最大闭合回路=外轮廓是启发式，多视图/标注图框都可能干扰
2. **DWG 先转 DXF**（ODA File Converter 免费），不要让本工具碰 DWG
3. **J 留空** —— 异形开口截面的扭转常数必须 FEM（sectionproperties）验证后才手工填
4. 米重偏差 >8% 时先查单位（inch?）、比例（1:2?）、漏孔
