import React, { useEffect, useState } from "react";
import BlockScreen from "../../../components/BlockScreen";
import CompanyNavigation from "../../../navigations/CompanyNavigation";
import { PrimaryContainer } from "../../../components/widgets/Containers";
import { RowTable } from "../../../components/widgets/Tables";
import {
  DangerCircleButton,
  SecondaryButton,
  SecondaryCircleButton,
} from "../../../components/widgets/Buttons";
import {
  faArrowsRotate,
  faEye,
  faFileCircleXmark,
  faPenToSquare,
  faPlus,
  faTrashCan,
  faUsersSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PrimaryLoader } from "../../../components/widgets/Loaders";
import { PrimarySticker } from "../../../components/widgets/Stickers";
import { RowList } from "../../../components/widgets/Lists";
import { SearchInput } from "../../../components/widgets/Inputs";

const IndexScreen = () => {
  const navigate = useNavigate();

  const [jobPosts, setJobPosts] = useState<any>([]);
  const [loadedJobPosts, setLoadedJobPosts] = useState<boolean>(false);
  const [searchJobPostsData, setSearchJobPostsData] = useState({
    key: "",
  });

  const handleSearchJobPostsKeyChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setSearchJobPostsData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getJobPosts = async () => {
    setLoadedJobPosts(false);
    try {
      const response = await fetch("/job-post/get", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      if (response.status === 500) {
        toast.error("Internal server error!");
        console.log("Failed to load JobPost.");
        return;
      }
      if (response.ok) {
        const res = await response.json();
        setJobPosts(res.data);
        setLoadedJobPosts(true);
        return;
      }
      toast.error("Unkown error occured!");
      console.log(response);
    } catch (error) {
      toast.error("Client error!");
      console.error("catch error:", error);
    }
  };

  const searchJobPosts = async () => {
    setLoadedJobPosts(false);
    try {
      const response = await fetch("/job-post/search", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key: searchJobPostsData.key }),
      });
      if (response.status === 500) {
        toast.error("Internal server error!");
        console.log("Failed to search JobPost.");
        return;
      }
      if (response.ok) {
        const res = await response.json();
        setJobPosts(res.data);
        setLoadedJobPosts(true);
        return;
      }
      toast.error("Unkown error occured!");
      console.log(response);
    } catch (error) {
      toast.error("Client error!");
      console.error("catch error:", error);
    }
  };

  useEffect(() => {
    document.title = "Job Posts";
  }, []);

  useEffect(() => {
    getJobPosts();
  }, []);

  return (
    <BlockScreen
      leftPanel={<CompanyNavigation />}
      body={
        <div className="p-4">
          <h1>Job Posts</h1>
          <hr />
          <PrimaryContainer
            header="Job Posts List"
            actions={[
              <SecondaryButton
                icon={<FontAwesomeIcon icon={faPlus} />}
                text="New Job Post"
                onClick={() => navigate("create")}
              />,
              <SearchInput
                id="key"
                name="key"
                key="key"
                label="Search..."
                onChange={handleSearchJobPostsKeyChange}
                onClick={
                  searchJobPostsData.key === "" ? getJobPosts : searchJobPosts
                }
              />,
            ]}
            body={
              loadedJobPosts ? (
                jobPosts.length > 0 ? (
                  <RowTable
                    headers={["Title", "Slots", ""]}
                    rows={jobPosts.map((JobPost: any) => [
                      JobPost.title,
                      JobPost.slots > 1
                        ? `${JobPost.slots} slots`
                        : `${JobPost.slots} slot`,
                      <RowList
                        className="justify-end"
                        items={[
                          <SecondaryCircleButton
                            icon={<FontAwesomeIcon icon={faEye} />}
                            onClick={() => navigate(`view/${JobPost.id}`)}
                          />,
                          <SecondaryCircleButton
                            icon={<FontAwesomeIcon icon={faPenToSquare} />}
                            onClick={() => navigate(`update/${JobPost.id}`)}
                          />,
                          <DangerCircleButton
                            icon={<FontAwesomeIcon icon={faTrashCan} />}
                            onClick={() => navigate(`remove/${JobPost.id}`)}
                          />,
                        ]}
                      />,
                    ])}
                  />
                ) : (
                  <PrimarySticker
                    icon={<FontAwesomeIcon icon={faFileCircleXmark} />}
                    text="No jobPosts found."
                  />
                )
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

export default IndexScreen;
