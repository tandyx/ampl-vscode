/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from "fs";
import * as path from "path";
import * as keyword from "./keyword";

enum KeywordType {
  keyword = "keyword.control.ampl",
  function = "entity.name.function.ampl",
  declaration = "keyword.declaration.ampl", // eslint-disable-line
  constant = "constant.language.ampl",
  type = "storage.type.ampl", // eslint-disable-line
  class = "entity.name.class.ampl",
}

/**
 * builds AMPL.tmLanguage.json
 */
function build(): void {
  const resourcesPath = path.join(__dirname, "..", "resources");
  const keywords: keyword.Keyword[] = JSON.parse(
    fs.readFileSync(path.join(resourcesPath, "keywords.json"), "utf-8")
  );
  const baseJson: any = {
    name: "AMPL",
    scopeName: "source.ampl",
    fileTypes: ["mod", "dat", "run"],
    repository: {
      general: {
        patterns: [
          {
            include: "#linecomment",
          },
          {
            include: "#blockcomment",
          },
          {
            include: "#singlequotestring",
          },
          {
            include: "#doublequotestring",
          },
          {
            include: "#number",
          },
          {
            include: "#genericfunction",
          },
          {
            include: "#suffix",
          },
          {
            include: "#operator",
          },
          {
            match: "\\b([a-zA-Z_][a-zA-Z0-9_]*)\\b",
            name: "variable.other.ampl",
          },
        ],
      },
      linecomment: {
        name: "comment.line.sharp.ampl",
        match: "(#.*)(?!\\[\\[).*$\\n?",
        captures: {
          "1": {
            name: "punctuation.definition.comment.gms",
          },
        },
      },
      blockcomment: {
        name: "comment.slashstar.ampl",
        begin: "/\\*",
        end: "\\*/",
        contentName: "comment.block.documentation.ampl",
      },
      singlequotestring: {
        name: "string.quoted.single.ampl",
        begin: "'",
        beginCaptures: {
          "0": {
            name: "punctuation.definition.string.begin.ampl",
          },
        },
        end: "'",
        endCaptures: {
          "0": {
            name: "punctuation.definition.string.end.ampl",
          },
        },
        patterns: [
          {
            name: "constant.character.escape.ampl",
            match: "\\\\(a|b|f|n|r|t|v|\\?|0|\\\"|\\'|\\\\)",
          },
          {
            name: "constant.language.ampl",
            match: "\\%(c|d|e|f|g|i|s|[-+]?[0-9]*\\.?[0-9]+f)",
          },
          {
            match: "%(\\w+%|\\d+)",
            name: "entity.name.class.ampl",
          },
        ],
      },
      doublequotestring: {
        name: "string.quoted.double.ampl",
        begin: '"',
        beginCaptures: {
          "0": {
            name: "punctuation.definition.string.begin.ampl",
          },
        },
        end: '"',
        endCaptures: {
          "0": {
            name: "punctuation.definition.string.end.ampl",
          },
        },
        patterns: [
          {
            name: "constant.character.escape.ampl",
            match: "\\\\(a|b|f|n|r|t|v|\\?|0|\\\"|\\'|\\\\)",
          },
          {
            name: "constant.language.ampl",
            match: "\\%(c|d|e|f|g|i|s|([-+]?[0-9]*\\.?[0-9]+f))",
          },
          {
            match: "%(\\w+%|\\d+)",
            name: "entity.name.class.ampl",
          },
        ],
      },
      number: {
        name: "constant.numeric.ampl",
        match:
          "(?<![\\d.])\\b\\d+(\\.\\d+)?([eE]-?\\d+)?|\\.\\d+([eE]-?\\d+)?|(?i)([+-]?infinity)",
      },
      suffix: {
        name: "variable.suffix.ampl",
        match:
          "^\\.(?:[as]?status|defeqn|defvar|exitcode|message|result|lb[012s]?|ub[012s]?|[ul]?rc|val|init0?|body|dinit0?|[ul]?dual|[ul]?slack)|(<<|>>)",
      },
      operator: {
        name: "keyword.operator.ampl",
        match:
          "(\\+|-|\\*|\\/|\\*\\*|=|<=?|>=?|==|\\||\\^|<|>|!|mod|\\.\\.|:=|&|!=|:|/)",
      },
      genericfunction: {
        name: "entity.name.function.ampl",
        match: "\\b(?![if|and|or])[a-zA-Z_][a-zA-Z0-9_]*(?=\\s*\\()",
      },
      argumentcurly: {
        begin: "\\{",
        patterns: [
          {
            include: "#general",
          },
          {
            name: "meta.function-call.arguments.ampl",
            match: ".",
          },
        ],
        end: "\\}",
      },
      argumentbracket: {
        begin: "\\[",
        patterns: [
          {
            include: "#general",
          },
          {
            name: "meta.function-call.arguments.ampl",
            match: "\\w",
          },
        ],
        end: "\\]",
      },
    },
    patterns: [
      {
        include: "#general",
      },
      {
        include: "#argumentcurly",
      },
      {
        include: "#argumentbracket",
      },
    ],
    uuid: "7224acbd-b663-4ec3-8a02-3e6cf1680446",
  };

  const types: Record<string, string> = {};
  const classes: Set<string> = new Set();

  for (const keyword of keywords) {
    if (!types[keyword.type]) {
      types[keyword.type] = `\\b((${keyword.name}|`;
      continue;
    }
    types[keyword.type] += `${keyword.name}|`;

    if (keyword.datatype) classes.add(keyword.datatype);
    if (keyword.parameters) {
      for (const param of keyword.parameters) {
        if (param.type) classes.add(param.type);
      }
    }
  }

  for (const [key, value] of Object.entries(types)) {
    baseJson.repository[key] = {
      match:
        value.slice(0, -1) +
        (key === "declaration" ? ")\\b)|s\\.t\\." : ")\\b)"),
      name: KeywordType[key as keyof typeof KeywordType],
    };
    baseJson.repository.general.patterns.splice(-3, 0, { include: `#${key}` });
  }

  baseJson.repository["classes"] = {
    match: `\\b((${Array.from(classes).join("|")})\\b)`,
    name: KeywordType.class,
  };
  baseJson.repository.general.patterns.splice(-3, 0, { include: "#classes" });

  fs.writeFileSync(
    path.join(resourcesPath, "AMPL.tmLanguage.json"),
    JSON.stringify(baseJson, null, 4),
    "utf-8"
  );

  console.log(`written to ${path.join(resourcesPath, "AMPL.tmLanguage.json")}`);
}

build();
