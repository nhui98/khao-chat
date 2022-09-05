import Add from "../../../assets/addAvatar.png";
import FormLayout from "../FormLayout";
import { inputClassName } from "../../../styles/styles";

const RegisterForm = () => (
  <FormLayout title="Register">
    <form className="flex flex-col gap-y-4 w-[250px]">
      <input
        type="text"
        placeholder="display name"
        className={inputClassName}
      />
      <input type="email" placeholder="email" className={inputClassName} />
      <input
        type="password"
        placeholder="password"
        className={inputClassName}
      />
      <input type="file" id="avatar" className="hidden" />
      <label
        htmlFor="avatar"
        className="flex items-center gap-x-2 text-[#8da4f1] text-sm cursor-pointer"
      >
        <img src={Add} alt="add avatar" className="w-8" />
        <span>Add an Avatar</span>
      </label>
      <button className="bg-[#7b96ec] text-white p-2 font-bold">Sign up</button>
    </form>
    <p className="text-[#5d5b8d] text-base mt-2">
      Have an account? Login here.
    </p>
  </FormLayout>
);

export default RegisterForm;
