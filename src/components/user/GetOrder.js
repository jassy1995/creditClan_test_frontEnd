import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { customAxios } from "../../axiosAuth";
import "../../styles/order.css";

const GetOrder = () => {
  const [message, setMessage] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  const [resMessage, setResMessage] = useState("");
  let [userOrder, setUserOrder] = useState([]);
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
    setUserOrder([...userOrder, message]);
    const sentMessage = { message, order: userOrder };
    setIsLoading(true);
    customAxios
      .post("user/getOrder", sentMessage)
      .then((res) => {
        if (res.data.resMessage) {
          setIsLoading(false);
          setResMessage(res.data.resMessage);
          setMessage("");
        }
        if (res.data.resMessage && res.data.isSaved) {
          setIsLoading(false);
          setResMessage(res.data.resMessage);
          setMessage("");
          setTimeout(() => {
            history.push("/dashboard/orders");
          }, 5000);
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
                            {resMessage ? (
                              <div className="message other-message float-right">
                                {resMessage}
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
