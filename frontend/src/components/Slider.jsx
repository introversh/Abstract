import { motion } from 'framer-motion';

const Slider = ({ value, onChange, min = 50, max = 300 }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-md mx-auto my-8 px-4"
        >
            <div className="flex justify-between items-center mb-4">
                <label className="text-muted text-sm font-medium tracking-wide">Summary Length</label>
                <span className="text-primary font-mono text-sm bg-primary/10 px-2 py-1 rounded">{value} words</span>
            </div>

            <div className="relative h-2 bg-white/10 rounded-full">
                <motion.div
                    className="absolute h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                    style={{ width: `${((value - min) / (max - min)) * 100}%` }}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    step="10"
                    value={value}
                    onChange={(e) => onChange(parseInt(e.target.value))}
                    className="
            absolute w-full h-full opacity-0 cursor-pointer z-10
          "
                />
                <motion.div
                    className="absolute top-1/2 -mt-2 w-4 h-4 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] pointer-events-none"
                    style={{ left: `calc(${((value - min) / (max - min)) * 100}% - 8px)` }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />
            </div>
        </motion.div>
    );
};

export default Slider;
