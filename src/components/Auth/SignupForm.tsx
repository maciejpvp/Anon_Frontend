import { useSignup } from "../../hooks/useSignup";
import { generateKeyPair } from "../../utils/pgp";

export const SignupForm = () => {
  const { trigger, isMutating } = useSignup();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const { publicKey } = await generateKeyPair(username);
    await trigger({ username, password, publicKey });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-96 bg-base-200 justify-center items-center p-4 rounded-sm"
    >
      <h1 className="text-xl">
        <span className="text-secondary">N3ver</span>_Chat
      </h1>
      <input name="username" placeholder="username" className="input w-full" />
      <input
        name="password"
        type="password"
        placeholder="*********"
        className="input w-full"
      />
      <button
        className={`btn  w-full ${isMutating ? "btn-disabled" : "btn-primary"}`}
      >
        Sign Up
      </button>
    </form>
  );
};
