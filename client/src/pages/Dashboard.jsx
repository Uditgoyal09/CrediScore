import { useContext, useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router";
import { GiReceiveMoney, GiTrophy } from "react-icons/gi";
import { FaArrowTrendUp } from "react-icons/fa6";
import {
    MdAccountBalanceWallet,
    MdArrowForward,
    MdCancel,
    MdCheckCircle,
    MdCreditScore,
    MdError,
    MdHourglassTop,
    MdInsights,
    MdPayments,
    MdReceiptLong,
    MdRocketLaunch,
    MdShield,
    MdVerified,
    MdWarning,
} from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";
import PageTransition from "../components/PageTransition";
import SectionIntro from "../components/SectionIntro";

export default function Dashboard() {
    const { user } = useContext(AuthContext);
    const [loanRequests, setLoanRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let ignore = false;

        if (!user) {
            navigate("/", { replace: true });
            return undefined;
        }

        if (user.role === "admin") {
            navigate("/admin");
            return undefined;
        }

        const fetchLoanRequests = async () => {
            try {
                const res = await api.get("/loans/my-requests");
                if (!ignore) setLoanRequests(res.data || []);
            } catch (err) {
                console.error("Error fetching loans:", err);
            }
        };

        fetchLoanRequests();

        return () => {
            ignore = true;
        };
    }, [user, navigate]);

    if (!user) return null;

    const crediScore = user.crediScore || 0;
    const hasCreditScore = crediScore > 0;
    const verificationStatus = user.verificationStatus || "not-started";

    const formatCurrency = (amount) => {
        if (!amount) return "Rs 0";
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const getScoreColor = () => {
        if (crediScore >= 750) return "from-emerald-500 via-green-500 to-teal-600";
        if (crediScore >= 700) return "from-cyan-500 via-sky-500 to-blue-600";
        if (crediScore >= 650) return "from-blue-500 via-indigo-500 to-cyan-600";
        if (crediScore >= 600) return "from-amber-500 via-orange-500 to-yellow-500";
        return "from-slate-500 via-slate-600 to-slate-700";
    };

    const getScoreLabel = () => {
        if (crediScore >= 750) return "Excellent";
        if (crediScore >= 700) return "Very Good";
        if (crediScore >= 650) return "Good";
        if (crediScore >= 600) return "Fair";
        return "Build Your Score";
    };

    const getStatusBadge = (status) => {
        switch (status?.toLowerCase()) {
            case "approved":
                return <div className="rounded-full border border-emerald-200 bg-emerald-100 px-4 py-2 font-bold text-emerald-700"><span className="inline-flex items-center gap-2"><MdCheckCircle /> Approved</span></div>;
            case "rejected":
                return <div className="rounded-full border border-rose-200 bg-rose-100 px-4 py-2 font-bold text-rose-700"><span className="inline-flex items-center gap-2"><MdCancel /> Rejected</span></div>;
            default:
                return <div className="rounded-full border border-amber-200 bg-amber-100 px-4 py-2 font-bold text-amber-700"><span className="inline-flex items-center gap-2"><MdHourglassTop className="animate-pulse" /> Pending</span></div>;
        }
    };

    const quickActions = hasCreditScore
        ? [
            { title: "Explore Loans", text: "Check loan products matched to your score.", to: "/loans", icon: MdPayments },
            { title: "Verify Income", text: "Strengthen your profile with verified proof.", to: "/verify-income", icon: MdVerified },
            { title: "Use EMI Tools", text: "Estimate repayments before applying.", to: "/tools", icon: MdInsights },
        ]
        : [
            { title: "Complete Profile", text: "Generate your first income-based score.", to: "/credit-form", icon: MdRocketLaunch },
            { title: "Understand Scoring", text: "See what improves your CrediScore.", to: "/credit-form", icon: MdCreditScore },
            { title: "Stay Protected", text: "Your KYC and data follow a secure flow.", to: "/credit-form", icon: MdShield },
        ];

    const readinessCards = hasCreditScore
        ? [
            { label: "Profile Strength", value: getScoreLabel(), text: "Your dashboard shows how strong your current lending profile looks." },
            { label: "Verification", value: verificationStatus === "approved" ? "Verified" : "In progress", text: "Verified profiles usually unlock better trust and offers." },
            { label: "Best Next Step", value: verificationStatus === "approved" ? "Apply Now" : "Verify Income", text: "The page now highlights the most useful next action." },
        ]
        : [
            { label: "Time Needed", value: "3 min", text: "The first form is short and mobile-friendly." },
            { label: "Documents", value: "Basic only", text: "Start with profile data first, then verify later." },
            { label: "What You Unlock", value: "Score + offers", text: "A complete profile turns this into a real dashboard." },
        ];

    const onboardingSteps = [
        { title: "Create your score", text: "Add income, expense, and work details.", done: hasCreditScore },
        { title: "Verify income", text: "Upload proof to unlock stronger confidence.", done: verificationStatus === "approved" },
        { title: "Apply smartly", text: "Move ahead only when your profile is ready.", done: loanRequests.length > 0 },
    ];

    const verificationPanel = (() => {
        if (verificationStatus === "pending") {
            return {
                tone: "border-amber-200 bg-amber-50",
                icon: <MdWarning className="text-5xl text-amber-600" />,
                title: "Income verification pending",
                text: "Your documents are under review. We will update the dashboard once they are checked.",
                action: null,
            };
        }
        if (verificationStatus === "approved") {
            return {
                tone: "border-emerald-200 bg-emerald-50",
                icon: <MdVerified className="text-5xl text-emerald-600" />,
                title: "Income verified successfully",
                text: "Your profile is ready for stronger loan offers and better limits.",
                action: null,
            };
        }
        if (verificationStatus === "rejected") {
            return {
                tone: "border-rose-200 bg-rose-50",
                icon: <MdError className="text-5xl text-rose-600" />,
                title: "Verification needs attention",
                text: "Some submitted details could not be approved. Update and resubmit them.",
                action: { to: "/verify-income", label: "Re-submit verification" },
            };
        }
        return {
            tone: "border-orange-200 bg-orange-50",
            icon: <MdWarning className="text-5xl text-orange-600" />,
            title: "Complete income verification",
            text: "Verify your income to unlock better approval strength and higher limits.",
            action: { to: "/verify-income", label: "Verify income now" },
        };
    })();

    return (
        <PageTransition className="page-wrap">
            <div className="page-container space-y-8 pb-8">
                {hasCreditScore ? (
                    <>
                        <Motion.section
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`relative overflow-hidden rounded-[34px] bg-linear-to-r ${getScoreColor()} p-8 text-white shadow-[0_30px_90px_rgba(15,23,42,0.22)] sm:p-10`}
                        >
                            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                                <div className="max-w-3xl space-y-4">
                                    <span className="eyebrow border-white/20 bg-white/12 text-white">Your live lending dashboard</span>
                                    <p className="text-sm uppercase tracking-[0.24em] text-white/70">Current CrediScore</p>
                                    <div className="flex items-end gap-4">
                                        <h1 className="text-6xl font-extrabold sm:text-7xl">{crediScore}</h1>
                                        <span className="pb-3 text-xl font-semibold text-white/80">{getScoreLabel()}</span>
                                    </div>
                                    <p className="max-w-2xl text-base leading-8 text-white/85 sm:text-lg">
                                        Welcome back, {user.name}. Your dashboard now surfaces score strength,
                                        verification state, application activity, and useful next actions.
                                    </p>
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2 lg:w-[360px]">
                                    <div className="rounded-[26px] border border-white/20 bg-white/12 p-5 backdrop-blur-sm">
                                        <p className="text-sm text-white/70">Remaining limit</p>
                                        <p className="mt-2 text-3xl font-bold">{formatCurrency(user.remainingLimit || 0)}</p>
                                    </div>
                                    <div className="rounded-[26px] border border-white/20 bg-white/12 p-5 backdrop-blur-sm">
                                        <p className="text-sm text-white/70">Applications</p>
                                        <p className="mt-2 text-3xl font-bold">{loanRequests.length}</p>
                                    </div>
                                    <div className="rounded-[26px] border border-white/20 bg-white/12 p-5 backdrop-blur-sm sm:col-span-2">
                                        <div className="flex items-center gap-3">
                                            <GiTrophy className="text-4xl text-amber-200" />
                                            <div>
                                                <p className="text-sm text-white/70">Status</p>
                                                <p className="text-xl font-bold">{verificationStatus === "approved" ? "Income verified" : "Profile still improving"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Motion.section>

                        <section className={`section-card border ${verificationPanel.tone}`}>
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                                <div className="flex items-start gap-4">
                                    {verificationPanel.icon}
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900">{verificationPanel.title}</h2>
                                        <p className="mt-2 max-w-2xl text-base leading-7 text-slate-600">{verificationPanel.text}</p>
                                    </div>
                                </div>
                                {verificationPanel.action && (
                                    <NavLink to={verificationPanel.action.to} className="primary-button px-6 py-3">
                                        {verificationPanel.action.label}
                                        <MdArrowForward className="text-xl" />
                                    </NavLink>
                                )}
                            </div>
                        </section>

                        <section className="grid gap-6 md:grid-cols-3">
                            {[
                                { title: "Total Credit Limit", value: formatCurrency(user.creditLimit || 0), icon: MdAccountBalanceWallet, tone: "text-sky-600" },
                                { title: "Remaining Limit", value: formatCurrency(user.remainingLimit || 0), icon: FaArrowTrendUp, tone: "text-emerald-600" },
                                { title: "Loan Requests", value: `${loanRequests.length}`, icon: MdReceiptLong, tone: "text-indigo-600" },
                            ].map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div key={item.title} className="stat-card">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{item.title}</p>
                                                <p className="mt-3 text-4xl font-extrabold text-slate-900">{item.value}</p>
                                            </div>
                                            <div className={`rounded-2xl bg-slate-50 p-4 ${item.tone}`}>
                                                <Icon className="text-4xl" />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </section>
                    </>
                ) : (
                    <>
                        <section className="relative overflow-hidden rounded-[34px] border border-white/60 bg-white/85 p-8 shadow-[0_30px_90px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:p-10">
                            <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
                                <div className="space-y-6">
                                    <span className="eyebrow">Start your score journey</span>
                                    <div className="space-y-4">
                                        <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
                                            Unlock your CrediScore with a dashboard that actually guides you
                                        </h1>
                                        <p className="max-w-2xl text-lg leading-8 text-slate-600">
                                            I replaced the plain empty state with a richer hero, quick value
                                            cards, and a clearer first step so the dashboard feels like a real product page.
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-4 sm:flex-row">
                                        <NavLink to="/credit-form" className="primary-button px-8 py-4 text-base">
                                            Complete credit profile
                                            <MdArrowForward className="text-xl" />
                                        </NavLink>
                                        <NavLink to="/tools" className="secondary-button px-8 py-4 text-base">
                                            Explore EMI tools
                                        </NavLink>
                                    </div>
                                    <div className="grid gap-4 sm:grid-cols-3">
                                        {readinessCards.map((card) => (
                                            <div key={card.label} className="rounded-[24px] border border-slate-100 bg-slate-50/80 p-5">
                                                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{card.label}</p>
                                                <p className="mt-2 text-2xl font-bold text-slate-900">{card.value}</p>
                                                <p className="mt-2 text-sm leading-7 text-slate-600">{card.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="glass-panel p-6">
                                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[28px] bg-linear-to-br from-sky-500 to-emerald-500 text-white shadow-xl">
                                        <MdCreditScore className="text-5xl" />
                                    </div>
                                    <div className="mt-6 text-center">
                                        <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Profile progress</p>
                                        <h2 className="mt-2 text-3xl font-extrabold text-slate-900">1 strong step away</h2>
                                        <p className="mt-3 text-base leading-7 text-slate-600">
                                            Complete your financial profile to reveal score, eligibility, and a more useful dashboard.
                                        </p>
                                    </div>
                                    <div className="mt-8 space-y-4">
                                        {onboardingSteps.map((step, index) => (
                                            <div key={step.title} className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white/80 p-4">
                                                <div className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl font-bold ${step.done ? "bg-emerald-100 text-emerald-700" : "bg-sky-100 text-sky-700"}`}>
                                                    {step.done ? <MdCheckCircle /> : index + 1}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                                                    <p className="mt-1 text-sm leading-7 text-slate-600">{step.text}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                            <div className="section-card">
                                <SectionIntro
                                    eyebrow="Why this is better"
                                    title="A fuller first dashboard experience"
                                    description="Instead of a single large button, users now see benefits, progress, and helpful context."
                                />
                                <div className="grid gap-4 sm:grid-cols-3">
                                    {[
                                        { icon: MdRocketLaunch, title: "Faster Start", text: "The first action now feels obvious and intentional." },
                                        { icon: MdShield, title: "More Trust", text: "Security and verification value are visible upfront." },
                                        { icon: MdInsights, title: "Better Product Feel", text: "The page looks like a fintech dashboard, not a placeholder." },
                                    ].map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <div key={item.title} className="rounded-[24px] border border-slate-100 bg-slate-50/80 p-5">
                                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-sky-500 to-emerald-500 text-2xl text-white">
                                                    <Icon />
                                                </div>
                                                <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                                                <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="section-card">
                                <SectionIntro
                                    eyebrow="Quick actions"
                                    title="Useful components on the first visit"
                                    description="These cards make the dashboard feel alive even before the user has score history."
                                />
                                <div className="space-y-4">
                                    {quickActions.map((action) => {
                                        const Icon = action.icon;
                                        return (
                                            <NavLink key={action.title} to={action.to} className="group flex items-center justify-between rounded-[24px] border border-slate-100 bg-slate-50/80 p-5 transition hover:border-sky-200 hover:bg-white">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-sky-500 to-emerald-500 text-2xl text-white shadow-lg">
                                                        <Icon />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-bold text-slate-900">{action.title}</h3>
                                                        <p className="mt-1 text-sm leading-7 text-slate-600">{action.text}</p>
                                                    </div>
                                                </div>
                                                <MdArrowForward className="text-2xl text-slate-400 transition group-hover:translate-x-1 group-hover:text-sky-600" />
                                            </NavLink>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>
                    </>
                )}

                {hasCreditScore && (
                    <>
                        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                            <div className="section-card">
                                <SectionIntro
                                    eyebrow="Profile readiness"
                                    title="More components around the score"
                                    description="The dashboard now gives useful summaries instead of showing only the large score card and history table."
                                />
                                <div className="grid gap-4 sm:grid-cols-3">
                                    {readinessCards.map((card) => (
                                        <div key={card.label} className="rounded-[24px] border border-slate-100 bg-slate-50/80 p-5">
                                            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{card.label}</p>
                                            <p className="mt-2 text-2xl font-bold text-slate-900">{card.value}</p>
                                            <p className="mt-2 text-sm leading-7 text-slate-600">{card.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="section-card">
                                <SectionIntro
                                    eyebrow="Quick actions"
                                    title="Next steps from the dashboard"
                                    description="Users can now jump directly into the most relevant flows from this page."
                                />
                                <div className="space-y-4">
                                    {quickActions.map((action) => {
                                        const Icon = action.icon;
                                        return (
                                            <NavLink key={action.title} to={action.to} className="group flex items-center justify-between rounded-[24px] border border-slate-100 bg-slate-50/80 p-5 transition hover:border-sky-200 hover:bg-white">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-sky-500 to-emerald-500 text-2xl text-white shadow-lg">
                                                        <Icon />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-bold text-slate-900">{action.title}</h3>
                                                        <p className="mt-1 text-sm leading-7 text-slate-600">{action.text}</p>
                                                    </div>
                                                </div>
                                                <MdArrowForward className="text-2xl text-slate-400 transition group-hover:translate-x-1 group-hover:text-sky-600" />
                                            </NavLink>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>

                        <section className="section-card">
                            <SectionIntro
                                eyebrow="Loan history"
                                title="Your loan applications"
                                description="Applications now sit inside a richer dashboard context with cleaner spacing and status visibility."
                            />
                            {loanRequests.length > 0 ? (
                                <div className="grid gap-4">
                                    {loanRequests.map((loan) => (
                                        <div key={loan._id} className="flex flex-col gap-6 rounded-[26px] border border-slate-100 bg-slate-50/80 p-6 transition hover:border-sky-200 lg:flex-row lg:items-center lg:justify-between">
                                            <div className="flex items-center gap-5 lg:w-[28%]">
                                                <div className={`rounded-2xl p-4 ${loan.requestStatus === "rejected" ? "bg-rose-100 text-rose-600" : "bg-sky-100 text-sky-600"}`}>
                                                    <GiReceiveMoney className="text-3xl" />
                                                </div>
                                                <div className="min-w-0">
                                                    <h3 className="truncate text-xl font-bold text-slate-900">{loan.loanType}</h3>
                                                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">ID {loan._id.slice(-8).toUpperCase()}</p>
                                                </div>
                                            </div>
                                            <div className="grid flex-1 grid-cols-2 gap-6 text-sm sm:grid-cols-3">
                                                <div>
                                                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Amount</p>
                                                    <p className="mt-2 text-lg font-bold text-slate-900">{formatCurrency(loan.requestedAmount)}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Tenure</p>
                                                    <p className="mt-2 text-lg font-bold text-slate-900">{loan.tenure} months</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Interest</p>
                                                    <p className="mt-2 text-lg font-bold text-emerald-600">{loan.interestRate}%</p>
                                                </div>
                                            </div>
                                            <div className="flex lg:w-[180px] lg:justify-end">{getStatusBadge(loan.requestStatus)}</div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-[28px] border border-dashed border-slate-200 bg-slate-50/70 p-10 text-center">
                                    <MdPayments className="mx-auto mb-4 text-5xl text-slate-300" />
                                    <p className="text-xl font-semibold text-slate-700">No loan applications yet</p>
                                    <p className="mt-2 text-sm leading-7 text-slate-500">Once you start applying, your requests and statuses will appear here.</p>
                                </div>
                            )}
                        </section>
                    </>
                )}
            </div>

            <footer className="mt-6 border-t border-white/40 bg-white/70 px-6 py-6 text-center text-xs text-slate-400 backdrop-blur-sm">
                © {new Date().getFullYear()} CrediScore • Digital lending • RBI-aligned workflow
            </footer>
        </PageTransition>
    );
}
