"use client";

import React, { useEffect, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UseDataContext } from "./context/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const Page = () => {
  const router = useRouter();
  const { fillData, data, handleDel, handleAdd } = UseDataContext();

  const fetchUser = useCallback(async () => {
    const response = await axios("https://jsonplaceholder.typicode.com/users");
    const { data: responseData } = response;
    fillData(responseData);
  }, [fillData]);

  useEffect(() => {
    if (data?.length === 0) {
      fetchUser();
    }
  }, [data?.length, fetchUser]);

  const handleEdit = (id) => {
    router.push(`/edit/${id}`);
  };

  const handleAddUser = () => {
    const newUser = {
      id: data.length + 1,
      name: `New User ${data.length + 1}`,
      username: `newuser${data.length + 1}`,
      phone: "000-000-0000",
    };
    handleAdd(newUser);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Handle Users</h1>
      </div>
      {data?.length !== 0 &&
        data?.map((item) => {
          const { name, phone, id } = item;

          return (
            <div key={item?.id} className="user-card">
              <div>
                <p>
                  <strong>{name}</strong>
                </p>
                <pre>{phone}</pre>
              </div>
              <div className="buttons">
                <button className="edit" onClick={() => handleEdit(id)}>
                  Edit
                </button>
                <button className="delete" onClick={() => handleDel(id)}>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      {!data?.length && (
        <div className="warning">
          <FontAwesomeIcon icon={faExclamationTriangle} /> No more data!!!
        </div>
      )}
      <button className="add-user" onClick={handleAddUser}>
        Add Another User
      </button>
    </div>
  );
};

export default Page;
