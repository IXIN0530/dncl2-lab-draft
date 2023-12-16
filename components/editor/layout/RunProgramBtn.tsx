"use client";

import { useState } from "react";
import { Program } from "@/types/program";
import ProgramRunner from "@/functions/programRanner";

type Props = {
  program: Program
}

type Result = Array<{
  index: number,
  text: string,
  isError: boolean,
}>


const RunProgram = ({ program }: Props) => {
  const [result, setResult] = useState<Result>([]);

  const onClick = () => {
    const runner = new ProgramRunner();
    const error = [];
    try {
      runner.run(program);
    } catch (e: any) {
      error.push({
        index: runner.runningIndex,
        text: e.message,
        isError: true,
      });
    } finally {
      setResult([...runner.result, ...error]);
    }
  }

  return (
    <>
      <button onClick={onClick} className="px-2 py-1 rounded-md bg-main text-white">実行(仮)</button>
      {result.length > 0 && (
        <div className="bg-2 rounded-xl p-4 flex flex-col gap-4">
          {result.map((r, i) => (
            <div key={i} className={r.isError ? "text-error" : ""}>
              <p className="mb-1">{`${r.index}行目での${r.isError ? "エラー" : "出力"}`}</p>
              <p className={`${r.isError ? "bg-error/10" : "bg-3"} p-2 rounded-md`}>{r.text}</p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default RunProgram;