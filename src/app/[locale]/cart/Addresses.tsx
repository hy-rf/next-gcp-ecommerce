"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function Addresses({
  setSelectedAddress,
}: {
  setSelectedAddress: Dispatch<SetStateAction<string>>;
}) {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [generatedAddress, setGeneratedAddress] = useState("");
  async function handleGetAddress() {
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setLocation({ latitude, longitude });
      });
    }
  }
  useEffect(() => {
    (async () => {
      if (!location) return;
      const data = await fetch(
        `/api/address?lat=${location.latitude}&lng=${location.longitude}`
      );
      if (data.status !== 200) {
        console.error("Failed to fetch address");
        return;
      }
      const geoInfo = await data.json();
      setGeneratedAddress(geoInfo.results[0].formatted_address);
    })();
  }, [location]);
  useEffect(() => {
    if (generatedAddress !== "") {
      setSelectedAddress(generatedAddress);
    }
  }, [generatedAddress]);
  return (
    <>
      <p>choose an address</p>
      {/* TODO: Add a list of addresses here and a popup form to add address */}
      <button onClick={handleGetAddress}>Generate Address</button>
      <div>{generatedAddress !== "" && <p>{generatedAddress}</p>}</div>
    </>
  );
}
