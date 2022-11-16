import React from 'react'
import { connect } from 'react-redux';
import ActiveUserListItem from './ActiveUserListItem';


const ActiveUsersList = ({activeUsers}) => {
  return (
    <div>
      {activeUsers.map(activeUser => (
        <ActiveUserListItem key={activeUser.socketId} activeUser={activeUser} />
      ))}
    </div>
  );
}

const mapStateToProps = ({dashboard}) =>({
  ...dashboard
})

export default connect(mapStateToProps)(ActiveUsersList)
