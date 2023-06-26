import api from "../api";

const getCountry = async ({iso, dates} : {iso: string, dates: string[]}) => {
  const requests = dates.map((date) => {
    const url = `/reports/total?date=${date}&iso=${iso}`;
    return api.get(url).then((response) => response.data.data);
  });

  const responses = await Promise.all(requests);

  return responses;
};

const CountryService = {
  getCountry
};

export default CountryService;