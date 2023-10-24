import axios from 'axios';
import { ImBin } from 'react-icons/im';

type TaskItem = {
    task : string;
    complete: boolean;
    id: number;
}

type DeleteButtonProps = {
    taskItem: TaskItem;
}    
const DeleteButton = ({taskItem}: DeleteButtonProps) => {

    const TaskId = taskItem.id;
    
    const deleteTaskHandler = async (TaskId:number) => {
      console.log(TaskId)  
      try {
            console.log('や');
            
            const res = await axios.delete(`http://localhost:3000/api/task/${TaskId}`);
            console.log('ま');
        } catch (error) {
            console.error(' faild to delete this task!', error);
        }
    }

  return (
    <div onClick={() => deleteTaskHandler(TaskId)} className='p-2 m-2 border'>
      <ImBin />
    </div>
  )
}

export default DeleteButton
