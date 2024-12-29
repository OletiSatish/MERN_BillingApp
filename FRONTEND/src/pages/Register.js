import { useDispatch } from 'react-redux';
import { register, registerSuccess, registerFail } from '../redux/slices/authSlice';
import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    dispatch(register());  // Start loading
    try {
      const response = await axios.post('/api/auth/register', { email, password });
      dispatch(registerSuccess(response.data));  // On success
    } catch (error) {
      dispatch(registerFail(error.response.data));  // On failure
    }
  };

  return (
    <div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
