import InputField from "./InputField";
import AddButton from "./AddButton";
type InputAreaProps = {
    task: string;
    setTask: (newTask: string) => void; 
    setTaskList: (value:string[]) => void; 
}
const InputArea = ({ task, setTask, setTaskList}: InputAreaProps) => {
  return (
    <div className='flex flex-row justify-center gap-2'>
        <InputField task={task} setTask={setTask}/>
        <AddButton task={task}
                setTask={setTask}
                setTaskList={setTaskList}
        />
      </div>
  )
}

export default InputArea
