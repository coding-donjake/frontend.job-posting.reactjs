import React, { useEffect, useState } from "react";
import { faChevronLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BlockScreen from "../../../components/BlockScreen";
import {
  PrimaryButton,
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
  const [company, setCompany] = useState<any>({});
  const [loadedCompany, setLoadedCompany] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const [formData, setFormData] = useState<{
    [key: string]: string;
  }>({
    password: "",
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

  const selectCompany = async () => {
    setLoadedCompany(false);
    try {
      const response = await fetch("/company/select", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      if (response.status === 500) {
        toast.error("Internal server error!");
        console.log("Failed to load company.");
        return;
      }
      if (response.ok) {
        const res = await response.json();
        setCompany(res.data);
        setFormData((prevData) => ({
          ...prevData,
          ["lastName"]: res.data.User.UserInformation.lastName,
          ["firstName"]: res.data.User.UserInformation.firstName,
          ["middleName"]: res.data.User.UserInformation.middleName,
          ["suffix"]: res.data.User.UserInformation.suffix,
          ["gender"]: res.data.User.UserInformation.gender,
          ["birthDate"]: res.data.User.UserInformation.birthDate,
          ["name"]: res.data.name,
          ["description"]: res.data.description,
        }));
        setLoadedCompany(true);
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
      const response = await fetch("/company/update", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: formData.password,
          user: {
            id: company.User.id,
          },
          userInformation: {
            id: company.User.UserInformation.id,
            lastName: formData.lastName,
            firstName: formData.firstName,
            middleName: formData.middleName,
            suffix: formData.suffix,
            gender: formData.gender,
            birthDate: new Date(formData.birthDate).toISOString(),
          },
          company: {
            id: company.id,
            name: formData.name,
            description: formData.description,
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
        toast.success("Company account has been updated.");
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
    document.title = "Update Company";
  }, []);

  useEffect(() => {
    selectCompany();
  }, []);

  return (
    <BlockScreen
      leftPanel={<AdminNavigation />}
      body={
        <div className="p-4">
          <h1>Update Company</h1>
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
              loadedCompany ? (
                <RegularForm
                  onSubmit={onSubmit}
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
                          value={company.User.username}
                          readonly={true}
                        />,
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
                      name: "Company Information",
                      items: [
                        <PrimaryInput
                          type="text"
                          id="name"
                          name="name"
                          key="name"
                          label="Company name"
                          value={formData.name}
                          onChange={handleInputChange}
                        />,
                        <PrimaryInput
                          type="textarea"
                          id="description"
                          name="description"
                          key="description"
                          label="Company description"
                          value={formData.description}
                          onChange={handleInputChange}
                        />,
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
