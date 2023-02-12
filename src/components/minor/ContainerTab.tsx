import { FC } from "react";

type TypeContainerTabProps = {
  title: string;
  active: boolean;
  onClick: () => void;
};

const ContainerTab: FC<TypeContainerTabProps> = ({
  title,
  active,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer py-3 shadow-[3px_4px_0px_0px_rgba(204,214,246)] rounded-t-xl w-1/2 bg-Alice-Blue duration-300 ${
        active
          ? "bg-gradient-to-t from-Alice-Blue to-Wild-Blue-Yonder"
          : "bg-Alice-Blue"
      }`}
    >
      <p className="text-lg font-bold">{title}</p>
    </div>
  );
};

export default ContainerTab;
