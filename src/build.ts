import * as fs from "fs";
import * as path from "path";
import * as keyword from "./keyword";

type KeywordType = {
  keyword: string;
  function: string;
  declaration: string;
  constant: string;
  type: string;
};

/**
 * builds AMPL.tmLanguage.json
 */
function build(): void {
  const keywords: keyword.Keyword[] = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "..", "resources", "keywords.json"),
      "utf-8"
    )
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

  const keywordType: KeywordType = {
    keyword: "keyword.control.ampl",
    function: "entity.name.function.ampl",
    declaration: "storage.type.ampl",
    constant: "constant.language.ampl",
    type: "storage.type.ampl",
  };

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
      name: keywordType[key as keyof KeywordType],
    };
    baseJson.repository.general.patterns.splice(-4, 0, { include: `#${key}` });
  }

  fs.writeFileSync(
    path.join(__dirname, "..", "AMPL.tmLanguage.json"),
    JSON.stringify(baseJson, null, 4),
    "utf-8"
  );

  console.log("wrote to AMPL.tmLanguage.json");
}

build();
