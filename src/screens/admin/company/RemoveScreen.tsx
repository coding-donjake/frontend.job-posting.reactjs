import React, { useEffect, useState } from "react";
import BlockScreen from "../../../components/BlockScreen";
import AdminNavigation from "../../../navigations/AdminNavigation";
import { PrimarySticker } from "../../../components/widgets/Stickers";
import {
  faCheck,
  faChevronLeft,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { PrimaryLoader } from "../../../components/widgets/Loaders";
import { PrimaryContainer } from "../../../components/widgets/Containers";
import { RegularForm } from "../../../components/widgets/Forms";
import { PrimaryInput } from "../../../components/widgets/Inputs";
import {
  DangerButton,
  SecondaryButton,
} from "../../../components/widgets/Buttons";

const RemoveScreen = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [company, setCompany] = useState<any>({});
  const [loadedCompany, setLoadedCompany] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const [formData, setFormData] = useState<{
    [key: string]: string;
  }>({
    password: "",
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
          },
          company: {
            id: company.id,
            status: "removed",
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
        toast.success("Company account has been removed.");
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
    document.title = "Remove Company";
  }, []);

  useEffect(() => {
    selectCompany();
  }, []);

  return (
    <BlockScreen
      leftPanel={<AdminNavigation />}
      body={
        <div className="p-4">
          <h1>Remove Company</h1>
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
                      items: [
                        <PrimarySticker
                          icon={<FontAwesomeIcon icon={faCircleExclamation} />}
                          text={`Are you sure you want to remove ${company.User.username}?`}
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
                      icon={<FontAwesomeIcon icon={faCheck} />}
                      text="Confirm"
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

export default RemoveScreen;
