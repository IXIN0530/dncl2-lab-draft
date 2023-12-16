type Props = {
  className: string;
  choices: { [id: string]: { name: string } };
  value: string;
  setValue: (value: string) => void;
}

const BaseSelectBlock = ({ className, choices, value, setValue }: Props) => {
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  }

  return (
    <label className={"relative flex pl-3 py-1 rounded-xl outline outline-[1px] " + className}>
      <p>{choices[value].name}</p>
      <svg className="w-6 h-6 mx-1" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 10l5 5 5-5z" />
      </svg>
      <select
        onChange={onChange}
        value={value}
        className="absolute top-0 left-0 w-full opacity-0"
      >
        {Object.keys(choices).map(id => <option key={id} value={id}>{choices[id].name}</option>)}
      </select>
    </label>
  );
}

export default BaseSelectBlock;