import { postTaskQuery } from "../utils/queries";

type AddButtonProps = {
    task: string, 
    setTask:(value:string)=> void, 
    setTaskList:(value:string[]) => void,
};

const AddButton = ({ task, setTask, setTaskList }: AddButtonProps) => {

    const addTaskHandler = async () => {
      try {
        const newList = await postTaskQuery(task);
        console.log(newList)
        setTaskList(newList);
        setTask('');
      } catch (error) {
        console.error('POST: error happen', error);
      };    
    };
    
  return (
    <>
      <button onClick={addTaskHandler} className='border p-2 order-3'>
          Add Task
      </button>
    </>
  );
};

export default AddButton