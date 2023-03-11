// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  equalTo,
  getDatabase,
  orderByChild,
  query,
  ref as dbRef,
} from "firebase/database";
import { useDatabaseList, useDatabaseObject } from "vuefire";
import type { Task, TaskList } from "./interfaces";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcqVkI17T5XgvzOlpGDzO3Bci3oUC4vcU",
  authDomain: "coop-lists.firebaseapp.com",
  databaseURL: "https://coop-lists-default-rtdb.firebaseio.com",
  projectId: "coop-lists",
  storageBucket: "coop-lists.appspot.com",
  messagingSenderId: "19365554384",
  appId: "1:19365554384:web:d501cf0da24755cebd96d5",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
// This happens automatically in main.ts: https://vuefire.vuejs.org/guide/auth.html#installation
// getAuth(firebaseApp);

export function getLists(userId: string): TaskList[] {
  const listArray = useDatabaseList<TaskList>(
    query(
      dbRef(getDatabase(), `lists`),
      orderByChild("owners"),
      equalTo(userId)
    )
  );
  return listArray.value;
}

export function getList(listId: string): TaskList | undefined | null {
  const list = useDatabaseObject<TaskList>(
    dbRef(getDatabase(), `lists/${listId}`)
  );
  return list.value;
}

export function getTasks(listId: string): Task[] {
  const tasksArray = useDatabaseList<Task>(
    dbRef(getDatabase(), `lists/${listId}/tasks`)
  );
  return tasksArray.value;
}

export function getTask(taskId: string): Task | undefined | null {
  const task = useDatabaseObject<Task>(dbRef(getDatabase(), `tasks/${taskId}`));
  return task.value;
}
