"use client";
export default function Page() {
  // Utility function to convert base64 to Uint8Array
  function base64ToUint8Array(base64String: string): Uint8Array {
    return Uint8Array.from(atob(base64String), (c) => c.charCodeAt(0));
  }

  // Example CredentialCreationOptions
  const options: CredentialCreationOptions = {
    publicKey: {
      rp: {
        name: "Example Corp", // The relying party's name (your organization or website)
      },
      user: {
        id: base64ToUint8Array("dGVzdF91c2VyX2lk"), // User ID (must be a Uint8Array)
        name: "user@example.com", // User's email or username
        displayName: "John Doe", // Friendly display name
      },
      challenge: base64ToUint8Array("d2ViYXV0aG5fY2hhbGxlbmdl"), // A randomly generated challenge
      pubKeyCredParams: [
        { type: "public-key", alg: -7 }, // ECDSA with SHA-256
        { type: "public-key", alg: -257 }, // RSASSA-PKCS1-v1_5 with SHA-256
      ],
      timeout: 60000, // Timeout in milliseconds (optional)
      attestation: "none", // "none", "indirect", or "direct" (optional)
      authenticatorSelection: {
        authenticatorAttachment: "platform", // "platform" (built-in) or "cross-platform" (external)
        requireResidentKey: false,
        userVerification: "preferred", // "required", "preferred", or "discouraged"
      },
    },
  };

  // Call navigator.credentials.create() with the options
  async function getKey() {
    const credential: PublicKeyCredential | null = await navigator.credentials
      .create(options)
      .then((credential) => credential as PublicKeyCredential)
      .catch(() => null);
    if (!credential) {
      console.error("No credential returned");
      return;
    }
    const response = {
      id: credential.id,
      rawId: Array.from(new Uint8Array(credential.rawId)),
      type: credential.type,
      response: {
        clientDataJSON: Array.from(
          new Uint8Array(credential.response.clientDataJSON)
        ),
        attestationObject: Array.from(
          new Uint8Array(
            (
              credential.response as AuthenticatorAttestationResponse
            ).attestationObject
          )
        ),
      },
    };
    console.log("Formatted credential for server:", response);
  }

  return (
    <>
      <button onClick={getKey}>get passkey</button>
    </>
  );
}
