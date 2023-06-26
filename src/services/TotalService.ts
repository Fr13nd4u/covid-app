import api from "../api";

const getTotal = () => {
  return api.get('/reports/total');
};

const TotalService = {
  getTotal
};

export default TotalService;