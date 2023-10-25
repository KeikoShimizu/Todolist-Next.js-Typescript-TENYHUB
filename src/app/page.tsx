"use client"
import { useState } from 'react';
import InputField from './components/InputField';
import AddButton from './components/AddButton';
import List from './components/List';

export default function Home() {
  const [task, setTask] = useState<string>('');
  const [taskList, setTaskList] = useState<string[]>([]);

  return (
    <main>
      <h1>To Do List</h1>
      <InputField task={task} setTask={setTask}/>
      <AddButton task={task} 
              setTask={setTask}  
              setTaskList={setTaskList}
      />
      <div className='flex flex-row'>
        <List listName="incomplete" taskList={taskList} setTaskList={setTaskList} />
        <List listName="complete" taskList={taskList} setTaskList={setTaskList}/>
      </div>
    </main>
  );
};