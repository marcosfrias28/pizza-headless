import axios from "axios";
import { useState, type FormEvent } from "react";

interface Props {
    children: string | undefined;
    error?: boolean;
}

export function SuccessMessage(props: Props) {

    const {error, children} = props;

 return (
    <p className={`${error ? 'text-red-600' : 'text-green-500'} font-light font-montserrat`}>
        {children ? children : ''}
    </p>
 )
}

export interface Message {
    error?: string;
    message?: string;
}

function RegisterForm() {
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [message, setMessage] = useState<Message>({});


    const register = async (e: FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage({error: 'Passwords do not match'});
            return;
        }
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        const res = await axios({
            url: "/api/user/register",
            data: formData,
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data"
            },
        });
        const data = await res.data;
        if (data.error) {
            setMessage(data);
            return;
        }
        setMessage(data);
    }
  return (
    <form
    onSubmit={register}
    action="/"
      className="space-y-4 md:space-y-6"
    >
      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          placeholder="John Doe"
          required
        />
      </div>
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          required
        />
      </div>
      <div>
        <label
          htmlFor="confirm-password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Confirm password
        </label>
        <input
          type="password"
          name="confirm-password"
          id="confirm-password"
        onChange={(e) => setConfirmPassword(e.target.value)}
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
      <SuccessMessage error={message.error ? true : false}>{message.error ? message.error : message.message}</SuccessMessage>
      <button
        type="submit"
        className="w-full bg-[#F6CE40] py-3 rounded-lg hover:scale-105 transition-transform duration-300 font-semibold text-center"
      >
        Create an account
      </button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <a
          href="/login"
          className="p-2 text-gray-700 rounded-lg hover:scale-105 transition-transform duration-300 font-semibold text-center"
        >
          Login here
        </a>
      </p>
    </form>
  );
}

export default RegisterForm;
