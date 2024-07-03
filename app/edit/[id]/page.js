"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { UseDataContext } from "../../context/data";
import { useRouter } from "next/navigation";

const EditPage = () => {
  const router = useRouter();
  const { data, handleSubmitEdit } = UseDataContext();
  const [details, setDetails] = useState({
    name: "",
    username: "",
    phone: "",
  });

  const params = useParams();
  const { id } = params;

  const fetchUser = async () => {
    const target = data?.find((item) => Number(item.id) === Number(id));

    if (target) {
      const { name, username, phone } = target;
      setDetails({ name, username, phone });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setDetails({ ...details, [name]: val });
  };

  const handleSubmitEditFunc = () => {
    handleSubmitEdit({
      ...details,
      id,
    });
  };

  const handleCancel = () => {
    router.back();
  }

  return (
    <div className="container">
      {details && (
        <div>
          <div className="header">
            <h1>Edit User</h1>
          </div>
          <input
            name="name"
            type="text"
            placeholder="name"
            onChange={handleChange}
            value={details?.name}
            className="input-field"
          />
          <input
            name="username"
            type="text"
            placeholder="username"
            onChange={handleChange}
            value={details?.username}
            className="input-field"
          />
          <input
            name="phone"
            // type="number"
            type="text"
            placeholder="phone"
            onChange={handleChange}
            value={details?.phone}
            className="input-field"
          />
          <div className="subcan">
            <button className="submit" onClick={handleSubmitEditFunc}>
              Submit
            </button>
            <button className="cancel" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPage;
