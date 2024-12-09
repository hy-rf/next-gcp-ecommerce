import { Storage } from "@google-cloud/storage";
// import { getVercelOidcToken } from "@vercel/functions/oidc";
// import { ExternalAccountClient } from "google-auth-library";

export default function storage() {
  if (true || process.env.NODE_ENV === "production") {
    return new Storage();
  }
  if (process.env.URL === "https://myshop-phi-ten.vercel.app") {
    // const GCP_PROJECT_ID = process.env.GCP_PROJECT_ID;
    // const GCP_PROJECT_NUMBER = process.env.GCP_PROJECT_NUMBER;
    // const GCP_SERVICE_ACCOUNT_EMAIL = process.env.GCP_SERVICE_ACCOUNT_EMAIL;
    // const GCP_WORKLOAD_IDENTITY_POOL_ID =
    //   process.env.GCP_WORKLOAD_IDENTITY_POOL_ID;
    // const GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID =
    //   process.env.GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID;

    // const authClient = ExternalAccountClient.fromJSON({
    //   type: "external_account",
    //   audience: `//iam.googleapis.com/projects/${GCP_PROJECT_NUMBER}/locations/global/workloadIdentityPools/${GCP_WORKLOAD_IDENTITY_POOL_ID}/providers/${GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID}`,
    //   subject_token_type: "urn:ietf:params:oauth:token-type:jwt",
    //   token_url: "https://sts.googleapis.com/v1/token",
    //   service_account_impersonation_url: `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${GCP_SERVICE_ACCOUNT_EMAIL}:generateAccessToken`,
    //   subject_token_supplier: {
    //     // Use the Vercel OIDC token as the subject token
    //     getSubjectToken: getVercelOidcToken,
    //   },
    // });
    return new Storage();
    // { projectId: GCP_PROJECT_ID, authClient }
  }
  return new Storage({
    projectId: "e-commerce-442014",
    keyFilename: "./key.json",
  });
}
