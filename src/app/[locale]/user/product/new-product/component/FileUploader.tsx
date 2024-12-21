import { ChangeEvent, DragEvent, useEffect, useState } from "react";
import { AiOutlineCheckCircle, AiOutlineCloudUpload } from "react-icons/ai";
import { MdClear } from "react-icons/md";
import "./drag-drop.css";

interface FileSelectionHandler {
  onFilesSelected: (files: File[]) => void;
}

const FileUploader: React.FC<FileSelectionHandler> = ({ onFilesSelected }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isOnDragZone, setIsOnDragZone] = useState(false);
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles = Array.from(selectedFiles);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    setIsOnDragZone(true);
    setTimeout(() => {
      setIsOnDragZone(false);
    }, 1000);
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  useEffect(() => {
    onFilesSelected(files);
  }, [files, onFilesSelected]);

  return (
    <div
      className={`document-uploader border ${
        files.length > 0 ? "upload-box active" : "upload-box"
      } ${isOnDragZone ? "border-green-500" : ""}`}
      onDrop={handleDrop}
      onDragOver={(event) => event.preventDefault()}
    >
      <>
        <div className="upload-info">
          <AiOutlineCloudUpload />
          <div>
            <p>Drag and drop your files here</p>
            <p>Limit 15MB per file. Supported files: all image file</p>
          </div>
        </div>
        <input
          type="file"
          hidden
          id="browse"
          onChange={handleFileChange}
          multiple
        />
        <label htmlFor="browse" className="browse-btn">
          Browse files
        </label>
      </>
      {files.length > 0 && (
        <div className="success-file">
          <AiOutlineCheckCircle style={{ color: "#6DC24B", marginRight: 1 }} />
          <p>{files.length} file(s) selected</p>
        </div>
      )}

      {files.length > 0 && (
        <div className="file-list">
          <div className="file-list__container">
            {files.map((file, index) => (
              <div className="file-item" key={index}>
                <div className="file-info">
                  <p>{file.name}</p>
                </div>
                <div className="file-actions">
                  <MdClear onClick={() => handleRemoveFile(index)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
