import { useEffect, useState } from "react";
import axios from "axios";
import citiesJSON from "../data/cities.json";

function Container() {
   const [data, setData] = useState({});
   const [city, setCity] = useState(citiesJSON[33]);
   const [searchingCity, setSearchingCity] = useState("");
   const [control, setControl] = useState(false);
   const [url, setUrl] = useState("");

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
   const localeDateString = date.toLocaleDateString();
   const dayIndex = date.getDay();
   const day = days[dayIndex];

   const getDay = (index) => {
      index = index % 7;
      return days[index];
   };

   // https://api.openweathermap.org/data/2.5/onecall?lat=41.0053&lon=28.9770&units=metric&exclude=current,minutely,hourly,alerts&lang=tr&appid=7c6a1c907bcbf2ce8d3113f138e0e181

   useEffect(() => {
      console.log(city);
      axios(
         `https://api.openweathermap.org/data/2.5/onecall?lat=41.0053&lon=28.9770&units=metric&exclude=current,minutely,hourly,alerts&lang=tr&appid=7c6a1c907bcbf2ce8d3113f138e0e181`
      ).then((res) => {
         console.log(res.data);
         setData(res.data);
         setControl(true);
      });
   }, []);

   const setCurrentCity = (value) => {
      setControl(false);
      if (value != undefined) {
         const cityObject = citiesJSON.find(
            (city) => city.name.toLowerCase() === value.toLowerCase()
         );

         console.log(cityObject);
         setCity(cityObject);
         setUrl(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${cityObject.latitude}&lon=${cityObject.longitude}&units=metric&exclude=current,minutely,hourly,alerts&lang=tr&appid=7c6a1c907bcbf2ce8d3113f138e0e181`
         );
         console.log(url);
         searchCity(url);
      }
   };

   const searchCity = (url) => {
      // axios(url)
      //    .then((res) => {
      //       setData(res.data);
      //       setControl(true);
      //    })
      //    .catch((e) => console.log(e.message));
      // setCity("");
   };

   return (
      <div className="bg-bg-city bg-cover bg-center w-full h-screen font-poppins">
         <div className="w-3/4  h-full m-auto py-7">
            <div className="relative">
               <input
                  className="py-1 px-3 w-full rounded outline-none"
                  type="text"
                  value={searchingCity}
                  placeholder="Şehir Gir"
                  onChange={(e) => setSearchingCity(e.target.value)}
                  onKeyDown={(e) => {
                     e.key === "Enter"
                        ? setCurrentCity(searchingCity)
                        : console.log("");
                  }}
               />
               <button
                  onClick={() => setCurrentCity(searchingCity)}
                  className="absolute right-2 bottom-1.5 text-gray-900 text-sm"
               >
                  <i className="fa-solid fa-magnifying-glass"></i>
               </button>
            </div>
            {control && (
               <div className="h-full flex flex-col justify-between py-5">
                  <div className="top">
                     <div>
                        <p className="text-4xl">{city.name}</p>
                     </div>
                     <div>
                        <p className="text-3xl">{day}</p>
                     </div>
                     <div>
                        <p className="text-6xl font-bold">
                           {data.daily[0].temp.day}°C
                        </p>
                     </div>
                     <div className="description relative">
                        <p className="absolute -right-4 -rotate-90 font-semibold bg-pink-100 py-1 px-1 rounded-lg capitalize">
                           {data.daily[0].weather[0].description}
                        </p>
                     </div>
                  </div>
                  <div className="bottom flex justify-between bg-gray-100 bg-opacity-20 py-3 px-3 rounded">
                     <div>
                        <p>Hissedilen</p>
                        <p>{data.daily[0].feels_like.day}°C</p>
                     </div>
                     <div>
                        <p>Nem</p>
                        <p>%{data.daily[0].humidity}</p>
                     </div>
                     <div>
                        <p>Rüzgar</p>
                        <p>{data.daily[0].wind_speed} MPH</p>
                     </div>
                  </div>
                  <div className="flex justify-between gap-3">
                     {data.daily.map((daily, index) => {
                        return (
                           index <= 6 && (
                              <div
                                 key={index}
                                 className="flex flex-col items-center bg-gray-100 bg-opacity-30 p-3 rounded  flex-grow"
                              >
                                 <div>
                                    <p>{getDay(index + 1)}</p>
                                 </div>
                                 <div className="text-center">
                                    <p>{data.daily[index + 1].temp.day}°C</p>
                                 </div>
                                 <div>
                                    <p>
                                       {
                                          data.daily[index + 1].weather[0]
                                             .description
                                       }
                                    </p>
                                 </div>
                              </div>
                           )
                        );
                     })}
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}

export default Container;
