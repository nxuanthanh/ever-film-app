import { useEffect } from "react";

interface TitleProps {
  value: string;
}

function Title({ value }: TitleProps) {
  useEffect(() => {
    document.title = value;
  }, [value]);
  return <></>;
}

export default Title;
