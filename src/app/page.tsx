"use client"
import { useState } from 'react';
import InputField from './components/InputField';
import AddButton from './components/AddButton';
import List from './components/List';

export default function Home() {
  const [task, setTask] = useState<string>('');
  const [taskList, setTaskList] = useState<string[]>([]);

  return (
    <main className='p-7 flex flex-col gap-5 mb-10'>
      <div className='flex flex-col items-center'>
        <h1 className='fond-bold text-7xl'>To Do List</h1>
        <p>What is your task?</p>
      </div>
      <div className='flex flex-row justify-center gap-2'>
        <InputField task={task} setTask={setTask}/>
        <AddButton task={task}
                setTask={setTask}
                setTaskList={setTaskList}
        />
      </div>
      <div className='flex flex-col mt-10 gap-5'>
        <List listName="incomplete" taskList={taskList} setTaskList={setTaskList} />
        <List listName="complete" taskList={taskList} setTaskList={setTaskList}/>
      </div>
    </main>
  );
};