import { motion, AnimatePresence } from 'framer-motion';

const OutputArea = ({ value }) => {
    return (
        <AnimatePresence mode="wait">
            {value && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="w-full relative mt-8 group"
                >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary to-primary rounded-xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
                    <div className="relative w-full p-8 rounded-xl bg-card/80 backdrop-blur-md border border-white/10">
                        <h3 className="text-secondary font-medium mb-4 text-sm tracking-widest uppercase">Summary</h3>
                        <p className="text-text text-lg leading-relaxed">
                            {value}
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default OutputArea;
