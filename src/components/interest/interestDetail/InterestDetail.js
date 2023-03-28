import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getInterest } from "../../../redux/features/interest/interestSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./InterestDetail.scss";
import DOMPurify from "dompurify";

const InterestDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { interest, isLoading, isError, message } = useSelector(
    (state) => state.interest
  );

  const stockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className="--color-success">In Stock</span>;
    }
    return <span className="--color-danger">Out Of Stock</span>;
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getInterest(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div className="interest-detail">
      <h3 className="--mt">interest Details:-</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {interest && (
          <div className="detail">
            <Card cardClass="group">
              {interest?.image ? (
                <img
                  src={interest.image.filePath}
                  alt={interest.image.fileName}
                />
              ) : (
                <p>No image set for this interest</p>
              )}
            </Card>
            <h4>interest Availability: {stockStatus(interest.quantity)}</h4>
            <hr />
            <h4>
              <span className="badge">Name: </span> &nbsp; {interest.name}
            </h4>
            <p>
              <b>&rarr; SKU : </b> {interest.sku}
            </p>
            <p>
              <b>&rarr; Category : </b> {interest.category}
            </p>
            <p>
              <b>&rarr; Price : </b> {"$"}
              {interest.price}
            </p>
            <p>
              <b>&rarr; Quantity in stock : </b> {interest.quantity}
            </p>
            <p>
              <b>&rarr; Total Value in stock : </b> {"$"}
              {interest.price * interest.quantity}
            </p>
            <hr />
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(interest.description),
              }}
            ></div>
            <hr />
            <code className="--color-dark">
              Created on: {interest.createdAt.toLocaleString("en-US")}
            </code>
            <br />
            <code className="--color-dark">
              Last Updated: {interest.updatedAt.toLocaleString("en-US")}
            </code>
          </div>
        )}
      </Card>
    </div>
  );
};

export default InterestDetail;
