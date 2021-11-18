import { useState, useEffect } from "react";
import './App.css';
import { db } from './firebas-config';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

function App() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, {name: newName, age: Number(newAge)});
  }

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = {age: age + 1};
    await updateDoc(userDoc, newFields);
  }

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  }

  useEffect(() => {
    const getUsers = async () =>{
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) =>({
        ...doc.data(), id: doc.id
      })));
    }
    getUsers();
  }, []);


  return (
    <div className="App">
        <div className="flex justify-center my-4">
          <input type="text" placeholder="Name....." onChange={(event) =>{setNewName(event.target.value);}} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-4"/>
          <input type="number" placeholder="Age....."onChange={(event) =>{setNewAge(event.target.value);}} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-4"/>
          <button onClick={createUser} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Create User</button>
        </div>

        {users.map((user) =>{
          return(
            <div className="flex justify-center border-b border-gray-300">
              <div className="flex justify-between items-center box-border p-4 border-3 w-1/2">
                {" "}
                <h1 className="text-2xl mx-5">Name: {user.name}</h1>
                <h1 className="text-2xl">Age: {user.age}</h1>
                <div className="flex justify-center">
                  <button onClick={() =>{updateUser(user.id, user.age)}} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-4">Increase Age</button>
                  <button onClick={() =>{deleteUser(user.id)}} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete User</button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default App;
