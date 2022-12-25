const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div
      className="error"
      style={{
        color: "white",
        backgroundColor: "red",
        fontSize: "20px",
        fontWeight: "bold",
        padding: "10px",
        borderRadius: "4px",
      }}
    >
      {message}
    </div>
  );
};

export default Notification;
