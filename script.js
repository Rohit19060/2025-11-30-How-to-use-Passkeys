const responseFromServer =
  // Example `PublicKeyCredentialCreationOptions` contents
  {
    challenge: "dGVzdGRk",
    rp: {
      name: "Passkeys Demo",
      id: "rohit19060.github.io",
    },
    user: {
      id: "dGVzdGRk",
      name: "john78",
      displayName: "John",
    },
    pubKeyCredParams: [
      {
        alg: -7,
        type: "public-key",
      },
      {
        alg: -257,
        type: "public-key",
      },
    ],
    excludeCredentials: [
      {
        id: "dGVzdGRk",
        type: "public-key",
        transports: ["internal"],
      },
    ],
    authenticatorSelection: {
      authenticatorAttachment: "platform",
      requireResidentKey: true,
    },
  };

function createPasskey() {
  // Availability of `window.PublicKeyCredential` means WebAuthn is usable.
  // `isUserVerifyingPlatformAuthenticatorAvailable` means the feature detection is usable.
  // `isConditionalMediationAvailable` means the feature detection is usable.
  if (
    window.PublicKeyCredential &&
    PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable &&
    PublicKeyCredential.isConditionalMediationAvailable
  ) {
    // Check if user verifying platform authenticator is available.
    Promise.all([
      PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable(),
      PublicKeyCredential.isConditionalMediationAvailable(),
    ]).then(async (results) => {
      if (results.every((r) => r === true)) {
        // Display "Create a new passkey" button
        // Fetch an encoded `PubicKeyCredentialCreationOptions` from the server.
        // const _options = await fetch("/webauthn/registerRequest");
        // const _options = responseFromServer;

        // Deserialize and decode the `PublicKeyCredentialCreationOptions`.
        // const decoded_options = JSON.parse(_options);
        const options =
          PublicKeyCredential.parseCreationOptionsFromJSON(responseFromServer);
        const credential = await navigator.credentials.create({
          publicKey: options,
        });
        console.log(credential);
      }
    });
  }
}

createPasskey();
