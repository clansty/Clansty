def main(args):
    pass


def handle_result(args, answer, target_window_id, boss):
    w = boss.window_id_map.get(target_window_id)
    if w is None:
        return
    text = w.text_for_selection()
    if text:
        from kitty.clipboard import set_clipboard_string
        set_clipboard_string(text)
        boss.clear_selection()
    else:
        boss.paste_from_clipboard()
