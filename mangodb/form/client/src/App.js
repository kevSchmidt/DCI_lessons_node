import React, { useEffect, useState } from "react";

import AddForm from "./components/addUser";

import "./components/addUser";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("data")) {
      setUsers(JSON.parse(localStorage.getItem("data")));
    } else {
      setUsers([]);
    }
  }, []);

  const fetchData = () => {
    fetch("/users")
      .then((result) => result.json())
      .then((data) => {
        localStorage.setItem("data", JSON.stringify(data));
        localStorage.setItem("dataDate", Date.now());
        setUsers(data);
      });
  };

  const usersArr = users.map((user) => <h4 key={user._id}>{user.userName}</h4>);

  return (
    <div className="App">
      <h4>Users</h4>
      <button onClick={fetchData}>
        {users.length ? "Update" : "Get Data"}
      </button>
      {usersArr}
      <AddForm />
    </div>
  );
}

export default App;
