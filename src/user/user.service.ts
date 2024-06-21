// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { UserClass } from '../../dto/user.dto';
import { doc, setDoc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase.config';

@Injectable()
export class UserService {
  async getUserById(id: string): Promise<UserClass | null> {
    try {
      const userDoc = doc(db, 'users', id);
      const docSnapshot = await getDoc(userDoc);
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        return new UserClass({ id: docSnapshot.id, ...userData });
      } else {
        return null; // Retorna null se o documento não existir
      }
    } catch (e) {
      console.error('Error fetching document: ', e);
      throw new Error('Error fetching document');
    }
  }

  async getUserByEmail(email: string): Promise<UserClass | null> {
    try {
      const userCollection = collection(db, 'users');
      const q = query(userCollection, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const docSnapshot = querySnapshot.docs[0];
        const userData = docSnapshot.data();
        return new UserClass({ id: docSnapshot.id, ...userData });
      }
      return null;
    } catch (e) {
      console.error('Error fetching document: ', e);
      throw new Error('Error fetching document');
    }
  }

  async createUser(UserClass: UserClass): Promise<UserClass> {
    try {
      const userRef = doc(db, 'users', String(UserClass.id));
      await setDoc(userRef, UserClass);
      return UserClass;
    } catch (e) {
      console.error('Error adding document: ', e);
      throw new Error('Error adding document');
    }
  }
}
