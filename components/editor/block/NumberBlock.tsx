import BaseBlock from "./BaseBlock";

const NumberBlock = ({ text }: { text: string }) => {
  return (
    <BaseBlock
      className="text-number bg-number/10"
      inputMode="decimal"
      defaultValue={text}
    />
  );
}

export default NumberBlock;