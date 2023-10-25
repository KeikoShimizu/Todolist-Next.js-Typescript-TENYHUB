import { postTaskQuery } from "../utils/queries";

type AddButtonProps = {
    task: string;
    setTask:(value:string)=> void;
    setTaskList:(value:string[]) => void;
    setMessage: (value:string) => void;
    setWarning:(value:boolean) => void; 
};

const AddButton = ({ task, setTask, setTaskList, setMessage, setWarning }: AddButtonProps) => {

    const addTaskHandler = async () => {
      // Send waring if task is empty
      if (!task) {
        setMessage('Task is empty. Please enter your task before adding.');
        return;
      }
      try {
        const newList = await postTaskQuery(task);
        setTaskList(newList);
        setTask('');
        setWarning(true);
        setMessage(`${task} is added on List!`);
      } catch (error) {
        console.error('POST: error happen', error);
      };    
    };
    
  return (
    <>
      <button onClick={addTaskHandler} className='border p-2 order-3 rounded-md shadow-md w-1/2 '>
          Add Task
      </button>
    </>
  );
};

export default AddButton