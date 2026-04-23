import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&display=swap');
  .wl-cinzel     { font-family: 'Cinzel', serif; letter-spacing: 0.06em; }
  .wl-cormorant  { font-family: 'Cormorant Garamond', serif; }
`;

/* ── Floating gold petals ── */
function GoldPetal({ index }) {
    const left = 4 + (index * 9.3) % 92;
    const dur = 6 + (index * 0.7) % 5;
    const delay = (index * 0.6) % 7;
    return (
        <motion.div
            className="absolute top-0 pointer-events-none z-0"
            style={{ left: `${left}%` }}
            animate={{ y: ['0vh', '105vh'], opacity: [0, 0.7, 0.7, 0], rotate: [0, 180, 360] }}
            transition={{ duration: dur, repeat: Infinity, delay, ease: 'linear' }}
        >
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
                <path d="M7 1C2 5 1 10 3.5 14C5 16.5 9.5 17 11 14C13.5 10.5 13 4 7 1Z" fill="#c9a84c" opacity="0.55" />
            </svg>
        </motion.div>
    );
}

/* ── Animated gold divider ── */
function GoldDivider({ delay = 0 }) {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
    return (
        <motion.div
            ref={ref}
            className="flex items-center gap-3 w-full max-w-55 mx-auto"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right,transparent,#c9a84c)' }} />
            <span style={{ color: '#c9a84c', fontSize: 10 }}>✦</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left,transparent,#c9a84c)' }} />
        </motion.div>
    );
}

export default function WelcomeSection() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <>
            <style>{fontStyle}</style>
            <section
                ref={ref}
                className="relative overflow-hidden flex flex-col items-center justify-center px-7 pt-5 pb-14 text-center"
                style={{ background: 'linear-gradient(180deg,#fdf8f0 0%,#faf3e0 40%,#fdf8f0 100%)' }}
            >
                {/* Falling gold petals */}
                {Array.from({ length: 16 }).map((_, i) => <GoldPetal key={i} index={i} />)}

                {/* Soft radial glow */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle,rgba(255,248,200,0.6) 0%,transparent 70%)' }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 2.2, ease: 'easeOut' }}
                />

                <div className="relative z-10 max-w-[360px] w-full">

                    {/* Eyebrow */}
                    <motion.p
                        className="wl-cinzel text-xs tracking-[4px] uppercase mb-3"
                        style={{ color: '#a07830' }}
                        initial={{ opacity: 0, y: 14 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.65 }}
                    >
                        With Heartfelt Love
                    </motion.p>

                    {/* Main heading */}


                    <div className="my-5">
                        <GoldDivider delay={0.25} />
                    </div>

                    {/* Invite line
                    <motion.p
                        className="wl-cormorant italic text-2xl leading-8 mb-8"
                        style={{ color: '#7a5c42' }}
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.7, delay: 0.35 }}
                    >
                        The Kothari Family invites you to celebrate this union of love
                    </motion.p> */}


                    {/* ── Date stamp ── */}
                    {/* <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
                        animate={inView ? { opacity: 1, scale: 1, rotate: -3 } : {}}
                        transition={{ duration: 0.75, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
                        className="w-28 h-28 rounded-full flex flex-col items-center justify-center mx-auto mb-9"
                        style={{
                            background: 'linear-gradient(145deg,rgba(255,253,245,0.9),rgba(250,243,224,0.8))',
                            border: '2px solid rgba(201,168,76,0.45)',
                            boxShadow: '0 8px 24px rgba(201,168,76,0.18)',
                        }}
                    >
                        <span className="wl-cinzel font-bold leading-none" style={{ fontSize: 24, color: '#3d2b1f' }}>18</span>
                        <span className="font-greatvibes leading-[1.1]" style={{ fontSize: 22, color: '#c9a84c' }}>May</span>
                        <span className="wl-cinzel font-semibold leading-[1.3]" style={{ fontSize: 12, color: '#5c3d1e' }}>2026</span>
                        <span className="wl-cinzel text-[7px] tracking-[1px] uppercase" style={{ color: '#a07830', marginTop: 1 }}>Jalgaon</span>
                    </motion.div> */}


                    {/* Main heading */}
                    <motion.h2
                        className="font-greatvibes leading-[1.05] mb-2"
                        style={{ fontSize: 68, color: '#3d2b1f', filter: 'drop-shadow(0 3px 12px rgba(201,168,76,0.25))' }}
                        initial={{ opacity: 0, y: 22 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.12 }}
                    >
                        Best Regards
                    </motion.h2>
                    <motion.p
                        className="wl-serif text-lg tracking-[2px]  mb-4"
                        style={{ color: '#a07830' }}
                        initial={{ opacity: 0, y: 14 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.65 }}
                    >
                        <div>Sharda & Kantilal Kothari</div>
                        <div>Anamika & Hemant Kothari</div>
                        <div>Payal & Ujwal Kothari</div>
                    </motion.p>
                    <motion.h2
                        className="font-greatvibes leading-[1.05] mb-2"
                        style={{ fontSize: 68, color: '#3d2b1f', filter: 'drop-shadow(0 3px 12px rgba(201,168,76,0.25))' }}
                        initial={{ opacity: 0, y: 22 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.12 }}
                    >
                        Chirpy Family
                    </motion.h2>
                    <motion.p
                        className="wl-serif text-lg tracking-[2px]  mb-4"
                        style={{ color: '#a07830' }}
                        initial={{ opacity: 0, y: 14 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.65 }}
                    >
                        <div>Mishree, Pratham & Parth Kothari</div>

                    </motion.p>

                    <motion.p
                        className="wl-cinzel text-sm tracking-[2px]  mb-4"
                        style={{ color: '#390F0F' }}
                        initial={{ opacity: 0, y: 14 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.65 }}
                    >
                        Your presence will make it truly special.
                    </motion.p>


                </div>
            </section>
        </>
    );
}