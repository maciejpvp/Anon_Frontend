import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { Logo } from "../Logo";
import { useCheckAuth } from "../../hooks/useCheckAuth";

export const AuthForm = () => {
  const navigate = useNavigate();
  const { refetch } = useCheckAuth();
  const { login, isLoading } = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    await login({ username, password }).then(() => {
      refetch().then(() => navigate("/chat"));
    });
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
        type="submit"
        className={`btn  w-full ${isLoading ? "btn-disabled" : "btn-primary"}`}
      >
        Login
      </button>
      <p className="text-sm">
        No account yet?{" "}
        <Link className="text-secondary" to="/signup">
          Create One
        </Link>
      </p>
    </form>
  );
};
