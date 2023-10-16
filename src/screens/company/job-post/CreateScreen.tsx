import React, { useEffect, useState } from "react";
import BlockScreen from "../../../components/BlockScreen";
import CompanyNavigation from "../../../navigations/CompanyNavigation";
import { PrimaryContainer } from "../../../components/widgets/Containers";
import { RegularForm } from "../../../components/widgets/Forms";
import { PrimaryInput } from "../../../components/widgets/Inputs";
import {
  DangerButton,
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
    password: "",
    title: "",
    description: "",
    slots: "1",
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
      const response = await fetch("/job-post/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: formData.password,
          jobPost: {
            title: formData.title,
            description: formData.description,
            slots: parseFloat(formData.slots),
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
        toast.success("Job Post created.");
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
    document.title = "Create Job Post";
  }, []);

  return (
    <BlockScreen
      leftPanel={<CompanyNavigation />}
      body={
        <div className="p-4">
          <h1>Create Job Post</h1>
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
                          id="title"
                          name="title"
                          key="title"
                          label="Title"
                          onChange={handleInputChange}
                        />
                        <PrimaryInput
                          type="number"
                          id="slots"
                          name="slots"
                          key="slots"
                          label="Slots"
                          min={1}
                          value="1"
                          onChange={handleInputChange}
                        />
                      </div>,
                      <PrimaryInput
                        type="textarea"
                        id="description"
                        name="description"
                        key="description"
                        label="Description"
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
                  <DangerButton
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
