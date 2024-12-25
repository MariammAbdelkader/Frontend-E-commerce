import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UploadCsvPage.css";
import Header from '../Header/Header'; 
export default function App() {
  return (
    <>
      <Header />
      <File />
    </>
  );
}


function File() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("select");
  const [uploadMessage, setUploadMessage] = useState("");

  const inputRef = useRef();

  function handleFileChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  }

  function onChooseFile() {
    inputRef.current.click();
  }

  function clearFileInput() {
    inputRef.current.value = "";
    setSelectedFile(null);
    setProgress(0);
    setUploadStatus("select");
    setUploadMessage("");
  }

  async function handleUpload() {
    if (uploadStatus === "done") {
      clearFileInput();
      return;
    }

    if (!selectedFile) {
      alert("Please select a file first!");
      setUploadMessage("No file selected. Please choose a file to upload.");
      setUploadStatus("error");
      return;
    }

    setUploadStatus("uploading");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post(
        "http://localhost:3000/upload/csv",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        console.log("Upload response:", response.data);
        setUploadStatus("done");
        setUploadMessage("Upload successful!");
        // alert("Upload successful!");
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      setUploadStatus("error");
      clearFileInput();
      setUploadMessage("Upload failed. Please try again.");
      setTimeout(() => {
        setUploadMessage("");
      }, 4000);
      console.error("Upload failed:", error);
    }
  }

  return (
    <div className="csv-container">
      <div className="paragraph">
        <h2>Upload Your Store Data </h2> {/*(CSV Only)*/}
        <p>
          Please upload a CSV file containing your store data to proceed with
          the setup. Only <span>CSV files</span> are supported for this process.
        </p>
        <ul>
          {/* <li>
            <strong>File Type:</strong> CSV (.csv)
          </li> */}
          <li>
            <strong>Max File Size:</strong> 10MB
          </li>
        </ul>
      </div>
      <div>
        <input
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {!selectedFile && (
          <button className="file-btn" onClick={onChooseFile}>
            <span className="material-symbols-rounded upload-icon">upload</span>
            Upload File
          </button>
        )}
        {selectedFile && (
          <div className="file">
            <div className="file-card">
              <span className="material-symbols-rounded icon">description</span>
              <div className="file-info">
                <div style={{ flex: 1 }}>
                  <h6>{selectedFile.name}</h6>
                  <div className="progress-bg">
                    <div
                      className="progress"
                      style={{ width: `${progress}% ` }}
                    />
                  </div>
                </div>

                <button onClick={clearFileInput}>
                  <span class="material-symbols-rounded close-icon">close</span>
                </button>
              </div>
            </div>

            <button className="upload-btn" onClick={handleUpload}>
              {uploadStatus === "uploading" ? "Uploading..." : "Upload"}
            </button>
          </div>
        )}

        {uploadMessage && (
          <div
            className={`upload-message ${
              uploadStatus === "done" ? "success" : "error"
            }`}>
            {uploadMessage}
          </div>
        )}
      </div>
    </div>
  );
}
