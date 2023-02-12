import { format } from "date-fns";
import { TypeTask } from "./TypeTask";
import axios from "axios";

export const setTaskAsCompleted = (
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
          completionDate: format(new Date(), "d LLL yyyy"),
          done: true,
        }
      : el
  );
};
