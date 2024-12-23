"use client";

import { useState } from "react";

export default function Addresses() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  async function handleGetAddress() {
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setLocation({ latitude, longitude });
      });
    }
  }
  return (
    <>
      <p>choose an address</p>
      <button onClick={handleGetAddress}>Generate Address</button>
      <p>{location?.latitude}</p>
      <p>{location?.longitude}</p>
    </>
  );
}
