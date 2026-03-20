import { motion as Motion } from "framer-motion";

const transition = { duration: 0.55, ease: [0.22, 1, 0.36, 1] };

export default function PageTransition({ children, className = "" }) {
    return (
        <Motion.div
            className={className}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
        >
            {children}
        </Motion.div>
    );
}
