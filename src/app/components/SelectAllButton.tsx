import { editCompQuery, fetchTasksQuery } from "../utils/queries";

type TaskItem = {
    task: string;
    complete: boolean;
    id: number;
}
type TaskObject = {
    tasks: TaskItem[];
}
type SelectAllProps = {
    taskList: TaskObject;
    listName: string;
    setMessage: (value:string) => void;
    setTaskList:(value:TaskObject) => void; 
}

const SelectAllButton = ({ taskList, listName, setTaskList, setMessage }: SelectAllProps) => {
   
    // All uncomplete tasks　=> Complete List
    const checkAllTaskHandler = async () => {
        const uncompTasks = taskList.tasks.filter(task => task.complete === false );
        
        try {
            for (const task of uncompTasks) {
            await editCompQuery(task.id, true);
            };

            const fetchNewList = await fetchTasksQuery();
            setTaskList({"tasks": fetchNewList});
            setMessage(`${uncompTasks.length} Tasks are moved to Complete List!`)
        } catch (error) {
            console.error(`EDIT COMP : error happen`, error);
        };
    };

    // All complete tasks =>　Uncomplete List
    const UncheckAllTaskHandler = async () => {
        const compTasks = taskList.tasks.filter(task => task.complete === true );
        
        try {
            for (const task of compTasks) {
            await editCompQuery(task.id, false);
            };

            const fetchNewList = await fetchTasksQuery();
            setTaskList({"tasks": fetchNewList});
            setMessage(`${compTasks.length} Tasks are restored to Task List!`)
        } catch (error) {
            console.error(`EDIT COMP : error happen`, error);
        };
    };

    return (
        <>
            <button onClick={listName === "incomplete" ? checkAllTaskHandler : UncheckAllTaskHandler} 
                    className="text-sm border-b-2 border-gray-300 text-gray-500 hover:border-blue-500 
                    hover:text-blue-500 transition-all duration-300">
                Select all
            </button>
        </>
    )
}

export default SelectAllButton