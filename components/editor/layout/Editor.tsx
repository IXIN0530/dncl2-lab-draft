"use client";

import { LineWrapper, LineGroup } from "@/components/editor/structure";
import { Program } from "@/types/program";
import { Code } from "@/types/code";
import ProgramConverter from "@/functions/programConverter";
import RunProgram from "./RunProgramBtn";
import { useState } from "react";
import EditorMoveVarients from "./EditorMoveVarients";

const _program: Program = [
  { lineId: "line1", type: "assign-variable", target: { name: "判定する数", id: "var1" }, value: 4 },
  { lineId: "line2", type: "assign-variable", target: { name: "割る数", id: "var2" }, value: 2 },
  { lineId: "few", type: "assign-variable", target: { name: "素数か", id: "var3" }, value: true },
  {
    lineId: "line3", type: "while", condition: { operation: "smaller", values: [{ operation: "variable", id: "var2" }, { operation: "variable", id: "var1" }] }, lines: [
      { lineId: "line3-1", type: "assign-variable", target: { name: "変数", id: "var4" }, value: { operation: "divide", values: [{ operation: "variable", id: "var1" }, { operation: "variable", id: "var2" }] } },
      {
        lineId: "line3-2",
        type: "branch",
        if: {
          condition: {
            operation: "equal",
            values: [
              { operation: "variable", id: "var4" },
              { operation: "function", functionId: "int", argValue: { operation: "variable", id: "var4" } }
            ]
          },
          lines: [
            { lineId: "line3-2-1", type: "reassign-variable", target: { id: "var3" }, value: false },
            { lineId: "line3-2-2", type: "break" },
          ]
        },
        else: {
          lines: [{ lineId: "line3-2-2", type: "reassign-variable", target: { id: "var2" }, value: { operation: "add", values: [{ operation: "variable", id: "var2" }, 1] } }]
        }
      },
    ]
  },
  { lineId: "line4", type: "function", target: { name: "表示する", id: "show" }, value: { operation: "variable", id: "var3" } },
  { lineId: "line5", type: "function", target: { name: "表示する", id: "show" }, value: { operation: "variable", id: "var4" } },
  // { lineId: "line2", type: "reassign-variable", target: { id: "var1" }, value: { operation: "divide", values: [{ operation: "variable", id: "var1" }, 5] } },
  // { lineId: "line3", type: "assign-variable", target: { name: "変数2", id: "var2" }, value: { operation: "function", functionId: "square", argValue: { operation: "add", values: [2, 5] } } },
  // { lineId: "line4", type: "function", target: { name: "表示する", id: "show" }, value: { operation: "add", values: [{ operation: "variable", id: "var2" }, 12] } },
  // { lineId: "line5", type: "assign-variable", target: { name: "変数3", id: "var3" }, value: { operation: "add", values: ["12", 12] } },
  // {
  //   lineId: "line6",
  //   type: "branch",
  //   if: {
  //     condition: { operation: "bigger", values: [{ operation: "variable", id: "var1" }, 1] },
  //     lines: [
  //       { lineId: "line7-1", type: "function", target: { name: "表示する", id: "show" }, value: { operation: "variable", id: "var1" } },
  //     ]
  //   },
  //   elif: [
  //     {
  //       elifId: "elif1",
  //       condition: { operation: "bigger", values: [{ operation: "variable", id: "var1" }, 3] },
  //       lines: [
  //         { lineId: "line7-1", type: "function", target: { name: "表示する", id: "show" }, value: { operation: "variable", id: "var1" } },
  //       ]
  //     },
  //     {
  //       elifId: "elif2",
  //       condition: { operation: "smaller", values: [{ operation: "variable", id: "var1" }, 5] },
  //       lines: [
  //         { lineId: "line7-1", type: "function", target: { name: "表示する", id: "show" }, value: "smaller elif" },
  //       ]
  //     }
  //   ],
  //   else: {
  //     lines: [
  //       { lineId: "line7-1", type: "function", target: { name: "表示する", id: "show" }, value: "else this" },
  //     ]
  //   }
  // },
  // {
  //   lineId: "line7", type: "while", condition: { operation: "bigger", values: [{ operation: "variable", id: "var1" }, 1] }, lines: [
  //     { lineId: "line7-1", type: "function", target: { name: "表示する", id: "show" }, value: { operation: "variable", id: "var1" } },
  //     { lineId: "line7-2", type: "reassign-variable", target: { id: "var1" }, value: { operation: "subtract", values: [{ operation: "variable", id: "var1" }, 1] } },
  //     { lineId: "line7-3", type: "break" }
  //   ]
  // },
]


export const Editor = () => {
  const [program, setProgram] = useState<Program>(_program);
  const code = new ProgramConverter().convert(program);
  const { isSelected, setIsSelected } = EditorMoveVarients();
  return (
    <div className="flex flex-col gap-4 mb-4 drop-shadow">
      <LineWrapper>
        <LineGroup codeLines={code} programLines={program} setProgramLines={setProgram} />
      </LineWrapper>
      <button onClick={isSelected ? () => (setIsSelected(false)) : () => (setIsSelected(true))} className="block mx-auto p-1 w-fit bg-2 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
        </svg>
      </button>
      <RunProgram program={program} />
    </div>
  );
}

export default Editor;