import { useState } from "react"

const EditorMoveVarients = () => {
  const [isSelected, setIsSelected] = useState(false);

  return {
    isSelected,
    setIsSelected,
  }
}

export default EditorMoveVarients;