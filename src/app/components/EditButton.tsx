import axios from 'axios';
import { FaRegEdit } from 'react-icons/fa';

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
}
const EditButton = ({taskItem, editTaskOn, setEditTaskOn, editedTask, setEditedTask} :EditButtonProps) => {
    // console.log('Editするもの',taskItem.task);
  const editTaskHandler = async () => {
    try {
      const updatedTask = {...taskItem, task: editedTask }
      const res = await axios.patch(`api/task/${taskItem.id}`, updatedTask);
      setEditedTask(res.data);
      // setTask('');
    } catch (error) {
      console.error('failed to edit task', error);
    }  
  }  
  
  const editBtnClickHandler = () => {
      if(editTaskOn === false){
        setEditTaskOn(true);
        console.log('EDIT してる');
      } else {
        // Patchさせる
        editTaskHandler();
        setEditTaskOn(false);
        console.log('EDIT完了');
      }  
    }

  return (
    <div onClick={editBtnClickHandler} className='p-2 m-2 border'>
      <FaRegEdit />
      {editTaskOn ? <p>Complete to edit</p> : null}
    </div>
  )
}

export default EditButton
