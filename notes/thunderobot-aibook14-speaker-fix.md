# ThundeRobot aibook14 Air 内置扬声器修复

## 机器信息

- 型号: ThundeRobot aibook14 Air (Emdoor Digital Technology)
- CPU: AMD Ryzen 7 8745HS (Phoenix / Hawk Point)
- 声卡: Realtek ALC235 (报告为 ALC233)
  - Vendor ID: `0x10ec0235`
  - Subsystem ID: `0x2782a244`
  - PCI: `04:00.6` (snd_hda_intel)

## 问题

Linux 下内置扬声器无声，耳机正常。

## 根因

**BIOS pin 配置错误。** BIOS 将 pin `0x14` 标记为内置扬声器 (`0x90170110`)，但实际硬件上扬声器接在 pin `0x1b` 上。Pin `0x1b` 被 BIOS 标记为 N/A (`0x411111f0`)，所以 Linux 驱动从未启用它。

## 修复

两个文件：

### `/etc/modprobe.d/audio-fix.conf`

```
# ThundeRobot aibook14 Air: real speaker is on pin 0x1b, not 0x14
options snd_hda_intel patch=,hda-jack-retask.fw
```

注意：`patch=,hda-jack-retask.fw` 中的逗号表示第一张声卡 (HDMI) 不需要 patch，第二张声卡 (ALC235) 才需要。

### `/lib/firmware/hda-jack-retask.fw`

```
[codec]
0x10ec0235 0x2782a244 0

[pincfg]
0x14 0x411111f0
0x1b 0x90170110
```

- 将 `0x14` 设为 N/A（未连接物理设备）
- 将 `0x1b` 设为内置扬声器

## 验证

重启后 `journalctl -k | grep autoconfig` 应该显示 `line_outs` 包含 `0x1b`。

## 排除项

以下方法**不需要**，曾经尝试但无效（因为根因不是它们）：

- HDA codec GPIO (0/1/2) — 不影响此问题
- AMD platform GPIO — 不需要
- codec coefficient 修改 — 不需要
- `model=` 参数 — 不需要
- SOF 驱动 — 不需要
- EAPD 手动设置 — 不需要

## 日期

2026-05-20
