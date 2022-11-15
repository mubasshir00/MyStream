import React from 'react'

const UsernameInput = (props) => {
  const {username,setUsername} = props;
  return (
    <div>
        <input placeholder='Enter Your Name' type="text" value={username}
        onChange={(e)=>setUsername(e.target.value)}/>
    </div>
  )
}

export default UsernameInput