import Link from "next/link";
import StoreSubmissions from "./_component/StoreSubmissions";

export default function Page() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h3>Store</h3>
      <nav
        style={{
          display: "flex",
          alignContent: "center",
        }}
      >
        <Link
          style={{
            marginLeft: "auto",
          }}
          href={"/user/store/submit"}
        >
          Create Store
        </Link>
      </nav>
      <div>
        <h3>My Store Submissions</h3>
        <StoreSubmissions />
      </div>
    </div>
  );
}
