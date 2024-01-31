"""yeah i know this shit sucks but i don't care"""
import os
import json

KEYWORD_DICT = {
    "keyword": "keyword.control.ampl",
    "function": "entity.name.function.ampl",
    "declaration": "storage.type.ampl",
    "constant": "constant.language.ampl",
    "type": "storage.type.ampl",
}


PARENT_FOLDER = os.path.dirname(os.path.abspath(__file__))


def compile_tm_lang(base_file: str):
    """main function

    args:
        base_file (str): the base file for the language parser"""
    base_file_data = open_helper(os.path.join(PARENT_FOLDER, base_file), mode="r")
    # base_file_data["repository"]["general"]["patterns"][-4]
    # x.insert(0, {"include": "#comments"})
    # base_file_data["repository"]["general"]

    types = {}
    for keyword, diction in open_helper(
        os.path.join(PARENT_FOLDER, "bigbabba.json"), mode="r", encoding="utf-8"
    ).items():
        if diction["type"] not in types:
            types[diction["type"]] = "\\b((" + keyword + "|"
            continue
        types[diction["type"]] += keyword + "|"
    for key, value in types.items():
        # types[key] = value[:-1] + (")\\b)|s\\.t\\." if key == "keyword" else ")\\b)")
        base_file_data["repository"][key] = {
            "match": value[:-1]
            + (")\\b)|s\\.t\\." if key == "declaration" else ")\\b)"),
            "name": KEYWORD_DICT[key],
        }
        base_file_data["repository"]["general"]["patterns"].insert(
            -4, {"include": "#" + key}
        )

    with open(
        os.path.join(PARENT_FOLDER, os.pardir, "AMPL.tmLanguage.json"),
        mode="w",
        encoding="utf-8",
    ) as file:
        json.dump(base_file_data, file, indent=4)
        print(
            f"wrote to {os.path.join(PARENT_FOLDER, os.pardir, 'AMPL.tmLanguage.json')}"
        )


def open_helper(file_path: str, encoding: str = "utf-8", **kwargs) -> dict | list:
    """open a file and return the data as a dict or list

    args:
        file_path (str): path to the file
        encoding (str): encoding of the file
        **kwargs: other args to pass to open
    """
    with open(file_path, encoding=encoding, **kwargs) as file:
        return json.load(file)


if __name__ == "__main__":
    compile_tm_lang("base.AMPL.tmLanguage.json")
