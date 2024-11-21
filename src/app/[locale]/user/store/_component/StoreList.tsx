import { Store } from "@/model";
import { cookies } from "next/headers";

export default async function StoreList() {
  const stores: Store[] = await fetch(`${process.env.URL}/user/store/api`, {
    headers: { Cookie: (await cookies()).toString() },
  }).then((res) => res.json());
  return (
    <div>
      {stores.map((ele, index) => {
        return (
          <div key={index}>
            <p>Store Name: {ele.name}</p>
            <p>Store Description: {ele.description}</p>
            <p>Store Owned by: {ele.ownerUserId}</p>
          </div>
        );
      })}
    </div>
  );
}
