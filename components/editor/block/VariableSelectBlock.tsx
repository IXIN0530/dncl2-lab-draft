import BaseSelectBlock from "./BaseSelectBlock";

type Props = {
  choices: string[];
  defaultChoice: string;
}

const VariableSelectBlock = ({ choices, defaultChoice }: Props) => {
  return (
    <BaseSelectBlock
      className="text-variable bg-variable/10"
      choices={choices}
      defaultValue={defaultChoice}
    />
  );
}

export default VariableSelectBlock;