import React from "react";

const LinkedInLoginButton = () => {
  const handleLinkedInLogin = () => {
    const client_id = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
    const redirect_uri = import.meta.env.VITE_LINKEDIN_REDIRECT_URI;
    const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&state=STATE&scope=openid profile email`;
    window.location.href = linkedInAuthUrl;
  };

  return (
    <button
      onClick={handleLinkedInLogin}
      style={{
        backgroundColor: "#0077b5",
        color: "#fff",
        padding: "10px 15px",
        borderRadius: "4px",
        border: "none",
        cursor: "pointer",
      }}
    >
      Sign In with LinkedIn
    </button>
  );
};

export default LinkedInLoginButton;
