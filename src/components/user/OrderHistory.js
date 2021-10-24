import React, { useState, useEffect } from "react";
import { Formatter } from "../../utils/currency-formatter";
import { customAxios } from "../../axiosAuth";
function OrderHistory() {
  const [orders, setOrders] = useState([]);

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
    customAxios
      .get("user/fetchMyOrder")
      .then((res) => {
        if (res.data.orders) {
          setOrders(res.data.orders);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <main>
        <div className="container-fluid mt-4">
          {orders.length > 0 ? (
            <div className="card mb-4">
              <div className="card-header">
                <i className="fas fa-table mr-1"></i>
                order history
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table
                    className="table table-bordered"
                    id="dataTable"
                    width="100%"
                    cellSpacing="0"
                  >
                    <thead className="text-center">
                      <tr>
                        <th>food</th>
                        <th>quantity</th>
                        <th>price</th>
                        <th> date</th>
                      </tr>
                    </thead>
                    <tfoot className="text-center">
                      <tr>
                        <th>food</th>
                        <th>quantity</th>
                        <th>price</th>
                        <th> date</th>
                      </tr>
                    </tfoot>
                    <tbody className="text-center">
                      {orders.length > 0 &&
                        Array.isArray(orders) &&
                        orders.map((order, index) => (
                          <tr key={index}>
                            <td className="text-center">{order.name}</td>
                            <td>{order.quantity}</td>
                            <td>{Formatter(order.price)}</td>
                            <td>{new Date(order.date).toLocaleDateString()}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            loadingMessage()
          )}
        </div>
      </main>
    </>
  );
}

export default OrderHistory;
