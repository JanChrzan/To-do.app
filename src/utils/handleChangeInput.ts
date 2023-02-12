import { useCallback, Dispatch, SetStateAction, ChangeEvent } from "react";
import { TypeTask } from "./TypeTask";
import { EditTaskData } from "./TypeEditTask";

type TypeHandleChangeInputForTaskProps = {
  setTask: Dispatch<SetStateAction<TypeTask>>;
};

type TypeHandleChangeInputForEditTaskProps = {
  setEditTask: Dispatch<SetStateAction<EditTaskData>>;
};
export const handleChangeInputForTask = ({
  setTask,
}: TypeHandleChangeInputForTaskProps) =>
  useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTask((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  }, []);

export const handleChangeInputForEditTask = ({
  setEditTask,
}: TypeHandleChangeInputForEditTaskProps) =>
  useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEditTask((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  }, []);
