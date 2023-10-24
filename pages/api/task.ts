// import fs from 'fs-extra';
import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { task } = req.body;
        try {
          const data = await fs.readFile('public/taskList.json', 'utf8');
          const taskList = JSON.parse(data);

          // Generate ID 
          const maxId = Math.max(...taskList.tasks.map(task => task.id));
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
        console.log('DELETEリクエストが到達しました');
        const taskId = req.query.id as string;
        console.log('DELETEリクエストが到達しました');
        console.log('Type of req.query.id:', typeof req.query.id);
        console.log(taskId)
        try {
            // Read file
            const data = await fs.readFile('public/taskList.json', 'utf8');
            const taskList = JSON.parse(data);

            // Find task & Delete
            const taskIndex = taskList.tasks.findIndex((task: { id: number }) => task.id === parseInt(taskId, 10));

            if (taskIndex !== -1) {
              taskList.tasks.splice(taskIndex, 1);
              // Write in JSON file
              await fs.writeFile('public/taskList.json', JSON.stringify(taskList, null, 2));
              res.status(200).json(taskList);
            } else {
              res.status(400).json({ error: 'Task not found!!!!!' });
            }
        } catch (error) {
          console.error('Errorだよ:', error);
          res.status(500).json({ error: 'Failed to delete task' });
        }

    } else if (req.method === 'PATCH') {
        const taskId = req.query.id as string;
        const updatedTask = req.body.editedTask as string;

        try {
          const data = await fs.readFile('public/taskList.json', 'utf8');
          const taskList = JSON.parse(data);
          const taskIndex = taskList.tasks.findIndex((task: { id: number }) => task.id === parseInt(taskId, 10));
            
            if (taskIndex !== -1) {
              taskList.tasks[taskIndex].task = updatedTask;
              await fs.writeFile('public/taskList.json', JSON.stringify(taskList, null, 2));
              res.status(200).json(taskList);
            } else {
              res.status(400).json({ error: 'Task not found' });
            }
        } catch (error) {
          console.error('Error:', error);
          res.status(500).json({ error: 'Failed to edit task' });
        }
    } else {
        res.status(405).end();
    }
};