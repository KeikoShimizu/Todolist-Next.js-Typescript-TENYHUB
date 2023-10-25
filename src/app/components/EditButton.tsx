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
    setEditTaskOn:(value:boolean) => void;
    editedTask: string;
    setEditedTask:(value:string) => void;
    setTaskList:(value:TaskObject) => void;
}

const EditButton = ({taskItem, editTaskOn, setEditTaskOn, editedTask, setEditedTask, setTaskList } :EditButtonProps) => {
  
  const thisId: number = taskItem.id;
  
  // EDIT TASK
  const editTaskHandler = async (thisId:number, editedTask: string) => {
    try {
      const editTaskList = await editTaskQuery(thisId, editedTask);
      const fetchNewList = await fetchTasksQuery();
      setTaskList({"tasks": fetchNewList});
    } catch (error) {
      console.error('EDIT: error happen', error);
    }
  }  
  
  //Open edit buttons / Open edit space 
  const editSpaceOpenHandler = () => {
      if(editTaskOn === false) {
        //1. Open 
        setEditTaskOn(true);
        console.log('EDIT 始める');
        
      } else if (editTaskOn === true ) {
        // 3.Save 
        console.log('これだよ新しいの',editedTask);
        // PATCH data
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
