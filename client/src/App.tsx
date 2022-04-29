import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const handleFetch = async () => {
    window.open("http://localhost:5000/api/v1/user/auth/google", "_self");
  };

  useEffect(() => {
    const handleUser = async () => {
      const res = await fetch("http://localhost:5000/api/v1/user/", {
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("res", res);
      const data = await res.json();
      console.log("DATA", data);
    };
    handleUser();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <div onClick={handleFetch}>Learn React</div>
      </header>
    </div>
  );
}

export default App;
