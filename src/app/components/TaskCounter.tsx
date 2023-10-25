"use client"
import { useEffect, useState } from "react";

type TaskObject = {
    tasks: TaskItem[];
}
type TaskItem = {
    task : string;
    complete: boolean;
    id: number;
}
type TaskCounterProps = {
    taskList:TaskObject;
    listName: string;
}

const TaskCounter = ({listName, taskList}: TaskCounterProps) => {
    const [unCompTaskNbr, setUnCompTaskNbr] = useState<number>(0);
    const [compTaskNbr, setcompTaskNbr] = useState<number>(0);

    useEffect(() => {
        const uncompNbr = taskList.tasks.filter(task => task.complete === false);
        const compNbr = taskList.tasks.filter(task => task.complete === true);
        setUnCompTaskNbr(uncompNbr.length);
        setcompTaskNbr(compNbr.length);
    },[taskList]);
    
  return (
    <>
        { taskList && taskList.tasks ? (
            <p className="text-sm">
                { listName === "complete" ? compTaskNbr : unCompTaskNbr } { (compTaskNbr <= 1 || unCompTaskNbr <= 1) ? "Task" : "Tasks"}
            </p> 
        ) : null }
    </>
  )
}

export default TaskCounter
