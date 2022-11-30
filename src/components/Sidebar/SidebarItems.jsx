import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./_Sidebar.scss";
import { setshowSidebar } from "../../redux/youtubeSlice";

export default function SidebarItems({ item }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = () => {
    dispatch(setshowSidebar(false));
    if (item.name === "Home") {
      history.push("/");
    }
  };

  return (
    <>
      <li onClick={handleClick}>
        <img loading="lazy" src={item.img} alt={item.name} />
        <span>{item.name}</span>
      </li>
    </>
  );
}
