"use client";

import { useState, ChangeEvent } from "react";

type Props = {
  className: string;
  choices: string[];
  defaultValue: string;
}

const BaseSelectBlock = ({ className, choices, defaultValue }: Props) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  }

  return (
    <label className={"relative flex pl-3 py-1 rounded-xl outline outline-[1px] " + className}>
      <p>{value}</p>
      <svg className="w-6 h-6 mx-1" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 10l5 5 5-5z" />
      </svg>
      <select onChange={onChange} defaultValue={defaultValue} className="absolute top-0 left-0 w-full opacity-0">
        {choices.map(choice => <option key={choice} value={choice}>{choice}</option>)}
      </select>
    </label>
  );
}

export default BaseSelectBlock;