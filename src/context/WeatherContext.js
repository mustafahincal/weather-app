import { createContext, useState, useEffect } from "react";
import axios from "axios";
import citiesJSON from "../data/cities.json";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
   const [data, setData] = useState({});
   const [city, setCity] = useState({});
   const [cityInput, setCityInput] = useState("");
   const [control, setControl] = useState(false);

   const days = [
      "Pazar",
      "Pazartesi",
      "Salı",
      "Çarşamba",
      "Perşembe",
      "Cuma",
      "Cumartesi",
   ];

   const date = new Date();
   const dayIndex = date.getDay();
   const localeDateString = date.toLocaleDateString();
   const day = days[dayIndex];

   const getDay = (index) => {
      index = index % 7;
      return days[index];
   };

   useEffect(() => {
      setCity(citiesJSON[33]);
      axios(
         `https://api.openweathermap.org/data/2.5/onecall?lat=41.0053&lon=28.9770&units=metric&exclude=current,minutely,hourly,alerts&lang=tr&appid=7c6a1c907bcbf2ce8d3113f138e0e181`
      ).then((res) => {
         setData(res.data);
         setControl(true);
      });
   }, []);

   const setCurrentCity = (value) => {
      setControl(false);
      if (value !== undefined) {
         let val = [...value];

         if ("ğüşiöç".includes(val[0])) {
            val[0] = val[0]
               .replace("ş", "Ş")
               .replace("ç", "Ç")
               .replace("i", "İ")
               .replace("ğ", "Ğ")
               .replace("ü", "Ü")
               .replace("ö", "Ö");
         } else {
            val[0] = val[0].toUpperCase();
         }

         const cityObject = citiesJSON.find(
            (city) => city.name === val.join("")
         );

         console.log(cityObject);
         if (!cityObject) {
            alert("Şehir bulunamadı!");
            return;
         }

         setCity(cityObject);
         searchCity(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${cityObject.latitude}&lon=${cityObject.longitude}&units=metric&exclude=current,minutely,hourly,alerts&lang=tr&appid=7c6a1c907bcbf2ce8d3113f138e0e181`
         );
      }
   };

   const searchCity = (url) => {
      console.log(url);
      axios(url)
         .then((res) => {
            setData(res.data);
            setControl(true);
         })
         .catch((e) => console.log(e.message));

      setCityInput("");
   };

   const values = {
      data,
      setData,
      city,
      setCity,
      control,
      setControl,
      cityInput,
      setCityInput,
      days,
      day,
      localeDateString,
      dayIndex,
      getDay,
      setCurrentCity,
   };

   return (
      <WeatherContext.Provider value={values}>
         {children}
      </WeatherContext.Provider>
   );
};

export default WeatherContext;
