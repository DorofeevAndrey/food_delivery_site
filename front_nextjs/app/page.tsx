"use client";

import ProfileIcon from "@/assets/ProfileIcon";
import Button from "@/components/Button/Button";

export default function Home() {
  const handleOnClick = () => {
    alert("Кнопка нажата!");
  };
  return (
    <div>
      <Button
        title={"Войти"}
        onClick={handleOnClick}
        icon={<ProfileIcon width={24} height={24} />}
      ></Button>
    </div>
  );
}
