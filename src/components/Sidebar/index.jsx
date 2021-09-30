import { MdExitToApp } from "react-icons/md";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import SidebarItems from "./SidebarItems";
import "./_Sidebar.scss";
import { Sidebar as SidebarData } from "../../data";
import SidebarMobile from "./SidebarMobile";
import { setshowSidebar } from "../../redux/youtubeSlice";
import { logOut } from "../../firebase";

export default function Sidebar() {
  const dispatch = useDispatch();
  const showSidebar = useSelector(state => state.youtube.showSidebar);

  const handleClick = () => {
    dispatch(setshowSidebar(false));
    logOut();
  };

  return (
    <>
      <ul className="navItem_wrap hide_in_mobile">
        {SidebarData.map(item => (
          <SidebarItems item={item} />
        ))}

        <hr />
        <li onClick={handleClick}>
          <MdExitToApp size={23} />
          <span>Log Out</span>
        </li>
        <hr />
      </ul>

      {showSidebar && <SidebarMobile />}
    </>
  );
}
