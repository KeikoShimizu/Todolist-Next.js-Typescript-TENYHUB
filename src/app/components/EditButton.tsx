import axios from 'axios';
import { FaRegEdit } from 'react-icons/fa';
import EditCancelButton from './EditCancelButton';

type TaskItem = {
    task : string;
    complete: boolean;
    id: number;
}

type EditButtonProps = {
    taskItem: TaskItem;
    editTaskOn: boolean;
    setEditTaskOn:(value:boolean) => void;
    editedTask: string;
    setEditedTask:(value:string) => void;
    updateList:(method: string, thisId: number) => void;
}
const EditButton = ({taskItem, editTaskOn, setEditTaskOn, editedTask, setEditedTask, updateList} :EditButtonProps) => {
  
  const thisId = taskItem.id;
  const method: string = "Edit";

  // EDIT TASK
  const editTaskHandler = async (thisId:number, editedTask: string) => {
    await fetch(`/api/task?id=${thisId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then (response => {
      if (response.status === 200) {
        console.log('EDIT: successed!');
        updateList(method, thisId);
      } else {
        console.error('EDIT: failed.');
      }
    })
    .catch(error => {
      console.error('EDIT: error happen', error);
    });
  };  
  
  //Open edit buttons / Open edit space 
  const editSpaceOpenHandler = (thisId: number) => {
      if(editTaskOn === false) {
        //1. 開ける
        setEditTaskOn(true);
        console.log('EDIT 始める');

      } else if (editTaskOn === true ) {
        // 3.Save 
        console.log('これだよ新しいの',editedTask);
        // inputからuseStateを持ってくる
        // storeしたものをFetchした元のものから新しいものにPatchする（PATCH）
        editTaskHandler(thisId, editedTask);
        setEditTaskOn(false);
        console.log('EDIT閉めるよ');
      }  
    }

  return (
    <div>
      <div onClick={editSpaceOpenHandler} className='flex flex-row p-2 m-2 border'>
        <FaRegEdit />
        { editTaskOn ? <p>Complete to edit</p> : null}
      </div>

      { editTaskOn ? <EditCancelButton taskItem={taskItem} setEditedTask={setEditedTask} setEditTaskOn={setEditTaskOn} /> : null} 
    </div>
  )
}

export default EditButton
