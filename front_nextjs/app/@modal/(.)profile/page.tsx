"use client";
import ProfileModal from "@/components/ProfileModal/ProfileModal";
import { getProfile, ProfileResponse } from "@/libs/api/profile";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState<ProfileResponse>();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = Cookies.get("token");
      console.log(token);
      if (!token) return;

      try {
        const profile = await getProfile(token);
        setUserProfile(profile);
      } catch (err) {
        console.error("Ошибка загрузки профиля", err);
      }
    };

    fetchProfile();
  }, []);

  const router = useRouter();
  return (
    <>
      {userProfile && (
        <ProfileModal
          userProfile={userProfile}
          isOpen={true}
          onClose={() => router.back()}
        />
      )}
    </>
  );
}
