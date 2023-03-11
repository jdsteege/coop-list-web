// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  equalTo,
  getDatabase,
  orderByChild,
  push,
  query,
  ref as dbRef,
} from "firebase/database";
import { useCurrentUser, useDatabaseList, useDatabaseObject } from "vuefire";
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

export function useLists() {
  const currentUser = useCurrentUser();
  const userId = currentUser.value?.uid ?? "_invalid_user_id_";

  return useDatabaseList<TaskList>(
    query(
      dbRef(getDatabase(), `lists`),
      orderByChild("owners"),
      equalTo(userId)
    )
  );
}

export function useTasks(listId: string | undefined | null) {
  if (!listId) {
    listId = "_invalid_list_id_";
  }

  return useDatabaseList<Task>(
    query(
      dbRef(getDatabase(), `tasks`),
      orderByChild("listId"),
      equalTo(listId)
    )
  );
}

export function useList(listId: string) {
  return useDatabaseObject<TaskList>(dbRef(getDatabase(), `lists/${listId}`));
}

export function useTask(taskId: string) {
  return useDatabaseObject<Task>(dbRef(getDatabase(), `tasks/${taskId}`));
}

export function pushNewList(listDetails: { name: string }) {
  const currentUser = useCurrentUser();
  const userId = currentUser.value?.uid ?? "_invalid_user_id_";

  const pushListDetails = { owners: [userId], ...listDetails };

  return push(dbRef(getDatabase(), `lists`), pushListDetails);
}

export function pushNewTask(taskDetails: {
  label: string;
  listId: string;
  completed: boolean;
}) {
  return push(dbRef(getDatabase(), `tasks`), taskDetails);
}
