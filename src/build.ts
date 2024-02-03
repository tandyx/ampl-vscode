import * as fs from "fs";
import * as path from "path";
import * as keyword from "./keyword";

enum KeywordType {
  keyword = "keyword.control.ampl",
  function = "entity.name.function.ampl",
  declaration = "storage.type.ampl",
  constant = "constant.language.ampl",
  type = "storage.type.ampl", // eslint-disable-line
}

const resourcesPath = path.join(__dirname, "..", "resources");

/**
 * builds AMPL.tmLanguage.json
 */
function build(): void {
  const keywords: keyword.Keyword[] = JSON.parse(
    fs.readFileSync(path.join(resourcesPath, "keywords.json"), "utf-8")
  );

  const baseJson = JSON.parse(
    fs.readFileSync(
      path.join(
        __dirname,
        "..",
        "resources",
        "base",
        "base.AMPL.tmLanguage.json"
      ),
      "utf-8"
    )
  );

  const types: Record<string, string> = {};

  for (const keyword of keywords) {
    if (!types[keyword.type]) {
      types[keyword.type] = `\\b((${keyword.name}|`;
      continue;
    }
    types[keyword.type] += `${keyword.name}|`;
  }

  for (const [key, value] of Object.entries(types)) {
    baseJson.repository[key] = {
      match:
        value.slice(0, -1) +
        (key === "declaration" ? ")\\b)|s\\.t\\." : ")\\b)"),
      name: KeywordType[key as keyof typeof KeywordType],
    };
    baseJson.repository.general.patterns.splice(-4, 0, { include: `#${key}` });
  }

  fs.writeFileSync(
    path.join(resourcesPath, "AMPL.tmLanguage.json"),
    JSON.stringify(baseJson, null, 4),
    "utf-8"
  );

  console.log(`written to ${path.join(resourcesPath, "AMPL.tmLanguage.json")}`);
}

build();
