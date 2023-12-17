"use client"

import { motion } from "framer-motion";

type Props = {
  isSelected: boolean;
  setIsSelected: (isSelected: boolean) => void;
}
const EditorAddCode = ({ isSelected, setIsSelected }: Props) => {
  const scroll = {
    selected: {
      y: [300, -40, 0],
      opacity: 1,
      transition: { duration: 0.5 },
    },
    unselected: {
      y: [0, 300],
      opacity: 1,
    },
  }

  return (
    <><motion.div className="fixed bottom-20 right-4"
      animate={{ x: isSelected ? 0 : "200%" }}>
      <button className=" bg-string/80 py-2 px-4 rounded-xl text-white mx-auto" onClick={() => (setIsSelected(true))}>追加をやめる</button>
    </motion.div>
      <motion.div
        className="w-full fixed bottom-0 left-0 p-4 flex gap-4 overflow-x-auto whitespace-nowrap drop-shadow-xl"
        animate={{
          y: isSelected ? 0 : "100%",
        }}>
        <button className="px-4 py-2 rounded-xl backdrop-blur-3xl bg-variable/80 text-white">変数の追加</button>
        <button className="px-4 py-2 rounded-xl backdrop-blur-3xl bg-number/80 text-white">演算</button>
        <button className="px-4 py-2 rounded-xl backdrop-blur-3xl bg-reserved/80 text-white">もし~なら</button>
        <button className="px-4 py-2 rounded-xl backdrop-blur-3xl bg-reserved/80 text-white">条件繰り返し</button>
        <button className="px-4 py-2 rounded-xl backdrop-blur-3xl bg-reserved/80 text-white">順次繰り返し</button>
        <button className="px-4 py-2 rounded-xl backdrop-blur-3xl bg-yellow-400/80 text-white">表示する</button>
      </motion.div>
    </>
  )
}

export default EditorAddCode;