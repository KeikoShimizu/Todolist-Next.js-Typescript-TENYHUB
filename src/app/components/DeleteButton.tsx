"use client"
import { ImBin } from 'react-icons/im';
import { deleteTaskQuery } from '../utils/queries';

type TaskItem = {
  task : string;
  complete: boolean;
  id: number;
}
type TaskObject = {
  tasks: TaskItem[];
}
type DeleteButtonProps = {
  taskItem: TaskItem;
  taskList: TaskObject;
  setTaskList:(value:TaskObject) => void;
}    

const DeleteButton = ({ taskItem, taskList, setTaskList }: DeleteButtonProps) => {

  const thisId = taskItem.id;
  
  const updateNewList = (thisId: number) => {
      const updatedData = taskList.tasks.filter(task => task.id !== thisId);
      setTaskList({"tasks": updatedData});
  }

  //DELETE TASK
  const deleteTaskHandler = async (thisId:number) => {
    try {
      const updatedTaskList = await deleteTaskQuery(thisId);
      updateNewList(thisId);
    } catch (error) {
      console.error('DELETE: error happen', error);
    }
  }

  return (
    <div onClick={() => deleteTaskHandler(thisId)} className='flex flex-row justify-center items-center gap-1 p-2 m-2 border rounded-md'>
      <ImBin />
    </div>
  )
}

export default DeleteButton