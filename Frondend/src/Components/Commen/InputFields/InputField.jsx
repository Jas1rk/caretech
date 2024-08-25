import React from "react";

const InputField = ({ type, name, value, onChange, placeholder }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="p-2 m-3 outline-none rounded-lg border border-solid focus:ring-2 focus:ring-[#136a8a] w-full focus:shadow-lg"
    />
  );
};

export default InputField;
