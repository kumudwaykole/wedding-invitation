import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function HeroSection() {
    return (
        <section
            className="min-h-screen flex flex-col items-center justify-center px-7 py-[60px] relative overflow-hidden"
            style={{ background: 'linear-gradient(180deg,#fdf8f0 0%,#faf3e0 55%,#fdf8f0 100%)' }}
        >
            {/* Outer glow orb */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 2.5, ease: 'easeOut' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full pointer-events-none z-0"
                style={{ background: 'radial-gradient(circle,rgba(255,253,200,0.95) 0%,rgba(255,248,168,0.65) 35%,rgba(253,248,240,0.18) 70%,transparent 85%)' }}
            />
            {/* Inner glow orb */}
            <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: [0.6, 1.08, 1], opacity: 1 }}
                transition={{ duration: 3.2, ease: 'easeOut' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] rounded-full blur-[22px] pointer-events-none z-0"
                style={{ background: 'radial-gradient(circle,rgba(255,255,220,1) 0%,rgba(255,252,180,0.85) 45%,transparent 78%)' }}
            />

            {/* Content */}
            <div className="relative z-[1] text-center max-w-[360px] w-full">

                {/* Ek Onkar */}
                <motion.div
                    {...fadeUp(0.3)}
                    className="text-[42px] text-gold mb-[18px]"
                    style={{ filter: 'drop-shadow(0 2px 8px rgba(201,168,76,0.4))' }}
                >
                    ੴ
                </motion.div>

                {/* Quote */}
                <motion.blockquote
                    {...fadeUp(0.5)}
                    className="font-serif italic text-[13px] text-brown-light leading-[1.75] mb-1 px-2"
                >
                    "They alone are called husband and wife, who have one soul in two bodies."
                </motion.blockquote>
                <motion.cite
                    {...fadeUp(0.7)}
                    className="font-serif not-italic text-[11px] text-gold-dark tracking-[1px] block mb-9"
                >
                    — Guru Nanak Dev Ji
                </motion.cite>

                {/* Gold rule */}
                <motion.div {...fadeUp(0.9)} className="flex items-center gap-2.5 mb-7">
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right,transparent,#c9a84c)' }} />
                    <span className="text-gold text-[13px]">✦</span>
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left,transparent,#c9a84c)' }} />
                </motion.div>

                {/* Groom */}
                <motion.h1
                    {...fadeUp(1.0)}
                    className="font-script text-[70px] text-brown leading-[1.05] mb-0.5"
                    style={{ filter: 'drop-shadow(0 2px 10px rgba(201,168,76,0.18))' }}
                >
                    Tanmay
                </motion.h1>
                <motion.p
                    {...fadeUp(1.15)}
                    className="font-body text-[10px] tracking-[3px] text-brown-muted uppercase mb-[18px]"
                >
                    Son of Mr. &amp; Mrs. Sharma
                </motion.p>

                {/* Ampersand */}
                <motion.div {...fadeUp(1.25)} className="font-script text-[52px] text-forest leading-none my-1.5">
                    &amp;
                </motion.div>

                {/* Bride */}
                <motion.h1
                    {...fadeUp(1.35)}
                    className="font-script text-[70px] text-brown leading-[1.05] mb-0.5"
                    style={{ filter: 'drop-shadow(0 2px 10px rgba(201,168,76,0.18))' }}
                >
                    Tanya
                </motion.h1>
                <motion.p
                    {...fadeUp(1.5)}
                    className="font-body text-[10px] tracking-[3px] text-brown-muted uppercase mb-11"
                >
                    Daughter of Mr. &amp; Mrs. Singh
                </motion.p>

                {/* Scroll hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.4 }}
                    className="flex flex-col items-center gap-[5px]"
                >
                    <span className="font-body text-[9px] tracking-[3px] text-gold-dark uppercase">
                        Scroll to Reveal
                    </span>
                    <motion.span
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity }}
                        className="text-gold text-xl"
                    >
                        ↓
                    </motion.span>
                </motion.div>
            </div>
        </section>
    );
}
