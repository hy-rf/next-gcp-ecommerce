import fetchData from "@/lib/fetchData";
import { StoreSubmission } from "@/model";
import { cookies } from "next/headers";
import StoreSubmissionItem from "./component/StoreSubmissionItem";

export default async function Page() {
  const storeSubmissions: StoreSubmission[] = (await fetchData<
    StoreSubmission[]
  >(`${process.env.URL}/api/store-submission`, {
    headers: { Cookie: (await cookies()).toString() },
  })) as StoreSubmission[];
  return (
    <>
      <h3>Store Submissions</h3>
      {storeSubmissions.map((ele) => {
        return <StoreSubmissionItem key={ele.id} ele={ele} />;
      })}
    </>
  );
}
