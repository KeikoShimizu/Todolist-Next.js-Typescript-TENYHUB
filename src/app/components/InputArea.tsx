import InputField from "./InputField";
import AddButton from "./AddButton";

type InputAreaProps = {
    task: string;
    setTask: (newTask: string) => void; 
    setTaskList: (value:string[]) => void; 
    setMessage: (value:string) => void; 
    setWarning:(value:boolean) => void;
}
const InputArea = ({ task, setTask, setTaskList, setMessage, setWarning }: InputAreaProps) => {
    return (
        <div className="border rounded-md shadow-md bg-white flex flex-col items-center w-full py-5 
        px-2 md:px-4 md:w-2/3 mx-auto max-w-md">
            <h3 className="mb-5  text-xl">Create your task card</h3>
            <div className='flex flex-col justify-center items-center gap-2 w-full'>
                <InputField task={task} setTask={setTask}/>
                <AddButton  task={task}
                            setTask={setTask}
                            setTaskList={setTaskList}
                            setMessage={setMessage}
                            setWarning={setWarning}
                />
            </div>
        </div>
    )
}

export default InputArea