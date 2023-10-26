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
    setMessage: (value:string) => void;
    setTaskList:(value:TaskObject) => void;
}

const ListCard = ({ key, taskItem, taskList, setTaskList, setMessage }: ListCardProps) => {
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
      // 1.Change value of "complete"  
      await editCompQuery(thisId, !thisComp);
      // 2.Fetch　New Data
      const fetchNewList = await fetchTasksQuery();
      setTaskList({"tasks": fetchNewList});
      setMessage(`"${taskItem.task}" is ${!thisComp ? "moved to Complete List" : "restored to Task List"}!`)
    } catch (error) {
      console.error('EDIT COMP: error happen', error);
    };
  };

  return (
    <div key={key} className={`flex flex-col border justify-between shadow-md ${thisComp === true ? "bg-pink-50" : "bg-yellow-50"}`}>
      <div className='flex gap-2 p-1 h-[80px]'>
          <input  type="checkbox"
                  id="completeCheckBox"
                  onChange={handleCheckBox}
                  checked={taskItem.complete}
                  className='form-checkbox h-5 w-5 hover:cursor-pointer'
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
                    id="addtaskplace"
                    maxLength={40}
                    value={editedTask}
                    onChange={handleEditChange}
                    placeholder={taskItem.task}
                    className={`border-b-2 h-11 w-full placeholder-font-small ${thisComp == true ? "bg-pink-50" : "bg-yellow-50"} placeholder-text-xs `}
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