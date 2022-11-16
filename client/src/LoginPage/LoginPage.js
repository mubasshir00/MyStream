import React, { useState } from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setUsername } from '../store/actions/dashboardActions';
import { newOnlineUser } from '../utils/websocket/socketconnection';
import SubmitButton from './components/SubmitButton';
import UsernameInput from './components/UsernameInput'

const LoginPage = ({ saveUserName }) => {
  const [username, setUsername] = useState('');
  let history = useHistory();
  const handleSubmitButtonPressed = () => {
    newOnlineUser(username);
    saveUserName(username);
    history.push('/dashboard');
  };

  return (
    <div>
      <UsernameInput username={username} setUsername={setUsername} />
      <SubmitButton handleSubmitButtonPressed={handleSubmitButtonPressed} />
    </div>
  );
};

const mapActionsToProps = (dispatch) =>{
  return {
    saveUserName:username=>dispatch(setUsername(username)),
  };
}

export default connect(null, mapActionsToProps)(LoginPage);