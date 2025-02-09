import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../../services/UserService";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const userData: unknown = await login(email, password);
      if (userData.token) {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("role", userData.role);

        navigate("/app");
      } else {
        setError(userData.message);
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-image-auth">
      <form
        onSubmit={handleSubmit}
        className="px-32 w-2/6 h-1/2 flex gap-10 justify-center items-center flex-col absolute z-10 right-1/4 mr-32 mt-5 rounded-lg bg-dark-purple border-2 border-primary-purple/30"
      >
        <div className="text-xl flex flex-col gap-3 w-full ">
          <label className="font-medium" htmlFor="email">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent px-3 py-1 border-b focus:outline-none focus:border-b-2 focus:border-primary-purple"
            type="email"
            id="email"
          />
        </div>

        <div className="text-xl flex flex-col gap-3 w-full">
          <label className="font-medium" htmlFor="password">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent px-3 py-1 border-b focus:outline-none focus:border-b-2 focus:border-primary-purple"
            type="password"
            id="password"
          />
          <a href="" className="text-primary-purple/90 text-sm hover:underline w-max">
            I forgot my password
          </a>
        </div>

        {error && 
        <div className="rounded-md font-semibold py-2 w-full border border-red-500 bg-error text-dark text-center">
          <p className="">{error}</p>
        </div>
        }

        <div className="flex gap-3">
          <button type="submit" className="primary-button">
            Log in
          </button>
          <Link to="/sing-up" className="secondary-button">Sing up</Link>
        </div>
      </form>
      <div className="w-2/6 h-2/3 flex justify-between flex-col rounded-lg backdrop-blur-3xl border-2 border-primary-purple/10">
        <h1 className="text-4xl p-5 font-bold">Log In</h1>
        <Link to="/" className="p-5 flex items-center gap-2 text-primary-purple hover:underline w-max text-xl">
          Go back
        </Link>
      </div>
    </div>
  );
};