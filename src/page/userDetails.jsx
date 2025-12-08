import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GetUser } from '../feature/user/userSlice.js';

function UserDetails() {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        GetUserAll();
    }, []);

    const GetUserAll = async () => {
        const data = await dispatch(GetUser());
        setUserData(data?.payload?.users || []);
        console.log("User Data:", data.payload.users);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-5xl font-bold text-white mb-3">User Directory</h1>
                    <p className="text-purple-200 text-lg">Discover amazing profiles</p>
                    <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {userData.map((user) => (
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

                                <h2 className="text-2xl font-bold text-white text-center mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
                                    {user.firstName} {user.lastName}
                                </h2>
                                <p className="text-center text-purple-400 font-semibold text-sm mb-4">@{user.username}</p>
                                <p className="text-center text-pink-400 text-sm font-medium mb-4">{user.role.toUpperCase()}</p>

                            
                                <div className="space-y-3 border-t border-purple-500/30 pt-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-purple-300 font-semibold">👤 Gender:</span>
                                        <span className="text-slate-300">{user.gender}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-purple-300 font-semibold">📧 Email:</span>
                                        <span className="text-slate-300 truncate">{user.email}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-purple-300 font-semibold">📧 Password:</span>
                                        <span className="text-slate-300 truncate">{user.password}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-purple-300 font-semibold">📱 Phone:</span>
                                        <span className="text-slate-300">{user.phone}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-purple-300 font-semibold">🎂 Age:</span>
                                        <span className="text-slate-300">{user.age}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-purple-300 font-semibold">📅 Birth Date:</span>
                                        <span className="text-slate-300">{user.birthDate}</span>
                                    </div>
                                </div>

                       
                                <div className="border-t border-purple-500/30 mt-4 pt-4">
                                    <h3 className="font-bold text-purple-300 mb-2 text-sm">📍 ADDRESS</h3>
                                    <p className="text-xs text-slate-300 mb-1">{user.address.address}</p>
                                    <p className="text-xs text-slate-300 mb-1">{user.address.city}, {user.address.state}</p>
                                    <p className="text-xs text-pink-400 font-semibold">{user.address.country}</p>
                                </div>

                     
                                <div className="border-t border-purple-500/30 mt-4 pt-4">
                                    <h3 className="font-bold text-purple-300 mb-2 text-sm">🏢 COMPANY</h3>
                                    <div className="space-y-1">
                                        <p className="text-xs"><span className="text-purple-400 font-semibold">Name:</span> <span className="text-slate-300">{user.company.name}</span></p>
                                        <p className="text-xs"><span className="text-purple-400 font-semibold">Dept:</span> <span className="text-slate-300">{user.company.department}</span></p>
                                        <p className="text-xs"><span className="text-purple-400 font-semibold">Title:</span> <span className="text-slate-300">{user.company.title}</span></p>
                                    </div>
                                </div>

                          
                                <div className="border-t border-purple-500/30 mt-4 pt-4">
                                    <h3 className="font-bold text-purple-300 mb-2 text-sm">💳 BANK</h3>
                                    <div className="space-y-1">
                                        <p className="text-xs"><span className="text-purple-400 font-semibold">Card:</span> <span className="text-slate-300 font-mono">••••{user.bank.cardNumber.slice(-4)}</span></p>
                                        <p className="text-xs"><span className="text-purple-400 font-semibold">Type:</span> <span className="text-slate-300">{user.bank.cardType}</span></p>
                                        <p className="text-xs"><span className="text-purple-400 font-semibold">Expires:</span> <span className="text-slate-300">{user.bank.cardExpire}</span></p>
                                    </div>
                                </div>

                    
                                <div className="border-t border-purple-500/30 mt-4 pt-4">
                                    <h3 className="font-bold text-purple-300 mb-2 text-sm">₿ CRYPTO</h3>
                                    <div className="space-y-1">
                                        <p className="text-xs"><span className="text-purple-400 font-semibold">Coin:</span> <span className="text-slate-300">{user.crypto.coin}</span></p>
                                        <p className="text-xs"><span className="text-purple-400 font-semibold">Wallet:</span> <span className="text-slate-300 truncate font-mono text-xs">{user.crypto.wallet}</span></p>
                                    </div>
                                </div>

                
                                <div className="border-t border-purple-500/30 mt-4 pt-4">
                                    <h3 className="font-bold text-purple-300 mb-2 text-sm">ℹ️ MORE INFO</h3>
                                    <div className="space-y-1">
                                        <p className="text-xs"><span className="text-purple-400 font-semibold">Blood:</span> <span className="text-slate-300">{user.bloodGroup}</span></p>
                                        <p className="text-xs"><span className="text-purple-400 font-semibold">Eyes:</span> <span className="text-slate-300">{user.eyeColor}</span></p>
                                        <p className="text-xs"><span className="text-purple-400 font-semibold">Height:</span> <span className="text-slate-300">{user.height}</span></p>
                                        <p className="text-xs"><span className="text-purple-400 font-semibold">Weight:</span> <span className="text-slate-300">{user.weight}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UserDetails;
