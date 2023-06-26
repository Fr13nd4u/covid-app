import React from "react";
import { Grid } from "@mui/material";
import { TotalCard } from "../components/cards";

export const AboutPage: React.FC = () => {
  return (
    <Grid container gap={4} direction={"column"}>
      <TotalCard />
    </Grid>
  );
};
