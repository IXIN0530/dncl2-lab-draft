import { CodeLine } from "@/types/code";
import { ProgramLine, BranchLine } from "@/types/program";
import LineElems from "./LineElems";

type Props = {
  codeLine: CodeLine;
  programLine: Exclude<ProgramLine, BranchLine>;
  setProgramLine: (programLine: Exclude<ProgramLine, BranchLine>) => void;
}

const Line = ({ codeLine, programLine, setProgramLine }: Props) => {
  return (
    <div className="p-2 bg-2 rounded-2xl flex gap-2 items-center overflow-x-auto whitespace-nowrap">
      <LineElems
        lineContents={codeLine.contents}
        programLine={programLine}
        setProgramLine={setProgramLine}
      />
    </div>
  );
}

export default Line;