import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import InterestForm from "../../components/interest/interestForm/InterestForm";
import {
  getInterest,
  getInterests,
  selectIsLoading,
  selectInterest,
  editInterest,
} from "../../redux/features/interest/interestSlice";

const EditInterest = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const interestEdit = useSelector(selectInterest);

  const [interest, setInterest] = useState(interestEdit);
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getInterest(id));
  }, [dispatch, id]);

  useEffect(() => {
    setInterest(interestEdit);

    setDescription(
      interestEdit && interestEdit.description ? interestEdit.description : ""
    );
  }, [interestEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInterest({ ...interest, [name]: value });
  };

  const saveInterest = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", interest?.name);

    formData.append("description", description);

    console.log(...formData);

    await dispatch(editInterest({ id, formData }));
    await dispatch(getInterests());
    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Interest</h3>
      <InterestForm
        interest={interest}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        saveInterest={saveInterest}
      />
    </div>
  );
};

export default EditInterest;
