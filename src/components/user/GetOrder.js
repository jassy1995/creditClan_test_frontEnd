import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { customAxios } from "../../axiosAuth";
import "../../styles/order.css";

const GetOrder = () => {
  const [message, setMessage] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  const [resMessage, setResMessage] = useState("");
  const [error, setError] = useState("");
  let [operations, setOperation] = useState([]);
  const history = useHistory();
  const messageInput = useRef();

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

  useEffect(() => {
    messageInput.current.focus();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    let optIndex = Number(message) - 1;
    let stepValue = operations[optIndex];
    const sentMessage = { message, step: stepValue };
    setIsLoading(true);
    customAxios
      .post("user/getOrder", sentMessage)
      .then((res) => {
        if (res.data.resMessage || res.data.operations) {
          setIsLoading(false);
          setResMessage(res.data.resMessage);
          setOperation(res.data.operations);
          setMessage("");
          console.log(res.data.operations);
        }
        if (res.data.resError) {
          setError(res.data.resError);
        }
        if (
          res.data.resMessage &&
          res.data.resMessage === "your request has been received"
        ) {
          setIsLoading(false);
          setResMessage(res.data.resMessage);
          setMessage("");
          setTimeout(() => {
            history.push("/dashboard/orders");
          }, 3000);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <main style={{ backgroundColor: "#e4ebf1", height: "582px" }}>
        <div
          className="container-fluid pt-md-4   p-4  mt-4  margin-top"
          style={{ backgroundColor: "#e4ebf1" }}
        >
          <div className="row">
            <div className="container">
              <div className="row clearfix">
                <div className="col-lg-12">
                  <div className="card chat-app">
                    <div className="chat">
                      <h3 className="text-center mt-2">
                        Chat up the canteen now
                      </h3>
                      <div className="chat-history">
                        <ul className="m-b-0">
                          <li className="clearfix">
                            {operations && (
                              <div className="float-right mr-5">
                                {operations.map((operation, index) => (
                                  <ol key={index} className="fs-5">
                                    <li> {index + 1 + ". " + operation}</li>
                                  </ol>
                                ))}
                              </div>
                            )}
                            {resMessage || error ? (
                              <div className="message other-message float-left">
                                {resMessage ? (
                                  resMessage
                                ) : (
                                  <small className="text-danger">{error}</small>
                                )}
                              </div>
                            ) : null}
                          </li>
                        </ul>
                      </div>
                      <div className="chat-message clearfix">
                        <div className="input-group mb-0">
                          <input
                            ref={messageInput}
                            type="text"
                            className="form-control"
                            placeholder="Enter your message here..."
                            value={message}
                            onChange={(e) => {
                              setMessage(e.target.value);
                            }}
                          />
                          <div className="border-start-1  input-group-prepend bg-success">
                            <button
                              className="btn input-group-text bg-success text-light"
                              onClick={handleSubmit}
                            >
                              {isLoading ? (
                                loadingMessage()
                              ) : (
                                <i className="bi bi-cursor "></i>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default GetOrder;
