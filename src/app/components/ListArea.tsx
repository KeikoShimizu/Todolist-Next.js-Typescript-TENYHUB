import List from "./List"

type ListAreaProps = {
    taskList: string[]; 
    setTaskList: (value:string[]) => void; 
}
const ListArea = ({taskList, setTaskList}: ListAreaProps) => {
  return (
    <div className='flex flex-col mt-10 gap-5'>
        <List listName="incomplete" taskList={taskList} setTaskList={setTaskList} />
        <List listName="complete" taskList={taskList} setTaskList={setTaskList}/>
    </div>
  )
}

export default ListArea
