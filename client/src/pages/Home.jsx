import { motion as Motion } from "framer-motion";
import { NavLink } from "react-router";
import { GiReceiveMoney } from "react-icons/gi";
import { FaCircleCheck, FaBrain } from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";
import { MdSecurity, MdSwapHoriz, MdArrowOutward } from "react-icons/md";
import LoanImgHomepage from "../assets/LoanImgHomepage.png";
import PageTransition from "../components/PageTransition";
import SectionIntro from "../components/SectionIntro";

const features = [
    { title: "Easy apply", icon: FaCircleCheck },
    { title: "Paperless review", icon: FaFileAlt },
    { title: "Up to Rs 5 lakh", icon: GiReceiveMoney },
    { title: "Protected data", icon: MdSecurity },
    { title: "Direct transfer", icon: MdSwapHoriz },
    { title: "Fair AI scoring", icon: FaBrain },
];

const steps = [
    "Enter your basic income details and get an instant score.",
    "If you qualify, continue with your loan request and document upload.",
    "Our team verifies your income and disburses eligible loans quickly.",
];

export default function Home() {
    return (
        <PageTransition className="page-wrap pb-0 pt-4">
            <div className="page-container">
                <nav className="glass-panel mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6">
                    <div className="flex items-center gap-3">
                        <div className="animate-float rounded-2xl bg-linear-to-br from-sky-500 to-emerald-500 p-3 text-white shadow-lg">
                            <GiReceiveMoney className="text-2xl" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                                Real income lending
                            </p>
                            <h1 className="text-2xl font-bold text-gradient">CrediScore</h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <NavLink to="/login" className="secondary-button hidden sm:inline-flex">
                            Login
                        </NavLink>
                        <NavLink to="/signup" className="primary-button">
                            Get Started
                        </NavLink>
                    </div>
                </nav>

                <section className="relative overflow-hidden px-2 py-10 sm:py-14">
                    <div className="absolute inset-x-12 top-10 -z-10 h-72 rounded-full bg-sky-200/40 blur-3xl" />
                    <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                        <div className="space-y-8">
                            <Motion.div
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.55 }}
                                className="space-y-6"
                            >
                                <span className="eyebrow">Built for salaried and gig workers</span>
                                <div className="space-y-5">
                                    <h2 className="hero-title max-w-3xl">
                                        Instant loan decisions powered by your{" "}
                                        <span className="text-gradient">real monthly cash flow</span>
                                    </h2>
                                    <p className="hero-text max-w-2xl">
                                        CrediScore replaces old-school credit bias with verified
                                        earnings, practical risk signals, and a faster path from
                                        profile to payout.
                                    </p>
                                </div>
                            </Motion.div>

                            <div className="flex flex-col gap-4 sm:flex-row">
                                <NavLink to="/signup" className="primary-button px-7 py-4 text-base">
                                    Check Eligibility
                                    <MdArrowOutward className="text-xl" />
                                </NavLink>
                                <NavLink to="/login" className="secondary-button px-7 py-4 text-base">
                                    Open Dashboard
                                </NavLink>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-3">
                                {[
                                    { value: "< 5 min", label: "Average decision time" },
                                    { value: "100%", label: "Digital verification flow" },
                                    { value: "24/7", label: "Application availability" },
                                ].map((item) => (
                                    <div key={item.label} className="stat-card">
                                        <p className="text-3xl font-extrabold text-slate-900">
                                            {item.value}
                                        </p>
                                        <p className="mt-2 text-sm text-slate-500">{item.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="relative"
                        >
                            <div className="glass-panel animate-float-delayed relative overflow-hidden p-4 sm:p-6">
                                <div
                                    className="absolute inset-0 opacity-50 animate-grid-pan"
                                    style={{
                                        backgroundImage:
                                            "linear-gradient(rgba(14,165,233,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.08) 1px, transparent 1px)",
                                        backgroundSize: "28px 28px",
                                    }}
                                />
                                <img
                                    src={LoanImgHomepage}
                                    alt="CrediScore dashboard preview"
                                    className="relative z-10 w-full rounded-[26px] border border-white/70 shadow-2xl"
                                />
                                <div className="absolute bottom-7 left-7 z-10 rounded-2xl bg-slate-950/88 px-5 py-4 text-white shadow-xl">
                                    <p className="text-xs uppercase tracking-[0.22em] text-emerald-300">
                                        Eligibility preview
                                    </p>
                                    <p className="mt-1 text-3xl font-bold">742</p>
                                    <p className="mt-1 text-sm text-slate-300">
                                        Strong repayment outlook after income verification
                                    </p>
                                </div>
                            </div>
                        </Motion.div>
                    </div>
                </section>

                <section className="grid gap-6 py-6 lg:grid-cols-[0.95fr_1.05fr]">
                    <div className="section-card">
                        <SectionIntro
                            eyebrow="How it works"
                            title="Designed to tell users early if they actually qualify"
                            description="We guide users through the score, verification, and disbursal journey without pushing them into dead-end applications."
                        />
                        <div className="space-y-4">
                            {steps.map((step, index) => (
                                <Motion.div
                                    key={step}
                                    initial={{ opacity: 0, y: 14 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.35, delay: index * 0.08 }}
                                    className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4"
                                >
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-sky-500 to-emerald-500 font-bold text-white">
                                        {index + 1}
                                    </div>
                                    <p className="text-sm leading-7 text-slate-600 sm:text-base">
                                        {step}
                                    </p>
                                </Motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="section-card">
                        <SectionIntro
                            eyebrow="Why it lands better"
                            title="A scoring engine built around evidence, not assumptions"
                            description="Income signals, affordability, and repayment capacity are surfaced clearly so the experience stays fast for users and practical for lenders."
                        />
                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                "Salary credits and recurring inflows are prioritised.",
                                "Freelance and irregular income can still count positively.",
                                "Applications remain fully online from start to finish.",
                                "Verified users unlock stronger limits and better offers.",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="rounded-2xl border border-sky-100 bg-sky-50/70 p-5 text-sm leading-7 text-slate-700"
                                >
                                    <FaCircleCheck className="mb-3 text-lg text-emerald-500" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-8">
                    <SectionIntro
                        eyebrow="Feature stack"
                        title="Sharper product presentation without losing clarity"
                        description="The experience is intentionally modern but still easy to scan on mobile and desktop."
                        align="center"
                    />
                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <Motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 18 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.25 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    className="feature-card"
                                >
                                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-sky-500 to-emerald-500 text-2xl text-white shadow-lg">
                                        <Icon />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900">
                                        {feature.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-7 text-slate-600">
                                        Purposeful automation, fast state changes, and a more
                                        trustworthy lending flow for first-time borrowers.
                                    </p>
                                </Motion.div>
                            );
                        })}
                    </div>
                </section>

                <section className="py-10">
                    <div className="glass-panel overflow-hidden px-6 py-10 text-center sm:px-10">
                        <span className="eyebrow">Ready to launch</span>
                        <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold text-slate-900 sm:text-5xl">
                            Turn verified income into a stronger approval experience
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                            Start with account creation, calculate a live score, then move into
                            verified lending when the profile is ready.
                        </p>
                        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                            <NavLink to="/signup" className="primary-button px-8 py-4 text-base">
                                Apply Now
                            </NavLink>
                            <NavLink to="/login" className="secondary-button px-8 py-4 text-base">
                                Login
                            </NavLink>
                        </div>
                    </div>
                </section>
            </div>

            <footer className="border-t border-white/40 px-6 py-10 text-center text-sm text-slate-500">
                <p>© {new Date().getFullYear()} CrediScore. Income-first digital lending.</p>
                <p className="mt-2">Built for responsive verification, better UX, and faster decisions.</p>
            </footer>
        </PageTransition>
    );
}
