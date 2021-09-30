import { useDispatch } from "react-redux";
import "./_Sidebar.scss";
import { setshowSidebar } from "../../redux/youtubeSlice";

export default function SidebarItems({ item }) {
  const dispatch = useDispatch();

  return (
    <>
      <li onClick={() => dispatch(setshowSidebar(false))} className="">
        <img loading="lazy" src={item.img} alt={item.name} />
        <span>{item.name}</span>
      </li>
    </>
  );
}
