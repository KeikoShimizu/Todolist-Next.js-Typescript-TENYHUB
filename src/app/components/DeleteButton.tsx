"use client"
import { ImBin } from 'react-icons/im';

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
    updateList:(method: string, thisId: number) => void;
}    
const DeleteButton = ({ taskItem, taskList, setTaskList, updateList }: DeleteButtonProps) => {

    const thisId = taskItem.id;
    const method: string = "Delete";
    
    //DELETE TASK
    const deleteTaskHandler = async (thisId:number) => {
      await fetch(`/api/task?id=${thisId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then (response => {
        if (response.status === 200) {
          console.log('DELETE: successed!');
          updateList(method, thisId);
        } else {
          console.error('DELETE: failed.');
        }
      })
      .catch(error => {
        console.error('DELETE: error happen', error);
      });
    }

  return (
    <div onClick={() => deleteTaskHandler(thisId)} className='p-2 m-2 border'>
      <ImBin />
    </div>
  )
}

export default DeleteButton
