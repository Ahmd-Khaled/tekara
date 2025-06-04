import { FaHome } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { TbReportSearch } from "react-icons/tb";
import { IconType } from "react-icons";
type NavItemType = {
  id: number;
  name: string;
  link: string;
  icon: IconType;
}

export const navBarList: NavItemType[] = [
  { id: 1, name: "Dashboard", link: "/", icon: FaHome },
  { id: 2, name: "Users", link: "/", icon: FaUsersGear },
  { id: 3, name: "Reports", link: "/", icon: TbReportSearch },
  { id: 4, name: "Settings", link: "/", icon: IoSettingsSharp },
];
