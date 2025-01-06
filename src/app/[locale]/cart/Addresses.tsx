"use client";

import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import LocaleContext from "../component/LocaleContext";
import "./Addresses.css";
import { Address } from "@/model";

export default function Addresses({
  setSelectedAddress,
}: {
  setSelectedAddress: Dispatch<SetStateAction<string>>;
}) {
  const { dict } = useContext(LocaleContext);
  const [addresses, setAddresses] = useState<Address[]>([]);
  useEffect(() => {
    (async () => {
      const data = await fetch("/api/address");
      if (data.status !== 200) {
        console.error("Failed to fetch addresses");
        return;
      }
      const addresses = await data.json();
      setAddresses(addresses);
    })();
  }, []);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

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
      setIsGenerating(true);
      const data = await fetch(
        `/api/address?lat=${location.latitude}&lng=${location.longitude}`
      );
      if (data.status !== 200) {
        console.error("Failed to fetch address");
        return;
      }
      const geoInfo = await data.json();
      setGeneratedAddress(geoInfo.results[0].formatted_address);
      setIsGenerating(false);
    })();
  }, [location]);
  useEffect(() => {
    if (generatedAddress !== "") {
      setSelectedAddress(generatedAddress);
    }
  }, [generatedAddress]);
  return (
    <>
      <h5>{dict.cart_checkout_choose_address_text}</h5>
      <div className="border rounded-sm shadow-sm p-2">
        {addresses.length === 0 && <p>{dict.address_no_address_found_text}</p>}
        {addresses.length > 0 && (
          <>
            <label htmlFor="address">Address:</label>
            <select name="address" id="address">
              {addresses.map((address) => {
                return (
                  <option key={address.name} value={address.name}>
                    {address.name}
                  </option>
                );
              })}
            </select>
          </>
        )}
        <button onClick={handleGetAddress}>
          {dict.address_generate_button_text}
        </button>
        <div
          className={`${isGenerating ? "loading" : ""} h-20 p-4 box-content`}
        >
          <p>{!isGenerating && generatedAddress}</p>
        </div>
      </div>
    </>
  );
}
