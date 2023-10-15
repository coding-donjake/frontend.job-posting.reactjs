import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo.png";
import BlockScreen from "../../components/BlockScreen";
import {
  faPenToSquare,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  PrimaryButton,
  SecondaryButton,
} from "../../components/widgets/Buttons";
import { PrimaryContainer } from "../../components/widgets/Containers";
import { RegularForm } from "../../components/widgets/Forms";
import { PrimaryInput } from "../../components/widgets/Inputs";

const IndexScreen = () => {
  const navigate = useNavigate();
  const [processing, setProcessing] = useState<boolean>(false);
  const [formData, setFormData] = useState<{
    [key: string]: string;
  }>({
    username: "",
    password: "",
    cpass: "",
    lastName: "",
    firstName: "",
    middleName: "",
    suffix: "",
    gender: "",
    birthDate: "",
    name: "",
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (processing) {
      return;
    }

    for (const key in formData) {
      if (!formData[key]) {
        if (key != "suffix") {
          toast.error(
            `Please enter ${key.replace(/^\w/, (c) => c.toUpperCase())}`
          );
          return;
        }
      }
    }

    if (formData.password !== formData.cpass) {
      toast.error(`Password didn't match.`);
      return;
    }

    try {
      setProcessing(true);
      const response = await fetch("/company/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username: formData.username,
            password: formData.password,
          },
          userInformation: {
            lastName: formData.lastName,
            firstName: formData.firstName,
            middleName: formData.middleName,
            suffix: formData.suffix,
            gender: formData.gender,
            birthDate: new Date(formData.birthDate).toISOString(),
          },
          company: {
            name: formData.name,
            description: formData.description,
          },
        }),
      });
      if (response.status === 409) {
        toast.error("Username is already been used.");
        setProcessing(false);
        return;
      }
      if (response.status === 500) {
        toast.error("Internal server error!");
        setProcessing(false);
        return;
      }
      if (response.ok) {
        const res = await response.json();
        toast.success("Registered Successfully.");
        navigate(-1);
        return;
      }
      toast.error("Unkown error occured!");
      setProcessing(false);
    } catch (error) {
      toast.error("Request failed!");
      console.error("Network error:", error);
      setProcessing(false);
    }
  };

  useEffect(() => {
    document.title = "Company";
  }, []);

  return (
    <BlockScreen
      body={
        <div className="flex justify-center py-16 px-4">
          <PrimaryContainer
            className="w-full max-w-xl"
            body={
              <RegularForm
                logo={<img src={Logo} alt="" />}
                name="Company Register"
                formGroups={[
                  {
                    name: "Account Information",
                    items: [
                      <PrimaryInput
                        type="text"
                        id="username"
                        name="username"
                        key="username"
                        label="Username"
                        onChange={handleInputChange}
                      />,
                      <div className="flex gap-2">
                        <PrimaryInput
                          type="password"
                          id="password"
                          name="password"
                          key="password"
                          label="Password"
                          onChange={handleInputChange}
                        />
                        <PrimaryInput
                          type="password"
                          id="cpass"
                          name="cpass"
                          key="cpass"
                          label="Confirm Password"
                          onChange={handleInputChange}
                        />
                      </div>,
                    ],
                  },
                  {
                    name: "Personal Information",
                    items: [
                      <div className="flex gap-2">
                        <PrimaryInput
                          type="text"
                          id="lastName"
                          name="lastName"
                          key="lastName"
                          label="Last name"
                          onChange={handleInputChange}
                        />
                        <PrimaryInput
                          type="text"
                          id="firstName"
                          name="firstName"
                          key="firstName"
                          label="First name"
                          onChange={handleInputChange}
                        />
                      </div>,
                      <div className="flex gap-2">
                        <PrimaryInput
                          type="text"
                          id="middleName"
                          name="middleName"
                          key="middleName"
                          label="Middle name"
                          onChange={handleInputChange}
                        />
                        <PrimaryInput
                          type="text"
                          id="suffix"
                          name="suffix"
                          key="suffix"
                          label="Suffix (optional)"
                          onChange={handleInputChange}
                        />
                      </div>,
                      <div className="flex gap-2">
                        <PrimaryInput
                          type="select"
                          id="gender"
                          name="gender"
                          key="gender"
                          label="Gender"
                          options={[
                            ["Select gender", ""],
                            ["Male", "male"],
                            ["Female", "female"],
                          ]}
                          onChange={handleInputChange}
                        />
                        <PrimaryInput
                          type="date"
                          id="birthDate"
                          name="birthDate"
                          key="birthDate"
                          label="Birth date"
                          onChange={handleInputChange}
                        />
                      </div>,
                    ],
                  },
                  {
                    name: "Company Information",
                    items: [
                      <PrimaryInput
                        type="text"
                        id="name"
                        name="name"
                        key="name"
                        label="Company name"
                        onChange={handleInputChange}
                      />,
                      <PrimaryInput
                        type="textarea"
                        id="description"
                        name="description"
                        key="description"
                        label="Company description"
                        onChange={handleInputChange}
                      />,
                    ],
                  },
                ]}
                actions={[
                  <SecondaryButton
                    icon={<FontAwesomeIcon icon={faRightToBracket} />}
                    text="Log In Instead"
                    onClick={() => navigate(-1)}
                  />,
                  <PrimaryButton
                    type="submit"
                    icon={<FontAwesomeIcon icon={faPenToSquare} />}
                    text="Register"
                    processing={processing}
                  />,
                ]}
                onSubmit={handleOnSubmit}
              />
            }
          />
        </div>
      }
    />
  );
};

export default IndexScreen;
