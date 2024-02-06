/**
 * Generated by https://quicktype.io
 * PLEASE RECREATE IF THE SCHEMA IS CHANGED AND SAVE JSDOCs
 */

/**
 * keyword interface for reading from keyword.json
 * @export Keyword
 * @interface Keyword
 */
export interface Keyword {
  /**
   * the name of the keyword
   */
  name: string;
  /**
   * the datatype of the keyword (optional) - as per the enum
   */
  datatype?: DatatypeEnum;
  /**
   * the description of the keyword
   */
  description: string;
  /**
   * the type of the keyword - as per the enum
   */
  type: TypeEnum;
  /**
   * an example of the keyword (optional)
   */
  example?: string;
  /**
   * the parameters of the keyword (optional)
   */
  parameters?: Parameter[];
}

/**
 * enum for the datatype of a keyword
 * @export DatatypeEnum
 * @enum {string}
 */
export enum DatatypeEnum {
  /**
   * boolean datatype
   */
  Boolean = "boolean",
  /**
   * expression datatype
   */
  Expression = "expression",
  /**
   * float datatype
   */
  Float = "float",
  /**
   * integer datatype
   */
  Integer = "int",
  /**
   * null datatype
   */
  Null = "null",
  /**
   * object datatype
   */
  Object = "object",
  /**
   * set datatype
   */
  Set = "set",
  /**
   * string datatype
   */
  String = "string",
}

/**
 * interface for the parameters of a keyword
 * @export Parameter
 * @interface Parameter
 */
export interface Parameter {
  /**
   * the name of the parameter
   */
  name: string;
  /**
   * the description of the parameter (optional)
   */
  description?: string;
  /**
   * the datatype of the parameter (optional)
   */
  type?: DatatypeEnum;
  /**
   * the default value of the parameter (optional)
   */
  default?: number | null | string;
  /**
   * the maximum value of the parameter (optional)
   */
  max?: number;
  /**
   * the minimum value of the parameter (optional)
   */
  min?: number;
}

/**
 * enum for the type of a keyword
 * @export TypeEnum
 * @enum {string}
 */
export enum TypeEnum {
  /**
   * Constant - constant keyword
   */
  Constant = "constant",
  /**
   * Declaration - declaration keyword
   */
  Declaration = "declaration",
  /**
   * Function - function keyword
   */

  Function = "function",

  /**
   * Keyword - keyword keyword
   */
  Keyword = "keyword",

  /**
   * Type - type keyword
   */
  Type = "type",
}
