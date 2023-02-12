import {
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  FC,
  useCallback,
} from "react";
import DisplayPriority from "../minor/DisplayPriority";
import FormModal from "../minor/FormModal";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { TypeTask } from "../../utils/TypeTask";
import axios from "axios";
import { handleSubmit } from "../../utils/handleSubmit";
import { handleChangeInputForTask } from "../../utils/handleChangeInput";
import { incrementPriorityForTask } from "../../utils/incrementPriority";

import addButton from "../../assets/add.svg";
import { TypeDatabaseConnection } from "../../utils/TypeDatabaseConnection";

type TypeMainPanelProps = {
  tasks: TypeTask[];
  setTasks: Dispatch<SetStateAction<TypeTask[]>>;
};
const MainPanel: FC<TypeMainPanelProps & TypeDatabaseConnection> = ({
  tasks,
  setTasks,
  databaseConnection,
  setDatabaseConnection,
}) => {
  const [currentPriority, setCurrentPriority] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [task, setTask] = useState<TypeTask>({
    id: uuidv4(),
    priority: currentPriority,
    taskName: "",
    dueDate: format(new Date(), "yyyy-MM-dd"),
    completionDate: "",
    done: false,
  });

  const handleChange = useCallback(handleChangeInputForTask({ setTask }), []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/get-tasks");
        setTasks(res.data);
      } catch (e) {
        setIsModalOpen(true);
        setModalMessage(
          "You don't have a connection to the database. The application is running in offline mode. Your tasks will not be saved to the server. Integration is intentionally disabled due to the possibility of adding offensive content by users."
        );
        if (setDatabaseConnection) {
          setDatabaseConnection(false);
        }
        console.error(e);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setTask((prevFormData) => ({
      ...prevFormData,
      priority: currentPriority,
    }));
  }, [currentPriority]);

  return (
    <div className="flex flex-col items-center w-full">
      {isModalOpen && (
        <FormModal
          title={"Error"}
          message={modalMessage}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      <div className="my-5">
        <h1 className="text-4xl font-bold text-Alice-Blue">TO-DO APP</h1>
      </div>
      <form
        onSubmit={handleSubmit({
          task,
          setTask,
          tasks,
          setTasks,
          setIsModalOpen,
          setModalMessage,
          currentPriority,
          databaseConnection,
        })}
        className="z-30 shadow-[3px_4px_0px_0px_rgba(168,178,209)] top-0 left-0 bg-gradient-to-br from-Alice-Blue to-Periwinkle-Crayola w-full rounded-xl p-5"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center w-full h-full">
          <div className="flex sm:w-[70%] w-[100%] items-center justify-around">
            <div className="hidden sm:block mr-2">
              <label className="flex sm:pl-2 pl-1 text-xs font-bold text-Navy">
                Priority
              </label>
              <div
                className="cursor-pointer h-10 w-auto"
                onClick={incrementPriorityForTask({
                  currentPriority,
                  setCurrentPriority,
                })}
              >
                <DisplayPriority priority={currentPriority} />
              </div>
            </div>
            <div className="w-full">
              <label
                htmlFor="taskName"
                className="flex sm:pl-2 pl-1 text-xs font-bold text-Navy"
              >
                Task name
              </label>
              <input
                id="taskName"
                name="taskName"
                className="shadow-[3px_4px_0px_0px_rgba(10,25,47)] w-full h-10 bg-Wild-Blue-Yonder text-sm appearance-none border-2 border-Wild-Blue-Yonder rounded py-1 px-2 text-Navy leading-tight focus:outline-none focus:bg-Alice-Blue focus:border-Navy placeholder-Navy"
                type="text"
                placeholder="Your task Name"
                value={task.taskName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex sm:w-fit w-[100%] mt-2 sm:mt-0 items-center justify-center sm:justify-around">
            <div className="sm:hidden">
              <label className="flex sm:pl-2 pl-1 text-xs font-bold text-Navy">
                Priority
              </label>
              <div
                className="h-10 w-auto cursor-pointer"
                onClick={incrementPriorityForTask({
                  currentPriority,
                  setCurrentPriority,
                })}
              >
                <DisplayPriority priority={currentPriority} />
              </div>
            </div>
            <div className="ml-2">
              <label
                htmlFor="dueDate"
                className="flex sm:pl-2 pl-1 text-xs font-bold text-Navy"
              >
                Date
              </label>
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                className="shadow-[3px_4px_0px_0px_rgba(10,25,47)] bg-Wild-Blue-Yonder w-max h-10 text-sm appearance-none border-2 border-Wild-Blue-Yonder rounded py-1 px-2 text-Navy leading-tight focus:outline-none focus:bg-Alice-Blue focus:border-Navy placeholder-Navy"
                value={task.dueDate}
                onChange={handleChange}
                min={format(new Date(), "yyyy-MM-dd")}
                max="2025-12-31"
              />
            </div>
            <button type="submit" className="w-[8vh] ml-2">
              <img className="h-full w-full" src={addButton} alt="Add button" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MainPanel;
