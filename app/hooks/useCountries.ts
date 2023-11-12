import countries from "world-countries";

const formatteCountry = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  const getAll = () => formatteCountry;

  const getByValue = (value: string) => {
    return formatteCountry.find((item) => item.value === value);
  };
  return {
    getAll,
    getByValue,
  };
};
export default useCountries;
