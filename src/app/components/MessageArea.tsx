type MessageAreaProps = {
    message: string;
    warning: boolean;
    setMessage:(value:string) => void;
}

const MessageArea = ({ message, warning, setMessage }:MessageAreaProps ) => {
    
    // Set messag edisplay duration is 5 seconds
    setTimeout(() => { setMessage('')}, 10000);

    return (
        <div className="h-[14px]">  
            { message ? <p className={`text-sm ${warning ? "text-red-500" : "text-blue-500" }  text-center`}>{message}</p> : null }
        </div>    
  );
};

export default MessageArea