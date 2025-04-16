import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

export const AuthForm = () => {
  const navigate = useNavigate();
  const { trigger, isMutating } = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    await trigger({ username, password }).then(() => {
      navigate("/chat");
    });
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
        type="submit"
        className={`btn  w-full ${isMutating ? "btn-disabled" : "btn-primary"}`}
      >
        Login
      </button>
    </form>
  );
};
