const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div
      style={{
        color: "white",
        backgroundColor: "black",
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
