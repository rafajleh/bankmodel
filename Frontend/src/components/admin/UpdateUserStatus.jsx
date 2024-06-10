import React from "react";
import { useState } from "react";
import { RiExchangeFill } from "react-icons/ri";
import FormButton from "../shared/FormButton";

export const UpdateUserStatus = ({ user, handleUpdating }) => {
  //state for user's status
  const [userStatus, setUserStatus] = useState(user.user_status);

  return (
    <form
      className="flex flex-col justify-center items-center mx-auto"
      onSubmit={(event) =>
        handleUpdating(event, user._id, user.user_status, userStatus)
      }
    >
      <select
        className="my-2 p-2 rounded"
        value={userStatus}
        onChange={(e) => setUserStatus(+e.target.value)}
      >
        <option value={0}>active</option>
        <option value={1}>Inactive</option>
        <option value={2}>Suspended</option>
        <option value={3}>Verify Mobile</option>
        <option value={4}>Verify NID</option>
        <option value={5}>Verified By Branch</option>
      </select>
      <FormButton
        text={{ default: "Update" }}
        icon={<RiExchangeFill className="mb-[-2px] ml-1" size={25} />}
      />
    </form>
  );
};
