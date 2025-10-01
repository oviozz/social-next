import {IconType} from "react-icons";
import { HiHome } from "react-icons/hi";
import { MdTravelExplore } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaSignOutAlt } from "react-icons/fa";


type RouteType = {
    icon: IconType
    label: string,
    link: string,
}

type AuthRouteType = Omit<RouteType, "link"> & { link?: string }

export const routes: RouteType[] = [
    { label: "Home", link: "/", icon: HiHome },
    { label: "Explore", link: "/explore", icon: MdTravelExplore },
];

