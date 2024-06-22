import { Injectable } from '@nestjs/common';
import { TaskClass } from 'dto/task.dto';
import { doc, setDoc, collection, getDocs, getDoc, where, query, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TaskService {
  async getAllTasks(idUser): Promise<TaskClass[]> {
    try {
      const taskCollection = collection(db, 'tasks');
      const q = query(taskCollection, where('createdBy', '==', idUser)); // Filtra as tarefas pelo createdBy igual a idUser
      const taskSnapshot = await getDocs(q);
      const tasks: TaskClass[] = [];
      taskSnapshot.forEach((doc) => {
        const taskData = doc.data();
        const task = new TaskClass({ ...taskData, id: doc.id });
        tasks.push(task);
      });
      return tasks;
    } catch (e) {
      console.error('Error fetching documents: ', e);
      throw new Error('Error fetching documents');
    }
  }

  async createTask(bodyReq: TaskClass): Promise<TaskClass> {
    const id = uuidv4();
    try {
      const taskRef = doc(db, 'tasks', id);
      await setDoc(taskRef, bodyReq);
      return bodyReq;
    } catch (e) {
      console.error('Error adding document: ', e);
      throw new Error('Error adding document');
    }
  }

  async updateTask(id: string, bodyReq: TaskClass, userId: string): Promise<any> {
    try {
      const taskRef = doc(db, 'tasks', id);
      const taskSnapshot = await getDoc(taskRef);
      if (!taskSnapshot.exists() || taskSnapshot.data().createdBy !== userId) {
        return {"error": "ID informado não existe ou não voce não é permitido alterar essa task", "statusCode": 400} // Lança um erro se o documento não existir ou for de outro ID
      }
      const updatedFields = { ...bodyReq };
      await updateDoc(taskRef, updatedFields);
      return bodyReq;
    } catch (e) {
      console.error('Error updating document: ', e);
      throw new Error('Error updating document');
    }
  }


  async deleteTask(id: string, userId: string): Promise<any> {
    try {
      const taskRef = doc(db, 'tasks', id);
      const taskSnapshot = await getDoc(taskRef);
      if (!taskSnapshot.exists() || taskSnapshot.data().createdBy !== userId) {
        return {"error": "ID informado não existe ou não voce não é permitido deletar essa task", "statusCode": 400}
      }
      await deleteDoc(taskRef);
      return {"success": "Task deletada com sucesso", "statusCode": 200}
    } catch (e) {
      console.error('Error deleting document: ', e);
      throw new Error('Error deleting document');
    }
  }
}