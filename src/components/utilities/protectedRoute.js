import propTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAtom } from 'jotai';
import { getItem } from '../../utility/localStorageControl';
import { currentUser } from '../../utility/services/auth';
import { currentUserData } from '../../globalStore';

const SecurityWrapper = ({ children }) => {
  const [_, setUser] = useAtom(currentUserData);

  // useEffect(() => {
  //   currentUser()
  //     .then((res) => setUser(res?.data?.user))
  //     .catch((err) => console.log('err', err));
  // }, []);

  return children;
};

function ProtectedRoute({ Component, path }) {
  const isLoggedIn = getItem('isLogin');

  return isLoggedIn ? (
    <SecurityWrapper>
      <Routes>
        <Route element={<Component />} path={path} />
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
