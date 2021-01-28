import React, { useState, useEffect } from "react";

const BASE_URL = "/api/v1/message";
const App = () => {
  const [ message, setMessage ] = useState("");
  const [ error, setError ] = useState("");

  useEffect(() => {
    handleData();
  }, []);

  const handleData = () => {
    fetch(`${BASE_URL}`, {
      method: "GET",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(resp => {
        setMessage(resp.message);
      })
      .catch(err => {
        setError(err.message);
      });
  }

  return (
    <div className="App">
      <h2 style={{ textAlign: "center" }}>RET Application</h2>
      <h3 style={{ textAlign: "center" }}>{message && message}</h3>
      {error.length ? <p style={{ textAlign: "center" }}>{error}</p> : null}
    </div>
  );
}

export default App;
