import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";
import { generateKeyPair } from "../../utils/pgp";
import { Logo } from "../Logo";

export const SignupForm = () => {
  const navigate = useNavigate();
  const { signup, isLoading } = useSignup();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const { publicKey } = await generateKeyPair(username);
    await signup({ username, password, publicKey }).then(() =>
      navigate("chat")
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-96 bg-base-200 justify-center items-center p-4 rounded-sm"
    >
      <Logo />
      <input
        name="username"
        placeholder="username"
        className="input w-full"
        autoFocus
      />
      <input
        name="password"
        type="password"
        placeholder="*********"
        className="input w-full"
      />
      <button
        className={`btn  w-full ${isLoading ? "btn-disabled" : "btn-primary"}`}
      >
        Sign Up
      </button>
      <p className="text-sm">
        Have an account?{" "}
        <Link className="text-secondary" to="/login">
          Login instead
        </Link>
      </p>
    </form>
  );
};
