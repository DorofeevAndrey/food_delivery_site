"use client";

import ProfileIcon from "@/assets/ProfileIcon";
import Button from "@/components/Button/Button";
import LoginModal from "@/components/LoginModal/LoginModal";
import { useState } from "react";
import { getProfile } from "@/libs/api/profile";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

export default function Home() {
  const { user, setUser, logout, refreshUser } = useUser();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const router = useRouter();

  return (
    <div>
      {!user && (
        <>
          <Button
            title={"Войти"}
            onClick={() => setIsLoginModalOpen(true)}
            icon={<ProfileIcon />}
          />
          <LoginModal
            getProfile={async (token) => {
              const data = await getProfile(token);
              setUser(data);
            }}
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
          />
        </>
      )}
      {user && (
        <>
          <Button
            onClick={() => router.push("/profile")}
            icon={<ProfileIcon />}
          />
        </>
      )}
      <Button onClick={() => router.push("/profile")} icon={<ProfileIcon />} />
    </div>
  );
}
