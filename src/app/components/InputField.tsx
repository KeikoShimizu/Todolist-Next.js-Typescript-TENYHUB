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
                className="bg-blue-500 text-white px-4 py-2 order-1"
        />
    </>
  );
};

export default InputField