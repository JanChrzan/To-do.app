import {
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
  FC,
  useCallback,
} from "react";
import { format } from "date-fns";
import TaskButton from "../minor/TaskButton";
import DisplayPriority from "../minor/DisplayPriority";
import { EditTaskData } from "../../utils/TypeEditTask";
import { TypeTask } from "../../utils/TypeTask";
import { setTaskAsCompleted } from "../../utils/setTaskAsCompleted";
import { setTaskAsIncomplete } from "../../utils/setTaskAsIncomplete";
import { setTaskAsEditable } from "../../utils/setTaskAsEditable";
import { removeTask } from "../../utils/removeTask";
import { handleClickOutside } from "../../utils/handleClickOutside";
import { incrementPriorityForEditTask } from "../../utils/incrementPriority";
import { handleChangeInputForEditTask } from "../../utils/handleChangeInput";

import completed from "../../assets/completed.svg";
import edit from "../../assets/edit.svg";
import remove from "../../assets/remove.svg";
import undo from "../../assets/undo.svg";
import { TypeDatabaseConnection } from "../../utils/TypeDatabaseConnection";

type TypeTaskProps = {
  tasks: TypeTask[];
  setTasks: Dispatch<SetStateAction<TypeTask[]>>;
};

const Task: FC<TypeTask & TypeTaskProps & TypeDatabaseConnection> = ({
  databaseConnection,
  tasks,
  setTasks,
  id,
  priority,
  taskName,
  dueDate,
  completionDate,
  done,
}) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isClickedDelay, setIsClickedDelay] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<EditTaskData>({
    taskName: taskName,
    dueDate: dueDate,
    priority: priority,
  });

  const handleChange = useCallback(
    handleChangeInputForEditTask({ setEditTask }),
    []
  );
  const refElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener(
      "click",
      handleClickOutside({ refElement, setIsClicked }),
      true
    );
    return () => {
      document.removeEventListener(
        "click",
        handleClickOutside({ refElement, setIsClicked }),
        true
      );
    };
  }, []);

  useEffect(() => {
    if (isClicked !== isClickedDelay && !isClicked) {
      setTimeout(() => {
        setIsClickedDelay(!isClickedDelay);
      }, 300);
    } else if (isClicked !== isClickedDelay && isClicked) {
      setIsClickedDelay(!isClickedDelay);
    }

    if (!isClicked) {
      setIsEditable(false);
      setEditTask({
        taskName: taskName,
        dueDate: dueDate,
        priority: priority,
      });
    }
  }, [isClicked]);

  return (
    <div>
      <div
        className={`z-30 fixed inset-0 bg-Navy backdrop-blur bg-opacity-50 ${
          isClickedDelay ? "block" : "hidden"
        }`}
      />
      <div
        ref={refElement}
        className={`relative w-full h-[10vh] duration-150 ${
          isClickedDelay
            ? "scale-[1.03] lg:scale-110 z-50"
            : "cursor-pointer shadow-[3px_4px_0px_0px_rgba(204,214,246)]"
        }`}
      >
        <div
          onClick={() => setIsClicked(true)}
          className={`absolute top-0 left-0 flex items-center h-full w-full duration-150 ${
            isClickedDelay
              ? "bg-Periwinkle-Crayola rounded-lg z-40"
              : "bg-Alice-Blue z-20"
          }`}
        >
          <div
            className={`${isEditable && "cursor-pointer"} w-[13%] h-2/3`}
            onClick={incrementPriorityForEditTask({ isEditable, setEditTask })}
          >
            <DisplayPriority
              priority={isEditable ? editTask.priority : priority}
            />
          </div>
          <div className={`${isEditable ? "w-[57%]" : "w-[72%]"}`}>
            {isEditable ? (
              <input
                name="taskName"
                className="w-full h-10 shadow-[3px_4px_0px_0px_rgba(10,25,47)] bg-Wild-Blue-Yonder text-sm appearance-none border-2 border-Wild-Blue-Yonder rounded py-1 px-2 text-Navy leading-tight focus:outline-none focus:bg-Alice-Blue focus:border-Navy placeholder-Navy"
                type="text"
                placeholder="Your task Name"
                value={editTask.taskName}
                onChange={handleChange}
              />
            ) : (
              <p className="font-bold ml-2">{taskName}</p>
            )}
          </div>
          <div className={`${isEditable ? "w-[30%]" : "w-[15%]"} text-center`}>
            {isEditable ? (
              <input
                name="dueDate"
                type="date"
                className="bg-Wild-Blue-Yonder shadow-[3px_4px_0px_0px_rgba(10,25,47)] h-10 text-sm appearance-none border-2 border-Wild-Blue-Yonder rounded py-1 px-2 text-Navy leading-tight focus:outline-none focus:bg-Alice-Blue focus:border-Navy placeholder-Navy"
                value={editTask.dueDate}
                onChange={handleChange}
                min={format(new Date(), "yyyy-MM-dd")}
                max="2025-12-31"
              />
            ) : (
              <>
                <div>
                  <p className="text-xs font-bold">{done ? "Done:" : "Due:"}</p>
                </div>
                <div>
                  <p className="text-sm">
                    {done
                      ? `${format(new Date(completionDate!), "d LLL yyyy")}`
                      : `${format(new Date(dueDate!), "d LLL yyyy")}`}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        <div
          className={`absolute flex justify-around bg-Periwinkle-Crayola rounded-lg h-1/2 w-2/3 left-[16.66%] duration-300 ${
            isClicked ? "sm:translate-y-28 translate-y-24" : "translate-y-0"
          } ${isClickedDelay ? "z-30" : "z-10"}
          `}
        >
          {done ? (
            <TaskButton
              icon={undo}
              onClick={() =>
                setTasks(setTaskAsIncomplete(databaseConnection, tasks, id))
              }
              message={"UNDO"}
              isEditable={isEditable}
            />
          ) : (
            <TaskButton
              icon={completed}
              onClick={() =>
                setTasks(setTaskAsCompleted(databaseConnection, tasks, id))
              }
              message={"DONE"}
              isEditable={isEditable}
            />
          )}
          <TaskButton
            icon={edit}
            onClick={() =>
              setTasks(
                setTaskAsEditable(
                  databaseConnection,
                  isClicked,
                  isEditable,
                  setIsEditable,
                  editTask,
                  tasks,
                  id
                )
              )
            }
            message={isEditable ? "SAVE" : "EDIT"}
            done={done}
          />
          <TaskButton
            icon={remove}
            onClick={() => setTasks(removeTask(databaseConnection, tasks, id))}
            message={"REMOVE"}
            isEditable={isEditable}
          />
        </div>
      </div>
    </div>
  );
};

export default Task;
