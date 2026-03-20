import { useContext, useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import { MdPendingActions, MdVerified, MdClose, MdOutlineDescription, MdPayments } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
import PageTransition from "../components/PageTransition";
import SectionIntro from "../components/SectionIntro";
import api from "../utils/api";

export default function AdminDashboard() {
    const { user } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState("income");
    const [incomeRequests, setIncomeRequests] = useState([]);
    const [loanRequests, setLoanRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [incomeRes, loanRes] = await Promise.all([
                    api.get("/admin/pending-income"),
                    api.get("/admin/pending-loans"),
                ]);

                setIncomeRequests(incomeRes.data.requests || []);
                setLoanRequests(loanRes.data.requests || []);
            } catch (error) {
                console.error("Error fetching admin data:", error);
                alert("Failed to load admin data. Please refresh the page.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleIncomeAction = async (requestId, action, note = "") => {
        try {
            await api.put(`/admin/income-${action}/${requestId}`, { adminNote: note });
            setIncomeRequests((previous) => previous.filter((item) => item._id !== requestId));
        } catch (error) {
            alert(error.response?.data?.msg || "Action failed");
        }
    };

    const handleLoanAction = async (requestId, action, note = "") => {
        try {
            await api.put(`/admin/loan-${action}/${requestId}`, { adminNote: note });
            setLoanRequests((previous) => previous.filter((item) => item._id !== requestId));
        } catch (error) {
            alert(error.response?.data?.msg || "Action failed");
        }
    };

    if (loading) {
        return (
            <div className="page-wrap flex min-h-[70vh] items-center justify-center">
                <div className="section-card text-center">
                    <p className="text-lg font-semibold text-slate-700">Loading admin dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <PageTransition className="page-wrap">
            <div className="page-container space-y-8 pb-8">
                <section className="glass-panel overflow-hidden p-8 sm:p-10">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                        <SectionIntro
                            eyebrow="Operations workspace"
                            title="Admin review panel for income and loan decisions"
                            description="The frontend now uses the shared API client here too, so admin actions follow the same backend base path and auth behavior as the rest of the app."
                        />
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="stat-card">
                                <p className="text-sm text-slate-500">Pending income reviews</p>
                                <p className="mt-2 text-4xl font-extrabold text-slate-900">
                                    {incomeRequests.length}
                                </p>
                            </div>
                            <div className="stat-card">
                                <p className="text-sm text-slate-500">Pending loan reviews</p>
                                <p className="mt-2 text-4xl font-extrabold text-slate-900">
                                    {loanRequests.length}
                                </p>
                            </div>
                        </div>
                    </div>

                    {user && (
                        <div className="mt-6 flex items-center gap-3 text-sm text-slate-500">
                            <MdPendingActions className="text-xl text-sky-600" />
                            Signed in as <span className="font-semibold text-slate-700">{user.name}</span>
                        </div>
                    )}
                </section>

                <section className="section-card">
                    <div className="flex flex-wrap gap-3">
                        {[
                            {
                                id: "income",
                                label: `Income Verification (${incomeRequests.length})`,
                                icon: MdOutlineDescription,
                            },
                            {
                                id: "loans",
                                label: `Loan Requests (${loanRequests.length})`,
                                icon: MdPayments,
                            },
                        ].map((tab) => {
                            const Icon = tab.icon;
                            const active = activeTab === tab.id;

                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${
                                        active
                                            ? "bg-slate-950 text-white shadow-lg"
                                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                    }`}
                                >
                                    <Icon className="text-lg" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </section>

                {activeTab === "income" && (
                    <Motion.section
                        key="income"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="section-card overflow-x-auto"
                    >
                        <SectionIntro
                            eyebrow="Income queue"
                            title="Review bank proof and verification details"
                            description="Approve verified profiles quickly or add a rejection note when something needs to be resubmitted."
                        />
                        <table className="data-table">
                            <thead className="border-b border-slate-100">
                                <tr>
                                    <th>User</th>
                                    <th>CrediScore</th>
                                    <th>Monthly income</th>
                                    <th>Proof</th>
                                    <th>Submitted</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {incomeRequests.map((request) => (
                                    <tr key={request._id} className="hover:bg-slate-50/80">
                                        <td>
                                            <div className="font-semibold text-slate-900">
                                                {request.user?.name || "Unknown user"}
                                            </div>
                                            <div className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">
                                                {request.income?.pan || "No PAN"}
                                            </div>
                                        </td>
                                        <td>{request.user?.crediScore ?? 0}</td>
                                        <td>
                                            Rs {request.income?.monthlyIncome?.toLocaleString() || "N/A"}
                                        </td>
                                        <td>
                                            {request.income?.proofFilename ? (
                                                <a
                                                    href={`/api/admin/view-proof/${request.income._id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="font-semibold text-sky-700 hover:underline"
                                                >
                                                    {request.income.proofFilename}
                                                </a>
                                            ) : (
                                                <span className="text-slate-400">No file</span>
                                            )}
                                        </td>
                                        <td>{new Date(request.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <div className="flex flex-wrap gap-2">
                                                <button
                                                    onClick={() => handleIncomeAction(request._id, "approve")}
                                                    className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 font-semibold text-emerald-700 transition hover:bg-emerald-200"
                                                >
                                                    <MdVerified />
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        const note = prompt("Reason for rejection (optional):");
                                                        handleIncomeAction(request._id, "reject", note || "");
                                                    }}
                                                    className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-2 font-semibold text-rose-700 transition hover:bg-rose-200"
                                                >
                                                    <MdClose />
                                                    Reject
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {incomeRequests.length === 0 && (
                            <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50/70 p-10 text-center text-slate-500">
                                No pending income verification requests.
                            </div>
                        )}
                    </Motion.section>
                )}

                {activeTab === "loans" && (
                    <Motion.section
                        key="loans"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="section-card overflow-x-auto"
                    >
                        <SectionIntro
                            eyebrow="Loan queue"
                            title="Approve or reject loan applications"
                            description="The table layout is more readable on wide screens and still scrolls cleanly on smaller ones."
                        />
                        <table className="data-table">
                            <thead className="border-b border-slate-100">
                                <tr>
                                    <th>User</th>
                                    <th>Loan type</th>
                                    <th>Requested amount</th>
                                    <th>Tenure</th>
                                    <th>Interest</th>
                                    <th>Submitted</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loanRequests.map((request) => (
                                    <tr key={request._id} className="hover:bg-slate-50/80">
                                        <td>
                                            <div className="font-semibold text-slate-900">
                                                {request.user?.name || "Unknown user"}
                                            </div>
                                            <div className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">
                                                {request.user?.phone || "No phone"}
                                            </div>
                                        </td>
                                        <td>{request.loanType}</td>
                                        <td>Rs {request.requestedAmount?.toLocaleString() || "N/A"}</td>
                                        <td>{request.tenure} months</td>
                                        <td>{request.interestRate}%</td>
                                        <td>{new Date(request.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <div className="flex flex-wrap gap-2">
                                                <button
                                                    onClick={() => handleLoanAction(request._id, "approve")}
                                                    className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 font-semibold text-emerald-700 transition hover:bg-emerald-200"
                                                >
                                                    <MdVerified />
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        const note = prompt("Reason for rejection (optional):");
                                                        handleLoanAction(request._id, "reject", note || "");
                                                    }}
                                                    className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-2 font-semibold text-rose-700 transition hover:bg-rose-200"
                                                >
                                                    <MdClose />
                                                    Reject
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {loanRequests.length === 0 && (
                            <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50/70 p-10 text-center text-slate-500">
                                No pending loan requests.
                            </div>
                        )}
                    </Motion.section>
                )}
            </div>
        </PageTransition>
    );
}
