import BaseSelectBlock from "./BaseSelectBlock";

type Props = {
  defaultChoice: "true" | "false";
}

const BooleanSelectBlock = ({ defaultChoice }: Props) => {
  return (
    <BaseSelectBlock
      className="text-boolean bg-boolean/10"
      choices={["true", "false"]}
      defaultValue={defaultChoice}
    />
  );
}

export default BooleanSelectBlock;