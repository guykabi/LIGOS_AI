'use client'

import * as React from "react";
import { ServiceContextType, ServiceMessage } from "@/utils/types";

const defaultState = {
  question: {
    service: undefined,
    message: "",
  },
  setQuestion: () => {},
} as ServiceContextType

export const ServiceContext = React.createContext(defaultState);

const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [question, setQuestion] = React.useState<ServiceMessage>({
    service: undefined,
    message: "",
  });
  

  return (
    <ServiceContext.Provider value={{question,setQuestion}}>
      {children}
    </ServiceContext.Provider>
  );
};

export default ServiceProvider
