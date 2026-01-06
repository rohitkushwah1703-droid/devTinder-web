import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { ALL_SKILLS, BASE_URL } from "../constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import Toast from "./Toast";

const ProfileForm = ({ mode = "edit", user = {} }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user?.gender || "male");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [about, setAbout] = useState(user.about || "");
  const [selectedSkills, setSelectedSkills] = useState(user.skills || []);
  const dispatch = useDispatch();
  const [isVisible, setVisible] = useState(false);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const payload =
        mode === "signup"
          ? {
              emailId,
              password,
              firstName,
              lastName,
              age,
              gender,
              photoUrl,
              about,
              skills: selectedSkills,
            }
          : {
              firstName,
              lastName,
              age,
              gender,
              photoUrl,
              about,
              skills: selectedSkills,
            };

      const url =
        mode === "signup"
          ? BASE_URL + "/auth/signup"
          : BASE_URL + "/profile/edit";

      const method = mode === "signup" ? "post" : "patch";

      const res = await axios[method](url, payload, {
        withCredentials: true,
      });

      dispatch(addUser(res.data.user));

      if (mode === "signup") {
        navigate("/login");
      }
      setVisible(true);
      setTimeout(() => setVisible(false), 3000);
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleSkill = (skill) => {
    setSelectedSkills(
      (prev) =>
        prev.includes(skill)
          ? prev.filter((s) => s !== skill) // remove if already selected
          : [...prev, skill] // add if not selected
    );
  };

  const clearSkills = () => setSelectedSkills([]);
  return (
    <div className="container">
      <div className="flex justify-center items-start my-5 gap-8">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-6">
          <legend className="fieldset-legend">
            {mode === "signup" ? "Create Account" : "Edit Profile"}
          </legend>

          <label className="label">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input rounded-md"
            placeholder="please enter first name"
          />

          <label className="label">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input rounded-md"
            placeholder="please enter last name"
          />
          {mode === "signup" && (
            <>
              <label className="label">Email</label>
              <input
                type="email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="input rounded-md"
                placeholder="Enter your email"
              />

              <label className="label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input rounded-md"
                placeholder="Create a password"
              />
            </>
          )}

          <label className="label">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="input rounded-md"
            placeholder="please enter age"
          />

          <label className="label">Gender</label>
          <select
            defaultValue="Pick a skill"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="select rounded-md"
          >
            <option>male</option>
            <option>female</option>
            <option>others</option>
          </select>

          <label className="label">Photo Url</label>
          <input
            type="text"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            className="input rounded-md"
            placeholder="please enter photo url"
          />

          <label className="label">Skills</label>

          <div className="flex flex-wrap gap-2">
            {ALL_SKILLS?.map((skill) => (
              <label
                key={skill}
                className={`btn btn-sm ${
                  selectedSkills.includes(skill) ? "btn-primary" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedSkills.includes(skill)}
                  onChange={() => toggleSkill(skill)}
                  className="hidden"
                />
                {skill}
              </label>
            ))}

            <button
              type="button"
              onClick={clearSkills}
              className="btn btn-square btn-sm"
              aria-label="Clear selected skills"
            >
              ×
            </button>
          </div>

          <label className="label">About</label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="textarea rounded-md"
            placeholder="Bio"
          ></textarea>
          <button className="btn btn-neutral mt-4" onClick={handleSubmit}>
            {mode === "signup" ? "Sign Up" : "Save Profile"}
          </button>
        </fieldset>
        <Toast
          visible={isVisible}
          message={
            mode === "signup"
              ? "Account created successfully!"
              : "Profile updated successfully!"
          }
          type="success"
          position="top-center"
        />
        {mode === "edit" && (
          <div className="mt-5">
            <UserCard
              user={{
                firstName,
                lastName,
                age,
                gender,
                photoUrl,
                about,
                skills: selectedSkills,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileForm;
