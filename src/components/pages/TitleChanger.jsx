import { useState, useEffect } from "react";
import FancyInput from "../small/FancyInput";

const TitleChanger = () => {
  const [value, setValue] = useState("");
  useEffect(() => {
    document.title = value;
    return () => {
      document.title = "React App";
    };
  });
  return (
    <FancyInput
      title="Change!"
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  );
};

export default TitleChanger;
