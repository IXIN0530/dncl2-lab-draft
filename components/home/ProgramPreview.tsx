"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Editor from "../editor/layout/Editor";

type Props = {
  title: string;
}

const ProgramPreview = ({ title }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const targetWidth = ref.current?.clientWidth;

    if (targetWidth) {
      setScale(targetWidth / screenWidth);
    }
  }, []);

  return (
    <div ref={ref} className="aspect-video bg-3 rounded-md overflow-hidden relative">
      <motion.div layoutId={title} style={{ scale, originX: 0, originY: 0 }} className="w-screen h-screen p-4">
        <Editor />
      </motion.div>
      <Link href={{ pathname: "editor", query: { title } }} className="absolute top-0 left-0 w-full h-full" />
    </div>
  );
}

export default ProgramPreview;