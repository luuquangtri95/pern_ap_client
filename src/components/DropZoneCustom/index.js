import { DropZone, Stack, Thumbnail, Caption } from "@shopify/polaris";
import { NoteMinor } from "@shopify/polaris-icons";
import { useState, useCallback, useEffect } from "react";

function DropZoneCustom({ onMultiImage, errorMessage }) {
  const [files, setFiles] = useState([]);

  const handleDropZoneDrop = (_dropFiles, acceptedFiles, _rejectedFiles) => {
    setFiles((files) => [...files, ...acceptedFiles]);
  };

  const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

  const fileUpload = !files.length && <DropZone.FileUpload />;
  const uploadedFiles = files.length > 0 && (
    <div style={{ padding: "0" }}>
      <Stack vertical>
        {files.map((file, index) => (
          <Stack alignment="center" key={index}>
            <Thumbnail
              size="small"
              alt={file.name}
              source={
                validImageTypes.includes(file.type)
                  ? window.URL.createObjectURL(file)
                  : NoteMinor
              }
            />
            <div>
              {file.name} <Caption>{file.size} bytes</Caption>
            </div>
          </Stack>
        ))}
      </Stack>
    </div>
  );

  useEffect(() => {
    onMultiImage(files);
  }, [files]);

  return (
    <div>
      <DropZone label="Add multi image" onDrop={handleDropZoneDrop}>
        {uploadedFiles}
        {fileUpload}
      </DropZone>
      {!!errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
}

export default DropZoneCustom;
