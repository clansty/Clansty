"""nautilus extension: 在 Cursor 中打开文件夹"""

from subprocess import Popen
from urllib.parse import unquote, urlparse

from gi import require_version

require_version("Nautilus", "4.1")
from gi.repository import GObject, Nautilus  # noqa: E402


CURSOR_BIN = "cursor"
LABEL = "在 Cursor 中打开"
TIP = "使用 Cursor 打开此文件夹"


def _uri_to_path(uri: str) -> str | None:
    # 仅处理本地路径
    parsed = urlparse(uri)
    if parsed.scheme != "file":
        return None
    return unquote(parsed.path)


def _open_in_cursor(_menu, paths: list[str]):
    if not paths:
        return
    # cursor 支持一次打开多个目录
    Popen([CURSOR_BIN, *paths], start_new_session=True)


class OpenInCursorExtension(GObject.GObject, Nautilus.MenuProvider):
    def get_file_items(self, files):
        dirs: list[str] = []
        for f in files:
            if not f.is_directory():
                return []
            path = _uri_to_path(f.get_uri())
            if not path:
                return []
            dirs.append(path)

        if not dirs:
            return []

        item = Nautilus.MenuItem(
            name="OpenInCursor::open_files",
            label=LABEL,
            tip=TIP,
        )
        item.connect("activate", _open_in_cursor, dirs)
        return [item]

    def get_background_items(self, folder):
        path = _uri_to_path(folder.get_uri())
        if not path:
            return []

        item = Nautilus.MenuItem(
            name="OpenInCursor::open_background",
            label=LABEL,
            tip=TIP,
        )
        item.connect("activate", _open_in_cursor, [path])
        return [item]
