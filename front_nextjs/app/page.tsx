"use client";

import ProfileIcon from "@/assets/ProfileIcon";
import Button from "@/components/Button/Button";
import LoginModal from "@/components/LoginModal/LoginModal";
import { useState } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Button
        title={"Войти"}
        onClick={() => setIsModalOpen(true)}
        icon={<ProfileIcon width={24} height={24} />}
      ></Button>

      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
