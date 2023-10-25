import React from 'react';
import { FaRegHandPaper } from 'react-icons/fa';

type TaskItem = {
    task : string;
    complete: boolean;
    id: number;
}
type EditCancelButtonprops = {
    taskItem: TaskItem;
    setEditedTask:(value:string) => void;
    setEditTaskOn:(value:boolean) => void;
}

const EditCancelButton = ({ taskItem, setEditedTask, setEditTaskOn }: EditCancelButtonprops) => {

    //Cancel edit / Close edit buttons / Close edit space
    const cancelEditHandler = () => {
        setEditedTask(taskItem.task);
        setEditTaskOn(false);
    }

  return (
    <div onClick={cancelEditHandler} className='flex flex-row items-center gap-1 p-2 m-2 border rounded-md w-[133px] shadow-md'>
          <FaRegHandPaper />
          <p className='text-xs'>Cancel</p>
    </div> 
  );
};

export default EditCancelButton