import { Alert } from "react-bootstrap";

const Notificiation = ({ message }) => {
  if (!message) return null;

  return (
    <Alert>
      <h3>{message}</h3>
    </Alert>
  );
};

export default Notificiation;
