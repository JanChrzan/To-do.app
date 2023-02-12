import { FC } from "react";

type TypeTaskButtonProps = {
  icon: string;
  message: string;
  onClick: () => void;
  isEditable?: boolean;
  done?: boolean;
};

const TaskButton: FC<TypeTaskButtonProps> = ({
  icon,
  message,
  onClick,
  isEditable,
  done,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${
        (isEditable && "blur-sm") || (done && "opacity-0")
      } w-[28%] flex font-bold items-center text-center my-1 border border-Navy rounded text-Navy hover:bg-Navy/[.10] text-[10px] sm:text-xs duration-300`}
      disabled={isEditable || done}
    >
      <img className="h-1/2 sm:h-full mr-1" src={icon} alt="Action icon" />
      {message}
    </button>
  );
};

export default TaskButton;
