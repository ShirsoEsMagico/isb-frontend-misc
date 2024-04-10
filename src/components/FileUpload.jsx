import React, { useState } from "react";

const FileUploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (!selectedFile) {
      alert("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    const isb_api_base_url = import.meta.env.VITE_ISB_BACKEND_BASE_URL;

    fetch(`${isb_api_base_url}/api/user/file-upload/`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to upload file");
        }
      })
      .then((data) => {
        setUploadStatus(data.detail);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        setUploadStatus("Internal Server Error");
      });
  };

  return (
    <div>
      <h2>File Upload</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default FileUploadComponent;
