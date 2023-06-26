import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchTotal } from "../../redux/slices/total";

import CountUp from "react-countup";
import { dateFormat } from "../../helpers";

import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import styles from "./Cards.module.css";

export const TotalCard: React.FC = () => {
  const { total, loading, error } = useSelector(
    (state: RootState) => state.total
  );

  const dispatch = useDispatch<AppDispatch>();

  React.useLayoutEffect(() => {
    dispatch(fetchTotal());
  }, []);

  if (loading) {
    return <CircularProgress disableShrink />;
  }

  if (error) {
    return <Typography variant="h2">{error}</Typography>;
  }

  if (total)
    return (
      <>
        <Typography variant="h2" gutterBottom>
          Total Statistics
        </Typography>
        <Grid container justifyContent="space-between">
          <Grid
            item
            component={Card}
            xs={12}
            md={3}
            className={styles.infected}
          >
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Infected
              </Typography>
              <Typography variant="h5">
                <CountUp
                  start={0}
                  end={total.confirmed}
                  duration={2.5}
                  separator=","
                />
              </Typography>
              <Typography color="textSecondary">
                {dateFormat(total.last_update)}
              </Typography>
              <Typography variant="body2">
                Number of active cases of COVID-19
              </Typography>
            </CardContent>
          </Grid>
          <Grid
            item
            component={Card}
            xs={12}
            md={3}
            className={styles.recovered}
          >
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Recovered
              </Typography>
              <Typography variant="h5">
                <CountUp
                  start={0}
                  end={total.recovered}
                  duration={2.5}
                  separator=","
                />
              </Typography>
              <Typography color="textSecondary">
                {dateFormat(total.last_update)}
              </Typography>
              <Typography variant="body2">
                Number of recoveries from COVID-19
              </Typography>
            </CardContent>
          </Grid>
          <Grid item component={Card} xs={12} md={3} className={styles.deaths}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Deaths
              </Typography>
              <Typography variant="h5">
                <CountUp
                  start={0}
                  end={total.deaths}
                  duration={2.5}
                  separator=","
                />
              </Typography>
              <Typography color="textSecondary">
                {dateFormat(total.last_update)}
              </Typography>
              <Typography variant="body2">
                Number of deaths caused by COVID-19
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </>
    );
};
