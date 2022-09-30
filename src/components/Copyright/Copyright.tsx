import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export const Copyright = (props: any) => {
  return (
    <Typography variant="body2" align="center" {...props}>
      {`Copyright © Our Homes ${new Date().getFullYear()}`}
    </Typography>
  );
};
