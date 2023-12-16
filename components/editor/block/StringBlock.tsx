import BaseBlock from "./BaseBlock";

const StringBlock = ({ text }: { text: string }) => {
  return (
    <BaseBlock
      className="text-string bg-string/10"
      defaultValue={text}
      wrapText={true}
    />
  );
}

export default StringBlock;