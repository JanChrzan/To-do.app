import { useState, FC } from "react";
import MainPanel from "./components/major/MainPanel";
import TasksContainer from "./components/major/TasksContainer";
import { TypeTask } from "./utils/TypeTask";

const App: FC = () => {
  const [tasks, setTasks] = useState<TypeTask[]>([]);
  const [databaseConnection, setDatabaseConnection] = useState<boolean>(true);

  return (
    <div className="flex flex-col mx-auto w-[95vw] lg:w-2/3 xl:w-1/2">
      <img id="background" src="./src/assets/bg.svg" alt="Background" />
      <MainPanel
        tasks={tasks}
        setTasks={setTasks}
        databaseConnection={databaseConnection}
        setDatabaseConnection={setDatabaseConnection}
      />
      <TasksContainer
        tasks={tasks}
        setTasks={setTasks}
        databaseConnection={databaseConnection}
        setDatabaseConnection={setDatabaseConnection}
      />
    </div>
  );
};

export default App;
