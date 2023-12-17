"use client"
import { animate, motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import EditorMoveVarients from "./EditorMoveVarients";
const EditorAddCode = () => {
  const control = useAnimation();
  const {
    isSelected,
  } = EditorMoveVarients();
  const scroll = {
    selected: {
      y: [100, 0],
      opacity: 1,
      transition: { duration: 0.5 },
    },
    unselected: {
      y: [0, 100],
      opacity: 1,
    },
  }
  console.log(isSelected);
  useEffect(() => {
    console.log(isSelected);
    if (isSelected) {
      control.start("selected");
    }
    else control.start("unselected");
  }, [isSelected]);
  return (
    <motion.div className="px-4  bg-2 gap-4 grid grid-cols-3 my-4  rounded-2xl shadow-lg"
      variants={scroll}
      initial="unselected"
      animate={control}>
      <button className=" bg-variable/10 text-variable p-8 my-4  rounded-xl ">変数の追加</button>
      <button className="bg-3 p-8 my-4  rounded-xl ">演算</button>
      <button className=" bg-reserved/10 text-reserved p-8 my-4  rounded-xl ">もし~なら</button>
      <button className=" bg-reserved/10 text-reserved p-8 my-4  rounded-xl ">条件繰り返し</button>
      <button className=" bg-reserved/10 text-reserved p-8 my-4  rounded-xl ">順次繰り返し</button>
      <button className=" bg-yellow-400/10 text-yellow-400 p-8 my-4  rounded-xl ">表示する</button>
    </motion.div>
  )
}

export default EditorAddCode;