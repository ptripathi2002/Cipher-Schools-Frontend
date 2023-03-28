import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";

import "./InterestForm.scss";
const InterestForm = ({
  interest,
  description,
  setDescription,

  handleInputChange,
  saveinterest,
}) => {
  return (
    <div className="add-interest">
      <Card cardClass={"card"}>
        <form onSubmit={saveinterest}>
          <label>interest Name:</label>
          <input
            type="text"
            placeholder="interest Name"
            name="name"
            value={interest?.name}
            onChange={handleInputChange}
          />

          <label>interest Description</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={InterestForm.modules}
            formats={InterestForm.formats}
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save interest
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default InterestForm;
