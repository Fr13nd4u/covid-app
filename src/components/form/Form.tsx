import React from "react";

import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import styles from "./Form.module.css";

import { AppDispatch, RootState } from "../../redux/store";
import { fetchRegions } from "../../redux/slices/regions";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountry } from "../../redux/slices/country";
import { useLocation, useNavigate } from "react-router-dom";

export const Form: React.FC = () => {
  const [dates, setDates] = React.useState<string[] | []>([]);
  const { regions } = useSelector((state: RootState) => state.regions);
  const [selectedCountry, setSelectedCountry] = React.useState<string>("");

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const handleDateRangeChange = (value: Date[]) => {
    if (value[0] && value[1]) {
      const daysArray: string[] = [];
      const startDate = value[0];
      const endDate = value[1];

      // Update query parameters
      queryParams.set("date_from", startDate.toISOString());
      queryParams.set("date_to", endDate.toISOString());
      navigate(`?${queryParams.toString()}`);

      const currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        const formattedDate = currentDate.toISOString().slice(0, 10);
        daysArray.push(formattedDate);
        currentDate.setDate(currentDate.getDate() + 1);
      }

      setDates(daysArray);
    }
  };

  const handleCountryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedCountry(event.target.value as string);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Update query parameters
    queryParams.set("country", selectedCountry);
    navigate(`?${queryParams.toString()}`);

    dispatch(fetchCountry({ dates, iso: selectedCountry }));
  };

  const dispatch = useDispatch<AppDispatch>();

  React.useLayoutEffect(() => {
    dispatch(fetchRegions());
  }, []);

  React.useEffect(() => {
    const date_from = queryParams.get("date_from");
    const date_to = queryParams.get("date_to");
    const country = queryParams.get("country");

    if (date_from && date_to && country) {
      const startDate = new Date(date_from);
      const endDate = new Date(date_to);

      const daysArray: string[] = [];
      const currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        const formattedDate = currentDate.toISOString().slice(0, 10);
        daysArray.push(formattedDate);
        currentDate.setDate(currentDate.getDate() + 1);
      }

      setDates(daysArray);
      setSelectedCountry(country);

      dispatch(fetchCountry({ dates: daysArray, iso: country }));
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <DateRangePicker format="yyyy-MM-dd" onChange={handleDateRangeChange} />

      <FormControl>
        <InputLabel className={styles.label} id="country-label">
          Country
        </InputLabel>
        <Select
          className={styles.select}
          labelId="country-label"
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          {regions.map((country, index) => (
            <MenuItem key={index} value={country.iso}>
              {country.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};
