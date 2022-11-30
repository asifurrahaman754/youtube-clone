import { MdExitToApp } from "react-icons/md";
import { useDispatch } from "react-redux";

import SidebarItems from "./SidebarItems";
import "./_Sidebar.scss";
import { Sidebar as SidebarData } from "../../data";
import { setshowSidebar } from "../../redux/youtubeSlice";
import { logOut } from "../../firebase";

export default function Sidebar() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setshowSidebar(false));
    logOut();
  };

  return (
    <>
      <ul className="navItem_wrap hideInMobile">
        {SidebarData.map((item, i) => (
          <SidebarItems key={i} item={item} />
        ))}

        <hr />
        <li onClick={handleClick}>
          <MdExitToApp size={23} />
          <span>Log Out</span>
        </li>
        <hr />
      </ul>
    </>
  );
}
