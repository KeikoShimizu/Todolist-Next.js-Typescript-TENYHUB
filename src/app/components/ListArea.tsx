import List from "./List"

type ListAreaProps = {
    taskList: string[]; 
    message: string; 
    setMessage: (value:string) => void;
    setTaskList: (value:string[]) => void; 
}
const ListArea = ({taskList, setTaskList, message, setMessage }: ListAreaProps) => {
  return (
    <div className='flex flex-col mt-10 gap-5'>
        <List listName="incomplete" taskList={taskList} setTaskList={setTaskList} message={message} setMessage={setMessage}/>
        <List listName="complete" taskList={taskList} setTaskList={setTaskList} message={message} setMessage={setMessage}/>
    </div>
  )
}

export default ListArea
