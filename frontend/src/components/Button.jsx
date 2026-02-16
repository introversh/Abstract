import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Button = ({ onClick, disabled, children, className = "" }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            disabled={disabled}
            className={`
        relative px-8 py-3 rounded-lg font-medium text-white
        bg-gradient-to-r from-primary to-indigo-600
        disabled:opacity-50 disabled:cursor-not-allowed
        shadow-glow transition-all duration-300
        flex items-center justify-center gap-2
        ${className}
      `}
        >
            {disabled && <Loader2 className="w-4 h-4 animate-spin" />}
            {children}
        </motion.button>
    );
};

export default Button;
