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
    <div className='mt-10 sm:flex sm:flex-col lg:flex-row'>
        <List listName="incomplete" taskList={taskList} setTaskList={setTaskList} message={message} setMessage={setMessage}/>
        <List listName="complete" taskList={taskList} setTaskList={setTaskList} message={message} setMessage={setMessage}/>
    </div>
  )
}

export default ListArea
