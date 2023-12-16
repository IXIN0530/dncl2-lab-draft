import BaseBlock from './BaseBlock';

const VariableBlock = ({ text }: { text: string }) => {
  return (
    <BaseBlock
      className="text-variable bg-variable/10"
      defaultValue={text}
    />
  );
}

export default VariableBlock;