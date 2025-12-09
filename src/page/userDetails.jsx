import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { GetUser } from "../feature/user/userSlice.js";

function UserDetails() {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    GetUserAll();
  }, []);

  const GetUserAll = useCallback(async () => {
    const data = await dispatch(GetUser());
    setUserData(data?.payload?.users || []);
  }, [dispatch]);

  const totalPages = Math.ceil(userData.length / itemsPerPage);

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return userData.slice(start, end);
  }, [page, userData]);

  const nextPage = useCallback(() => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToPage = useCallback((pageNum) => {
    setPage(pageNum);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-white mb-3">User Directory</h1>
          <p className="text-purple-200 text-lg">Discover amazing profiles</p>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedUsers.map((user) => (
            <div
              key={user.id}
              className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl hover:shadow-2xl hover:from-purple-800 hover:to-slate-900 transition-all duration-300 overflow-hidden border border-purple-500/20 hover:border-purple-500/60"
            >
              <div className="h-32 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 animate-pulse"></div>
              </div>

              <div className="px-6 pb-6 -mt-16 relative">
                <div className="flex justify-center mb-4">
                  <img
                    src={user.image}
                    alt={user.firstName}
                    className="w-32 h-32 rounded-2xl border-4 border-slate-800 shadow-2xl object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <h2 className="text-2xl font-bold text-white text-center mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400">
                  {user.firstName} {user.lastName}
                </h2>

                <p className="text-center text-purple-400 font-semibold text-sm mb-4">@{user.username}</p>
                <p className="text-center text-pink-400 text-sm font-medium mb-4">{user.role.toUpperCase()}</p>

                <div className="space-y-3 border-t border-purple-500/30 pt-4 text-slate-300 text-sm">
                  <div className="flex justify-between"><span>👤 Gender:</span> <span>{user.gender}</span></div>
                  <div className="flex justify-between"><span>📧 Email:</span> <span className="truncate">{user.email}</span></div>
                  <div className="flex justify-between"><span>📱 Phone:</span> <span>{user.phone}</span></div>
                  <div className="flex justify-between"><span>🎂 Age:</span> <span>{user.age}</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10 space-x-3">
          <button
            onClick={prevPage}
            disabled={page === 1}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:bg-gray-500"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => goToPage(p)}
              className={`px-4 py-2 rounded-lg ${
                p === page ? "bg-pink-500 text-white" : "bg-slate-700 text-purple-300"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={nextPage}
            disabled={page === totalPages}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:bg-gray-500"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
