import React from "react";

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ type, placeholder, value, onChange }: InputProps) => {
  return (
    <input
      style={styles.input}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
    />
  );
};

export default Input;

const styles = {
  input: {
    padding: "10px 14px",
    marginBottom: "6px",
    outline: "none",
    fontSize: "16px",
    width: "100%",
    border: "1px solid #85ffbd",
    borderRadius: "4px",
  },
};
