import BaseSelectBlock from "./BaseSelectBlock";

type Props = {
  choices: string[],
  defaultChoice: string,
  children?: React.ReactNode,
}

const FunctionSelectBlock = ({ choices, defaultChoice, children }: Props) => {
  return (
    <div className="flex">
      <BaseSelectBlock
        className="bg-function/10 text-function"
        choices={choices}
        defaultValue={defaultChoice}
      />
      <p className="editor-text text-xl mx-1 text-function">{"("}</p>
      <div className="flex gap-2">
        {children}
      </div>
      <p className="editor-text text-xl ml-1 text-function">{")"}</p>
    </div>
  );
}

export default FunctionSelectBlock;