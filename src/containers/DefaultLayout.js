import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "../routes";
import Header from "./Header";

function DefaultLayout() {
  const isLoggedIn = useSelector((state) => {
    return state.auth.isLoggedIn
  })
  return (
    <>
      {!isLoggedIn ? (
        <Navigate to="/login" />
      ) : (
        <>
          <Header />
          <Routes>
            {routes.map((r, i) => (
              <Route path={r.path} element={r.component} key={i} />
            ))}
          </Routes>
        </>
      )}
    </>
  );
}

export default DefaultLayout;
