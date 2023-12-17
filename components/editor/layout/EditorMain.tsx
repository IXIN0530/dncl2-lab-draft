import Editor from "./Editor";
import EditorActionBar from "./EditorActionBar";
import EditorAddCode from "./EditorAddCode";

export const EditorMain = () => {
  return (
    <main className="p-4">
      <Editor />
      <div className="mb-4 h-[2px] bg-gray-300 rounded" />
      <EditorActionBar />
      <EditorAddCode />
    </main>
  );
}

export default EditorMain;