import InputField from "./InputField";
import AddButton from "./AddButton";
type InputAreaProps = {
    task: string;
    message: string;
    setTask: (newTask: string) => void; 
    setTaskList: (value:string[]) => void; 
    setMessage: (value:string) => void; 
    setWarning:(value:boolean) => void;
}
const InputArea = ({ task, setTask, setTaskList, message, setMessage, setWarning }: InputAreaProps) => {
    return (
        <div className='flex flex-col justify-center items-center gap-2'>
            <InputField task={task} setTask={setTask}/>
            <AddButton  task={task}
                        setTask={setTask}
                        setTaskList={setTaskList}
                        message={message} 
                        setMessage={setMessage}
                        setWarning={setWarning}
            />
        </div>
  )
}

export default InputArea
