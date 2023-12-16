"use client";

import { LineWrapper, LineGroup } from "@/components/editor/structure";
import { Program } from "@/types/program";
import { Code } from "@/types/code";
import ProgramConverter from "@/functions/programConverter";
import RunProgram from "./RunProgramBtn";
import { useState } from "react";

const _program: Program = [
  { lineId: "line1", type: "assign-variable", target: { name: "変数1", id: "var1" }, value: 4 },
  { lineId: "line2", type: "reassign-variable", target: { id: "var1" }, value: { operation: "divide", values: [{ operation: "variable", id: "var1" }, 5] } },
  { lineId: "line3", type: "assign-variable", target: { name: "変数2", id: "var2" }, value: { operation: "function", functionId: "square", argValue: { operation: "add", values: [2, 5] } } },
  { lineId: "line4", type: "function", target: { name: "表示する", id: "show" }, value: { operation: "add", values: [{ operation: "variable", id: "var2" }, 12] } },
  // { lineId: "line5", type: "assign-variable", target: { name: "変数3", id: "var3" }, value: { operation: "add", values: ["12", 12] } },
  {
    lineId: "line6",
    type: "branch",
    if: {
      condition: { operation: "bigger", values: [{ operation: "variable", id: "var1" }, 1] },
      lines: [
        { lineId: "line7-1", type: "function", target: { name: "表示する", id: "show" }, value: { operation: "variable", id: "var1" } },
      ]
    },
    elif: [
      {
        elifId: "elif1",
        condition: { operation: "bigger", values: [{ operation: "variable", id: "var1" }, 3] },
        lines: [
          { lineId: "line7-1", type: "function", target: { name: "表示する", id: "show" }, value: { operation: "variable", id: "var1" } },
        ]
      },
      {
        elifId: "elif2",
        condition: { operation: "smaller", values: [{ operation: "variable", id: "var1" }, 5] },
        lines: [
          { lineId: "line7-1", type: "function", target: { name: "表示する", id: "show" }, value: "smaller elif" },
        ]
      }
    ],
    else: {
      lines: [
        { lineId: "line7-1", type: "function", target: { name: "表示する", id: "show" }, value: "else this" },
      ]
    }
  }
]


export const Editor = () => {
  const [program, setProgram] = useState<Program>(_program);
  const code = new ProgramConverter().convert(program);

  return (
    <div className="flex flex-col gap-4 mb-4 drop-shadow">
      <LineWrapper>
        <LineGroup codeLines={code} programLines={program} setProgramLines={setProgram} />
      </LineWrapper>
      <button className="block mx-auto p-1 w-fit bg-2 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
        </svg>
      </button>
      <RunProgram program={program} />
    </div>
  );
}

export default Editor;