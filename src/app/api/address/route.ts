import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const latitude = searchParams.get("lat");
  const longitude = searchParams.get("lng");
  const KEY = process.env.GEO_API_KEY;
  const ADDRESS_URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${KEY}`;
  const response = await fetch(ADDRESS_URL);
  if (response.status !== 200) {
    return new Response(JSON.stringify({ error: "Failed to fetch address" }), {
      status: 500,
      statusText: "Failed to fetch address",
    });
  }
  const data = await response.json();
  return new Response(JSON.stringify(data), {
    status: 200,
    statusText: "OK",
  });
}
