import FormLayout from "../FormLayout";
import { inputClassName } from "../../../styles/styles";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase";

const LoginForm = () => {
  const [err, setError] = useState(false);
  const navigate = useNavigate();

  return (
    <FormLayout title="Login">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          const { email, password } = values;

          try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
          } catch (error) {
            setError(true);
          }
        }}
      >
        <Form className="flex w-[250px] flex-col gap-y-4">
          {err && <span>something went wrong.</span>}
          <Field
            type="email"
            name="email"
            placeholder="email"
            className={inputClassName}
          />
          <Field
            type="password"
            name="password"
            placeholder="password"
            className={inputClassName}
          />
          <button
            type="submit"
            className="bg-[#7b96ec] p-2 font-bold text-white"
          >
            Sign in
          </button>
        </Form>
      </Formik>
      <p className="mt-2 text-base text-[#5d5b8d]">
        Don&apos;t have an account? <Link to={"/register"}>Register here.</Link>
      </p>
    </FormLayout>
  );
};

export default LoginForm;
