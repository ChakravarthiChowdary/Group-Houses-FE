import { Alert, Button, Typography } from "@mui/material";
import { CenteredContainer } from "../../HOC/CenteredContainer/CenteredContainer";

interface IErrorProps {
  message: string;
  handleRetryClick: () => void;
}

const Error: React.FC<IErrorProps> = ({ message, handleRetryClick }) => {
  return (
    <Alert
      severity="error"
      action={
        <Button color="inherit" size="small" onClick={handleRetryClick}>
          Retry
        </Button>
      }
    >
      {message}
    </Alert>
  );
};

export default CenteredContainer(Error);
