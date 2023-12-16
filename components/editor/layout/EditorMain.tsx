import Editor from "./Editor";
import EditorActionBar from "./EditorActionBar";

export const EditorMain = () => {
  return (
    <main className="p-4">
      <Editor />
      <div className="mb-4 h-[2px] bg-gray-300 rounded" />
      <EditorActionBar />
    </main>
  );
}

export default EditorMain;