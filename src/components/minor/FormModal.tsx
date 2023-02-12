import { useCallback, Dispatch, SetStateAction, FC } from "react";
import ModalButton from "./ModalButton";

type TypeFormModalProps = {
  title: string;
  message: string;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const FormModal: FC<TypeFormModalProps> = ({
  title,
  message,
  setIsModalOpen,
}) => {
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);
  return (
    <div className={`z-50`}>
      <div className="fixed inset-0 bg-Navy backdrop-blur bg-opacity-70" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-Navy rounded-xl text-center text-white px-8 py-6 space-y-5 drop-shadow-lg">
        <h1 className="text-2xl font-semibold text-Alice-Blue">{title}</h1>
        <div className="py-5 border-t border-b border-Alice-Blue">
          <p className="text-Alice-Blue">{message}</p>
        </div>
        <div className="flex justify-end">
          <ModalButton onClick={handleCloseModal} text={"CLOSE"} />
        </div>
      </div>
    </div>
  );
};

export default FormModal;
