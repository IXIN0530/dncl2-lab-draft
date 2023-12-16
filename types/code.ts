export type Code = CodeLine[];
export type CodeLine = {
    contents: LineContents;
    children?: CodeLine[];
};
export type LineContents = Array<BlockElem | TextElem>;

export type BaseBlockElem = {
    type: "variable" | "number" | "string";
    value: string;
};

export type SelectBlockElem = {
    type: "variable-select";
    choices: string[];
    defaultChoice: string;
} | {
    type: "function-select";
    choices: string[];
    defaultChoice: string;
    children?: Array<BlockElem | TextElem>;
} | {
    type: "boolean-select";
    defaultChoice: "true" | "false";
};
export type BlockElem = BaseBlockElem | SelectBlockElem;

export type TextElem = {
    type: "plain" | "reserved";
    value: string;
}

