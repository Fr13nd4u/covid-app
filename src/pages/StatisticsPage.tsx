import React from "react";
import { TotalCard } from "../components/cards";
import { Grid } from "@mui/material";
import { CovidChart } from "../components/charts";
import { Form } from "../components/form/Form";

export const StatisticsPage: React.FC = () => {
  return (
    <Grid container gap={4} direction={"column"}>
      <TotalCard />
      <Form />
      <CovidChart />
    </Grid>
  );
};
