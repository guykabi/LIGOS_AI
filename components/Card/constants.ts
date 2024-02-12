import { 
  IoChatbubblesOutline,
  IoImagesOutline,
  IoVideocamOutline} from "react-icons/io5";
import { FiMusic } from "react-icons/fi";
import { FaCode } from "react-icons/fa";

export const Cards = [
  {
    title:'Chat',
    content:'Ask anything on your mind',
    color:'blue',
    href:'/Chat',
    icon:IoChatbubblesOutline
  },
  {
    title:'Image Generation',
    content:'Generate any image you want!',
    color:'orange',
    href:'/Image',
    icon:IoImagesOutline
  },
  {
    title:'Video Generation',
    content:'Instead of filming it, write it!',
    color:'green',
    href:'/Video',
    icon:IoVideocamOutline
  },
  {
    title:'Music generation',
    content:'Like pro musician, but not',
    color:'red',
    href:'/Music',
    icon:FiMusic

  },
  {
    title:'Code',
    content:'Leave code to the professional',
    color:'gray',
    href:'/Code',
    icon:FaCode
  } 
  
]