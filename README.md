# Bell Progress Bar · 铃铛进度条

用一根会晃的铃铛，代替页面右侧那条无聊的滚动进度条。

页面往下滚，铃铛跟着往下掉；鼠标还能抓住它甩一甩。物理效果由 [Matter.js](https://brm.io/matter-js/) 驱动。

<p align="center">
  <img src="https://github.com/user-attachments/assets/245ecda3-147c-4232-9191-4e1b62c2dfd1" alt="Bell progress bar preview" width="180" />
</p>

## 效果

- **滚动联动**：铃铛在页面右侧悬挂，位置随滚动进度下移
- **物理摆动**：绳子 + 铃铛是刚体约束，滚动或拖拽时会自然晃动
- **可交互**：把鼠标移到右边缘即可抓住铃铛拖拽；松手后回到只读状态，不挡页面操作

## 快速开始

克隆仓库后，用浏览器直接打开 HTML 即可（需要能访问 CDN 加载 Matter.js）：

```bash
git clone https://github.com/maoxiancat/Bell-progress-bar.git
open "Bell progress bar/index.html"
```

也可以起一个本地静态服务：

```bash
npx serve "Bell progress bar"
```

## 结构

```
Bell-progress-bar/
├── Bell progress bar/
│   ├── index.html    # 页面骨架：进度层 + Matter.js
│   ├── index.css     # 固定层、指针事件、演示背景
│   └── index.js      # 绳子、铃铛、滚动与拖拽
└── README.md
```

## 怎么工作的

1. Matter.js 在全屏透明 canvas 里画出绳子和铃铛，锚点固定在视口右上角。
2. 滚动时根据 `scrollTop / (scrollHeight - viewportHeight)` 调整 `#navigation_progress` 的 `top`，铃铛从页面顶部落到接近底部，对应阅读进度。
3. 默认 `pointer-events: none`，不干扰页面点击。鼠标进入右侧窄条 `#progress_control` 后才允许拖拽；松手后重新锁住。

## 接入自己的页面

把 `Bell progress bar/` 下的三个文件拷进项目，并保证页面里有这两个节点：

```html
<div id="navigation_progress" class="prevent_mouse">
  <div id="progress_control"></div>
</div>

<script src="https://cdn.jsdelivr.net/npm/matter-js@0.19.0/build/matter.min.js"></script>
<script src="./index.js"></script>
```

`#navigation_progress` 需要 `position: fixed` 铺满视口。页面本身要有足够高度，滚动才会带动铃铛。

可调的地方主要在 `index.js`：

| 想改什么 | 看哪里 |
| --- | --- |
| 绳子长度 / 节数 | `for (let i = 0; i < 7; i++)` |
| 绳子颜色 | `fillStyle` / `strokeStyle`（`#9e7b4f`） |
| 铃铛外观 | `bellSVG` |
| 悬挂位置 | `pointA: { x: navigation_progress.clientWidth * 0.98, y: 0 }` |
| 滚动映射 | `window.onscroll` 里对 `top` 的计算 |

## 技术

- 原生 HTML / CSS / JavaScript
- [Matter.js](https://brm.io/matter-js/) `0.19.0`（CDN）
