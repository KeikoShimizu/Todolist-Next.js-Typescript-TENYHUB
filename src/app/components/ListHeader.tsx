import TaskCounter from "./TaskCounter";
import SelectAllButton from "./SelectAllButton";

type TaskObject = {
    tasks: TaskItem[];
}
type TaskItem = {
    task: string;
    complete: boolean;
    id: number;
}
type ListHeaderProps = {
    taskList: TaskObject;
    listName: string;
    setMessage: (value:string) => void;
    setTaskList:(value:TaskObject) => void; 
}

const ListHeader = ({ taskList, listName, setTaskList, setMessage }:ListHeaderProps) => {
  
    return (
    <div className="flex flex-row justify-between items-end mb-1">
        <div>
            <h2 className="text-bold text-2xl ">{ listName == "incomplete" ? "Tasks" : "Completed Tasks" }</h2>
            <SelectAllButton listName={listName} taskList={taskList} setTaskList={setTaskList} setMessage={setMessage}/>
        </div>
        { taskList && taskList.tasks ? <TaskCounter taskList={taskList} listName={listName} /> : null }
    </div>
  );
};

export default ListHeader