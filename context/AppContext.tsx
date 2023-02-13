import { AppDto, KpiDto } from "@/lib/types";
import React, { PropsWithChildren, useReducer } from "react";

// @todo here to try to share data between client side components only.. Still learning how to do this.

export type IAppContext = {
  apps: Record<string, KpiDto[]>;
  dispatch?: Function;
};

export type SetAppAction = {
  type: "SET_APP";
  payload: Partial<AppDto>;
};

export type IAction = SetAppAction;

export const AppContext = React.createContext<Partial<IAppContext>>({});

const appReducer = (state: IAppContext, action: IAction): IAppContext => {
  const appName = action.payload.name;

  switch (action.type) {
    case "SET_APP": {
      if (appName) {
        state["apps"][appName] = action.payload.kpis ?? [];
      }

      return { ...state, apps: { ...state.apps } };
    }

    default: {
      return state;
    }
  }
};

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, { apps: {} });

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
