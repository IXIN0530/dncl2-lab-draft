import { CodeLine, LineContents } from "@/types/code";
import {
  VariableBlock,
  VariableSelectBlock,
  StringBlock,
  NumberBlock,
  FunctionSelectBlock,
  BooleanSelectBlock,
} from "@/components/editor/block";
import { ReservedText } from "@/components/editor/text";

const Line = ({ data }: { data: CodeLine }) => {
  return (
    <div className="p-2 bg-2 rounded-2xl flex gap-2 items-center overflow-x-auto whitespace-nowrap">
      <LineContents data={data.contents} />
    </div>
  );
}

export default Line;

const LineContents = ({ data }: { data: LineContents }) => {
  return (
    <>
      {data.map((elem, index) => {
        switch (elem.type) {
          case "variable":
            return <VariableBlock key={index} text={elem.value} />
          case "number":
            return <NumberBlock key={index} text={elem.value} />
          case "string":
            return <StringBlock key={index} text={elem.value} />
          case "variable-select":
            return <VariableSelectBlock key={index} choices={elem.choices} defaultChoice={elem.defaultChoice} />
          case "function-select":
            return (
              <FunctionSelectBlock key={index} choices={elem.choices} defaultChoice={elem.defaultChoice}>
                {elem.children && <LineContents data={elem.children} />}
              </FunctionSelectBlock>
            )
          case "boolean-select":
            return <BooleanSelectBlock defaultChoice={elem.defaultChoice} />
          case "plain":
            return <p>{elem.value}</p>
          case "reserved":
            return <ReservedText key={index} text={elem.value} />
        }
      })}
    </>
  );
}