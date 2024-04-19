import json


def open_json(path: str, **kwargs) -> dict | list:
    """Open a JSON file and return its content as a dictionary.

    args:
        - `path (str)`: the path to the JSON file.
    returns:
        - `dict`: the content of the JSON file.
    """

    for key, value in {
        "mode": "r",
        "encoding": "utf-8",
    }.items():
        kwargs[key] = kwargs.get(key, value) or value

    with open(path, **kwargs) as file:  # pylint: disable=unspecified-encoding
        return json.load(file)


def main(**kwargs) -> None:  # pylint: disable=unused-argument
    """Main function of the script."""
    file_type_map = {"function": "", "constant": ""}
    keydict: dict[str, str | int | list | dict]
    for keydict in open_json("keywords.json"):
        if keydict["type"] == "function":
            
            file_type_map["function"] += "/**\n"
            file_type_map["function"] += f" * {keydict['description'].replace("\n\n", " \n *" )}\n"
            _arg: dict[str, str | int]
            for _arg in keydict.get("parameters") or []:
                file_type_map["function"] += f" * @param {{{_arg.get('type') or "any"}}} {_arg['name']} - {_arg.get('description')}\n"
            file_type_map["function"] += f" * @returns {{{keydict.get('datatype') or "any"}}}\n"
            file_type_map["function"] += " */ \n"
            file_type_map["function"] += f"function {keydict['name']};\n\n"
            continue
        if keydict["type"] == "constant":
            file_type_map["constant"] += "/**\n" 
            file_type_map["constant"] += f" * @type {{{keydict.get('datatype') or "any"}}}\n"
            file_type_map["constant"] += f" * {keydict['description'].replace("\n\n", " \n *" )}\n"
            file_type_map["constant"] += " */ \n"
            file_type_map["constant"] += f"param {keydict['name']};\n\n"
            # FILE_TYPE_MAP["constant"] += f"const {keydict['name']} = {keydict['value']};\n\n"
            continue

    with open("output.mod", "w+", encoding="utf-8") as file:
        file.write(file_type_map["function"])
    with open("constants.mod", "w+", encoding="utf-8") as file:
        file.write(file_type_map["constant"])

    print()


if __name__ == "__main__":
    main()
