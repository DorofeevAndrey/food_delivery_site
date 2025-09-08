"use client";

import ProfileIcon from "@/assets/ProfileIcon";
import Button from "@/components/Button/Button";
import LoginModal from "@/components/LoginModal/LoginModal";
import { ProfileResponse, Token } from "@/lib/api/profile";
import { useState } from "react";
import { getProfile } from "@/lib/api/profile";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState<ProfileResponse>();

  const fetchProfile = async (token: Token) => {
    const data = await getProfile(token);

    setProfile(data);
  };

  return (
    <div>
      {!profile && (
        <>
          <Button
            title={"Войти"}
            onClick={() => setIsModalOpen(true)}
            icon={<ProfileIcon width={24} height={24} />}
          />
          <LoginModal
            getProfile={fetchProfile}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </>
      )}
      {profile && (
        <>
          <Button
            title={"Аккаунт"}
            onClick={() => setIsModalOpen(true)}
            icon={<ProfileIcon width={24} height={24} />}
          />
        </>
      )}
    </div>
  );
}
