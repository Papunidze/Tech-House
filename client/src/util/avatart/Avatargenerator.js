import React from "react";
export default function generateAvatar(name, lastname) {
  return (
    <img
      src={`https://avatars.dicebear.com/api/${"initials"}/${name}" "${lastname}.svg`}
      alt="dicebar"
      style={{ borderRadius: "50%" }}
    />
  );
}
