import propTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAtom } from 'jotai';
import { getMe } from '../../redux/me/actionCreator';
import { login } from '../../globalStore';

const SecurityWrapper = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe());
  }, []);
  return children;
};

function ProtectedRoute({ Component, path }) {
  const [isLoggedIn] = useAtom(login);
  // const isLoggedIn = useSelector((state) => state.auth.login);

  return isLoggedIn ? (
    <SecurityWrapper>
      <Routes>
        <Route element={<Component />} path={path} />{' '}
      </Routes>
    </SecurityWrapper>
  ) : (
    <Routes>
      <Route path="/" element={<Navigate to="/" />} />
    </Routes>
  );
}

ProtectedRoute.propTypes = {
  Component: propTypes.object.isRequired,
  path: propTypes.string.isRequired,
};

export default ProtectedRoute;
