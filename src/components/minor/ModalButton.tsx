import { MouseEvent, FC } from "react";

type TypeModalButtonProps = {
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void | undefined;
  text: string;
};

const ModalButton: FC<TypeModalButtonProps> = ({
  className,
  type,
  onClick,
  text,
}) => {
  return (
    <button
      className={`${className} px-6 py-2 border border-Alice-Blue rounded text-Alice-Blue hover:bg-Alice-Blue/[.10] duration-300`}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ModalButton;
