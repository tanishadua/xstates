import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [country, setCountry] = useState(""); //The value that will go in backend will come here in setState
  const [countryList, setCountryList] = useState([]);
  const [state, setState] = useState("");
  const [stateList, setStateList] = useState([]);
  const [city, setCity] = useState("");
  const[cityLabel, setCityLabel] = useState("")
  const[stateLabel, setStateLabel] = useState("")
  const[countryLabel, setCountryLabel] = useState("")
  const [cityList, setCityList] = useState([]);
  const[show, setShow] = useState(false)
  const fetchCountry = async () => {
    try {
      const data = await axios.get(
        "https://crio-location-selector.onrender.com/countries"
      );
      const res = data.data;
      //res is an array of strings
      setCountryList(
        res.map((item, index) => {
          return {
            id: index,
            val: `${item}`,
            country: `${item}`,
          };
        })
      );
    } catch (error) {
      console.log(error);
      alert("List of countries is not getting loaded, pls check backend");
    }
  };
  const fetchState = async (val) => {
    try {
      console.log(country)
      const data = await axios.get(`https://crio-location-selector.onrender.com/country=${val}/states`)
      const res = data.data
      /*const res = [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal",
        // Union Territories
        "Andaman and Nicobar Islands",
        "Chandigarh",
        "Dadra and Nagar Haveli and Daman and Diu",
        "Delhi",
        "Jammu and Kashmir",
        "Ladakh",
        "Lakshadweep",
        "Puducherry",
      ];*/

      //console.log(res)

      setStateList(
        res.map((item, index) => {
          return {
            id: index,
            val: `${item}`,
            state: `${item}`,
          };
        })
      );
    } catch (error) {
      console.log(error);
      alert(
        "List of states are not getting loaded, please check the backend if running!"
      );
    }
  };
  const fetchCity = async (val) => {
    try {
      const data = await axios.get(`https://crio-location-selector.onrender.com/country=${country}/state=${val}/cities`)
      const res = data.data
      console.log(res)
      /*const res = [
        "Panaji",
        "Margao",
        "Vasco da Gama",
        "Mapusa",
        "Ponda",
        "Bicholim",
        "Curchorem",
        "Sanquelim",
        "Canacona",
        "Cuncolim",
        "Quepem",
        "Sanguem",
        "Valpoi",
        "Old Goa",
        "Mormugao",
      ];*/
      setCityList(
        res.map((item,index) => {
          return {
            id:index,
            val: `${item}`,
            city: `${item}`,
          };
        })
      );
    } catch (error) {
      console.log(error);
      alert(
        "List of cities are not getting loaded, please check the backend if running!"
      );
    }
  };
  //fetch the list of countries as and when the page is initially rendered
  useEffect(() => {
    fetchCountry();
  }, []);
  const handleCountryChange = (e) => {
    console.log(e.target.value);
    setCountryLabel(e.target.options[e.target.selectedIndex].text)
    setCountry(e.target.value);
    fetchState(e.target.value);
  };
  const handleStateChange = (e) => {
    console.log(e.target.value);
    setStateLabel(e.target.options[e.target.selectedIndex].text)
    setState(e.target.value);
    fetchCity(e.target.value);
  };
  const handleCityChange = (e) => {
    console.log(e)
    setCityLabel(e.target.options[e.target.selectedIndex].text)
    setCity(e.target.value);
    setShow(true)
  };
  return (
    <div className="App">
      <h1>Select Location</h1>
      <select
        name="selectedCountry"
        value={country}
        onChange={handleCountryChange}
      >
        <option value="" disabled>
          Select Country
        </option>
        {countryList.map((item) => (
          <option key={item.country} value={item.val}>
            {item.country}
          </option>
        ))}
      </select>
      <select name="selectedState" value={state} onChange={handleStateChange}>
        <option value="" disabled>
          Select State
        </option>
        {stateList.map((item) => (
          <option key={item.state} value={item.val}>
            {item.state}
          </option>
        ))}
      </select>
      <select name="selectedCity" value={city} onChange={handleCityChange}>
        <option value="" disabled>
          Select City
        </option>
        {cityList.map((item) => (
          <option key={item.city} value={item.val}>
            {item.city}
          </option>
        ))}
      </select>
      {show && 
        <p>You selected {` ${cityLabel}`}, 
    {` ${stateLabel}`}, {` ${countryLabel}`}</p>
      }
    </div>
  );
}

export default App;
