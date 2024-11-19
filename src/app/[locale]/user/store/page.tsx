import Link from "next/link";
import StoreSubmissions from "./_component/StoreSubmissions";

export default function Page() {
  return (
    <>
      <p>my store</p>
      <nav>
        <Link href={"/user/store/submit"}>Create my First Store</Link>
      </nav>
      <div>
        <h3>My Store Submissions</h3>
        <StoreSubmissions />
      </div>
    </>
  );
}
