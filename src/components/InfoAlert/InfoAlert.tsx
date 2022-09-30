import { Alert, Button } from "@mui/material";
import { CenteredContainer } from "../../HOC/CenteredContainer/CenteredContainer";

interface IInfoAlertProps {
  message: string;
  handleClick: () => void;
  buttonTitle: string;
}

const InfoAlert: React.FC<IInfoAlertProps> = ({
  message,
  handleClick,
  buttonTitle,
}) => {
  return (
    <Alert
      severity="info"
      action={
        <Button color="inherit" size="small" onClick={handleClick}>
          {buttonTitle}
        </Button>
      }
    >
      {message}
    </Alert>
  );
};

export default CenteredContainer(InfoAlert);
