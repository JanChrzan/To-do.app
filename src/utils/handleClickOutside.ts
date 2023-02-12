import { MutableRefObject, Dispatch, SetStateAction } from "react";

type TypeHandleClickOutsideProps = {
  refElement: MutableRefObject<HTMLDivElement | null>;
  setIsClicked: Dispatch<SetStateAction<boolean>>;
};

export const handleClickOutside = ({
  refElement,
  setIsClicked,
}: TypeHandleClickOutsideProps) => {
  return (e: MouseEvent) => {
    if (!refElement.current?.contains(e.target as Node)) {
      setIsClicked(false);
    }
  };
};
