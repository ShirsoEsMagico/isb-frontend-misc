import React, { useState, useEffect } from "react";
import LinkedInLoginButton from "./LinkedinLoginButton";

function LinkedInLogin() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    if (code) {
      exchangeAuthorizationCodeForAccessToken(code);
    }
  }, []);

  const exchangeAuthorizationCodeForAccessToken = (code) => {
    const isb_api_base_url = import.meta.env.VITE_ISB_BACKEND_BASE_URL;
    const tokenEndpoint = `${isb_api_base_url}/api/user/signin-linkedin/`;
    const requestBody = {
      code: code,
    };

    fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.detail) {
          if (data.detail.error) {
            setError({ message: data.detail.error });
          } else {
            setUser(data.detail);
          }
        } else {
          setError({ message: "Failed to fetch user details" });
        }
      })
      .catch((error) => {
        console.error(
          "Error exchanging authorization code for access token:",
          error
        );
        setError({ message: "Internal Server Error" });
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>LinkedIn Sign-In Example</h1>
      </header>
      <main className="App-main">
        {user ? (
          <div>
            <h2>Welcome, {user.name}!</h2>
          </div>
        ) : (
          <LinkedInLoginButton />
        )}
        {error && <p>Error: {error.message}</p>}
      </main>
    </div>
  );
}

export default LinkedInLogin;
