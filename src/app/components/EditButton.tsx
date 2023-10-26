import { FaRegEdit } from 'react-icons/fa';
import { editTaskQuery, fetchTasksQuery } from '../utils/queries';
import CancelButton from './CancelButton';

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
    setMessage:(value: string) => void;
}

const EditButton = ({taskItem, editTaskOn, editedTask, setEditTaskOn, setEditedTask, setTaskList, setMessage } :EditButtonProps) => {
  
  const thisId: number = taskItem.id;
  const originTask: string = taskItem.task;
  
  // EDIT TASK
  const editTaskHandler = async (thisId:number, editedTask: string) => {
    try {
      await editTaskQuery(thisId, editedTask);
      const fetchNewList = await fetchTasksQuery();
      setTaskList({"tasks": fetchNewList});
      setMessage(`Task "${originTask}" is now editted as "${editedTask}"!` )
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
      <div onClick={editSpaceOpenHandler} className="flex flex-row justify-center items-center border bg-white gap-1 p-2 m-2 
      rounded-md h-[34px] shadow-md transition duration-300 ease-in hover:bg-orange-500 hover: border-color-orange hover:text-white 
      hover:border-transparent} ">
        <FaRegEdit />
        { editTaskOn ? <p className='text-xs'>Complete to edit</p> : null}
      </div>
      { editTaskOn ? <CancelButton taskItem={taskItem} setEditedTask={setEditedTask} setEditTaskOn={setEditTaskOn} /> : null} 
    </div>
  )
}

export default EditButton