import React from 'react';
import { useState } from 'react';
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
    completeTask: boolean;
    setTaskList:(value:TaskObject) => void;
    setCompleteTask:(value: boolean) => void;
}

const ListCard = ({ key, taskItem, taskList, completeTask, setTaskList, setCompleteTask }: ListCardProps) => {
  const [editTaskOn, setEditTaskOn] = useState<boolean>(false);
  const [editedTask, setEditedTask] = useState<string>('');

  const handleEditChange = (e: { target: { value: string; }; }) => {
    setEditedTask(e.target.value);
  };
  
  //Update List function (Delete & Edit) 
  const updateList = (method: string, thisId: number) => {
    if(method == "Delete") {
      const updatedData = taskList.tasks.filter(task => task.id !== thisId);
      setTaskList({"tasks": updatedData});
    } else if (method == "Edit") {
      console.log('editだよ');
      // Updateしたものを再fetch？TaskListの中身もUpdateする！
    }
  }

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

        <DeleteButton taskItem={taskItem} 
                      taskList={taskList} 
                      setTaskList={setTaskList}
                      updateList={updateList}
        />
        <EditButton taskItem={taskItem} 
                    editTaskOn={editTaskOn} 
                    setEditTaskOn={setEditTaskOn} 
                    editedTask={editedTask} 
                    setEditedTask={setEditedTask}
                    updateList={updateList}
        />
    </div>
  )
}

export default ListCard
