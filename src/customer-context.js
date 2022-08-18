import * as React from "react";
import { useState, useMemo } from "react";

const CustomerContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "setUsers": {
      return { ...state, users: action.users };
    }
    case "activate": {
      let updatedUser = action.user;
      updatedUser = state.users.map((obj) => {
        if (obj._id === updatedUser._id) {
          return { ...obj, isActive: true };
        }
        return obj;
      });

      console.log(state);

      return {
        ...state,
        updatedUser: updatedUser,
        users: updatedUser,
        user: action.user,
        activeUsersCount: state.activeUsersCount + 1, //TODO: fix
      };
    }
    case "deactivate": {
      let updatedUser = action.user;
      updatedUser = state.users.map((obj) => {
        if (obj._id === updatedUser._id) {
          return { ...obj, isActive: false };
        }
        return obj;
      });

      console.log(state);

      return {
        ...state,
        updatedUser: updatedUser,
        users: updatedUser,
        user: action.user,
        activeUsersCount: state.activeUsersCount - 1, //TODO: fix
      };
    }
    case "updateUsers": {
      let updatedUsers = action.updatedUsers;
      return {
        ...state,
        users: updatedUsers,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
function CustomerProvider({ data, children }) {
  const activeCount = useMemo(() => getActiveUsersCount(data), [data]);

  const [state, dispatch] = React.useReducer(userReducer, {
    activeUsersCount: activeCount,
    users: data,
  });
  const value = { state, dispatch };

  function getActiveUsersCount(users) {
    return users.filter((user) => user.isActive === true).length;
  }
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
