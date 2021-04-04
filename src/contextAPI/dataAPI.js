import { createContext, useContext,  useState } from "react";
import { db } from "../firebase";

export const dataAPI = createContext();

export function useDataAPI() {
  return useContext(dataAPI);
}

export function DataAPiProvider({ children }) {
  const [search, setSearch] = useState("");
  const [TodosFromDB, setTodosFromDB] = useState("");


  async function addUsertoDB(fname, lname, email) {
    const userRef = db.collection("users");
    const snapshot = await userRef.get();
    snapshot.forEach((doc) => {
      if (doc.data().Email !== email ) {
        userRef.add({
          First_name: fname,
          Last_name: lname,
          Email: email,
        });
      }
    });
  }

  async function addTaskToUser(email, arr) {
    const userRef = db.collection("users");
    const snapshot = await userRef.get();
    snapshot.forEach((doc) => {
      if (doc.data().Email === email) {
        let uid = doc.id;
        let data = [];
        if (doc.data().tasks) {
          data = [...doc.data().tasks];
        }
        arr.forEach((x) => {
          if (x.title !== "" || x.task !== "") {
            let chk = data.find((y) => y.task === x.task);
            if (!chk) {
              data.push(x);
            }
          }
        });
        db.collection("users").doc(uid).update({
          tasks: data,
        });
      }
    });
  }

  async function getUserDataFromDB(currentUser) {
    const userRef = db.collection("users");
    const snapshot = await userRef.get();
    snapshot.forEach((doc) => {
      if (doc.data().Email === currentUser) {
        setTodosFromDB(doc.data().tasks);
      }
    });
  }

  async function doneTask(currentUser, title) {
    const userRef = db.collection("users");
    const snapshot = await userRef.get();
    let arr = [];
    let uid;
    snapshot.forEach((doc) => {
      if (doc.data().Email === currentUser) {
        uid = doc.id;
        if (doc.data().tasks) {
          arr = [...doc.data().tasks];
          let newArr = arr.filter((x) => x.title !== title);
          db.collection("users").doc(uid).update({
            tasks: newArr,
          });
        }
      }
    });
  }

  const value = {
    addUsertoDB,
    setSearch,
    search,
    addTaskToUser,
    TodosFromDB,
    getUserDataFromDB,
    doneTask,
  };

  return <dataAPI.Provider value={value}>{children}</dataAPI.Provider>;
}
