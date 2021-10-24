import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { customAxios } from "../../axiosAuth";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [isError, setIsError] = useState(false);
  const [displayFile, setDisplayFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setSelectedFile(event.target.files[0]);
    event.target.files[0] && setIsFilePicked(true);
  };

  //loading spinner
  const loadingMessage = () => {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  };

  const uploadFile = () => {
    if (!isFilePicked) return;
    setIsLoading(true);
    const formData = new FormData();
    formData.append("myFile", selectedFile, selectedFile.name);
    customAxios
      .post("fileReader", formData)
      .then((res) => {
        if (res.data) {
          setIsLoading(false);
          setDisplayFile(res.data.response);
          setIsInvalid(res.data.invalid);
          setIsError(res.data.error);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Container fluid="md" className="mt-5">
        <Row>
          <Col xs={12} sm={6} md={4}>
            <Form.Group
              controlId="formFile"
              className="mb-3 border pl-3 pt-3 pb-3 "
            >
              <Form.Label className="mb-3 fs-4">upload your file</Form.Label>
              <Form.Control type="file" onChange={handleChange} />
              <Button
                variant="primary"
                onClick={uploadFile}
                className="mt-3 w-50 "
              >
                {isLoading ? loadingMessage() : "upload"}
              </Button>
              {isFilePicked ? null : "please select a file"}
            </Form.Group>
          </Col>
          <Col xs={12} sm={6} md={8}>
            {isLoading ? (
              loadingMessage()
            ) : (
              <div>
                {isInvalid ? isInvalid : null}
                {isError ? isError : null}
                {displayFile ? displayFile : null}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FileUpload;
