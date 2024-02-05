import { MdOutlineSpaceDashboard } from "react-icons/md";
import { 
  IoChatbubblesOutline,
  IoImagesOutline,
  IoVideocamOutline,
  IoSettingsOutline } from "react-icons/io5";
import { FiMusic } from "react-icons/fi";
import { FaCode } from "react-icons/fa";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";


export type Route = {
   label:string,
   icon: any,
   href:string,
   color:string
}

export const routes:Route[] = [
  {
   label:"Dashboard",
   icon: MdOutlineSpaceDashboard,
   href:'/dashboard',
   color:'blue'
  },
  {
   label:"Chat",
   icon: IoChatbubblesOutline,
   href:'/Chat',
   color:'blue'
  },
  {
   label:"Image Generation",
   icon: IoImagesOutline,
   href:'/Image',
   color:'blue'
  },
  {
   label:"Video Generation",
   icon: IoVideocamOutline,
   href:'/Video',
   color:'blue'
  },
  {
   label:"Music Generation",
   icon: FiMusic,
   href:'/Music',
   color:'blue'
  },
  {
    label:"Code Generation",
    icon:FaCode ,
    href:'/Code',
    color:'blue'
   },
   {
    label:"Settings",
    icon: IoSettingsOutline,
    href:'/settings',
    color:'blue'
   }

]