import React, { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("data")) {
      setUsers(JSON.parse(localStorage.getItem("data")));
      // Clear localStorage      --> localStorage.clear()
      // Remove one value        --> localStorage.removeItem()
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
    </div>
  );
}

export default App;
