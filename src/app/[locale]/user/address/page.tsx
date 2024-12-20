import { Address } from "@/model";
import AddAddressForm from "./component/AddAddressForm";
import fetchData from "@/lib/fetchData";

export default async function Page() {
  const addresses: Address[] = (await fetchData<Address[]>(
    `${process.env.URL}/api/user/address`
  )) as Address[];
  return (
    <div>
      <div>
        <h3>Address list</h3>
        {addresses.map((ele) => {
          return (
            <div key={ele.description}>
              <p>{ele.name}</p>
              <p>{ele.description}</p>
            </div>
          );
        })}
      </div>
      <AddAddressForm />
    </div>
  );
}
