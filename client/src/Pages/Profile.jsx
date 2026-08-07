import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Inputbox from "../Components/Inputbox.jsx";
import { updateProfile, changePassword } from "../Redux/Slices/AuthSlice.js";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || "",
    bio: user?.bio || "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.secure_url);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    const formData = new FormData();
    formData.append("fullName", profileData.fullName);
    formData.append("bio", profileData.bio);
    if (avatarFile) formData.append("avatar", avatarFile);
    await dispatch(updateProfile(formData));
    setSavingProfile(false);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setSavingPassword(true);
    const res = await dispatch(changePassword(passwordData));
    setSavingPassword(false);
    if (!res.error) setPasswordData({ oldPassword: "", newPassword: "" });
  };

  return (
  <div className="min-h-screen bg-base-100 py-10 px-4">
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-base-content">My Profile</h1>
        <p className="text-base-content/60 mt-2">
          Manage your personal information and account security.
        </p>
      </div>

      {/* Profile Card */}
      <div className="card bg-base-100 border border-base-300 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-6">
            Personal Information
          </h2>

          <form
            onSubmit={handleProfileSubmit}
            className="space-y-6"
          >
            {/* Avatar */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="avatar">
                <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={avatarPreview} alt="avatar" />
                </div>
              </div>

              <div className="flex-1 space-y-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="file-input file-input-bordered w-full max-w-xs"
                />

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="stats shadow border border-base-300">
                    <div className="stat py-3">
                      <div className="stat-title">Email</div>
                      <div className="stat-value text-sm font-medium break-all">
                        {user?.email}
                      </div>
                    </div>
                  </div>

                  <div className="stats shadow border border-base-300">
                    <div className="stat py-3">
                      <div className="stat-title">Role</div>
                      <div className="stat-value text-lg capitalize text-primary">
                        {user?.role}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="divider"></div>

            <div className="grid gap-5">
              <Inputbox
                label="Full Name"
                name="fullName"
                value={profileData.fullName}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    fullName: e.target.value,
                  })
                }
              />

              <Inputbox
                label="Bio"
                name="bio"
                textarea
                value={profileData.bio}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    bio: e.target.value,
                  })
                }
                placeholder="Tell us a bit about yourself"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={savingProfile}
                className="btn btn-primary px-8"
              >
                {savingProfile ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Password Card */}
      <div className="card bg-base-100 border border-base-300 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-6">
            Change Password
          </h2>

          <form
            onSubmit={handlePasswordSubmit}
            className="space-y-5"
          >
            <Inputbox
              label="Current Password"
              type="password"
              name="oldPassword"
              value={passwordData.oldPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  oldPassword: e.target.value,
                })
              }
              required
            />

            <Inputbox
              label="New Password"
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  newPassword: e.target.value,
                })
              }
              required
            />

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={savingPassword}
                className="btn btn-outline btn-primary px-8"
              >
                {savingPassword ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);
};

export default Profile;
