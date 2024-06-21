import { Injectable } from '@nestjs/common';
import { TaskClass } from 'dto/task.dto';
import { doc, setDoc, collection, getDocs, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config';



@Injectable()
export class TaskService {
  async getAllTasks(): Promise<TaskClass[]> {
    try {
      const taskCollection = collection(db, 'tasks');
      const taskSnapshot = await getDocs(taskCollection);
      const tasks: TaskClass[] = [];
      taskSnapshot.forEach((doc) => {
        tasks.push(new TaskClass({ id: parseInt(doc.id), ...doc.data() }));
      });
      return tasks;
    } catch (e) {
      console.error('Error fetching documents: ', e);
      throw new Error('Error fetching documents');
    }
  }

  async getTask(id: string): Promise<TaskClass | null> {
    try {
      const taskDoc = doc(db, 'tasks', id);
      const docSnapshot = await getDoc(taskDoc);
      if (docSnapshot.exists()) {
        const taskData = docSnapshot.data();
        return new TaskClass({ id: parseInt(docSnapshot.id), ...taskData });
      } else {
        return null; // Retorna null se o documento não existir
      }
    } catch (e) {
      console.error('Error fetching document: ', e);
      throw new Error('Error fetching document');
    }
  }

  async createTask(bodyReq: TaskClass): Promise<TaskClass> {
    try {
      const taskRef = doc(db, 'tasks', String(bodyReq.id));
      await setDoc(taskRef, bodyReq);
      return bodyReq;
    } catch (e) {
      console.error('Error adding document: ', e);
      throw new Error('Error adding document');
    }
  }
}
