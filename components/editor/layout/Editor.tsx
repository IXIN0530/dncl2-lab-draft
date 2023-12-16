import { LineWrapper, LineGroup } from "@/components/editor/structure";
import { Program } from "@/types/program";
import { CodeLine } from "@/types/code";
import ProgramConverter from "@/functions/programConverter";
import RunProgram from "./RunProgramBtn";

const program: Program = [
  { type: "assign-variable", target: { name: "変数1", id: "var1" }, value: 4 },
  { type: "reassign-variable", id: "var1", value: 5 },
  { type: "assign-variable", target: { name: "変数2", id: "var2" }, value: { operation: "function", id: "show", value: { operation: "equal", values: [2, 20] } } },
  { type: "function", id: "show", value: { operation: "variable", id: "var2" } },
  { type: "assign-variable", target: { name: "変数3", id: "var3" }, value: { operation: "and", values: [true, false] } },
  { type: "function", id: "show", value: { operation: "variable", id: "var3" } },
  {
    type: "branch",
    if: {
      condition: { operation: "bigger", values: [{ operation: "variable", id: "var1" }, 1] },
      lines: [
        { type: "function", id: "show", value: { operation: "variable", id: "var1" } },
      ]
    },
    elif: [
      {
        condition: { operation: "bigger", values: [{ operation: "variable", id: "var1" }, 3] },
        lines: [
          { type: "function", id: "show", value: { operation: "variable", id: "var1" } },
        ]
      }
    ],
    else: {
      lines: [
        { type: "function", id: "show", value: "else this" },
      ]
    }
  }
]

const code = new ProgramConverter().convert(program);

export const Editor = () => {
  return (
    <div className="flex flex-col gap-4 mb-4 drop-shadow">
      <LineWrapper>
        <LineGroup lines={code} />
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