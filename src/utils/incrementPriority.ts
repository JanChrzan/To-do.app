import { useCallback, Dispatch, SetStateAction } from "react";
import { EditTaskData } from "./TypeEditTask";

type TypeIncrementPriorityForTaskProps = {
  currentPriority: number;
  setCurrentPriority: Dispatch<SetStateAction<number>>;
};

type TypeIncrementPriorityForEditTaskProps = {
  isEditable: boolean;
  setEditTask: Dispatch<SetStateAction<EditTaskData>>;
};

export const incrementPriorityForTask = ({
  currentPriority,
  setCurrentPriority,
}: TypeIncrementPriorityForTaskProps) =>
  useCallback(() => {
    setCurrentPriority((prevPriority) => {
      return prevPriority === 3 ? 1 : prevPriority + 1;
    });
  }, [currentPriority]);

export const incrementPriorityForEditTask = ({
  isEditable,
  setEditTask,
}: TypeIncrementPriorityForEditTaskProps) =>
  useCallback(() => {
    if (isEditable) {
      setEditTask((prevData) => {
        return {
          ...prevData,
          priority: prevData.priority === 3 ? 1 : prevData.priority + 1,
        };
      });
    }
  }, [isEditable]);
