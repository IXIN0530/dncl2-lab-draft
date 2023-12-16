import ProgramData from "./ProgramData";

const CreatedPrograms = () => {
  return (
    <div>
      <p className="mb-1 ml-1">作成したプログラム</p>
      <div className="p-4 pb-2 bg-2 rounded-xl grid grid-cols-3 gap-4 duration-300">
        <ProgramData title="プログラム1" />
        <ProgramData title="プログラム2" />
        <ProgramData title="プログラム3" />
        <ProgramData title="プログラム4" />
        <ProgramData title="プログラム5" />
        <ProgramData title="プログラム6" />
      </div>
    </div>
  );
}

export default CreatedPrograms;