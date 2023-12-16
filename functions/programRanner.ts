import { Program, Value, RawValue, ArithmeticOperation, LogicalOperation } from "@/types/program";

type Result = Array<{
    index: number,
    text: string,
    isError: boolean,
}>

class ProgramRunner {
    variables: { [id: string]: { name: string, value: RawValue } };
    functions: { [id: string]: { name: string, action: (...arg: any[]) => any } };
    result: Result;

    runningIndex: number = 0;

    constructor() {
        this.variables = {};
        this.functions = {
            show: { name: "表示する", action: (arg: any) => { this.result.push({ index: this.runningIndex, text: String(arg), isError: false }) } },
            square: { name: "二乗", action: (arg: number) => arg ** 2 }
        }
        this.result = [];
    }

    run(program: Program) {
        program.forEach(line => {
            this.runningIndex += 1;
            switch (line.type) {
                case "assign-variable":
                    this.variables[line.target.id] = { name: line.target.name, value: this.getRawValue(line.value) };
                    break;
                case "reassign-variable":
                    this.variables[line.id].value = this.getRawValue(line.value);
                    break;
                case "function":
                    this.functions[line.id].action(this.getRawValue(line.value));
                    break;
                case "branch":
                    if (this.getRawValue(line.if.condition)) {
                        this.run(line.if.lines);
                    } else {
                        let runElse = !line.elif;

                        if (line.elif) {
                            runElse = true;
                            for (const elif of line.elif) {
                                if (this.getRawValue(elif.condition)) {
                                    runElse = false;
                                    this.run(elif.lines);
                                    break;
                                }
                            }
                        }
                        if (runElse && line.else) {
                            this.run(line.else.lines);
                        }
                    }
            }
        })
    }

    getRawValue = (value: Value): RawValue => {
        if (typeof value !== "object") { return value; }

        if (value.operation === "variable") {
            if (!this.variables[value.id]) {
                throw new Error("この変数は存在しません。");
            }
            return this.variables[value.id].value;
        } else if (value.operation === "function") {
            if (!this.functions[value.id]) {
                throw new Error("この関数は存在しません。");
            }
            return this.functions[value.id].action(this.getRawValue(value.value));
        }

        const value1 = this.getRawValue(value.values[0]) as any;
        const value2 = this.getRawValue(value.values[1]) as any;
        checkType(value1, value2, value.operation);

        switch (value.operation) {
            case "add":
                return value1 + value2;
            case "subtract":
                return value1 - value2;
            case "multiply":
                return value1 * value2;
            case "divide":
                return value1 / value2;
            case "and":
                return value1 && value2;
            case "or":
                return value1 || value2;
            case "bigger":
                return value1 > value2;
            case "smaller":
                return value1 < value2;
            case "equal":
                return value1 === value2;
            case "not-equal":
                return value1 !== value2;
            case "bigger-equal":
                return value1 >= value2;
            case "smaller-equal":
                return value1 <= value2;
        }
    }
}

export default ProgramRunner;

const checkType = (value1: any, value2: any, operation: ArithmeticOperation | LogicalOperation): void => {
    switch (operation) {
        case "add":
            if (typeof value1 !== typeof value2) {
                throw new Error("種類の違う変数を足し合わせることはできません。");
            }
            break;
        case "subtract":
        case "multiply":
        case "divide":
            if (typeof value1 !== "number" || typeof value2 !== "number") {
                throw new Error("この計算は数値以外で行うことはできません。");
            }
            break;
        case "and":
        case "or":
            if (typeof value1 !== "boolean" || typeof value2 !== "boolean") {
                throw new Error("この計算は真偽値以外で行うことはできません。");
            }
            break;
        case "bigger":
        case "smaller":
        case "bigger-equal":
        case "smaller-equal":
            if (typeof value1 !== "number" || typeof value2 !== "number") {
                throw new Error("この計算は数値以外で行うことはできません。");
            }
            break;
        case "equal":
        case "not-equal":
            break;
    }
}