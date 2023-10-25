"use client"
import { useState } from 'react';
import HeaderArea from './components/HeaderArea';
import InputArea from './components/InputArea';
import ListArea from './components/ListArea';
import List from './components/List';

export default function Home() {
  const [task, setTask] = useState<string>('');
  const [taskList, setTaskList] = useState<string[]>([]);

  return (
    <main className='p-7 flex flex-col gap-5 mb-10'>
      <HeaderArea />
      <InputArea task={task} setTask={setTask} setTaskList={setTaskList}/>
      <ListArea taskList={taskList} setTaskList={setTaskList}/>
    </main>
  );
};