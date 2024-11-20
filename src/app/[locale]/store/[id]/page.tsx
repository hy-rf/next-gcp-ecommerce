import fetchData from "@/lib/fetchData";
import { Store } from "@/model";

type Params = {
  id: string;
};

export default async function Page({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const storeItem: Store = await fetchData<Store>(
    `${process.env.URL}/store/api?id=${id}`
  );
  console.log(storeItem);

  return (
    <>
      <p>
        A store of id:
        <span>
          <code>{id}</code>
        </span>
      </p>
      <p>{storeItem.name}</p>
      <p>{storeItem.description}</p>
      <p>{storeItem.createdUserId}</p>
      <p>{storeItem.ownerUserId}</p>
    </>
  );
}
