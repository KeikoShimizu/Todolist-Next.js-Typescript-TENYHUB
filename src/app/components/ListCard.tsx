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
    message: string;
    taskItem: TaskItem;
    taskList: TaskObject;
    setMessage: (value:string) => void;
    setTaskList:(value:TaskObject) => void;
}

const ListCard = ({ key, taskItem, taskList, setTaskList, message, setMessage }: ListCardProps) => {
  const [editTaskOn, setEditTaskOn] = useState<boolean>(false);
  const [editedTask, setEditedTask] = useState<string>('');

  const thisId: number = taskItem.id;
  const thisComp: boolean = taskItem.complete;

  const handleEditChange = (e: { target: { value: string; }; }) => {
    setEditedTask(e.target.value);
  };
  
  // Change true once you click
  const handleCheckBox = async () => {
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
    <div key={key} className="flex flex-col border justify-between shadow-md animate-slideup">
      <div className='flex gap-2 p-1'>
        <input  type="checkbox" 
                id="completeCheckBox" 
                onChange={handleCheckBox} 
                checked={taskItem.complete}
                className='form-checkbox text-indigo-600 h-4 w-4'
        />
        { !editTaskOn ? (
          <div className='flex gap-1'>
            <h4 className='text-xs pt-1'>Task: </h4>
            <p>{taskItem.task}</p>
          </div>
        ) : (
        <div className='flex gap-1 w-full'>
          <h4 className='text-xs pt-1'>Task: </h4>
          <input  type="text"
                    value={editedTask}
                    onChange={handleEditChange}
                    placeholder={taskItem.task}
                    className='border h-11 w-full'
              />
        </div>
        )}
      </div>
      <div className='flex flex-row'>
        <DeleteButton taskItem={taskItem}
                      taskList={taskList}
                      setMessage={setMessage} 
                      setTaskList={setTaskList}
        />
        <EditButton taskItem={taskItem}
                    editTaskOn={editTaskOn}
                    editedTask={editedTask}
                    setEditTaskOn={setEditTaskOn}
                    setEditedTask={setEditedTask}
                    setTaskList={setTaskList}
                    setMessage={setMessage}
        />
      </div>
    </div>
  );
};

export default ListCard