import { motion } from 'framer-motion';

const InputArea = ({ value, onChange, placeholder }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full relative group"
        >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
            <textarea
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="
          relative w-full h-64 p-6 rounded-xl
          bg-card backdrop-blur-md border border-white/10
          text-text placeholder-muted/50
          focus:outline-none focus:ring-1 focus:ring-primary/50
          resize-none text-lg leading-relaxed
          transition-all duration-300
        "
            />
        </motion.div>
    );
};

export default InputArea;
