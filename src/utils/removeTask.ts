import { TypeTask } from "./TypeTask";
import axios from "axios";

export const removeTask = (
  databaseConnection: boolean,
  tasks: TypeTask[],
  id?: string
): TypeTask[] => {
  if (databaseConnection) {
    axios.delete(`http://localhost:5000/api/remove-task/${id}`).catch((e) => {
      console.error(e);
    });
  }
  return tasks.filter((el) => el.id !== id);
};
