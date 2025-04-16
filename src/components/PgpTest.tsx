import React, { useState, useEffect } from "react";
import {
  generateKeyPair,
  encryptMessage,
  decryptMessage,
  clearStoredPrivateKey,
} from "../utils/pgp";

export default function PgpTester() {
  const [name, setName] = useState("Test User");
  const [email, setEmail] = useState("test@example.com");
  const [passphrase, setPassphrase] = useState("");
  const [message, setMessage] = useState("This is a secret message!");
  const [publicKey, setPublicKey] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [decryptedMessage, setDecryptedMessage] = useState("");
  const [status, setStatus] = useState("");
  const [hasKeys, setHasKeys] = useState(false);

  const handleGenerateKeys = async () => {
    try {
      setStatus("Generating keys...");
      const keyPair = await generateKeyPair(name, email, passphrase);
      setPublicKey(keyPair.publicKey);
      setStatus("Keys generated successfully!");
      setHasKeys(true);
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  const handleEncrypt = async () => {
    if (!publicKey) {
      setStatus("Error: Public key is required for encryption");
      return;
    }

    try {
      setStatus("Encrypting message...");
      const encrypted = await encryptMessage(message, publicKey);
      setEncryptedMessage(encrypted);
      setStatus("Message encrypted successfully!");
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  const handleDecrypt = async () => {
    if (!encryptedMessage) {
      setStatus("Error: No encrypted message to decrypt");
      return;
    }

    try {
      setStatus("Decrypting message...");
      const decrypted = await decryptMessage(encryptedMessage, passphrase);
      console.log(decrypted);
      setDecryptedMessage(decrypted);
      setStatus("Message decrypted successfully!");
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  const handleClearKeys = () => {
    clearStoredPrivateKey();
    setPublicKey("");
    setHasKeys(false);
    setStatus("Keys cleared from localStorage");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">
        PGP Encryption Tester
      </h1>

      <div className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-3">Key Generation</h2>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Passphrase (optional)
          </label>
          <input
            type="password"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleGenerateKeys}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Generate Keys
          </button>
          {hasKeys && (
            <button
              onClick={handleClearKeys}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Clear Keys
            </button>
          )}
        </div>
        {hasKeys && (
          <div className="mt-3 text-sm text-green-600">
            Private key is stored in localStorage
          </div>
        )}
      </div>

      <div className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-3">Encryption</h2>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message to Encrypt
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded h-24"
          />
        </div>
        <button
          onClick={handleEncrypt}
          disabled={!publicKey}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-300"
        >
          Encrypt Message
        </button>
        {encryptedMessage && (
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Encrypted Message
            </label>
            <textarea
              value={encryptedMessage}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded h-32 text-xs font-mono"
            />
          </div>
        )}
      </div>

      <div className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-3">Decryption</h2>
        <button
          onClick={handleDecrypt}
          disabled={!encryptedMessage || !hasKeys}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:bg-gray-300"
        >
          Decrypt Message
        </button>
        {decryptedMessage && (
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Decrypted Message
            </label>
            <textarea
              value={decryptedMessage}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded h-24"
            />
          </div>
        )}
      </div>

      <div className="p-3 bg-gray-100 rounded border border-gray-300">
        <h3 className="font-semibold mb-1">Status:</h3>
        <p
          className={`text-sm ${
            status.includes("Error") ? "text-red-600" : "text-blue-600"
          }`}
        >
          {status || "Ready"}
        </p>
      </div>
    </div>
  );
}
