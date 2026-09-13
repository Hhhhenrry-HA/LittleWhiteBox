# Map APP 生产组件验收

这里用真实 MapApp、MapScene/MapScene3D、AppNavigationScope 和固定工具输入建立隔离浏览器环境。Bridge 只在内存中模拟，不连接聊天存储或模型服务。

在仓库根目录运行 `node --import tsx output/map-production-check/build.mjs`，再用本地静态服务器打开 `output/map-production-check/dist/index.html`。构建支持动态导入；应通过 HTTP 访问。

可切换酒馆、溪谷、观测舱、无当前场景和空地图；`?loading=1` 模拟异步首读。页顶的测试控件不属于正式 APP。

生成 bundle 和检查日志不提交；正式运行产物仍在 `modules/xiaobai-os/dist/`。
