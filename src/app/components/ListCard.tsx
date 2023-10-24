import React from 'react';
import { useState } from 'react';
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

type TaskItem = {
    task : string;
    complete: boolean;
    id: number;
}
type ListCardProps = {
    key: number;
    taskItem: TaskItem;
    completeTask: boolean;
    setCompleteTask:(value: boolean) => void;
}

const ListCard = ({ key, taskItem, completeTask, setCompleteTask }: ListCardProps) => {
  const [editTaskOn, setEditTaskOn] = useState<boolean>(false);
  const [editedTask, setEditedTask] = useState<string>('');

  const handleEditChange = (e: { target: { value: string; }; }) => {
    setEditedTask(e.target.value);
  };
  
  const handleCheckBox = () => {
    console.log(completeTask)
    setCompleteTask(!completeTask);
    console.log(completeTask)
  }

  return (
    <div key={key} className="border flex flex-row">
        <input type="checkbox" id="completeCheckBox" onClick={handleCheckBox}/>
        { !editTaskOn ? 
          <p>{taskItem.task}</p> 
        : <input  type="text" 
                  value={editedTask} 
                  onChange={handleEditChange} 
                  placeholder={taskItem.task}
                  className='border'/>
        }
        <DeleteButton taskItem={taskItem} />
        <EditButton taskItem={taskItem} 
                    editTaskOn={editTaskOn} 
                    setEditTaskOn={setEditTaskOn} 
                    editedTask={editedTask} 
                    setEditedTask={setEditedTask}/>
    </div>
  )
}

export default ListCard
