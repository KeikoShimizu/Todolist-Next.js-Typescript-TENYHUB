type Input = {
    task: string;
    setTask:(newTask: string) => void; 
}

const InputField = ({ task, setTask }: Input) => {

    const handleInputChange = (e: { target: { value: string; }; }) => {
        setTask(e.target.value);
    };

    return (
    <>
        <input  
                value={task} 
                maxLength={40}
                onChange={handleInputChange}
                placeholder="Please input your task?"
                className="border text-black px-4 py-2 w-full order-1 h-12 w- rounded-md whitespace-normal"
        />
    </>
  );
};

export default InputField