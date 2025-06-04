import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import styles from "./styles.module.scss";
const Header = ({
  handleResize,
  isResized,
}: {
  handleResize: () => void;
  isResized: boolean;
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.start}>
          <button className={styles.menuButton} onClick={handleResize}>
            {isResized ? (
              <IoIosArrowRoundForward className={styles.iconArrow} />
            ) : (
              <HiMiniBars3BottomLeft className={styles.iconBars} />
            )}
          </button>
          <h1 className={styles.title}>Dashboard</h1>
        </div>
        <div className={styles.end}>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
