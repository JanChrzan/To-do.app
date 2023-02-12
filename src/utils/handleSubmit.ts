import { useCallback, Dispatch, SetStateAction, FormEvent } from "react";
import axios from "axios";
import { TypeTask } from "./TypeTask";
import { v4 as uuidv4 } from "uuid";

type TypeHandleSubmitProps = {
  task: TypeTask;
  setTask: Dispatch<SetStateAction<TypeTask>>;
  tasks: TypeTask[];
  setTasks: Dispatch<SetStateAction<TypeTask[]>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setModalMessage: Dispatch<SetStateAction<string>>;
  currentPriority: number;
  databaseConnection: boolean;
};

export const handleSubmit = ({
  task,
  setTask,
  tasks,
  setTasks,
  setIsModalOpen,
  setModalMessage,
  currentPriority,
  databaseConnection,
}: TypeHandleSubmitProps) =>
  useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!task.taskName || !task.dueDate) {
        setModalMessage(
          "One or more fields are empty. Please fill in all fields to add a task."
        );
        setIsModalOpen(true);
        return;
      }

      const dataRegexp = /^\d{4}-\d{2}-\d{2}$/;
      if (!dataRegexp.test(task.dueDate)) {
        console.log(new Date().toLocaleDateString());
        setModalMessage(
          "The date field contains an invalid value. Please correct this field to add a task."
        );
        setIsModalOpen(true);
        return;
      }
      if (databaseConnection) {
        axios.post("http://localhost:5000/api/add-task", task).catch((e) => {
          console.error(e);
        });
      }

      setTasks([...tasks, task]);
      setTask({
        id: uuidv4(),
        priority: currentPriority,
        taskName: "",
        dueDate: "",
        completionDate: "",
        done: false,
      });
    },
    [task]
  );
