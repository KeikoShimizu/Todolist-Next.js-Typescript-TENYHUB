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

const CancelButton = ({ taskItem, setEditedTask, setEditTaskOn }: EditCancelButtonprops) => {

  //Cancel edit / Close edit buttons / Close edit space
  const cancelEditHandler = () => {
      setEditedTask(taskItem.task);
      setEditTaskOn(false);
  }

  return (
    <div onClick={cancelEditHandler} className='flex flex-row items-center gap-1 p-2 m-2 border bg-white
    rounded-md w-[133px] shadow-md transition duration-300 ease-in hover:bg-blue-500 hover:text-white 
    hover:fill-current'>
      <FaRegHandPaper />
      <p className='text-xs'>Cancel</p>
    </div> 
  );
};

export default CancelButton