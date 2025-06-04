"use client";
import { navBarList } from "./navBarList";
import { FaCaretRight } from "react-icons/fa6";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { MdOutlineLogout } from "react-icons/md";
import Logo from "../common/Logo/Logo";
import useLogout from "@/hooks/auth/useLogout";
import OverlaySpinner from "../common/Spinner/OverlaySpinner";

const NavBar = ({ isResized }: { isResized: boolean }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [clickedItem, setClickedItem] = useState(null);

  const handleItemClick = (item: any) => {
    setIsClicked((prev) => !prev);
    setClickedItem(item);
  };

  const { logout, isLoading } = useLogout();

  const [isMobile, setIsMobile] = useState(false);

  return (
    <nav className={isResized ? styles.navBarRes : styles.navBar}>
      {isLoading ? <OverlaySpinner /> : null}
      <div className={styles.navBarContainer}>
        <Logo isResized={isResized} bg="#e9e2f8" />
        <div className={styles.navList}>
          <ul className={styles.navItems}>
            {navBarList?.map((item, index) => (
              <li
                onClick={() => handleItemClick(index)}
                key={index}
                className={
                  clickedItem === index ? styles.navItemActive : styles.navItem
                }
              >
                <div className={styles.itemStart}>
                  <item.icon />
                  <span>{item?.name}</span>
                </div>
                <div className={styles.itemEnd}>
                  <FaCaretRight />
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.avatar}>
            <button onClick={logout} className={styles.logoutBtn}>
              <span>Logout</span> <MdOutlineLogout />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
