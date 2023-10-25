import TaskCounter from "./TaskCounter";
import SelectAllCard from "./SelectAllCard";

type TaskObject = {
    tasks: TaskItem[];
}
type TaskItem = {
    task : string;
    complete: boolean;
    id: number;
}
type ListHeaderProps = {
    taskList: TaskObject;
    selectAll: boolean;
    setSelectAll:(value: boolean) => void;
    listName: string;
}

const ListHeader = ({selectAll, setSelectAll, taskList, listName }:ListHeaderProps) => {
  
    return (
    <div className="flex flex-row justify-between items-end mb-1">
        <div>
          <h2 className="text-bold text-2xl ">{ listName == "incomplete" ? "Tasks" : "Completed Tasks" }</h2>
          <SelectAllCard selectAll={selectAll} setSelectAll={setSelectAll}/>
        </div>
        { taskList && taskList.tasks ? <TaskCounter taskList={taskList} listName={listName}/> : null }
    </div>
  );
};

export default ListHeader