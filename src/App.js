import Container from "./components/Container";
import { WeatherProvider } from "./context/WeatherContext";
function App() {
   return (
      <>
         <WeatherProvider>
            <Container />
         </WeatherProvider>
      </>
   );
}

export default App;
