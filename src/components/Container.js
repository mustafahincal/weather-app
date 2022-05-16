import { useContext } from "react";

import WeatherContext from "../context/WeatherContext";

function Container() {
   const {
      data,
      city,
      control,
      cityInput,
      setCityInput,
      day,
      dayIndex,
      getDay,
      localeDateString,
      setCurrentCity,
   } = useContext(WeatherContext);

   return (
      <div className="bg-bg-city bg-cover bg-center w-full min-h-screen font-poppins">
         <div className="w-11/12  h-full m-auto py-7">
            <div className="relative">
               <input
                  className="py-1 px-3 w-full rounded outline-none"
                  type="text"
                  value={cityInput}
                  placeholder="Şehir Gir"
                  onChange={(e) => setCityInput(e.target.value)}
                  onKeyDown={(e) => {
                     e.key === "Enter" && setCurrentCity(cityInput);
                  }}
               />
               <button
                  onClick={() => setCurrentCity(cityInput)}
                  className="absolute right-2 bottom-1.5 text-gray-900 text-sm"
               >
                  <i className="fa-solid fa-magnifying-glass"></i>
               </button>
            </div>
            {control && (
               <div className="min-h-screen flex flex-col justify-evenly items-center ">
                  <div className="w-full flex justify-between px-6">
                     <div>
                        <p className="text-5xl font-bold">{city.name}</p>
                        <p className="text-3xl">
                           {day} {localeDateString}
                        </p>
                     </div>
                     <div className="description relative">
                        <p className="text-5xl font-mono bg-gray-300 bg-opacity-80 p-2 rounded-2xl">
                           {data.daily[0].temp.day}°C
                        </p>
                     </div>
                     <div>
                        <p className="inline-block font-semibold bg-blue-100 py-1 px-1 rounded-lg capitalize">
                           {data.daily[0].weather[0].description}
                        </p>
                        <img
                           src={`http://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}@2x.png`}
                           alt="Weather Icon"
                           width="80"
                           height="80"
                        />
                     </div>
                  </div>
                  <div className="flex justify-between gap-3  w-full  flex-wrap">
                     {data.daily.map((daily, index) => {
                        return (
                           index <= 6 && (
                              <div
                                 key={index}
                                 className="group flex flex-col items-center justify-start bg-blue-200 bg-opacity-50 p-3 rounded flex-grow space-y-2 hover:bg-blue-400 hover:bg-opacity-60 hover:text-white transition-all"
                              >
                                 <div>
                                    <p className="font-medium p-1 rounded-lg bg-white bg-opacity-60 border-2 group-hover:bg-blue-400 group-hover:text-white transition-all">
                                       {getDay(dayIndex + index + 1)}
                                    </p>
                                 </div>
                                 <div>
                                    <img
                                       src={`http://openweathermap.org/img/wn/${daily.weather[0].icon}@2x.png`}
                                       alt="Weather Icon"
                                       width="80"
                                       height="80"
                                       className="group-hover:scale-125 transition-all"
                                    />
                                 </div>
                                 <div className="text-center">
                                    <p>{data.daily[index + 1].temp.day}°C</p>
                                 </div>
                                 <div>
                                    <p className="text-sm uppercase">
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
