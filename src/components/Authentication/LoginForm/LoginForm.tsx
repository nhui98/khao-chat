import FormLayout from "../FormLayout";
import { inputClassName } from "../../../styles/styles";

const LoginForm = () => (
  <FormLayout title="Login">
    <form className="flex flex-col gap-y-4 w-[250px]">
      <input type="email" placeholder="email" className={inputClassName} />
      <input
        type="password"
        placeholder="password"
        className={inputClassName}
      />
      <button className="bg-[#7b96ec] text-white p-2 font-bold">Sign in</button>
    </form>
    <p className="text-[#5d5b8d] text-base mt-2">
      Don&apos;t have an account? Register here.
    </p>
  </FormLayout>
);

export default LoginForm;
