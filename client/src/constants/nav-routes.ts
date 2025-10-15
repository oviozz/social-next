import {IconType} from "react-icons";
import { HiHome } from "react-icons/hi";
import { MdTravelExplore } from "react-icons/md";


type RouteType = {
    icon: IconType
    label: string,
    link: string,
}

type AuthRouteType = Omit<RouteType, "link"> & { link?: string }

export const navRoutes: RouteType[] = [
    { label: "Home", link: "/", icon: HiHome },
    { label: "Explore", link: "/explore", icon: MdTravelExplore },
];

