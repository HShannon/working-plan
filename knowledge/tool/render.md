# 服务器渲染, 客户端渲染(CSR), 同构应用(SSR)

> 服务器直接返回 HTML 文档并返回给浏览器，客户端仅负责解析 HTML; html 仅仅作为静态文件被服务端直接以原文件的形式返回给客户端，服务端根据 html 上的 JavaScript，生成 DOM 插入 html; 在服务器端执行一次，用于实现服务器端渲染（首屏直出），在客户端再执行一次，用于接管页面交互，**核心解决 SEO 和首屏渲染慢的问题。**

## 客户端渲染  
一般需要3个HTTP请求周期。加载 HTML 文件, 加载 JS 文件, API 请求数据, 根据数据渲染页面

![window](../../public/image/render.jpg "render")

## SSR 
👉 如何实现: Virtual DOM
