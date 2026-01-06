import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ProfileForm from "./ProfileForm";

const Profile = () => {
  const user = useSelector((store) => store.user);

  return user && <ProfileForm mode="edit" user={user} />;
};

export default Profile;
