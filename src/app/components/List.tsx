"use client"
import { Key, useEffect, useState } from "react";
import axios from 'axios';
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
  const [completeTask, setCompleteTask] = useState<boolean>(false);
  const [compTasksList, setCompTasksList] = useState<string[]>([]);

    useEffect(() => {
      if(listName === "incomplete"){
        const primaryTaskList: TaskObject = { tasks: []};
        setTaskList(primaryTaskList);

        //GET TASKS
        const fetchTasks = async () => {
          try {
            const res = await axios.get('/taskList.json');
            console.log(res.data.tasks);
            setTaskList(res.data);
          } catch (error) {
            console.error('Failed to fetch tasks', error);
          } 
        }
        fetchTasks();
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
                              completeTask={completeTask} 
                              setTaskList={setTaskList}
                              setCompleteTask={setCompleteTask} 
                    />
          } else if (listName === "complete" && item.complete === true) {
            return  <ListCard key={i} 
                              taskList={taskList}
                              taskItem={item} 
                              completeTask={completeTask}
                              setTaskList={setTaskList} 
                              setCompleteTask={setCompleteTask} 
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