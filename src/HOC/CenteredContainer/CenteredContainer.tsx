import { Container } from "@mui/material";
import React from "react";

export const CenteredContainer = (Component: React.FC<any>) => {
  return (props: any) => (
    <Container
      sx={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Component {...props} />
    </Container>
  );
};
