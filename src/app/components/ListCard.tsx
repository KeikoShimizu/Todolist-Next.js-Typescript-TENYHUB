import React from 'react';
import { useState } from 'react';
import { editCompQuery, fetchTasksQuery  } from '../utils/queries';
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

  const thisId: number = taskItem.id;
  const thisComp: boolean = taskItem.complete;

  const handleEditChange = (e: { target: { value: string; }; }) => {
    setEditedTask(e.target.value);
  };
  
  // Change true once you click
  const handleCheckBox = async () => {
    console.log(thisId, thisComp, !thisComp);
    try {
      // 1.Edit
      await editCompQuery(thisId, !thisComp);
      // 2.Fetch　New Data
      const fetchNewList = await fetchTasksQuery();
      setTaskList({"tasks": fetchNewList});
    } catch (error) {
      console.error('EDIT COMP: error happen', error);
    };
  };

  return (
    <div key={key} className="border flex flex-row">
      <input type="checkbox" id="completeCheckBox" onChange={handleCheckBox} checked={taskItem.complete}/>
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
                  editedTask={editedTask} 
                  setEditTaskOn={setEditTaskOn} 
                  setEditedTask={setEditedTask}
                  setTaskList={setTaskList}
      />
    </div>
  );
};

export default ListCard