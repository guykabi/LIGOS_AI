import { MdOutlineSpaceDashboard } from "react-icons/md";
import { 
  IoChatbubblesOutline,
  IoImagesOutline,
  IoVideocamOutline,
  IoSettingsOutline } from "react-icons/io5";
import { FiMusic } from "react-icons/fi";
import { FaCode } from "react-icons/fa";




export const routes = [
  {
   label:"Dashboard",
   icon: MdOutlineSpaceDashboard,
   href:'/dashboard',
   color:'blue'
  },
  {
   label:"Chat",
   icon: IoChatbubblesOutline,
   href:'/chat',
   color:'blue'
  },
  {
   label:"Image Generation",
   icon: IoImagesOutline,
   href:'/imageGeneration',
   color:'blue'
  },
  {
   label:"Video Generation",
   icon: IoVideocamOutline,
   href:'/videoGeneration',
   color:'blue'
  },
  {
   label:"Music Generation",
   icon: FiMusic,
   href:'/musicGeneration',
   color:'blue'
  },
  {
    label:"Code Generation",
    icon:FaCode ,
    href:'/codeGeneration',
    color:'blue'
   },
   {
    label:"Settings",
    icon: IoSettingsOutline,
    href:'/settings',
    color:'blue'
   }

]