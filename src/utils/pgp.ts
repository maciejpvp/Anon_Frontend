import * as openpgp from "openpgp";

export interface KeyPair {
  publicKey: string;
  privateKey: string;
}

export async function generateKeyPair(
  name: string,
  passphrase?: string
): Promise<KeyPair> {
  try {
    const { privateKey, publicKey } = await openpgp.generateKey({
      type: "ecc",
      curve: "curve25519",
      userIDs: [{ name }],
      passphrase: passphrase || "",
      format: "armored",
    });

    localStorage.setItem("pgp_private_key", privateKey);

    return {
      publicKey,
      privateKey,
    };
  } catch (error) {
    console.error("Error generating PGP key pair:", error);
    throw new Error("Failed to generate PGP key pair");
  }
}

export async function encryptMessage(
  message: string,
  recipientPublicKey: string
): Promise<string> {
  try {
    const publicKey = await openpgp.readKey({ armoredKey: recipientPublicKey });

    const encrypted = await openpgp.encrypt({
      message: await openpgp.createMessage({ text: message }),
      encryptionKeys: publicKey,
      format: "armored",
    });

    return encrypted as string;
  } catch (error) {
    console.error("Error encrypting message:", error);
    throw new Error("Failed to encrypt message");
  }
}

export async function decryptMessage(
  encryptedMessage: string,
  passphrase?: string
): Promise<string> {
  try {
    const privateKeyArmored = localStorage.getItem("pgp_private_key");

    if (!privateKeyArmored) {
      throw new Error("Private key not found in localStorage");
    }

    const privateKeyObj = await openpgp.readPrivateKey({
      armoredKey: privateKeyArmored,
    });

    const privateKey = privateKeyObj.isDecrypted()
      ? privateKeyObj
      : await openpgp.decryptKey({
          privateKey: privateKeyObj,
          passphrase: passphrase || "",
        });

    const message = await openpgp.readMessage({
      armoredMessage: encryptedMessage,
    });

    const { data: decrypted } = await openpgp.decrypt({
      message,
      decryptionKeys: privateKey,
    });

    return decrypted as string;
  } catch (error) {
    console.error("Error decrypting message:", error);
    throw new Error("Failed to decrypt message");
  }
}

export function clearStoredPrivateKey(): void {
  localStorage.removeItem("pgp_private_key");
}
