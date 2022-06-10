import React, { useState } from "react";

interface Props {
  onAdd: (content: string) => void;
}

const InputField: React.FC<Props> = ({ onAdd }: Props) => {
  const [input, setInput] = useState<string>("");
  const submitHandler = (e: React.FormEvent): void => {
    e.preventDefault();
    if (input) {
      onAdd(input);
      setInput("");
    }
  };
  return (
    <form onSubmit={submitHandler} className="input">
      <input
        type="text"
        className="input__box"
        placeholder="Enter a task"
        value={input}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          setInput(e.target.value)
        }
      />
      <button className="input__submit" type="submit">
        +
      </button>
    </form>
  );
};

export default InputField;
