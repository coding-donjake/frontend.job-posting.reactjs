import React, { useEffect, useState } from "react";
import BlockScreen from "../../../components/BlockScreen";
import AdminNavigation from "../../../navigations/AdminNavigation";
import { PrimaryContainer } from "../../../components/widgets/Containers";
import { RegularForm } from "../../../components/widgets/Forms";
import { PrimaryInput } from "../../../components/widgets/Inputs";
import {
  PrimaryButton,
  SecondaryButton,
} from "../../../components/widgets/Buttons";
import { faChevronLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateScreen = () => {
  const navigate = useNavigate();

  const [processing, setProcessing] = useState<boolean>(false);
  const [formData, setFormData] = useState<{
    [key: string]: string;
  }>({
    username: "",
    password: "",
    role: "",
    lastName: "",
    firstName: "",
    middleName: "",
    suffix: "",
    gender: "",
    birthDate: "",
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

  const onSubmit = async (e: React.FormEvent) => {
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

    try {
      setProcessing(true);
      const response = await fetch("/admin/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: formData.password,
          user: {
            username: formData.username,
            password: "1234",
          },
          userInformation: {
            lastName: formData.lastName,
            firstName: formData.firstName,
            middleName: formData.middleName,
            suffix: formData.suffix,
            gender: formData.gender,
            birthDate: new Date(formData.birthDate).toISOString(),
          },
          admin: {
            role: formData.role,
          },
        }),
      });
      if (response.status === 401) {
        toast.error("Unauthorized or incorrect operator password.");
        setProcessing(false);
        return;
      }
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
        toast.success("Admin account created.");
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
    document.title = "Create Admin";
  }, []);

  return (
    <BlockScreen
      leftPanel={<AdminNavigation />}
      body={
        <div className="p-4">
          <h1>Create Admin</h1>
          <hr />
          <PrimaryContainer
            actions={[
              <SecondaryButton
                icon={<FontAwesomeIcon icon={faChevronLeft} />}
                text="Go Back"
                onClick={() => navigate(-1)}
              />,
            ]}
            body={
              <RegularForm
                onSubmit={onSubmit}
                formGroups={[
                  {
                    name: "Account Information",
                    items: [
                      <div className="flex gap-2">
                        <PrimaryInput
                          type="text"
                          id="username"
                          name="username"
                          key="username"
                          label="Username"
                          onChange={handleInputChange}
                        />
                        <PrimaryInput
                          type="select"
                          id="role"
                          name="role"
                          key="role"
                          label="Role"
                          options={[
                            ["Select role", ""],
                            ["Admin", "admin"],
                            ["Staff", "staff"],
                          ]}
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
                    name: "Verify Operator",
                    items: [
                      <PrimaryInput
                        type="password"
                        id="password"
                        name="password"
                        key="password"
                        label="Operator password"
                        onChange={handleInputChange}
                      />,
                    ],
                  },
                ]}
                actions={[
                  <PrimaryButton
                    type="submit"
                    icon={<FontAwesomeIcon icon={faFloppyDisk} />}
                    text="Save"
                    processing={processing}
                  />,
                ]}
              />
            }
          />
        </div>
      }
    />
  );
};

export default CreateScreen;
