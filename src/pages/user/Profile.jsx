import React, { useEffect, useState } from "react";
import { getMeAPI } from "../../features/auth/authApi";

function Profile() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await getMeAPI();
        setData(res.data);
      } catch (err) {
        console.log("Profile Error:", err.message);
      }
    }

    loadProfile();
  }, []);

  return (
    <div className="p-4 text-white">
      <h1 className="text-4xl mb-4">Your Profile</h1>

      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default Profile;
