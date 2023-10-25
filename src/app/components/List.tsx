"use client"
import { Key, useEffect, useState } from "react";
import { fetchTasksQuery } from "../utils/queries";
import ListCard from "./ListCard";

type ListProps = {
    taskList?: TaskObject;
    setTaskList:(value:TaskObject) => void;
    listName: string;
}
type TaskObject = {
    tasks: TaskItem[];
}
type TaskItem = {
    task : string;
    complete: boolean;
    id: number;
}

const List = ({ listName, taskList, setTaskList }: ListProps) => {

    useEffect(() => {
      if(listName === "incomplete"){
        const primaryTaskList: TaskObject = { tasks: []};
        
        setTaskList(primaryTaskList);

        const fetchTaskData = async () => {
          try {
            const tasksData = await fetchTasksQuery();
            const newTaskList = { tasks : tasksData }
            console.log('これ',newTaskList);
            setTaskList(newTaskList);
          } catch (error) {
            console.error('Failed to fetch tasks', error);
          }
        };

        fetchTaskData();
      } if (listName === "complete") {
        console.log('終わってる');
      }
    },[]);
      
    return (
    <div>
      <h2 className="text-bold text-xl">{ listName == "incomplete" ? "Tasks" : "Completed Tasks" }</h2>
      { taskList && taskList.tasks ? (
        taskList.tasks.map((item: TaskItem , i: Key ) => {
          if(listName === "incomplete" && item.complete === false) {
            return  <ListCard  key={i}
                              taskList={taskList} 
                              taskItem={item} 
                              setTaskList={setTaskList}
                    />
          } else if (listName === "complete" && item.complete === true) {
            return  <ListCard key={i} 
                              taskList={taskList}
                              taskItem={item} 
                              setTaskList={setTaskList} 
                    />
          }
          return null; 
        })
      ) : (
        <p>{ listName == "incomplete" ? "No tasks to display" : "No Completed Tasks" }</p>
    )} 
    </div>
  );
};

export default List