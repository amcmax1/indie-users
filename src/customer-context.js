import * as React from "react";
import { useState } from "react";

const CustomerContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "setUsers": {
      return { ...state, users: action.users };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
function CustomerProvider({ children }) {
  const [state, dispatch] = React.useReducer(userReducer, {
    activeUsersCount: 0,
    users: [],
  });
  const value = { state, dispatch };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
}

function useCustomerContext() {
  const context = React.useContext(CustomerContext);
  if (context === undefined) {
    throw new Error(
      "useCustomerContext must be used within a CustomerContext Provider"
    );
  }
  return context;
}

export { CustomerProvider, useCustomerContext };
