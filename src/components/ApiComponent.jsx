import React, { useState } from "react";

const urlBase = "https://jnc.biloop.es/api-global/v1/";

const ApiComponent = () => {
  const [token, setToken] = useState(null);
  const [pedidoResponse, setPedidoResponse] = useState(null);
  const [error, setError] = useState(null);

  // Function to get the token
  const getToken = async () => {
    try {
      const response = await fetch(`${urlBase}token`, {
        method: "GET",
        headers: {
          "mode": "no-cors",
          "SUBSCRIPTION_KEY": "56c40-X-X-46ff86e",
          "USER": "X",
          "PASSWORD": "X",
        },
      });

      if (!response.ok) {
        throw new Error(`Error in API request: ${response.status}`);
      }

      const data = await response.json();
      console.log("Token received:", data);
      setToken(data.token); // Assuming the response has a `token` field
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  };
  const getPrograms = async () => {
    try {
      const response = await fetch(`${urlBase}getPrograms`, {
        method: "GET",
        headers: {
          "mode": "no-cors",
          "SUBSCRIPTION_KEY": "56c40d89-eb89-4e9f-b809-a90ab46ff86e",
          "token": token,
          "Content-Type": "application/json"
        },
      });

      if (!response.ok) {
        throw new Error(`Error in API request: ${response.status}`);
      }

      const data = await response.json();
      console.log("Token received:", data);
      setToken(data.token); // Assuming the response has a `token` field
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  };

  // Function to post pedido
  const postPV = async (pedido) => {
    if (!token) {
      setError("Token is not available. Please fetch the token first.");
      return;
    }

    try {
      const response = await fetch(`${urlBase}token`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pedido),
      });

      if (!response.ok) {
        throw new Error(`Error in API request: ${response.status}`);
      }

      const data = await response.json();
      console.log("Pedido response:", data);
      setPedidoResponse(data);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>API Example</h1>
      <button onClick={getToken}>Get Token</button>
      {token && <p>Token: {token}</p>}

      <button
        onClick={() =>
          getPrograms({ pedido: "Sample pedido data" }) // Replace with actual pedido data
        }
      >
        Post Pedido
      </button>

      {pedidoResponse && <p>Pedido Response: {JSON.stringify(pedidoResponse)}</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
};

export default ApiComponent;
