import React from 'react';
import { useState } from 'react';
import { editTaskQuery } from '../utils/queries';
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

type TaskItem = {
    task : string;
    complete: boolean;
    id: number;
}
type TaskObject = {
  tasks: TaskItem[];
}
type ListCardProps = {
    key: number;
    taskItem: TaskItem;
    taskList: TaskObject;
    setTaskList:(value:TaskObject) => void;
}

const ListCard = ({ key, taskItem, taskList, setTaskList }: ListCardProps) => {
  const [editTaskOn, setEditTaskOn] = useState<boolean>(false);
  const [editedTask, setEditedTask] = useState<string>('');
  const [completeTask, setCompleteTask] = useState<boolean>(false);

  const handleEditChange = (e: { target: { value: string; }; }) => {
    setEditedTask(e.target.value);
  };
  
  
  const handleCheckBox = () => {
    // console.log(completeTask)
    // setCompleteTask(!completeTask);
    // console.log(completeTask)
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

        <DeleteButton taskItem={taskItem} 
                      taskList={taskList} 
                      setTaskList={setTaskList}
        />
        <EditButton taskItem={taskItem} 
                    editTaskOn={editTaskOn} 
                    setEditTaskOn={setEditTaskOn} 
                    editedTask={editedTask} 
                    setEditedTask={setEditedTask}
                    setTaskList={setTaskList}
        />
    </div>
  )
}

export default ListCard
