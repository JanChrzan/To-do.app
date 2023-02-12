import { FC } from "react";

import lowPriority from "../../assets/low-priority.svg";
import mediumPriority from "../../assets/medium-priority.svg";
import highPriority from "../../assets/high-priority.svg";

type TypeDisplayPriorityProps = {
  priority: number;
};

const DisplayPriority: FC<TypeDisplayPriorityProps> = ({ priority }) => {
  const icon: string[] = [lowPriority, mediumPriority, highPriority];

  return (
    <img
      className="h-full w-auto my-auto mx-auto"
      src={icon[priority - 1]}
      alt="Priority icon"
    />
  );
};

export default DisplayPriority;
