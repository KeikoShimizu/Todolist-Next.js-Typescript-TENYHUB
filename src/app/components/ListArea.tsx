import List from "./List";

type TaskItem = {
    task : string;
    complete: boolean;
    id: number;
}
type TaskObject = {
    tasks: TaskItem[];
}
type ListAreaProps = {
    taskList: TaskObject; 
    message: string; 
    setMessage: (value:string) => void;
    setTaskList:(value:TaskObject) => void; 
}
const ListArea = ({taskList, setTaskList, message, setMessage }: ListAreaProps) => {
  return (
    <div className='mt-10 flex flex-col gap-20 sm:flex sm:flex-col sm:gap-10 lg:flex-row lg:gap-10'>
        <List listName="incomplete" taskList={taskList} setTaskList={setTaskList} setMessage={setMessage}/>
        <List listName="complete" taskList={taskList} setTaskList={setTaskList} setMessage={setMessage}/>
    </div>
  )
}

export default ListArea
