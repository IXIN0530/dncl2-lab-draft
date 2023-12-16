export type Program = Array<ProgramLine>;
export type ProgramLine = AssignVariableLine | ReassignVariableLine | FunctionLine | BranchLine;

/**
 * 算術演算
 */
export type ArithmeticOperation = "add" | "subtract" | "multiply" | "divide";
/**
 * 論理演算
 */
export type LogicalOperation = "and" | "or" | "bigger" | "smaller" | "equal" | "not-equal" | "bigger-equal" | "smaller-equal";

export type RawValue = string | number | boolean;
export type CalculatedValue = {
    operation: ArithmeticOperation,
    values: [Value, Value]
} | {
    operation: LogicalOperation,
    values: [Value, Value]
} | {
    operation: "variable",
    id: string,
} | {
    operation: "function",
    id: string,
    value: Value,
};
export type Value = RawValue | CalculatedValue;

export type AssignVariableLine = {
    type: "assign-variable",
    target: { name: string, id: string },
    value: Value
}

export type ReassignVariableLine = {
    type: "reassign-variable",
    id: string,
    value: Value
}

export type FunctionLine = {
    type: "function",
    id: string,
    value: Value,
}

export type BranchLine = {
    type: "branch",
    if: {
        condition: Value,
        lines: ProgramLine[]
    },
    elif?: Array<{
        condition: Value,
        lines: ProgramLine[]
    }>,
    else?: {
        lines: ProgramLine[]
    }
}
