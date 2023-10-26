"use client"
import { useState } from 'react';
import Header from './components/Header';
import InputArea from './components/InputArea';
import MessageArea from './components/MessageArea';
import ListArea from './components/ListArea';
import Footer from './components/Footer';

export default function Home() {
  const [ task, setTask ] = useState<string>('');
  const [ taskList, setTaskList ] = useState<string[]>([]);
  const [ message, setMessage ] = useState<string>('');
  const [ warning, setWarning ] = useState<boolean>(false);

  return (
    <>
      <Header />
      <main className='p-7 flex flex-col gap-5 mb-10'>
        <InputArea  task={task}
                    setTask={setTask}
                    setTaskList={setTaskList}
                    setMessage={setMessage}
                    setWarning={setWarning}
        />
        <MessageArea message={message} setMessage={setMessage} warning={warning}/>
        <ListArea taskList={taskList} setTaskList={setTaskList} setMessage={setMessage}/>
      </main>
      <Footer />
    </>
  );
};