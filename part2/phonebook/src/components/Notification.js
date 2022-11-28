const Notification = ({ message, bool }) => {
  if (message === null) {
    return null;
  } else {
    if (bool === true) {
      return <div className="notifGreen">{message}</div>;
    } else {
      return <div className="notifRed">{message}</div>;
    }
  }
};

export default Notification;
