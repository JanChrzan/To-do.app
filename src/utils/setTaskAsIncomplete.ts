import { TypeTask } from "./TypeTask";
import axios from "axios";
import { format } from "date-fns";

export const setTaskAsIncomplete = (
  databaseConnection: boolean,
  tasks: TypeTask[],
  id?: string
): TypeTask[] => {
  if (databaseConnection) {
    axios
      .patch(
        `http://localhost:5000/api/toggle-task-status/${id}/${format(
          new Date(),
          "d LLL yyyy"
        )}`
      )
      .catch((e) => {
        console.error(e);
      });
  }
  return tasks.map((el) =>
    el.id === id
      ? {
          ...el,
          done: false,
        }
      : el
  );
};
