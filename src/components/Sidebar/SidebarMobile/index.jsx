import ReactDOM from "react-dom";
import { MdExitToApp } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import SidebarItems from "../SidebarItems";
import "../_Sidebar.scss";
import { Sidebar as SidebarData } from "../../../data";
import "./_SidebarMobile.scss";
import { setshowSidebar } from "../../../redux/youtubeSlice";
import { logOut } from "../../../firebase";

export default function SidebarMobile() {
  const dispatch = useDispatch();
  const showSidebar = useSelector((state) => state.youtube.showSidebar);

  const handleClick = () => {
    dispatch(setshowSidebar(false));
    logOut();
  };

  if (!showSidebar) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <div className="mobile_sidebar_container">
        <ul className="navItem_wrap">
          <div className="sidebar_header">
            <img
              src="/assets/menuIcon.svg"
              className="menuIcon"
              alt=""
              onClick={() => dispatch(setshowSidebar(false))}
            />
            <img src="/assets/logo.svg" alt="youtube logo" className="logo" />
          </div>
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

        <div
          onClick={() => dispatch(setshowSidebar(false))}
          className="sidebar_overlay"
        ></div>
      </div>
    </>,
    document.getElementById("sidebar")
  );
}
