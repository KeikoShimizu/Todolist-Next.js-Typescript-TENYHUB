import React from 'react'
import axios from 'axios';

type AddButtonProps = {
    task: string, 
    setTask:(value:string)=> void, 
    taskList: string[], 
    setTaskList:(value:string[]) => void,
};

const AddButton = ({ task, setTask, taskList, setTaskList }: AddButtonProps) => {
    const purpose: string = 'Add Task';

    const addTaskHandler = async () => {
        try {
          const res = await axios.post('api/task', { task });
          setTaskList(res.data);
          setTask('');
        } catch (error) {
          console.error('failed to add task', error);
        }  
      }
    
  return (
    <>
        <button onClick={addTaskHandler} className='border p-2 order-3'>
            {purpose}
        </button>
    </>
  );
};

export default AddButton

// Add & Edit $ Deleteの３つの役割
// ParamでPassingすることで使い分け