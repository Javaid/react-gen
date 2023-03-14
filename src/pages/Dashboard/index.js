import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../../app/features/auth/authSlice';
import { Form } from '../../components';

export default function Dashboard() {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const doLogout = () => { 
    dispatch(setAuthToken(false));
    navigate("/login");
};
  return (
    <div>this is Dashboard  

      <Form />
      <button onClick={doLogout}>Logout</button>
    </div>
  )
}
