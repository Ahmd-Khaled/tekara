"use client";
import { ReactNode, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Header from "../common/Header/Header";
import NavBar from "../NavBar/NavBar";
import Footer from "../common/Footer/Footer";

const HomeContainer = ({ children }: { children: ReactNode }) => {
  const [isResized, setIsResized] = useState(false);

  // Handles window resize and sets the state
  const updateResizeState = () => {
    setIsResized(window.innerWidth < 768);
  };

  const handleResize = () => {
    setIsResized(!isResized);
  };

  useEffect(() => {
    // Initial check
    updateResizeState();

    // Add event listener
    window.addEventListener("resize", updateResizeState);

    // Clean up
    return () => window.removeEventListener("resize", updateResizeState);
  }, []);

  return (
    <div className={styles.home}>
      <NavBar isResized={isResized} />
      <div className={styles.homeContainer}>
        <Header handleResize={handleResize} isResized={isResized} />
        <div>{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default HomeContainer;
