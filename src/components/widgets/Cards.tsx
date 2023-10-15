import React, { ReactNode, useEffect, useRef } from "react";

type ProfileCardProps = {
  className?: string;
  coverImage?: ReactNode;
  profileImage: ReactNode;
  title: string;
  subTitle?: string;
  actions?: ReactNode[];
  content: ReactNode;
};

type StatCardProps = {
  className?: string;
  label: string;
  data: number | string;
  icon: ReactNode;
};

const generateRandomString = () => {
  return Math.random().toString(36).substring(7);
};

export const ProfileCard = ({
  className,
  coverImage,
  profileImage,
  title,
  subTitle,
  actions,
  content,
}: ProfileCardProps) => {
  const uniqueId = generateRandomString();
  const profileImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (profileImageRef.current) {
      const profileImageHeight = profileImageRef.current.offsetHeight;
      const profileTitle = document.querySelector(
        `.card-profile-title-${uniqueId}`
      ) as HTMLElement;

      if (profileTitle) {
        profileTitle.style.paddingTop = `${profileImageHeight * 0.25}px`;
      }
    }
  }, [uniqueId]);

  return (
    <div className={"card-profile " + className}>
      <div className="card-profile-cover-image">{coverImage}</div>
      <div className="card-profile-body">
        <div className="card-profile-profile-image" ref={profileImageRef}>
          {profileImage}
        </div>
        <div className={`card-profile-title card-profile-title-${uniqueId}`}>
          {title}
        </div>
        {subTitle ? (
          <div className="card-profile-sub-title">{subTitle}</div>
        ) : null}
        {actions ? <div className="card-profile-actions">{actions}</div> : null}
        <div className="card-profile-content">{content}</div>
      </div>
    </div>
  );
};

export const StatCard = ({ className, label, data, icon }: StatCardProps) => {
  return (
    <div className={"card-stat " + className}>
      <div className="card-stat-information">
        <div className="card-stat-data">{data}</div>
        <div className="card-stat-label">{label}</div>
      </div>
      <div className="card-stat-icon">{icon}</div>
    </div>
  );
};
