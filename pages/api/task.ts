// import fs from 'fs-extra';
import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import cors from 'cors';
import path from 'path';

const corsMiddleware = cors();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  
    if (req.method === 'POST') {
        const { task } = req.body;
        
        try {
          const data = await fs.readFile('public/taskList.json', 'utf8');
          const taskList = JSON.parse(data);

          // Generate ID 
          const maxId = Math.max(...taskList.tasks.map((task: { id: any; }) => task.id));
          const newTask = { task: task, complete: false, id: maxId + 1}

          // Add new Task
          taskList.tasks.push(newTask);
          await fs.writeFile('public/taskList.json', JSON.stringify(taskList, null, 2));

          res.status(200).json(taskList);
        } catch (error) {
          console.error('Error:', error);
          res.status(500).json({ error: 'Failed to add task' });
        }

    } else if (req.method === 'DELETE') {
        const TaskId = req.query.id as string;
        
        try {
            // Read file
            const filePath = path.join(process.cwd(), 'public', 'taskList.json');
            const data = await fs.readFile(filePath, 'utf8');
            const taskList = JSON.parse(data);

            // Find task & Delete
            const taskIndex = taskList.tasks.findIndex((task: { id: number }) => task.id === parseInt(TaskId, 10));

            if (taskIndex !== -1) {
              taskList.tasks.splice(taskIndex, 1);
              // Write in JSON file
              await fs.writeFile(filePath, JSON.stringify(taskList, null, 2));
              res.status(200).json(taskList);
            } else {
              res.status(400).json({ error: 'Task not found!!!!!' });
            }
        } catch (error) {
          console.error('Errorだよ:', error);
          res.status(500).json({ error: 'Failed to delete task' });
        }

    } else if (req.method === 'PATCH') {
        const TaskId = req.query.id as string;
        const editedTask = req.body.task as string;
        const editedComp = req.body.complete as boolean;

        try {
          const data = await fs.readFile('public/taskList.json', 'utf8');
          const taskList = JSON.parse(data);
          const taskIndex = taskList.tasks.findIndex((task: { id: number }) => task.id === parseInt(TaskId, 10));
            
            if (taskIndex !== -1) {
              if( editedTask !== undefined) {
                taskList.tasks[taskIndex].task = editedTask;
              }
              if(editedComp !== undefined ) {
                taskList.tasks[taskIndex].complete = editedComp;
              }
              
              await fs.writeFile('public/taskList.json', JSON.stringify(taskList, null, 2));

              res.status(200).json(taskList);
            } else {
              res.status(400).json({ error: 'Task not found' });
            }
        } catch (error) {
          console.error('Error:', error);
          res.status(500).json({ error: 'Failed to edit ' });
        }
    } else {
        res.status(405).end();
    }
};