import ProfileIcon from "@/assets/ProfileIcon";
import Button from "../Button/Button";
import CommonModal from "../CommonModal/CommonModal";
import MenuIcon from "@/assets/MenuIcon";
import styles from "./Header.module.css";
import { useRouter } from "next/navigation";
import GordanIcon from "@/assets/GordanIcon";

export default function Header() {
  const router = useRouter();
  return (
    <header className={styles.headerContainer}>
      <Button variant="default" icon={<MenuIcon />} onClick={() => {}} />
      <a
        href="/"
        className="flex items-center p-2 bg-gray-100 hover:bg-gray-200 rounded"
      >
        <GordanIcon width={232} height={37.83} className="text-red-500" />
      </a>
      <Button title={"Войти"} onClick={() => {}} icon={<ProfileIcon />} />
    </header>

    // <CommonModal></CommonModal>
  );
}
