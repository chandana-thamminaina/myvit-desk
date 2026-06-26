import { useRef, useState, useEffect } from "react";

export default function Notes() {
  const editorRef = useRef(null);

  const [noteName, setNoteName] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [createdFiles, setCreatedFiles] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [showEditor, setShowEditor] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    const savedCreated = JSON.parse(localStorage.getItem("createdFiles")) || {};
    const savedUploaded =
      JSON.parse(localStorage.getItem("uploadedFiles")) || {};

    setCreatedFiles(savedCreated);
    setUploadedFiles(savedUploaded);
  }, []);

  const subjects = [
    "Computer Architechture and Organisaton",
    "Probability and Statistics",
    "Probability and Statistics Lab",
    "Microprocessors and Microcontrollers",
    "Microprocessors and Microcontrollers Lab",
    "Theory of Computation",
    "Design and Analysis of Algorithms",
    "Design and Analysis of Algorithms Lab",
  ];

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const saveCreatedNote = () => {
    if (!noteName.trim()) return;

    const content = editorRef.current.innerText;

    const updatedFiles = {
      ...createdFiles,
      [selectedSubject]: [
        ...(createdFiles[selectedSubject] || []),
        {
          name: noteName + ".txt",
          content,
        },
      ],
    };

    setCreatedFiles(updatedFiles);
    localStorage.setItem("createdFiles", JSON.stringify(updatedFiles));

    const blob = new Blob([content], {
      type: "text/plain",
    });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");

    editorRef.current.innerHTML = "";
    setNoteName("");
    setShowEditor(false);
  };

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);

    const mappedFiles = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    const updatedFiles = {
      ...uploadedFiles,
      [selectedSubject]: [
        ...(uploadedFiles[selectedSubject] || []),
        ...mappedFiles,
      ],
    };

    setUploadedFiles(updatedFiles);
    localStorage.setItem("uploadedFiles", JSON.stringify(updatedFiles));

    setShowUpload(false);
  };

  const deleteCreatedFile = (indexToDelete) => {
    const updated = {
      ...createdFiles,
      [selectedSubject]: createdFiles[selectedSubject].filter(
        (_, index) => index !== indexToDelete
      ),
    };

    setCreatedFiles(updated);
    localStorage.setItem("createdFiles", JSON.stringify(updated));
  };

  const deleteUploadedFile = (indexToDelete) => {
    const updated = {
      ...uploadedFiles,
      [selectedSubject]: uploadedFiles[selectedSubject].filter(
        (_, index) => index !== indexToDelete
      ),
    };

    setUploadedFiles(updated);
    localStorage.setItem("uploadedFiles", JSON.stringify(updated));
  };

  const renderModal = () => {
    if (!showEditor && !showUpload) return null;

    return (
      <div className="preview-overlay">
        <div className="preview-modal">
          {showEditor && (
            <>
              <h3 className="modal-title">Create Notes</h3>

              <div className="editor-toolbar">
                <button onClick={() => formatText("bold")}>B</button>
                <button onClick={() => formatText("italic")}>I</button>
                <button onClick={() => formatText("underline")}>U</button>

                <label className="toolbar-color-btn">
                  🎨
                  <input
                    type="color"
                    onChange={(e) => formatText("foreColor", e.target.value)}
                  />
                </label>
              </div>

              <div
                ref={editorRef}
                className="notes-editor large-editor"
                contentEditable
                suppressContentEditableWarning
                data-placeholder="Start typing your notes here..."
              ></div>

              <div className="modal-actions">
                <input
                  className="note-name-input"
                  type="text"
                  placeholder="Enter file name"
                  value={noteName}
                  onChange={(e) => setNoteName(e.target.value)}
                />

                <p className="save-note">Saved as .txt file</p>

                <div className="save-close-row">
                  <button className="save-btn" onClick={saveCreatedNote}>
                    Save
                  </button>

                  <button
                    className="close-btn"
                    onClick={() => setShowEditor(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </>
          )}

          {showUpload && (
            <div className="upload-modal-content">
              <h3 className="modal-title">Upload Notes</h3>

              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                multiple
                onChange={handleUpload}
              />

              <button
                className="close-btn"
                onClick={() => setShowUpload(false)}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (selectedSubject) {
    return (
      <div>
        <h1 className="page-title">{selectedSubject}</h1>
        <p className="page-subtitle">Manage notes for this subject</p>

        <div className="notes-options-grid">
          <div
            className="card notes-subject-card"
            onClick={() => setShowEditor(true)}
          >
            <h3>Create Notes</h3>
          </div>

          <div
            className="card notes-subject-card"
            onClick={() => setShowUpload(true)}
          >
            <h3>Upload Notes</h3>
          </div>
        </div>

        <div className="card upload-card">
          <h3>➤ Created Files</h3>

          {(createdFiles[selectedSubject] || []).map((file, index) => (
            <div key={index} className="file-row">
              <p
                className="file-link"
                onClick={() => {
                  const blob = new Blob([file.content], {
                    type: "text/plain",
                  });
                  const url = URL.createObjectURL(blob);
                  window.open(url, "_blank");
                }}
              >
                {file.name}
              </p>

              <button
                className="delete-file-btn"
                onClick={() => deleteCreatedFile(index)}
              >
                🗑
              </button>
            </div>
          ))}
        </div>

        <div className="card upload-card">
          <h3>➤ Uploaded Files</h3>

          {(uploadedFiles[selectedSubject] || []).map((file, index) => (
            <div key={index} className="file-row">
              <p
                className="file-link"
                onClick={() => window.open(file.url, "_blank")}
              >
                {file.name}
              </p>

              <button
                className="delete-file-btn"
                onClick={() => deleteUploadedFile(index)}
              >
                🗑
              </button>
            </div>
          ))}
        </div>

        {renderModal()}
      </div>
    );
  }

  return (
    <div>
      <h1 className="page-title">Smart Notes Vault</h1>
      <p className="page-subtitle">Choose a subject to manage your notes</p>

      <div className="notes-subject-grid">
        {subjects.map((subject, index) => (
          <div
            className="card notes-subject-card"
            key={index}
            onClick={() => setSelectedSubject(subject)}
          >
            <h3>{subject}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
