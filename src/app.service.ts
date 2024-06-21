import { Injectable } from '@nestjs/common';
import { TaskClass } from 'dto/task.dto';
import { doc, setDoc, collection, getDocs, getDoc } from 'firebase/firestore';
import { db } from './firebase.config';



@Injectable()
export class AppService {

}
