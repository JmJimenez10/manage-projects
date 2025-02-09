import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { IUser, User } from "../../models/User";
import { register } from "../../services/UserService";

export const SingUp = () => {
  const [error, setError] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState<IUser>(
    new User(0, "", "", "", "", new Date())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await register(formData);

      const { statusCode, message } = response;

      if (statusCode === 200) {
        navigate("/app");
      } else {
        setError(message);
      }
    } catch (error) {
      console.error(error);
      setError("Error al registrar el usuario");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-image-auth">
      <form
        onSubmit={handleSubmit}
        className="px-22 w-2/3 h-1/2 flex gap-10 justify-center items-center flex-col absolute z-10 mr-32 mt-5 rounded-lg bg-dark-purple border-2 border-primary-purple/30"
      >
        <div className="flex justify-center items-center gap-10">
          <div className="flex flex-col gap-10">
            <div className="text-xl flex flex-col gap-3 w-full ">
              <label className="font-medium" htmlFor="fullName">
                Full Name
              </label>
              <input
                value={formData.fullName}
                onChange={handleInputChange}
                className="bg-transparent px-3 py-1 border-b focus:outline-none focus:border-b-2 focus:border-primary-purple"
                type="text"
                id="fullName"
                name="fullName"
              />
            </div>

            <div className="text-xl flex flex-col gap-3 w-full ">
              <label className="font-medium" htmlFor="name">
                Username
              </label>
              <input
                value={formData.name}
                onChange={handleInputChange}
                className="bg-transparent px-3 py-1 border-b focus:outline-none focus:border-b-2 focus:border-primary-purple"
                type="text"
                id="name"
                name="name"
              />
            </div>

            <div className="text-xl flex flex-col gap-3 w-full ">
              <label className="font-medium" htmlFor="email">
                Email
              </label>
              <input
                value={formData.email}
                onChange={handleInputChange}
                className="bg-transparent px-3 py-1 border-b focus:outline-none focus:border-b-2 focus:border-primary-purple"
                type="email"
                id="email"
                name="email"
              />
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <div className="text-xl flex flex-col gap-3 w-full">
              <label className="font-medium" htmlFor="password">
                Password
              </label>
              <input
                value={formData.password}
                onChange={handleInputChange}
                className="bg-transparent px-3 py-1 border-b focus:outline-none focus:border-b-2 focus:border-primary-purple"
                type="password"
                id="password"
                name="password"
              />
            </div>

            <div className="text-xl flex flex-col gap-3 w-full">
              <label className="font-medium" htmlFor="repeatPassword">
                Repeat password
              </label>
              <input
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                className="bg-transparent px-3 py-1 border-b focus:outline-none focus:border-b-2 focus:border-primary-purple"
                type="password"
                id="repeatPassword"
                name="repeatPassword"
              />
            </div>

            {error && (
              <div className="rounded-md font-semibold py-2 w-full border border-red-500 bg-error text-dark text-center">
                <p className="">{error}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="primary-button">
            Sign up
          </button>
          <Link to="/login" className="secondary-button">
            Log in
          </Link>
        </div>
      </form>
      <div className="w-2/3 h-2/3 flex justify-between flex-col rounded-lg backdrop-blur-3xl border-2 border-primary-purple/10">
        <h1 className="text-4xl p-5 font-bold">Create your account</h1>
        <Link to="/" className="p-5 flex items-center gap-2 text-primary-purple hover:underline w-max text-xl">
          Go back
        </Link>
      </div>
    </div>
  );
};
