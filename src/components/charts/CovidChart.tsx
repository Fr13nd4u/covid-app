import React from "react";
import Chart from "react-apexcharts";
import styles from "./Chart.module.css";
import { CircularProgress, Typography } from "@mui/material";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

export const CovidChart: React.FC = () => {
  const { country, loading, error } = useSelector(
    (state: RootState) => state.country
  );

  if (loading) {
    return <CircularProgress disableShrink />;
  }

  if (error) {
    return <Typography variant="h2">{error}</Typography>;
  }

  if (country.length > 0) {
    const dates = country.map((item) => item.date);
    const confirmed = country.map((item) => item.confirmed);
    const deaths = country.map((item) => item.deaths);
    const recovered = country.map((item) => item.recovered);

    const chartOptions: any = {
      chart: {
        id: "covid-chart",
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: [
        "rgba(0, 0, 255, 0.5)",
        "rgba(0, 255, 0, 0.5)",
        "rgba(255, 0, 0, 0.5)",
      ],
      stroke: {
        curve: "smooth",
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100],
        },
      },
      xaxis: {
        categories: dates, // Replace with your actual categories
      },
    };

    const chartSeries = [
      {
        name: "Confirmed",
        data: confirmed,
      },
      {
        name: "Recovered",
        data: recovered,
      },
      {
        name: "Deaths",
        data: deaths,
      },
    ];

    return (
      <div className={styles.chart}>
        <Typography variant="h2" gutterBottom>
          Statistics By Country
        </Typography>
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="area"
          height={450}
          width={1330}
        />
      </div>
    );
  }
};
