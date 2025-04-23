import { useEffect, useState } from "react";
import {
  clearStoredPrivateKey,
  decryptMessage,
  encryptMessage,
  generateKeyPair,
  KeyPair,
} from "../utils/pgp";

export default function PgpTest() {
  const [name, setName] = useState("Test User");
  const [passphrase, setPassphrase] = useState("");
  const [keyPair, setKeyPair] = useState<KeyPair | null>(null);
  const [message, setMessage] = useState("Hello, encrypted world!");
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasStoredKey, setHasStoredKey] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem("pgp_private_key");
    setHasStoredKey(!!storedKey);
  }, [keyPair]);

  const handleGenerateKeyPair = async () => {
    setLoading(true);
    setError("");
    try {
      const newKeyPair = await generateKeyPair(name, passphrase);
      setKeyPair(newKeyPair);
      setHasStoredKey(true);
    } catch (err) {
      setError("Failed to generate key pair: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleEncrypt = async () => {
    if (!keyPair) {
      setError("Please generate a key pair first");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const encrypted = await encryptMessage(message, keyPair.publicKey);
      setEncryptedText(encrypted);
    } catch (err) {
      setError("Encryption failed: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDecrypt = async () => {
    if (!encryptedText) {
      setError("Please encrypt a message first");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const decrypted = await decryptMessage(encryptedText, passphrase);
      setDecryptedText(decrypted);
    } catch (err) {
      setError("Decryption failed: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleClearKey = () => {
    clearStoredPrivateKey();
    setKeyPair(null);
    setHasStoredKey(false);
    setEncryptedText("");
    setDecryptedText("");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">PGP Encryption Test</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-8 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">Key Generation</h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-1">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded p-2 w-full"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block mb-1">Passphrase (optional):</label>
            <input
              type="password"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              className="border rounded p-2 w-full"
              disabled={loading}
            />
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleGenerateKeyPair}
              disabled={loading}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              {loading ? "Generating..." : "Generate Key Pair"}
            </button>
            {hasStoredKey && (
              <button
                onClick={handleClearKey}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Clear Stored Key
              </button>
            )}
          </div>
        </div>

        {keyPair && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Key Pair Generated:</h3>
            <div className="mb-2">
              <h4 className="font-medium">Public Key:</h4>
              <textarea
                readOnly
                value={keyPair.publicKey}
                className="border rounded p-2 w-full h-32 bg-gray-800 text-xs font-mono"
              />
            </div>
            <div>
              <h4 className="font-medium">
                Private Key (stored in localStorage):
              </h4>
              <textarea
                readOnly
                value={keyPair.privateKey}
                className="border rounded p-2 w-full h-32 bg-gray-800 text-xs font-mono"
              />
            </div>
          </div>
        )}
      </div>

      <div className="mb-8 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">Encryption</h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-1">Message to Encrypt:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border rounded p-2 w-full h-24"
              disabled={loading || !keyPair}
            />
          </div>
          <button
            onClick={handleEncrypt}
            disabled={loading || !keyPair}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:bg-green-300 w-40"
          >
            {loading ? "Encrypting..." : "Encrypt"}
          </button>
        </div>

        {encryptedText && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Encrypted Message:</h3>
            <textarea
              readOnly
              value={encryptedText}
              className="border rounded p-2 w-full h-40 bg-gray-800 text-xs font-mono"
            />
          </div>
        )}
      </div>

      <div className="p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">Decryption</h2>
        <div className="flex flex-col gap-4">
          <button
            onClick={handleDecrypt}
            disabled={loading || !encryptedText || !hasStoredKey}
            className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 disabled:bg-purple-300 w-40"
          >
            {loading ? "Decrypting..." : "Decrypt"}
          </button>
        </div>

        {decryptedText && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Decrypted Message:</h3>
            <textarea
              readOnly
              value={decryptedText}
              className="border rounded p-2 w-full h-24 bg-gray-800"
            />
          </div>
        )}
      </div>
    </div>
  );
}
