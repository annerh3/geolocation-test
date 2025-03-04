import './App.css'
import { useState } from 'react';

function App() {
  const [location, setLocation] = useState({ latitude: null, longitude: null, accuracy: null });
  const [geoPermission, setGeoPermission] = useState(null);

  /** @param {GeolocationPosition} position */
  const handleSuccess = (position) => {
    console.log("Latitud es :", position.coords.latitude);
    console.log("Longitud es :", position.coords.longitude);
    console.log("Mas o menos " + position.coords.accuracy + " metros.");
    
    setLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy
    });
    return;
  };

  const handleError = (error) => {
    console.error("Error al obtener la ubicacion", error);
  };

  const handleGetLocation = () => {
    console.log("Obteniendo ubicacion...");
    
    if (navigator.geolocation) {
      console.log("La geolocalizacion es soportada por este navegador.");
    
      navigator.permissions.query({ name: "geolocation" }).then(result => {
        setGeoPermission(result.state);
        if (result.state === "granted") {
          navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {enableHighAccuracy: true});
        } else if (result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {enableHighAccuracy: true});
        } else {
          console.error("La geolocalizacion no está habilitada.");
        }
      });
    } else {
      console.error("La geolocalizacion no es soportada por este navegador.");
    }
  };

  return (
    <>
      <h1>Geolocation</h1>
      <div className="card">
        <button onClick={handleGetLocation}>Get Location</button>
        {geoPermission === "denied" && <p>La geolocalizacion no está habilitada. Habilítelo en la configuración de su navegador.</p>}
        {location.latitude && (
          <div>

          <p>
            Latitude: {location.latitude}, Longitude: {location.longitude}
          </p>
          <p>
            Exactitud de: {location.accuracy} metros.
          </p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
