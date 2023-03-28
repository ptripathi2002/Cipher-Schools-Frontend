import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "../../components/grid/Grid";
import InterestList from "../../components/interest/interestList/InterestList";
import InterestSummary from "../../components/interest/interestSummary/InterestSummary";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getInterests } from "../../redux/features/interest/interestSlice";
const Dashboard = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { interests, isLoading, isError, message } = useSelector(
    (state) => state.interest
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getInterests());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <Grid />
      <InterestList interests={interests} isLoading={isLoading} />
    </div>
  );
};

export default Dashboard;
