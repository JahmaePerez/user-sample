"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import { useRouter } from "next/navigation";

const DataProvider = createContext();

export const UseDataContext = () => {
  return useContext(DataProvider);
};

const DataComponent = ({ children }) => {
  const router = useRouter();

  const [data, setData] = useState([]);

  const fillData = (dataPayload) => {
    setData(dataPayload);
  };

  const handleSubmitEdit = useCallback(
    (payload) => {
      const { id, name, username, phone } = payload;

      const newData = data?.map((item) => {
        if (Number(item.id) === Number(id)) {
          return {
            ...item,
            name,
            username,
            phone,
          };
        } else {
          return item;
        }
      });
      setData(newData);
      router.push("/");
    },
    [data, router] 
  );

  const handleDel = useCallback(
    (id) => {
      const userToDelete = data.find((item) => item.id === id);
      if (userToDelete) {
        const { name } = userToDelete;
        if (
          window.confirm(
            `Are you sure you want to delete this user: ${name.toUpperCase()}?`
          )
        ) {
          const newData = data.filter((item) => item.id !== id);
          setData(newData);
        }
      }
    },
    [data]
  );

  const handleAdd = useCallback(
    (newUser) => {
      const newData = [...data, newUser];
      setData(newData);
    },
    [data]
  );

  return (
    <DataProvider.Provider
      value={{ fillData, data, handleSubmitEdit, handleDel, handleAdd }}
    >
      {children}
    </DataProvider.Provider>
  );
};

export default DataComponent;
