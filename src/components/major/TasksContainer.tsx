import { useState, Dispatch, SetStateAction, FC } from "react";
import Task from "./Task";
import ContainerTab from "../minor/ContainerTab";
import TaskFilter from "../minor/TasksFilter";
import { TypeTask } from "../../utils/TypeTask";
import { TypeDatabaseConnection } from "../../utils/TypeDatabaseConnection";

type TypeTasksContainerProps = {
  tasks: TypeTask[];
  setTasks: Dispatch<SetStateAction<TypeTask[]>>;
};

const TasksContainer: FC<TypeTasksContainerProps & TypeDatabaseConnection> = ({
  tasks,
  setTasks,
  databaseConnection,
}) => {
  const [isDoneTask, setIsDoneTask] = useState<boolean>(true);

  return (
    <div className="flex flex-col items-center my-10 w-full">
      <div className="flex justify-around w-full text-center">
        <ContainerTab
          title={"To-Do Tasks"}
          active={isDoneTask}
          onClick={() => setIsDoneTask(true)}
        />
        <ContainerTab
          title={"Done Tasks"}
          active={!isDoneTask}
          onClick={() => setIsDoneTask(false)}
        />
      </div>
      <TaskFilter tasks={tasks} setTasks={setTasks} isDoneTask={isDoneTask} />
      <div className="w-full">
        {isDoneTask ? (
          <>
            {tasks.map((el) => {
              if (!el.done) {
                return (
                  <Task
                    databaseConnection={databaseConnection}
                    tasks={tasks}
                    setTasks={setTasks}
                    key={el.id}
                    id={el.id}
                    priority={el.priority}
                    taskName={el.taskName}
                    dueDate={el.dueDate}
                    done={el.done}
                  />
                );
              }
            })}
          </>
        ) : (
          <>
            {tasks.map((el) => {
              if (el.done) {
                return (
                  <Task
                    databaseConnection={databaseConnection}
                    tasks={tasks}
                    setTasks={setTasks}
                    key={el.id}
                    id={el.id}
                    priority={el.priority}
                    taskName={el.taskName}
                    completionDate={el.completionDate}
                    done={el.done}
                  />
                );
              }
            })}
          </>
        )}
      </div>
      <div className="z-10 bg-Alice-Blue shadow-[3px_4px_0px_0px_rgba(204,214,246)] w-full h-[6vh] rounded-b-xl" />
    </div>
  );
};

export default TasksContainer;
