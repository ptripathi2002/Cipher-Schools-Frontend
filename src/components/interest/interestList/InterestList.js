import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
import "./InterestList.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_INTERESTS,
  selectFilteredInterests,
} from "../../../redux/features/interest/filterSlice";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Search from "../../../search/Search";
import {
  deleteInterest,
  getInterests,
} from "../../../redux/features/interest/interestSlice";
import EditInterest from "../../../pages/editInterest/EditInterest";

const InterestList = ({ interests, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredInterests = useSelector(selectFilteredInterests);

  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const delInterest = async (id) => {
    console.log(id);
    await dispatch(deleteInterest(id));
    await dispatch(getInterests());
  };

  const getInterest = async (id) => {
    await dispatch(getInterest(id));
  };

  const editInterest = async (id) => {
    await dispatch(editInterest(id));
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Interest",
      message: "Are you sure to delete this interest.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delInterest(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert("Click No"),
        },
      ],
    });
  };

  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredInterests.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredInterests.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredInterests]);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % filteredInterests.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_INTERESTS({ interests, search }));
  }, [interests, search, dispatch]);

  return (
    <div className="interest-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Your Interests</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>

        {isLoading && <SpinnerImg />}

        <div className="table">
          {!isLoading && interests.length === 0 ? (
            <p>-- No Interest found, please add an interest...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Name</th>

                  <th>Value</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((interest, index) => {
                  const { _id, name, category, price, quantity } = interest;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{category}</td>
                      <td>
                        {"$"}
                        {price}
                      </td>
                      <td>{quantity}</td>
                      <td>
                        {"$"}
                        {price * quantity}
                      </td>
                      <td className="icons">
                        <span>
                          <Link to={`/interest-detail/${_id}`}>
                            <AiOutlineEye
                              size={25}
                              color={"purple"}
                              onClick={getInterest(_id)}
                            />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/edit-interest/${_id}`}>
                            <FaEdit
                              size={20}
                              color={"green"}
                              onClick={editInterest(_id)}
                            />
                          </Link>
                        </span>
                        <span>
                          <FaTrashAlt
                            size={20}
                            color={"red"}
                            onClick={() => confirmDelete(_id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
};

export default InterestList;
