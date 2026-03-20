import React, { useContext, useState } from "react";
import { NavLink } from "react-router";
import { MdPerson, MdCake, MdPhone, MdEmail, MdLockOutline, MdArrowBack } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import LoanImgLoginpage from "../assets/LoanImgLoginpage.png";
import { AuthContext } from "../context/AuthContext";
import PageTransition from "../components/PageTransition";

export default function Signup() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { signup } = useContext(AuthContext);

    const isValid =
        name.trim().length > 2 &&
        Number(age) >= 18 &&
        Number(age) <= 100 &&
        phone.length === 10 &&
        email.includes("@") &&
        password.length >= 6;

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isValid || loading) return;

        setLoading(true);
        const result = await signup({
            name: name.trim(),
            age: Number(age),
            phone,
            email: email.trim(),
            password,
        });
        setLoading(false);

        if (!result.success) {
            alert(result.msg || "Signup failed. Please try again.");
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
                    <div className="grid lg:grid-cols-[1.02fr_0.98fr]">
                        <div className="flex items-center px-6 py-10 sm:px-10">
                            <form onSubmit={handleSubmit} className="mx-auto w-full max-w-lg space-y-6">
                                <div className="space-y-3">
                                    <span className="eyebrow">Create account</span>
                                    <div>
                                        <h1 className="text-4xl font-extrabold text-slate-900">
                                            Start with a cleaner onboarding flow
                                        </h1>
                                        <p className="mt-2 max-w-xl text-base leading-7 text-slate-600">
                                            We kept your backend signup contract the same and upgraded the
                                            frontend form layout so it feels quicker and easier to trust.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div className="space-y-2 sm:col-span-2">
                                        <label className="text-sm font-semibold text-slate-700">
                                            Full name
                                        </label>
                                        <div className="input-shell">
                                            <span className="input-icon">
                                                <MdPerson className="text-xl" />
                                            </span>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(event) => setName(event.target.value)}
                                                placeholder="Your full name"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">
                                            Age
                                        </label>
                                        <div className="input-shell">
                                            <span className="input-icon">
                                                <MdCake className="text-xl" />
                                            </span>
                                            <input
                                                type="number"
                                                min="18"
                                                max="100"
                                                value={age}
                                                onChange={(event) =>
                                                    setAge(event.target.value.replace(/\D/g, "").slice(0, 2))
                                                }
                                                placeholder="18+"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">
                                            Phone
                                        </label>
                                        <div className="input-shell">
                                            <span className="input-icon">
                                                <MdPhone className="text-xl" />
                                            </span>
                                            <input
                                                type="tel"
                                                value={phone}
                                                onChange={(event) =>
                                                    setPhone(event.target.value.replace(/\D/g, "").slice(0, 10))
                                                }
                                                placeholder="9876543210"
                                                maxLength={10}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2 sm:col-span-2">
                                        <label className="text-sm font-semibold text-slate-700">
                                            Email
                                        </label>
                                        <div className="input-shell">
                                            <span className="input-icon">
                                                <MdEmail className="text-xl" />
                                            </span>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(event) => setEmail(event.target.value)}
                                                placeholder="you@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2 sm:col-span-2">
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
                                                placeholder="At least 6 characters"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" disabled={!isValid || loading} className="primary-button w-full py-4 text-base">
                                    {loading ? "Creating account..." : "Create Account"}
                                </button>

                                <div className="grid gap-4 rounded-[24px] border border-slate-100 bg-slate-50/80 p-5 sm:grid-cols-3">
                                    {[
                                        "Instant profile creation",
                                        "Same backend auth contract",
                                        "Responsive form spacing",
                                    ].map((item) => (
                                        <div key={item} className="text-sm leading-7 text-slate-600">
                                            {item}
                                        </div>
                                    ))}
                                </div>

                                <p className="text-sm text-slate-500">
                                    Already have an account?{" "}
                                    <NavLink to="/login" className="font-semibold text-sky-700 hover:underline">
                                        Login here
                                    </NavLink>
                                </p>
                            </form>
                        </div>

                        <div className="relative overflow-hidden bg-linear-to-br from-sky-600 via-cyan-600 to-emerald-600 px-8 py-10 text-white sm:px-10">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.28),transparent_24%)]" />
                            <div className="relative z-10 flex h-full flex-col justify-between gap-10">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-2xl bg-white/16 p-3">
                                            <GiReceiveMoney className="text-3xl" />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.22em] text-sky-100">
                                                Account setup
                                            </p>
                                            <h2 className="text-3xl font-bold">Your journey starts here</h2>
                                        </div>
                                    </div>
                                    <p className="max-w-xl text-base leading-8 text-sky-50/92">
                                        Sign up once, then move through score calculation, income
                                        verification, and lending offers without changing environments.
                                    </p>
                                </div>

                                <img
                                    src={LoanImgLoginpage}
                                    alt="Signup preview"
                                    className="w-full rounded-[28px] border border-white/20 shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
