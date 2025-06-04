import Link from "next/link";
import styles from "./styles.module.scss";

const Logo = ({ isResized, bg }: { isResized: boolean; bg: string }) => {
  return (
    <Link
      href="/"
      className={isResized ? styles.navBrandRes : styles.navBrand}
      style={{ backgroundColor: bg }}
    >
      <div className={styles.brandLogo}>T</div>
      <div className={styles.brandInfo}>
        <h1 className={styles.brandTitle}>Tekara</h1>
        <span className={styles.brandDesc}>Saas Admin Dashboard</span>
      </div>
    </Link>
  );
};

export default Logo;
