import { CodeLine, NestInfo } from "@/types/code";
import { ProgramLine, BranchLine } from "@/types/program";
import { Line, Nested } from "@/components/editor/structure";
import LineWrapper from "./LineWrapper";

type Props = {
  codeLines: CodeLine[];
  programLines: ProgramLine[];
  setProgramLines: (programLines: ProgramLine[]) => void;
};

export const LineGroup = ({ codeLines, programLines, setProgramLines }: Props) => {
  const getNestedLine = (lineId: string, info: NestInfo) => {
    const thisLine = programLines.find(programLine => programLine.lineId === lineId) as BranchLine;

    switch (info.why) {
      case "if":
        return thisLine["if"].lines;
      case "else":
        return thisLine["else"]?.lines;
      case "elif":
        return thisLine["elif"]?.find(l => l.elifId === info.elifId)?.lines;
    }
  }

  const createSetProgramLine = (lineId: string) => {
    return (_programLine: ProgramLine) => {
      console.log(programLines, _programLine);
      setProgramLines(programLines.map(programLine => programLine.lineId === lineId ? _programLine : programLine))
    }
  }

  const createSetProgramLines = (lineId: string, info: NestInfo) => {
    return (_programLines: ProgramLine[]) => {
      setProgramLines(programLines.map(programLine => {
        if (programLine.lineId === lineId) {
          const newProgramLine = { ...programLine } as Required<BranchLine>;

          switch (info.why) {
            case "if":
              newProgramLine.if.lines = _programLines;
              break;
            case "else":
              newProgramLine.else.lines = _programLines;
              break;
            case "elif":
              newProgramLine.elif.forEach(elifLine => {
                if (elifLine.elifId === info.elifId) {
                  elifLine.lines = _programLines
                }
              })
              break;
          }

          return newProgramLine;
        } else {
          return programLine
        }
      }))
    }
  }

  return (
    <>
      {codeLines.map((codeLine, index) => {
        const thisLine = programLines.find(programline => programline.lineId === codeLine.lineId);
        return (
          <LineWrapper key={index}>
            <Line
              codeLine={codeLine}
              programLine={thisLine as Exclude<ProgramLine, BranchLine>}
              setProgramLine={createSetProgramLine(codeLine.lineId)}
            />
            {codeLine.nest && (
              <Nested>
                <LineGroup
                  codeLines={codeLine.nest.lines}
                  programLines={getNestedLine(codeLine.lineId, codeLine.nest.info) as ProgramLine[]}
                  setProgramLines={createSetProgramLines(codeLine.lineId, codeLine.nest.info)}
                />
              </Nested>
            )}
          </LineWrapper>
        )
      })}
    </>
  );
}

export default LineGroup;