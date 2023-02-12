import { useState, Dispatch, SetStateAction, FC } from "react";
import { TypeTask } from "../../utils/TypeTask";

import sort from "../../assets/sort.svg";

type TypeTaskFilterProps = {
  tasks: TypeTask[];
  setTasks: Dispatch<SetStateAction<TypeTask[]>>;
  isDoneTask: boolean;
};

const TaskFilter: FC<TypeTaskFilterProps> = ({
  tasks,
  setTasks,
  isDoneTask,
}) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortTasks = (
    sortBy: "priority" | "taskName" | "dueDate" | "completionDate"
  ) => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");

    setTasks(
      [...tasks].sort((a, b) => {
        if (sortBy === "priority") {
          return sortOrder === "asc"
            ? a.priority - b.priority
            : b.priority - a.priority;
        } else if (sortBy === "taskName") {
          return sortOrder === "asc"
            ? a.taskName.localeCompare(b.taskName)
            : b.taskName.localeCompare(a.taskName);
        } else if (sortBy === "dueDate") {
          const dueDateA = a.dueDate || 0;
          const dueDateB = b.dueDate || 0;
          return sortOrder === "asc"
            ? new Date(dueDateA).getTime() - new Date(dueDateB).getTime()
            : new Date(dueDateB).getTime() - new Date(dueDateA).getTime();
        } else if (sortBy === "completionDate") {
          const completionDateA = a.completionDate || 0;
          const completionDateB = b.completionDate || 0;
          return sortOrder === "asc"
            ? new Date(completionDateA).getTime() -
                new Date(completionDateB).getTime()
            : new Date(completionDateB).getTime() -
                new Date(completionDateA).getTime();
        } else {
          return 0;
        }
      })
    );
  };

  return (
    <div className="flex w-full bg-Alice-Blue text-[10px] sm:text-xs font-bold text-Space-Cadet shadow-[3px_4px_0px_0px_rgba(204,214,246)]">
      <div
        onClick={() => sortTasks("priority")}
        className="flex items-center justify-center w-[18%] sm:w-[13%] h-[5vh] text-center"
      >
        <p className="cursor-pointer">Priority</p>
        <img src={sort} alt="Sort arrow" className="h-5 cursor-pointer" />
      </div>
      <div
        onClick={() => sortTasks("taskName")}
        className="flex items-center w-[68%] sm:w-[73%] ml-2"
      >
        <p className="cursor-pointer">Task name</p>
        <img src={sort} alt="Sort arrow" className="h-5 cursor-pointer" />
      </div>
      <div
        onClick={() => sortTasks(isDoneTask ? "dueDate" : "completionDate")}
        className="flex items-center justify-center w-[14%] text-center"
      >
        <p className="cursor-pointer">Date</p>
        <img src={sort} alt="Sort arrow" className="h-5 cursor-pointer" />
      </div>
    </div>
  );
};

export default TaskFilter;
