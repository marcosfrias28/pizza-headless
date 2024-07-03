import axios from "axios";
import { useState } from "react";
import { SuccessMessage, type Message } from "../Register/RegisterForm";

function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<Message>();

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    axios({
      url: "/api/user/login",
      data: formData,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(({ data }) => setMessage(data))
      .catch((error) => setMessage(JSON.parse(error.request.response)));
  };
  const { error: errorMessage, success: successMessage } = message || {
    error: "",
    success: "",
  };

  return (
    <form onSubmit={login} id="login-form" className="space-y-4 md:space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Your email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          placeholder="name@email.com"
          required
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          required
        />
      </div>
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="terms"
            aria-describedby="terms"
            type="checkbox"
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
            required
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="terms" className="font-light text-gray-700">
            I accept the{" "}
            <a
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              href="#"
            >
              Terms and Conditions
            </a>
          </label>
        </div>
      </div>
      <SuccessMessage error={errorMessage ? true : false}>
        {errorMessage ? errorMessage : successMessage}
      </SuccessMessage>
      <button
        type="submit"
        className="w-full bg-[#F6CE40] py-3 rounded-lg hover:scale-105 transition-transform duration-300 font-semibold text-center"
      >
        Login
      </button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Don't have an account yet?{" "}
        <a
          href="/register"
          className="p-2 text-gray-700 rounded-lg hover:scale-105 transition-transform duration-300 font-semibold text-center"
        >
          Register here
        </a>
      </p>
    </form>
  );
}

export default LoginForm;
