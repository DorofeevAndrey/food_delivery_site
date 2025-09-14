"use client";
import ProfileModal from "@/components/ProfileModal/ProfileModal";
import { getProfile, ProfileResponse } from "@/libs/api/profile";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useUser } from "@/contexts/UserContext";

export default function ProfilePageModal() {
  const { user, setUser } = useUser();

  const pathname = usePathname();

  const router = useRouter();
  return (
    <>
      {user && (
        <ProfileModal
          isOpen={pathname === "/profile"}
          onClose={() => {
            router.push("/");
          }}
        />
      )}
    </>
  );
}
