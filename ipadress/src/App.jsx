import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import backgroundImage from './assets/pattern-bg-desktop.png';
import { FaArrowRight } from 'react-icons/fa';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ChangeMapView({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);

  return null;
}

function App() {
  const [ipData, setIpData] = useState(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetchIPData();
  }, []);

  const fetchIPData = async (ipOrDomain = '') => {
    let url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_wVBmZwn1Nd9dbSHcTYxQqc5aQBSjN`;

    if (ipOrDomain) {
      if (isValidIp(ipOrDomain)) {
        url += `&ipAddress=${ipOrDomain}`;
      } else {
        url += `&domain=${ipOrDomain}`;
      }
    }

    try {
      const response = await axios.get(url);
      setIpData(response.data);
    } catch (error) {
      console.error('Error fetching the IP data:', error);
      toast.error('Failed to fetch data. Please try again.');
    }
  };

  const isValidIp = (value) => {
    const ipPattern = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$/;
    return ipPattern.test(value);
  };

  const handleButtonClick = () => {
    if (inputValue.trim() !== '') {
      fetchIPData(inputValue);
    }
  };

  return (
    <div className="relative flex flex-col h-screen w-full">
      <div
        className="w-full flex-shrink-0 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          height: '30vh',
        }}
      >
        <div className="flex flex-col items-center justify-center h-full p-4 text-center relative z-10">
          <h1 className="text-white text-2xl md:text-4xl mb-8">IP Address Tracker</h1>
          <div className="flex items-center mb-20">
            <input
              type="text"
              placeholder="Enter IP Address or Domain"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="p-2 rounded-l-md border border-gray-300"
            />
            <button
              className="p-2 bg-blue-600 text-white rounded-r-md flex items-center"
              onClick={handleButtonClick}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>

      {ipData && (
        <div
          className="absolute inset-x-24 top-[20%] bg-white shadow-2xl rounded-2xl z-20 p-4 flex justify-between items-center"
          style={{ height: '20vh' }}
        >
          <div className="flex flex-row w-full justify-between">
            <div className="flex-1 flex flex-col justify-center items-center border-r border-gray-300 pr-4">
              <span className="font-semibold">IP Address:</span>
              <span className="text-gray-700">{ipData.ip}</span>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center border-r border-gray-300 px-4">
              <span className="font-semibold">Location:</span>
              <span className="text-gray-700">{`${ipData.location.city}, ${ipData.location.region}, ${ipData.location.country}`}</span>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center border-r border-gray-300 px-4">
              <span className="font-semibold">Timezone:</span>
              <span className="text-gray-700">UTC {ipData.location.timezone}</span>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center pl-4">
              <span className="font-semibold">ISP:</span>
              <span className="text-gray-700">{ipData.isp}</span>
            </div>
          </div>
        </div>
      )}

      {ipData && (
        <div className="flex-1 relative z-10">
          <MapContainer className="h-full w-full" center={[ipData.location.lat, ipData.location.lng]} zoom={13}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <ChangeMapView center={[ipData.location.lat, ipData.location.lng]} />
            <Marker position={[ipData.location.lat, ipData.location.lng]}>
              <Popup>
                IP: {ipData.ip} <br /> Location: {ipData.location.city}, {ipData.location.region}, {ipData.location.country}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
