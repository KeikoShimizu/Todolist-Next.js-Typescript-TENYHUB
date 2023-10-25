// GET TASKS 
export const fetchTasksQuery = async () => {
    try {
      const response = await fetch('/taskList.json', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status !== 200) {
        throw new Error('GET: failed.');
      }
  
      const data = await response.json();
      return data.tasks;
    } catch (error) {
      console.error('GET: error happen', error);
      throw error;
    }
  };
  
  // DELETE TASK
  export const deleteTaskQuery = async (thisId:number) => {
    try {
      const response = await fetch(`/api/task?id=${thisId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status !== 200) {
        throw new Error('DELETE: failed.');
      }
  
      const data = await response.json();
      return data.tasks;
    } catch (error) {
      console.error('DELETE: error happen', error);
      throw error;
    }
  };
  
// EDIT TASK
  export const editTaskQuery = async (thisId:number, editedTask: string) => {
    try {
      const response = await fetch(`/api/task?id=${thisId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task: editedTask }),
      });
  
      if (response.status !== 200) {
        throw new Error('EDIT: failed.');
      }
  
      console.log('EDIT: successed!');
      // ここで必要に応じて何か追加の処理を行うことができます。
  
    } catch (error) {
      console.error('EDIT: error happen', error);
      throw error;
    }
  };
  