import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const url = "https://tomato-server-dg1r.onrender.com";

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData({ ...data, [name]: value });
  };

  const submithandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    const res = await axios.post(`${url}/api/food/add`, formData);
    if (res.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      setImage(false);
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={submithandler}>
        <div className="add-img-upload flex-col">
          <p>Upload File</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="upload"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            name="image"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            value={data.name}
            onChange={changeHandler}
            type="text"
            name="name"
            placeholder="name"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            value={data.description}
            onChange={changeHandler}
            name="description"
            placeholder="product description"
            required
            rows="6"
          ></textarea>
        </div>
        <div className="add-category-price ">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select
              name="category"
              onChange={changeHandler}
              value={data.category}
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Deserts">Deserts</option>
              <option value="Cake">Cake</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodels">Noodels</option>
              <option value="Pure Veg">Pure Veg</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              value={data.price}
              onChange={changeHandler}
              type="number"
              name="price"
              placeholder="$20"
            />
          </div>
        </div>
        <button type="submit" className="add-button">
          {" "}
          Add
        </button>
      </form>
    </div>
  );
};

export default Add;
