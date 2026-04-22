import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// ─── UPDATE THESE PATHS to your public folder files ──────────────────────────
const RECEPTION_VIDEO = '/prewedding.mp4';        // ← your video
const RECEPTION_POSTER = '/pre-wedding.webp'; // ← fallback image
// ─────────────────────────────────────────────────────────────────────────────

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&display=swap');
  .sc-cinzel     { font-family: 'Cinzel', serif; }
  .sc-cormorant  { font-family: 'Cormorant Garamond', serif; }
`;

function GoldDivider() {
    return (
        <div className="flex items-center gap-3 w-full max-w-[200px] mx-auto my-5">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right,transparent,#c9a84c)' }} />
            <span style={{ color: '#c9a84c', fontSize: 10 }}>✦</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left,transparent,#c9a84c)' }} />
        </div>
    );
}

/* ── Scroll-triggered video player ── */
function CeremonyVideo({ src, poster, label }) {
    const videoRef = useRef(null);
    const [videoError, setVideoError] = useState(false);
    const [ref, inView] = useInView({ threshold: 0.45, triggerOnce: false });

    useEffect(() => {
        const v = videoRef.current;
        if (!v || videoError) return;
        if (inView) {
            v.play().catch(() => setVideoError(true));
        } else {
            v.pause();
        }
    }, [inView, videoError]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 36, scale: 0.96 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl overflow-hidden w-full"
            style={{
                boxShadow: '0 24px 64px rgba(0,0,0,0.24), 0 0 0 1px rgba(201,168,76,0.22)',
                // aspectRatio: '8/16',
                // maxHeight: 520,
                background: '#0d0d0d',
            }}
        >
            {!videoError ? (
                <video
                    ref={videoRef}
                    src={src}
                    poster={poster}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onError={() => setVideoError(true)}
                    className="w-full h-full object-contain"
                    style={{ display: 'block' }}
                />
            ) : (
                <img
                    src={poster}
                    alt={label}
                    className="w-full h-full object-contain"
                    onError={e => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement.style.background =
                            'linear-gradient(135deg,#1a1a2e,#16213e)';
                    }}
                />
            )}

            {/* Bottom gradient */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%)' }}
            />

            {/* Label chip */}
            <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full whitespace-nowrap"
                style={{
                    background: 'rgba(0,0,0,0.42)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(201,168,76,0.35)',
                }}
            >
                <span className="sc-cinzel text-[9px] tracking-[3px] uppercase" style={{ color: '#e8c96a' }}>
                    {label}
                </span>
            </div>

            {/* Live pulse dot */}
            {inView && !videoError && (
                <motion.div
                    className="absolute top-3 right-3 w-2 h-2 rounded-full"
                    style={{ background: '#e8c96a' }}
                    animate={{ opacity: [1, 0.3, 1], scale: [1, 1.5, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                />
            )}
        </motion.div>
    );
}

/* ── Main export ── */
export default function SacredCeremoniesSection() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

    return (
        <>
            <style>{fontStyle}</style>
            <section
                ref={ref}
                className="min-h-screen px-6 pt-[80px] pb-[70px] relative overflow-hidden"
                style={{ background: 'linear-gradient(180deg,#fdf8f0 0%,#faf3e0 55%,#fdf8f0 100%)' }}
            >
                {/* Ambient sparkles */}
                {Array.from({ length: 8 }).map((_, i) => (
                    <motion.span
                        key={i}
                        animate={{ opacity: [0.12, 0.55, 0.12], scale: [0.8, 1.2, 0.8] }}
                        transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, delay: i * 0.35 }}
                        className="absolute pointer-events-none"
                        style={{
                            color: '#c9a84c',
                            fontSize: 9 + (i % 3) * 3,
                            top: `${5 + ((i * 12) % 85)}%`,
                            left: `${3 + ((i * 11.3) % 93)}%`,
                        }}
                    >
                        ✦
                    </motion.span>
                ))}

                <div className="max-w-[400px] mx-auto relative z-10">

                    {/* Section header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.75 }}
                        className="text-center mb-10"
                    >
                        <p className="sc-cinzel text-[10px] tracking-[4px] uppercase mb-3" style={{ color: '#a07830' }}>
                            Moments to Cherish
                        </p>
                        <h2
                            className="font-greatvibes leading-[1.05] mb-1"
                            style={{
                                fontSize: 62,
                                color: '#3d2b1f',
                                filter: 'drop-shadow(0 2px 10px rgba(201,168,76,0.22))',
                            }}
                        >
                            You are invited
                        </h2>
                        <GoldDivider />
                        {/* <p className="sc-cormorant italic text-2xl" style={{ color: '#7a5c42' }}>
                            Music, memories & promises
                        </p> */}
                    </motion.div>

                    {/* Video */}
                    <CeremonyVideo
                        src={RECEPTION_VIDEO}
                        poster={RECEPTION_POSTER}
                        label="Save the Date · 18 May 2026"
                    />

                </div>
            </section>
        </>
    );
}