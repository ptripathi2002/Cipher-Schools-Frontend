import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  createInterest,
  selectIsLoading,
} from "../../redux/features/interest/interestSlice";
import Loader from "../../components/loader/Loader";
import InterestForm from "../../components/interest/interestForm/InterestForm";

const initialState = {
  name: "",
  description: "",
};
const AddInterest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [interest, setInterest] = useState(initialState);

  const [description, setDescription] = useState("");

  const isLoading = useSelector(selectIsLoading);

  const { name } = interest;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInterest({ ...interest, [name]: value });
  };

  const saveInterest = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);

    formData.append("description", description);

    await dispatch(createInterest(formData));

    navigate("/Profile");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Interest</h3>
      <InterestForm
        interest={interest}
        name={name}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        saveInterest={saveInterest}
      />
    </div>
  );
};

export default AddInterest;
