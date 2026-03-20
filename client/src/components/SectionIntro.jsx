import { motion as Motion } from "framer-motion";

export default function SectionIntro({ eyebrow, title, description, align = "left" }) {
    const alignment = align === "center" ? "text-center items-center" : "text-left items-start";

    return (
        <Motion.div
            className={`mb-8 flex flex-col gap-4 ${alignment}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
        >
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <div className="space-y-3">
                <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">{title}</h2>
                {description && (
                    <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                        {description}
                    </p>
                )}
            </div>
        </Motion.div>
    );
}
