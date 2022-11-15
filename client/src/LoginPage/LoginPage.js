import React, { useState } from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setUsername } from '../store/actions/dashboardActions';
import SubmitButton from './components/SubmitButton';
import UsernameInput from './components/UsernameInput'

const LoginPage = ({ saveUserName }) => {
  const [username, setUsername] = useState('');
  const history = useHistory();
  const handleSubmitButtonPressed = () => {
    history.push('/dashboard');
    saveUserName(username);
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