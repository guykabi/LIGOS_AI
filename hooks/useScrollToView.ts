"use client";

import { useEffect } from "react";

const useScrollToView = (
  elementRef: React.RefObject<HTMLDivElement>,
  messages: any
) => {
  useEffect(() => {
    if (elementRef.current && messages.length) {
      elementRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages, elementRef]);
};

export default useScrollToView;
