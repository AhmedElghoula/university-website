import React, { useEffect } from "react";
import AccountTable from "../../components/SuperAdmin/AccountTable";
import { useDispatch, useSelector } from "react-redux";
import {
  getComptes,
  getFomationwithgrp,
  getFomations,
} from "../../redux/Thunk/SuperAdminThunk";

const AccountsPages = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getComptes());
    dispatch(getFomationwithgrp());
    dispatch(getFomations());
  }, []);

  const loading = useSelector((state) => ({
    ...state.SuperAdmin.comptes.loading,
  }));
  const currentPage = useSelector((state) => ({
    ...state.SuperAdmin?.currentPage,
  }));
  const numberOfPages = useSelector((state) => ({
    ...state.SuperAdmin?.numberOfPages,
  }));

  return (
    <AccountTable
      loading={loading}
      currentPage={currentPage}
      numberOfPages={numberOfPages}
    />
  );
};

export default AccountsPages;
