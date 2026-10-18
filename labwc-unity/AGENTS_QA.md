# QA 经验

- 用两个隔离的 headless labwc 分别模拟内外层，通过不同的 `XDG_RUNTIME_DIR` 和绝对 `WAYLAND_DISPLAY` 路径测试，避免影响当前桌面的剪贴板。
- 嵌套 labwc 里的 Xwayland 剪贴板不会自动同步到内层 Wayland，验证 Unity 路径必须在 Xwayland 内实际读写剪贴板，不能只测 `wl-copy`/`wl-paste`。
- `wl-paste --watch` 会根据 stdout 的文件扩展推断 MIME 类型，启动 watcher 时要重定向 stdout 到 `/dev/null`，否则图片等非文本类型会被过滤。
- 剪贴板测试不能只判断“有内容”，要轮询到内容与期望值完全一致，否则容易误用上一次的旧内容。
- 剪贴板桥不能传播空内容；读取失败或清空事件必须跳过，否则一个空的 `wl-copy` owner 会让整个系统剪贴板失效。
- `flock` 的锁 fd 会被 `wl-copy` 常驻进程继承，不能用它做桥内互斥；这里使用目录锁。
