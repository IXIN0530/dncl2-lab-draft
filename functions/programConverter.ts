import { Program, Value } from "@/types/program"
import { Code, CodeLine, LineContents, BlockElem, TextElem } from "@/types/code"

class ProgramConverter {
    variables: { [id: string]: { name: string, value: Value } };
    functions: { [id: string]: { name: string, action: (...arg: any[]) => any } };

    runningIndex: number = NaN;

    constructor() {
        this.variables = {};
        this.functions = {
            show: { name: "表示する", action: (arg: any) => { console.log(arg) } },
            square: { name: "二乗", action: (arg: number) => arg ** 2 }
        }
    }

    convert(program: Program): Code {
        const code: Code = []

        for (const programLine of program) {
            switch (programLine.type) {
                case "assign-variable":
                    this.variables[programLine.target.id] = { name: programLine.target.name, value: programLine.value }
                    code.push({
                        contents: [
                            { type: "variable", value: programLine.target.name },
                            { type: "plain", value: "=" },
                            ...this.valueToCodeElems(programLine.value),
                        ]
                    })
                    break;
                case "reassign-variable":
                    code.push({
                        contents: [
                            {
                                type: "variable-select",
                                choices: Object.keys(this.variables).map(variable => this.variables[variable].name),
                                defaultChoice: this.variables[programLine.id].name,
                            },
                            { type: "plain", value: "=" },
                            ...this.valueToCodeElems(programLine.value),
                        ]
                    })
                    break;
                case "function":
                    code.push({
                        contents: [
                            {
                                type: "function-select",
                                choices: Object.keys(this.functions).map(func => this.functions[func].name),
                                defaultChoice: this.functions[programLine.id].name,
                                children: this.valueToCodeElems(programLine.value),
                            },
                        ]
                    })
                    break;
                case "branch":
                    code.push({
                        contents: [
                            { type: "reserved", value: "もし" },
                            ...this.valueToCodeElems(programLine.if.condition),
                            { type: "reserved", value: "なら" },
                        ],
                        children: this.convert(programLine.if.lines),
                    })
                    if (programLine.elif) {
                        code.push({
                            contents: [
                                { type: "reserved", value: "そうでなくもし" },
                                ...this.valueToCodeElems(programLine.elif[0].condition),
                                { type: "reserved", value: "なら" },
                            ],
                            children: this.convert(programLine.elif[0].lines),
                        })
                    }
                    if (programLine.else) {
                        code.push({
                            contents: [
                                { type: "reserved", value: "そうでなければ" },
                            ],
                            children: this.convert(programLine.else.lines),
                        })
                    }
                    break;
            }
        }

        return code;
    }

    valueToCodeElems = (value: Value): LineContents => {
        const codeValue: LineContents = []

        if (typeof value !== "object") {
            switch (typeof value as "string" | "number" | "boolean") {
                case "string":
                    codeValue.push({ type: "string", value: value as string })
                    break;
                case "number":
                    codeValue.push({ type: "number", value: value.toString() })
                    break;
                case "boolean":
                    codeValue.push({ type: "boolean-select", defaultChoice: value ? "true" : "false" })
                    break;
            }
        } else {
            switch (value.operation) {
                case "function":
                    codeValue.push(
                        {
                            type: "function-select",
                            choices: Object.keys(this.functions).map(func => this.functions[func].name),
                            children: this.valueToCodeElems(value.value),
                            defaultChoice: this.functions[value.id].name,
                        }
                    )
                    break;
                case "equal":
                    codeValue.push(...this.codeElemsWithOperator(value.values, "=="))
                    break;
                case "add":
                    codeValue.push(...this.codeElemsWithOperator(value.values, "+"))
                    break;
                case "subtract":
                    codeValue.push(...this.codeElemsWithOperator(value.values, "-"))
                    break;
                case "multiply":
                    codeValue.push(...this.codeElemsWithOperator(value.values, "*"))
                    break;
                case "divide":
                    codeValue.push(...this.codeElemsWithOperator(value.values, "/"))
                    break;
                case "and":
                    codeValue.push(...this.codeElemsWithOperator(value.values, "and"))
                    break;
                case "or":
                    codeValue.push(...this.codeElemsWithOperator(value.values, "or"))
                    break;
                case "bigger":
                    codeValue.push(...this.codeElemsWithOperator(value.values, ">"))
                    break;
                case "smaller":
                    codeValue.push(...this.codeElemsWithOperator(value.values, "<"))
                    break;
                case "not-equal":
                    codeValue.push(...this.codeElemsWithOperator(value.values, "!="))
                    break;
                case "bigger-equal":
                    codeValue.push(...this.codeElemsWithOperator(value.values, ">="))
                    break;
                case "smaller-equal":
                    codeValue.push(...this.codeElemsWithOperator(value.values, "<="))
                    break;
                case "variable":
                    codeValue.push(
                        {
                            type: "variable-select",
                            choices: Object.keys(this.variables).map(variable => this.variables[variable].name),
                            defaultChoice: this.variables[value.id].name,
                        }
                    )
                    break;
            }
        }

        return codeValue;
    }

    codeElemsWithOperator = (values: [Value, Value], operation: string): Array<BlockElem | TextElem> => {
        const [value1, value2] = values;

        return [
            ...this.valueToCodeElems(value1),
            { type: "plain", value: operation },
            ...this.valueToCodeElems(value2),
        ]
    }
}

export default ProgramConverter;

