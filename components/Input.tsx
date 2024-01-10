import React from "react";

interface InputProps {
  id: string;
  onChange: any;
  value: string;
  label: string;
  type?: string;
}

export default function Input({
  id,
  onChange,
  value,
  label,
  type,
}: InputProps) {
  return (
    <div className='relative'>
      <input
        onChange={onChange}
        type={type}
        value={value}
        id={id}
        className='text-md peer block 
  w-full appearance-none rounded-md bg-neutral-700 px-6 pt-6 
  pb-1 text-white focus:outline-none focus:ring-0 invalid:border-b-1'
        placeholder=''
      />
      <label
        className={`text-md absolute top-4 left-6 z-10 origin-[0] 
        transform text-zinc-400 duration-150 ${
          value !== "" ? "-translate-y-3 scale-75" : ""
        }
        peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
        peer-focus:-translate-y-3 peer-focus:scale-75`}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
}
