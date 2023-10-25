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
        <input  type="text" 
                value={task} 
                onChange={handleInputChange}
                placeholder="Please input your task?"
                className="border text-black px-4 py-2 order-1 h-16 w-full rounded-md"
        />
    </>
  );
};

export default InputField