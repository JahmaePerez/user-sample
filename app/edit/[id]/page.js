// pages/edit/[id].js

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchData } from "../../utils/data"; // Replace with your actual data fetching function
import { UseDataContext } from "../../context/data";

const EditPage = ({ initialData }) => {
  const router = useRouter();
  const { data, handleSubmitEdit } = UseDataContext();
  const [details, setDetails] = useState({
    name: "",
    username: "",
    phone: "",
  });

  const { id } = router.query;

  useEffect(() => {
    const fetchUser = async () => {
      const target = data?.find((item) => Number(item.id) === Number(id));

      if (target) {
        const { name, username, phone } = target;
        setDetails({ name, username, phone });
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id, data]); // Include id and data in dependencies

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
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

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

export async function getStaticPaths() {
  const data = await fetchData(); // Replace with your actual data fetching function

  const paths = data.map((item) => ({
    params: { id: String(item.id) },
  }));

  return {
    paths,
    fallback: false, // or 'blocking' if you use fallback methods
  };
}

export default EditPage;
