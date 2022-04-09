import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Authentication/auth";
import axios from "axios";

export default function Card(props) {
  const context = useContext(AuthContext);
  const { item } = props;
  const addToCart = async (res) => {
    console.log(res);
    const item = {
      name: res.name,
      price: res.price,
      img: res.img,
      id: context.userId,
    };
    await axios
      .post("http://localhost:1000/cart/add", item)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => console.log(e));
  };
  return (
    <div className="col-6 col-md-2 m-0 p-1">
      <div class="card m-0 p-0 mx-md-2">
        <div className="card-img text-center mt-1">
          <img src={item.img} alt="" style={{ height: 100 }} />
        </div>
        <div class="card-body p-2">
          <Link
            to={`/product/${item.id}/`}
            style={{ color: "black", textDecoration: "none" }}
          >
            <h5 style={{ fontSize: 17 }}>{item.name.substring(0, 30)}...</h5>
          </Link>
          <p class="card-tex text-secondary mb-0 p-0 pb-0 ">{item.time}</p>
          {item.oldprice ? (
            <p
              class="card-tex text-secondary mb-0 p-0 pb-0 bird-detail text-end"
              style={{ textDecoration: "line-through" }}
            >
              {item.oldprice}Rs
            </p>
          ) : null}
          <p class="card-text text-end p-0 my-1 ">{item.price}Rs</p>
          <button
            class="btn btn-sm text-white"
            style={{ backgroundColor: "#fd7e14" }}
            onClick={() => addToCart(item)}
          >
            <FontAwesomeIcon icon={faShoppingCart} />
          </button>
        </div>
      </div>
    </div>
  );
}