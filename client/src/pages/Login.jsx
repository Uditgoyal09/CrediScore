import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { motion as Motion } from "framer-motion";
import { GiReceiveMoney } from "react-icons/gi";
import { MdEmail, MdLockOutline, MdArrowBack } from "react-icons/md";
import LoanImgLoginpage from "../assets/LoanImgLoginpage.png";
import { AuthContext } from "../context/AuthContext";
import PageTransition from "../components/PageTransition";

export default function Login() {
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { user, login } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/dashboard", { replace: true });
        }
    }, [user, navigate]);

    const isValid = emailOrPhone.trim() !== "" && password.length >= 6;

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isValid || loading) return;

        setLoading(true);
        const result = await login({
            emailOrPhone: emailOrPhone.trim(),
            password,
        });
        setLoading(false);

        if (!result.success) {
            alert(result.msg || "Login failed. Please try again.");
        }
    };

    return (
        <PageTransition className="page-wrap flex min-h-screen items-center">
            <div className="page-container">
                <NavLink
                    to="/"
                    className="secondary-button mb-6 inline-flex px-5 py-3 text-sm font-semibold"
                >
                    <MdArrowBack className="text-lg" />
                    Back to home
                </NavLink>

                <div className="glass-panel overflow-hidden">
                    <div className="grid min-h-[720px] lg:grid-cols-[0.95fr_1.05fr]">
                        <div className="relative overflow-hidden bg-slate-950 px-8 py-10 text-white sm:px-10">
                            <div className="absolute inset-0 bg-linear-to-br from-sky-500/25 via-transparent to-emerald-500/20" />
                            <div className="relative z-10 flex h-full flex-col justify-between gap-10">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-2xl bg-white/12 p-3 backdrop-blur-sm">
                                            <GiReceiveMoney className="text-3xl" />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.24em] text-sky-200">
                                                Welcome back
                                            </p>
                                            <h1 className="text-3xl font-bold">CrediScore</h1>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h2 className="text-4xl font-extrabold leading-tight sm:text-5xl">
                                            Return to your lending dashboard with a clearer, faster
                                            workflow.
                                        </h2>
                                        <p className="max-w-xl text-base leading-8 text-slate-300">
                                            Continue from score checks to verification and loan
                                            applications without losing state across pages.
                                        </p>
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        {[
                                            "Real income scoring",
                                            "Live application tracking",
                                            "Verified document flow",
                                            "Responsive mobile layout",
                                        ].map((item) => (
                                            <div
                                                key={item}
                                                className="rounded-2xl border border-white/10 bg-white/8 px-4 py-4 text-sm text-slate-200 backdrop-blur-sm"
                                            >
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Motion.div
                                    initial={{ opacity: 0, y: 18 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.55, delay: 0.1 }}
                                    className="relative"
                                >
                                    <img
                                        src={LoanImgLoginpage}
                                        alt="CrediScore preview"
                                        className="w-full rounded-[28px] border border-white/10 object-cover shadow-2xl"
                                    />
                                    <div className="absolute -bottom-4 right-4 rounded-2xl bg-white px-4 py-3 text-slate-900 shadow-xl">
                                        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                                            Faster handoff
                                        </p>
                                        <p className="mt-1 text-lg font-bold">Frontend now aligned with `/api` proxy</p>
                                    </div>
                                </Motion.div>
                            </div>
                        </div>

                        <div className="flex items-center px-6 py-10 sm:px-10">
                            <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md space-y-6">
                                <div className="space-y-3">
                                    <span className="eyebrow">Sign in</span>
                                    <div>
                                        <h2 className="text-4xl font-extrabold text-slate-900">
                                            Access your account
                                        </h2>
                                        <p className="mt-2 text-base leading-7 text-slate-600">
                                            Use the same account you created for score checks and loan
                                            requests.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">
                                        Email or phone
                                    </label>
                                    <div className="input-shell">
                                        <span className="input-icon">
                                            <MdEmail className="text-xl" />
                                        </span>
                                        <input
                                            type="text"
                                            value={emailOrPhone}
                                            onChange={(event) => setEmailOrPhone(event.target.value)}
                                            placeholder="you@example.com or 9876543210"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">
                                        Password
                                    </label>
                                    <div className="input-shell">
                                        <span className="input-icon">
                                            <MdLockOutline className="text-xl" />
                                        </span>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(event) => setPassword(event.target.value)}
                                            placeholder="Enter your password"
                                        />
                                    </div>
                                </div>

                                <button type="submit" disabled={!isValid || loading} className="primary-button w-full py-4 text-base">
                                    {loading ? "Logging in..." : "Login"}
                                </button>

                                <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 text-sm leading-7 text-slate-600">
                                    Credentials stay synced with the backend auth routes, so the same
                                    login works in local proxy mode and direct API deployments.
                                </div>

                                <p className="text-sm text-slate-500">
                                    New here?{" "}
                                    <NavLink to="/signup" className="font-semibold text-sky-700 hover:underline">
                                        Create an account
                                    </NavLink>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
