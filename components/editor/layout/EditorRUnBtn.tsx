"use client";

import { Program } from "@/types/program";

type Props = {
  program: Program
}

const EditorRunBtn = ({ program }: Props) => {
  return <button className="px-2 py-1 rounded-md bg-main text-white">実行(仮)</button>
    ;
  ;
}

export default EditorRunBtn;