"use client"
import { useState } from 'react';
import HeaderArea from './components/HeaderArea';
import InputArea from './components/InputArea';
import MessageArea from './components/MessageArea';
import ListArea from './components/ListArea';

export default function Home() {
  const [task, setTask] = useState<string>('');
  const [taskList, setTaskList] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');
  const [warning, setWarning] = useState<boolean>(false);

  return (
    <main className='p-7 flex flex-col gap-5 mb-10'>
      <HeaderArea />
      <InputArea  task={task} 
                  setTask={setTask} 
                  setTaskList={setTaskList} 
                  message={message} 
                  setMessage={setMessage}
                  setWarning={setWarning}
      />
      <MessageArea message={message} setMessage={setMessage} warning={warning}/>
      <ListArea taskList={taskList} setTaskList={setTaskList} message={message} setMessage={setMessage}/>
    </main>
  );
};