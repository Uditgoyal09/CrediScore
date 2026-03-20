import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { GiReceiveMoney } from "react-icons/gi";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import { AuthContext } from "../context/AuthContext";

const navItems = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/loans", label: "Loans" },
    { to: "/tools", label: "EMI Tools" },
];

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    if (!user) return null;

    const handleLogout = () => {
        setMobileOpen(false);
        logout();
        navigate("/", { replace: true });
    };

    const linkClass = ({ isActive }) =>
        [
            "rounded-full px-4 py-2 text-sm font-semibold transition",
            isActive
                ? "bg-sky-100 text-sky-700"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
        ].join(" ");

    return (
        <>
            <nav className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
                <div className="page-container">
                    <div className="glass-panel flex items-center justify-between px-5 py-4 sm:px-6">
                        <div className="flex items-center gap-3">
                            <div className="animate-float rounded-2xl bg-linear-to-br from-sky-500 to-emerald-500 p-3 text-white shadow-lg">
                                <GiReceiveMoney className="text-2xl" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                                    Income-first lending
                                </p>
                                <h1 className="text-2xl font-bold text-gradient">CrediScore</h1>
                            </div>
                        </div>

                        {user.role === "user" && (
                            <div className="hidden items-center gap-2 lg:flex">
                                {navItems.map((item) => (
                                    <NavLink key={item.to} to={item.to} className={linkClass}>
                                        {item.label}
                                    </NavLink>
                                ))}
                            </div>
                        )}

                        <div className="hidden items-center gap-4 lg:flex">
                            <div className="text-right">
                                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                                    {user.role === "admin" ? "Admin console" : "Welcome back"}
                                </p>
                                <p className="text-sm font-semibold text-slate-700">{user.name}</p>
                            </div>
                            <button onClick={handleLogout} className="secondary-button px-5 py-2.5">
                                Logout
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={() => setMobileOpen((value) => !value)}
                            className="inline-flex rounded-2xl border border-slate-200 bg-white p-3 text-slate-700 shadow-sm lg:hidden"
                            aria-label="Toggle navigation"
                        >
                            {mobileOpen ? (
                                <HiOutlineXMark className="text-2xl" />
                            ) : (
                                <HiOutlineBars3 className="text-2xl" />
                            )}
                        </button>
                    </div>

                    {mobileOpen && (
                        <div className="glass-panel mt-3 p-4 lg:hidden">
                            <div className="mb-4 border-b border-slate-100 pb-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                                    Signed in
                                </p>
                                <p className="mt-1 text-base font-semibold text-slate-800">
                                    {user.name}
                                </p>
                            </div>

                            <div className="flex flex-col gap-2">
                                {user.role === "user" &&
                                    navItems.map((item) => (
                                        <NavLink
                                            key={item.to}
                                            to={item.to}
                                            className={linkClass}
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            {item.label}
                                        </NavLink>
                                    ))}
                                <button
                                    onClick={handleLogout}
                                    className="secondary-button mt-2 justify-center"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
}
