import React, { useEffect, useState } from "react";
import { faChevronLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BlockScreen from "../../../components/BlockScreen";
import {
  DangerButton,
  SecondaryButton,
} from "../../../components/widgets/Buttons";
import { PrimaryContainer } from "../../../components/widgets/Containers";
import { RegularForm } from "../../../components/widgets/Forms";
import { PrimaryInput } from "../../../components/widgets/Inputs";
import AdminNavigation from "../../../navigations/AdminNavigation";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { PrimaryLoader } from "../../../components/widgets/Loaders";
import { fromISOToDateInput } from "../../../services/Conversion";

const UpdateScreen = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [admin, setAdmin] = useState<any>({});
  const [loadedAdmin, setLoadedAdmin] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const [formData, setFormData] = useState<{
    [key: string]: string;
  }>({
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

  const selectAdmin = async () => {
    setLoadedAdmin(false);
    try {
      const response = await fetch("/admin/select", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      if (response.status === 500) {
        toast.error("Internal server error!");
        console.log("Failed to load admin.");
        return;
      }
      if (response.ok) {
        const res = await response.json();
        setAdmin(res.data);
        setFormData((prevData) => ({
          ...prevData,
          ["role"]: res.data.role,
          ["lastName"]: res.data.User.UserInformation.lastName,
          ["firstName"]: res.data.User.UserInformation.firstName,
          ["middleName"]: res.data.User.UserInformation.middleName,
          ["suffix"]: res.data.User.UserInformation.suffix,
          ["gender"]: res.data.User.UserInformation.gender,
          ["birthDate"]: res.data.User.UserInformation.birthDate,
        }));
        setLoadedAdmin(true);
        return;
      }
      toast.error("Unkown error occured!");
      console.log(response);
    } catch (error) {
      toast.error("Load user failed!");
      console.error("Network error:", error);
    }
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
      const response = await fetch("/admin/update", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: formData.password,
          user: {
            id: admin.User.id,
          },
          userInformation: {
            id: admin.User.UserInformation.id,
            lastName: formData.lastName,
            firstName: formData.firstName,
            middleName: formData.middleName,
            suffix: formData.suffix,
            gender: formData.gender,
            birthDate: new Date(formData.birthDate).toISOString(),
          },
          admin: {
            id: admin.id,
            role: formData.role,
          },
        }),
      });
      if (response.status === 401) {
        toast.error("Unauthorized or incorrect operator password.");
        setProcessing(false);
        return;
      }
      if (response.status === 500) {
        toast.error("Internal server error!");
        setProcessing(false);
        return;
      }
      if (response.ok) {
        toast.success("Admin account has been updated.");
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
    document.title = "Update Admin";
  }, []);

  useEffect(() => {
    selectAdmin();
  }, []);

  return (
    <BlockScreen
      leftPanel={<AdminNavigation />}
      body={
        <div className="p-4">
          <h1>Update Admin</h1>
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
              loadedAdmin ? (
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
                            value={admin.User.username}
                            readonly={true}
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
                            value={formData.role}
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
                            value={formData.lastName}
                            onChange={handleInputChange}
                          />
                          <PrimaryInput
                            type="text"
                            id="firstName"
                            name="firstName"
                            key="firstName"
                            label="First name"
                            value={formData.firstName}
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
                            value={formData.middleName}
                            onChange={handleInputChange}
                          />
                          <PrimaryInput
                            type="text"
                            id="suffix"
                            name="suffix"
                            key="suffix"
                            label="Suffix"
                            value={formData.suffix}
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
                            value={formData.gender}
                            onChange={handleInputChange}
                          />
                          <PrimaryInput
                            type="date"
                            id="birthDate"
                            name="birthDate"
                            key="birthDate"
                            label="Birth date"
                            value={fromISOToDateInput(formData.birthDate)}
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
                    <DangerButton
                      type="submit"
                      icon={<FontAwesomeIcon icon={faFloppyDisk} />}
                      text="Save"
                      processing={processing}
                    />,
                  ]}
                />
              ) : (
                <PrimaryLoader />
              )
            }
          />
        </div>
      }
    />
  );
};

export default UpdateScreen;
