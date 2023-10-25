import { FaRegEdit } from 'react-icons/fa';
import { editTaskQuery, fetchTasksQuery } from '../utils/queries';
import EditCancelButton from './EditCancelButton';

type TaskItem = {
    task : string;
    complete: boolean;
    id: number;
}
type TaskObject = {
  tasks: TaskItem[];
}
type EditButtonProps = {
    taskItem: TaskItem;
    editTaskOn: boolean;
    editedTask: string;
    setEditTaskOn:(value:boolean) => void;    
    setEditedTask:(value:string) => void;
    setTaskList:(value:TaskObject) => void;
}

const EditButton = ({taskItem, editTaskOn, editedTask, setEditTaskOn, setEditedTask, setTaskList } :EditButtonProps) => {
  
  const thisId: number = taskItem.id;
  
  // EDIT TASK
  const editTaskHandler = async (thisId:number, editedTask: string) => {
    try {
      await editTaskQuery(thisId, editedTask);
      const fetchNewList = await fetchTasksQuery();
      setTaskList({"tasks": fetchNewList});
    } catch (error) {
      console.error('EDIT: error happen', error);
    }
  }  
  
  //Open edit buttons / Open edit space 
  const editSpaceOpenHandler = () => {
    if(editTaskOn === false) {
      // Open 
      setEditTaskOn(true);
    } else if (editTaskOn === true ) {
      // PATCH DATA 
      editTaskHandler(thisId, editedTask);
      setEditTaskOn(false);
    }  
  }

  return (
    <div className='flex flex-row'>
      <div onClick={editSpaceOpenHandler} className='flex flex-row justify-center items-center gap-1 p-2 m-2 border rounded-md h-[34px]'>
        <FaRegEdit />
        { editTaskOn ? <p className='text-xs'>Complete to edit</p> : null}
      </div>
      { editTaskOn ? <EditCancelButton taskItem={taskItem} setEditedTask={setEditedTask} setEditTaskOn={setEditTaskOn} /> : null} 
    </div>
  )
}

export default EditButton