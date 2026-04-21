import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function WelcomeSection() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.18 });

    return (
        <section
            ref={ref}
            className="min-h-[92vh] flex flex-col items-center justify-center pt-20 pb-[60px] px-7 relative overflow-hidden text-center"
            style={{ background: 'linear-gradient(180deg,#f7f3ea 0%,#2e2010 100%)' }}
        >
            {/* Gold dust */}
            {Array.from({ length: 22 }).map((_, i) => (
                <motion.div
                    key={i}
                    animate={{ y: [0, -18, 0], opacity: [0.15, 0.7, 0.15] }}
                    transition={{ duration: 3 + i * 0.35, repeat: Infinity, delay: i * 0.28 }}
                    className="absolute w-[3px] h-[3px] rounded-full bg-gold pointer-events-none"
                    style={{
                        top: `${4 + (i * 4.4) % 92}%`,
                        left: `${3 + (i * 4.3) % 94}%`,
                    }}
                />
            ))}

            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
                className="text-[58px] mb-[22px]"
            >
                🌸
            </motion.div>

            <div className="max-w-[340px] relative z-[1]">
                <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="font-body text-[9px] tracking-[4px] uppercase text-gold-dark mb-2.5"
                >
                    With heartfelt love
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 18 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="font-script text-[56px] text-brown leading-[1.05] mb-[18px]"
                >
                    Welcome
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="font-serif italic text-[16px] text-brown-mid leading-[1.8] mb-7"
                >
                    The Kothari Family cordially invites you to join us in celebrating this beautiful union of two souls, two families, and one love.
                </motion.p>

                {/* Rule */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.9, delay: 0.6 }}
                    className="h-px my-[22px]"
                    style={{ background: 'linear-gradient(to right,transparent,#c9a84c,transparent)' }}
                />

                {/* Family name */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.7 }}
                >
                    <p className="font-display text-[23px] font-bold italic text-brown tracking-[1px] mb-1">
                        Kothari Family
                    </p>
                    <p className="font-body text-[10px] tracking-[2px] uppercase text-brown-muted">invites you</p>
                </motion.div>

                {/* Names box */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.9, delay: 0.9 }}
                    className="my-7 py-7 px-6 rounded-2xl"
                    style={{
                        background: 'linear-gradient(135deg,rgba(201,168,76,0.09),rgba(201,168,76,0.03))',
                        border: '1px solid rgba(201,168,76,0.22)',
                    }}
                >
                    <p className="font-script text-[74px] text-brown leading-none mb-1">Tanmay</p>
                    <p className="font-script text-[38px] text-forest leading-none my-1">&amp;</p>
                    <p className="font-script text-[74px] text-brown leading-none">Tanya</p>
                </motion.div>

                {/* Date stamp */}
                <motion.div
                    initial={{ opacity: 0, rotate: -3 }}
                    animate={inView ? { opacity: 1, rotate: -3 } : {}}
                    transition={{ duration: 0.7, delay: 1.1 }}
                    className="w-28 h-28 rounded-full flex flex-col items-center justify-center mx-auto"
                    style={{
                        background: 'rgba(201,168,76,0.1)',
                        border: '2px solid rgba(201,168,76,0.38)',
                    }}
                >
                    <span className="font-body text-[22px] font-bold text-brown leading-none">30</span>
                    <span className="font-script text-[22px] text-gold leading-[1.1]">May</span>
                    <span className="font-body text-[13px] text-brown-mid font-semibold leading-[1.3]">2026</span>
                    <span className="font-body text-[7px] tracking-[1px] text-brown-muted uppercase">Jalgaon</span>
                </motion.div>

                {/* Closing */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.7, delay: 1.3 }}
                    className="mt-9 font-serif italic text-[13px] text-brown-muted leading-[1.75]"
                >
                    Your presence, blessings and good wishes<br />will make this occasion truly special.
                </motion.p>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.7, delay: 1.5 }}
                    className="mt-9 pt-[18px]"
                    style={{ borderTop: '1px solid rgba(201,168,76,0.2)' }}
                >
                    <p className="text-gold text-[22px] mb-2">✦</p>
                    <p className="font-body text-[9px] tracking-[3px] text-gold-dark uppercase">With love &amp; joy</p>
                </motion.div>
            </div>
        </section>
    );
}
