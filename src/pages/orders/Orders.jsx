import React, { useEffect, useState } from "react";
import "./Orders.css";
import axios from "axios";
import { assets } from "../../assets/assets";

const Orders = () => {
  const url = "http://localhost:4000";
  const [data, setData] = useState([]);

  const fetchllOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/order/list`);
      if (res.data.success) {
        setData(res.data.data);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const statusHandler = async (event, orderId) => {
    const res = await axios.post(`${url}/api/order/update`, {
      orderId,
      status: event.target.value,
    });
    if (res.data.success) {
      await fetchllOrders();
    }
  };

  useEffect(() => {
    fetchllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Orders Page</h3>
      <div className="order-list">
        {data.map((order, index) => (
          <div key={index} className="order-items">
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <div>
              <p className="order-item-food">
                {order.items.map(
                  (item, i) =>
                    `${item.name} x ${item.quantity}${
                      i === order.items.length - 1 ? "" : ", "
                    }`
                )}
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ", " + order.address.city + ", "}</p>
                <p>
                  {" "}
                  {order.address.state +
                    ", " +
                    order.address.country +
                    " " +
                    order.address.zipCode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
            >
              <option value="Processing">Processing</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
