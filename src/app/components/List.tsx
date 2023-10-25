"use client"
import { Key, useEffect } from "react";
import { fetchTasksQuery } from "../utils/queries";
import ListCard from "./ListCard";
import TaskCounter from "./TaskCounter";

type TaskObject = {
    tasks: TaskItem[];
}
type TaskItem = {
    task : string;
    complete: boolean;
    id: number;
}
type ListProps = {
  taskList: TaskObject;
  setTaskList:(value:TaskObject) => void;
  listName: string;
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
      <div className="flex flex-row justify-between items-end">
        <h2 className="text-bold text-2xl ">{ listName == "incomplete" ? "Tasks" : "Completed Tasks" }</h2>
        { taskList && taskList.tasks ? <TaskCounter taskList={taskList} listName={listName}/> : null }
      </div>
      <div className="flex flex-col gap-2 md:grid grid-cols-2">
        { taskList && taskList.tasks ? (
          taskList.tasks.map((item: TaskItem , i: number ) => {
            if(listName === "incomplete" && item.complete === false) {
        
              return  <ListCard key={i}
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
    </div>
  );
};

export default List