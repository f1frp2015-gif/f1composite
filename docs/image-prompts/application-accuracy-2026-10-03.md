# 应用效果图准确性修订 · 2026-10-03

使用内置 `image_gen`，未使用 CLI/API fallback。原图保留，新文件名避免图片优化缓存沿用旧图。生成结果经目视核对后，用 Sharp 转为 WebP（quality 86、effort 6），没有二次修改内容。页面描述画面和项目设计要求，遵循 WEBSITE.md 的图片文字规范，不将生成图称为实拍或交付证据。

## 苗木支撑（编辑）

编辑输入：`public/images/products/fiberglass-stakes/fiberglass-tree-stakes-nursery.webp`。

最终文件：`public/images/products/fiberglass-stakes/fiberglass-tree-stakes-loose-ties-concept.webp`，1536 × 1024。

改正上下两道高位刚性绑带的观感：支柱与树干分开，宽软带在低位留松弛，树干上部可摆动。绑带仍需根据树木生长检查和调整；画面不规定通用绑扎高度或支柱尺寸。[University of Maryland Extension](https://www.extension.umd.edu/resource/planting-tree-or-shrub) 支持允许树干摆动、保护树皮和及时拆除临时支撑的原则。

最终提示词：

> Use case: precise-object-edit. Edit the supplied nursery staking application concept for horticultural accuracy. Preserve natural realistic green nursery background and fiberglass smooth dark green round stakes material, daylight, tree species and crisp bark detail. Recompose foreground showing entire lower young tree trunk from soil to first branches and two shorter stakes well away from trunk on either side, outside rootball. Replace both rigid-looking horizontal bands with two distinct wide soft dark green flexible tree ties at ONE low support level below first branches: each tie has a visibly loose broad loop around trunk, gently curved slack span to its own stake, bark uncompressed, room for slight trunk sway. No tight straight strap between two stakes, no wire against bark, no multiple high rigid ties. Upper trunk visibly free above stake tops, stakes separated from trunk. Soil and trunk base visible, no mulch against trunk, no floating tie ends. Update background trees to similarly plausible simple low loose supports. Landscape 3:2 photorealistic educational concept, not real project evidence. No text, symbols, logo, watermark.

## 水平遮阳百叶（新建）

原“Horizontal louvers”使用的灰度参考照片实际为竖向翼片，保留原资产但不再用于水平百叶说明。最终文件：`public/images/products/facade-sunshade/frp-horizontal-louvers-concept.webp`，1448 × 1086。

最终图清楚呈现水平跨越、端部托架、外置竖轨和玻璃间隙。截面并非 E40 平板的承诺供货截面；图注明确由项目确定截面、连接、风荷载和遮阳设计。

最终提示词：

> Use case: photorealistic-natural. Create one technically credible architectural APPLICATION CONCEPT render, landscape 4:3, a modern glazed building facade with HORIZONTAL pultruded FRP sunshade louvers. The purpose is accurately showing horizontal blades rather than vertical fins. Straight-on three-quarter eye-level view looking slightly upwards (not dramatic perspective). Primary subject six consistent pale warm gray matte pultruded fiberglass rectangular hollow louver blades running LEFT TO RIGHT horizontally in three modest rectangular facade bays. Each blade tilted down slightly at outer front edge, with visible depth casting shading on blue-gray glass behind. Every blade supported at BOTH ENDS by realistic discrete bolted brackets on vertical exterior support mullions, with a clear standoff air gap to glazing; show no blades penetrating glass, no floating blade ends, no unsupported giant spans. Main structural mounting mullions attach at floor slab zones, credible consistent modules and perspective. One clear foreground bay reveals the complete blade endpoints and bracket connection, smooth resin rich matte finish with restrained longitudinal pultrusion texture, no metallic shine and no woodgrain. Professional clean architectural engineering visualization, soft neutral daylight. Avoid vertical fin sunshade arrays, decorative diagonal ribs, text labels, numbers, logos, watermark, people, stock-photo claims. No certification or performance graphic.

核验：水平叶片朝向和双端支承明确，玻璃与外部叶片分离；生成结果每湾五片，页面不指定数量，因此不影响说明。两张图无生成工具水印、额外文字或品牌标识。
