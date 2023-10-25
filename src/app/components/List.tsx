"use client"
import { useState, useEffect } from "react";
import { fetchTasksQuery } from "../utils/queries";
import ListCard from "./ListCard";
import ListHeader from "./ListHeader";

type TaskObject = {
    tasks: TaskItem[];
}
type TaskItem = {
    task : string;
    complete: boolean;
    id: number;
}
type ListProps = {
  message: string;
  listName: string;
  taskList: TaskObject;
  setMessage: (value:string) => void;
  setTaskList:(value:TaskObject) => void; 
}

const List = ({ listName, taskList, setTaskList, message, setMessage }: ListProps) => {
  const [ selectAll, setSelectAll] = useState<boolean>(false);

  useEffect(() => {
    if(listName === "incomplete"){
      const primaryTaskList: TaskObject = { tasks: []};
      
      setTaskList(primaryTaskList);

      const fetchTaskData = async () => {
        try {
          const tasksData = await fetchTasksQuery();
          const newTaskList = { tasks : tasksData }
      
          setTaskList(newTaskList);
        } catch (error) {
          console.error('Failed to fetch tasks', error);
        };
      };
      fetchTaskData();
    } if (listName === "complete") {
      console.log('completed');
    }
  },[]);
    
  return (
    <div>
      <ListHeader selectAll={selectAll} setSelectAll={setSelectAll} taskList={taskList} listName={listName}/>
      <div className="flex flex-col gap-2 md:grid grid-cols-2">
        { taskList && taskList.tasks ? (
          taskList.tasks.slice().reverse().map((item: TaskItem , i: number ) => {
            if(listName === "incomplete" && item.complete === false) {
              return  <ListCard key={i}
                                taskItem={item}
                                message={message} 
                                taskList={taskList}
                                setMessage={setMessage}
                                setTaskList={setTaskList}
                      />
            } else if (listName === "complete" && item.complete === true) {
              return  <ListCard key={i}
                                taskItem={item}
                                message={message} 
                                taskList={taskList}
                                setMessage={setMessage}
                                setTaskList={setTaskList}
                      />
            }
            return null;
          })
        ) : (
          <p>{ listName == "incomplete" ? "No tasks to display" : "No Completed Tasks" }</p>
        )}
      </div>
    </div>
  );
};

export default List