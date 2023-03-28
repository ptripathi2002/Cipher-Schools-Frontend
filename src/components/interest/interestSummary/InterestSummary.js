import React, { useEffect } from "react";
import "./InterestSummary.scss";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import InfoBox from "../../infoBox/InfoBox";
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_STORE_VALUE,
  CALC_OUTOFSTOCK,
  CALC_CATEGORY,
  selectTotalStoreValue,
  selectOutOfStock,
  selectCategory,
} from "../../../redux/features/interest/interestSlice";

//Icons

const earningIcon = <AiFillDollarCircle size={40} color="#fff" />;
const interestIcon = <BsCart4 size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const outOfStockIcon = <BsCartX size={40} color="#fff" />;

//Format Amount

export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const InterestSummary = ({ interests }) => {
  const dispatch = useDispatch();

  const totalStoreValue = useSelector(selectTotalStoreValue);
  const outOfStock = useSelector(selectOutOfStock);
  const category = useSelector(selectCategory);
  useEffect(() => {
    dispatch(CALC_STORE_VALUE(interests));
    dispatch(CALC_OUTOFSTOCK(interests));
    dispatch(CALC_CATEGORY(interests));
  }, [dispatch, interests]);
  return (
    <div className="interest-summary">
      InterestSummary
      <h3 className="--mt">Inventory Stats</h3>
      <div className="info-summary">
        <InfoBox
          icon={interestIcon}
          title={"Total Interests"}
          count={interests.length}
          bgColor="card1"
        />

        <InfoBox
          icon={earningIcon}
          title={"total Store Value"}
          count={`$${formatNumbers(totalStoreValue.toFixed(2))}`}
          bgColor="card2"
        />
        <InfoBox
          icon={outOfStockIcon}
          title={"Out Of Stock"}
          count={outOfStock}
          bgColor="card3"
        />
        <InfoBox
          icon={categoryIcon}
          title={"All Categories"}
          count={category.length}
          bgColor="card4"
        />
      </div>
    </div>
  );
};

export default InterestSummary;
