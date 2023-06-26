import api from "../api";

const getRegions = () => {
  return api.get('/regions');
};

const RegionsService = {
  getRegions
};

export default RegionsService;