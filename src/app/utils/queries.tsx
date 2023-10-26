// POST TASK
export const postTaskQuery = async (task: string) => {
    try {
      const response = await fetch('/api/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task: task }),
      });
  
      if (response.status === 200) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to add task');
      }
    } catch (error) {
      console.error('Failed to add task', error);
      throw error;
    }
  };

// GET TASKS 
export const fetchTasksQuery = async () => {
    try {
      const response = await fetch('/taskList.json', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        const data = await response.json();
        return data.tasks;   
      } else {
        throw new Error('GET: failed.');
      }
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

    if (response.status === 200) {
      const data = await response.json();
      return data.tasks;
    } else {
      throw new Error('DELETE: failed.');
    }
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
  
      if (response.status === 200) {
        console.log('EDIT: successed!');
      } else {
        throw new Error('EDIT: failed.');
      }
    } catch (error) {
      console.error('EDIT: error happen', error);
      throw error;
    }
  };
  
// EDIT COMP
export const editCompQuery = async (thisId:number, thisComp: boolean) => {
  try {
    const response = await fetch(`/api/task?id=${thisId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ complete: thisComp }),
    });

    if (response.status === 200) {
      console.log('EDIT COMP: successed!');
    } else {
      throw new Error('EDIT COMP: failed.');
    }
  } catch (error) {
    console.error('EDIT COMP: error happen', error);
    throw error;
  }
};