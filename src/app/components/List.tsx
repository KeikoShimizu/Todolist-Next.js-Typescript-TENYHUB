"use client"
import { useEffect, useState } from "react";
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
  listName: string;
  taskList: TaskObject;
  setMessage: (value:string) => void;
  setTaskList:(value:TaskObject) => void; 
}

const List = ({ listName, taskList, setTaskList, setMessage }: ListProps) => {

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
    <div className="lg:w-1/2">
      <ListHeader setMessage={setMessage} taskList={taskList} setTaskList={setTaskList} listName={listName}/>
      <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-3 lg:flex 2xl:grid">
        { taskList && taskList.tasks ? (
          taskList.tasks.slice().reverse().map((item: TaskItem , i: number ) => {
            if(listName === "incomplete" && item.complete === false) {
              return  <ListCard key={i}
                                taskItem={item}
                                taskList={taskList}
                                setMessage={setMessage}
                                setTaskList={setTaskList}
                      />
            } else if (listName === "complete" && item.complete === true) {
              return  <ListCard key={i}
                                taskItem={item}
                                taskList={taskList}
                                setMessage={setMessage}
                                setTaskList={setTaskList}
                      />
            }
            return null;
          })
        ) :  null }
      </div>
    </div>
  )
};

export default List