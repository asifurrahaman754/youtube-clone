import { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdApps } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { BsFillPersonFill } from "react-icons/bs";

import { setshowSidebar, setuser } from "../../redux/youtubeSlice";
import SearchInput from "./SearchInput";
import "./_header.scss";
import { loginWithGoogle } from "../../firebase";

export default function Header({ showinDesktop }) {
  const [hideNav, sethideNav] = useState(false);
  const dispatch = useDispatch();
  const { showSidebar, user } = useSelector((state) => state.youtube);

  const login = () => {
    loginWithGoogle()
      .then((user) => {
        console.log(user);
        dispatch(
          setuser({
            id: user.user.accessToken,
            name: user.user.displayName,
            photo: user.user.photoURL,
          })
        );
      })
      .catch((err) => {
        alert(err.message);
        return;
      });
  };

  return (
    <header>
      {!hideNav ? (
        <>
          <div className="logo_Icons">
            <img
              src="/assets/menuIcon.svg"
              alt="humberger menu"
              className={`menuIcon ${showinDesktop ? "" : "hideInDesktop"}`}
              onClick={() => dispatch(setshowSidebar(!showSidebar))}
            />

            <img src="/assets/logo.svg" alt="youtube logo" className="logo" />
          </div>

          <SearchInput hideSearch={true} />

          <img
            src="/assets/searchIcon.svg"
            alt="humberger menu"
            className="searchIconMobile"
            onClick={() => sethideNav(true)}
          />

          <div className="header_icon_wrap">
            <IoMdNotificationsOutline />
            <MdApps />
            {!user?.photo ? (
              <button onClick={login} className="sign_inBtn">
                <span>
                  <BsFillPersonFill />
                </span>
                Sign in
              </button>
            ) : (
              <img src={user?.photo} alt="user" className="user_image" />
            )}
          </div>
        </>
      ) : (
        <>
          <img
            onClick={() => sethideNav(false)}
            src="/assets/back.svg"
            alt="back icon svg"
            className="backIcon"
          />
          <SearchInput hideSearch={false} />
        </>
      )}
    </header>
  );
}
