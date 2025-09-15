import ProfileIcon from "@/assets/ProfileIcon";
import Button from "../Button/Button";
import CommonModal from "../CommonModal/CommonModal";

export default function Header() {
  return (
    <>
      <Button variant="default" icon={<ProfileIcon />} onClick={() => {}} />
      <CommonModal></CommonModal>
    </>
  );
}
