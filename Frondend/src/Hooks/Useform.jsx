import { useState } from "react";

const Useform = (initialstate) => {
  const [values, setValues] = useState(initialstate);
  return [
    values,
    (event) => {
      setValues({
        ...values,
        [event.target.name]: event.target.value,
      });
    },
  ];
};

export default Useform;
