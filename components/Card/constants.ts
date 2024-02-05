import { 
  IoChatbubblesOutline,
  IoImagesOutline,
  IoVideocamOutline} from "react-icons/io5";
import { FiMusic } from "react-icons/fi";
import { FaCode } from "react-icons/fa";

export const Cards = [
  {
    title:'Chat',
    content:'Chat that allows you to ask any question',
    color:'blue',
    href:'/Chat',
    icon:IoChatbubblesOutline
  },
  {
    title:'Image Generation',
    content:'Generate any image on your mind',
    color:'orange',
    href:'/Image',
    icon:IoImagesOutline
  },
  {
    title:'Video Generation',
    content:'Instead of filming it, write it !',
    color:'green',
    href:'/Video',
    icon:IoVideocamOutline
  },
  {
    title:'Music generation',
    content:'Like pro musician, just not',
    color:'red',
    href:'/Music',
    icon:FiMusic

  },
  {
    title:'Code',
    content:'Ask any code issue that comes to your mind',
    color:'gray',
    href:'/Code',
    icon:FaCode
  } 
  
]