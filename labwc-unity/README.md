# Unity 独立 labwc

Hub 留在 niri；每次启动一个 Editor 都创建一个独立的嵌套 labwc。Editor 退出后，该 labwc 自动退出。这里只处理启动隔离，不配置分数缩放。

依赖：Bash、支持 XWayland 和 `--session` 的 labwc，以及外层 Wayland 会话。

## 直接试运行

不修改 Unity 安装，先替换下面的项目路径：

```bash
~/rc/labwc-unity/launch \
  ~/Unity/Hub/Editor/6000.3.17f1/Editor/Unity \
  -projectPath '/你的项目路径'
```

## 接入 Hub

退出对应版本的 Editor 后执行：

```bash
~/rc/labwc-unity/setup.sh install \
  ~/Unity/Hub/Editor/6000.3.17f1/Editor/Unity
```

安装脚本将原程序保存为同目录的 `Unity.real`，再把 `Unity` 设为指向 `editor-wrapper` 的软链接。之后照常从 Hub 打开项目，Hub 参数框不用填写任何 wrapper 命令。

其他版本分别执行一次安装命令，替换版本号即可。安装后请保留本目录的位置；Hub 更新或重新安装 Editor 后，需检查入口并对新版本重新安装。

`-version`、`--version`、`-help`、`--help`、`-batchmode`、`-nographics` 直接转发给原程序，不创建 labwc。其余参数通过 Bash 转义后原样转发，包括空格、引号和空参数。

## 恢复

退出对应 Editor 后执行：

```bash
~/rc/labwc-unity/setup.sh uninstall \
  ~/Unity/Hub/Editor/6000.3.17f1/Editor/Unity
```

## 手动测试

- 从 Hub 打开两个不同项目，应得到两个独立的 labwc 窗口。
- 关闭其中一个 Editor，另一个 Editor 和外层 Hub 应保持运行。
- 检查 Add Component 输入、面板拖拽及进度窗口的焦点行为。

专用配置放在 `config/`，不启动桌面面板，也不更新外层 D-Bus/systemd 激活环境。关闭整个 labwc 窗口会终止它提供的显示会话，建议正常退出 Editor。

交付时仅完成 shell 语法检查；尚未替换任何 Editor 入口，也未进行图形运行测试。
