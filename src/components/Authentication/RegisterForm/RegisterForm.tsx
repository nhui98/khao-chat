import { useState } from "react";
import { Formik, Form, Field } from "formik";
import FormLayout from "../FormLayout";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../../../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import Add from "../../../assets/addAvatar.png";
import { inputClassName } from "../../../styles/styles";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [err, setError] = useState(false);
  const navigate = useNavigate();

  return (
    <FormLayout title="Register">
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          file: "",
        }}
        onSubmit={async (values) => {
          const { name, email, password, file } = values;

          try {
            const res = await createUserWithEmailAndPassword(
              auth,
              email,
              password
            );

            const storageRef = ref(storage, name);
            // @ts-ignore
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
              "state_changed",
              (snapshot) => {
                console.log(snapshot);
              },
              (error) => {
                if (error) setError(true);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then(
                  async (downloadURL) => {
                    await updateProfile(res.user, {
                      displayName: name,
                      photoURL: downloadURL,
                    });

                    await setDoc(doc(db, "users", res.user.uid), {
                      uid: res.user.uid,
                      name,
                      email,
                      photoURL: downloadURL,
                    });

                    await setDoc(doc(db, "userChats", res.user.uid), {});

                    navigate("/");
                  }
                );
              }
            );
          } catch (error) {
            setError(true);
          }
        }}
      >
        {({ setFieldValue }) => (
          <Form className="flex w-[250px] flex-col gap-y-4">
            {err && <span>something went wrong.</span>}

            <Field
              type="text"
              name="name"
              placeholder="display name"
              className={inputClassName}
            />
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
            <input
              type="file"
              name="file"
              id="avatar"
              className="hidden"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files && e.target.files.length > 0)
                  setFieldValue("file", e.target.files[0]);
              }}
            />
            <label
              htmlFor="avatar"
              className="flex cursor-pointer items-center gap-x-2 text-sm text-[#8da4f1]"
            >
              <img src={Add} alt="add avatar" className="w-8" />
              <span>Add an Avatar</span>
            </label>
            <button
              type="submit"
              className="bg-[#7b96ec] p-2 font-bold text-white"
            >
              Sign up
            </button>
          </Form>
        )}
      </Formik>
      <p className="mt-2 text-base text-[#5d5b8d]">
        Have an account? <Link to={"/login"}>Login here.</Link>
      </p>
    </FormLayout>
  );
};

export default RegisterForm;
