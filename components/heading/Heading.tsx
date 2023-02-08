import clsx from "clsx";
import { FC } from "react";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Heading: FC<HeadingProps> = ({ children, className, type = "h1" }) => {
  if (type === "h2") {
    return <h2>{children}</h2>;
  }
  if (type === "h3") {
    return <h3>{children}</h3>;
  }
  if (type === "h4") {
    return <h4>{children}</h4>;
  }
  if (type === "h5") {
    return <h5>{children}</h5>;
  }
  if (type === "h6") {
    return <h6>{children}</h6>;
  }

  return <h1 className={clsx("text-lg font-bold", className)}>{children}</h1>;
};

export default Heading;
