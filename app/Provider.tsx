// import { store } from "@/redux/store";
// import { ReactNode } from "react";
// import { Provider } from "react-redux";

// interface ProviderProps {
//   children: ReactNode;
// }

// export function Providers({ children }: ProviderProps) {
//   return <Provider store={store}>{children}</Provider>;
// }

"use client";
import { store } from "@/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";

interface ProviderProps {
  children: ReactNode;
}

export function Providers({ children }: ProviderProps) {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      {children}
      {/* </PersistGate> */}
    </Provider>
  );
}
