import React from "react";

const Inputbox = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  textarea = false,
  rows = 4,
}) => {
  return (
    <div className="form-control w-full mb-4">
      {label && (
        <label className="label" htmlFor={name}>
          <span className="label-text font-medium">{label}</span>
        </label>
      )}
      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className="textarea textarea-bordered w-full"
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="input input-bordered w-full"
        />
      )}
    </div>
  );
};

export default Inputbox;
