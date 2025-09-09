"use client";

import ProfileIcon from "@/assets/ProfileIcon";
import Button from "@/components/Button/Button";
import LoginModal from "@/components/LoginModal/LoginModal";
import { ProfileResponse } from "@/libs/api/profile";
import { useState } from "react";
import { getProfile } from "@/libs/api/profile";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [profile, setProfile] = useState<ProfileResponse>();

  const router = useRouter();

  const fetchProfile = async (token: string) => {
    const data = await getProfile(token);

    setProfile(data);
  };

  return (
    <div>
      {!profile && (
        <>
          <Button
            title={"Войти"}
            onClick={() => setIsLoginModalOpen(true)}
            icon={<ProfileIcon width={24} height={24} />}
          />
          <LoginModal
            getProfile={fetchProfile}
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
          />
        </>
      )}
      {profile && (
        <>
          <Button
            onClick={() => router.push("/profile")}
            icon={<ProfileIcon width={24} height={24} />}
          />
        </>
      )}
      <Button
        onClick={() => router.push("/profile")}
        icon={<ProfileIcon width={24} height={24} />}
      />
    </div>
  );
}
