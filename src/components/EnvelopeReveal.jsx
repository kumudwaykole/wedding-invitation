import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Wax Seal SVG ── */
function WaxSeal({ src = '/wax-seal.png', width = 72, height = 72 }) {
    const [imgLoaded, setImgLoaded] = useState(false);
    const [imgError, setImgError] = useState(false);

    const showSvg = !imgLoaded || imgError;

    return (
        <div style={{ position: 'relative', width, height }}>
            {/* SVG fallback — visible until image loads */}
            {showSvg && (
                <svg
                    width={width}
                    height={height}
                    viewBox="0 0 72 72"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ position: 'absolute', top: 0, left: 0 }}
                >
                    {/* …all your existing SVG defs + elements unchanged… */}
                </svg>
            )}

            {/* Actual image — rendered off-screen until loaded, then swaps in */}
            {!imgError && (
                <img
                    src={src}
                    alt="Wax seal"
                    width={width}
                    height={height}
                    onLoad={() => setImgLoaded(true)}
                    onError={() => setImgError(true)}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        opacity: imgLoaded ? 1 : 0,
                        transition: 'opacity 0.3s ease',
                        objectFit: 'contain',
                    }}
                />
            )}
        </div>
    );
}
/* ── Mute Button — reel/vinyl style ── */
function MuteButton({ muted, onToggle }) {
    return (
        <motion.button
            onClick={onToggle}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            whileTap={{ scale: 0.88 }}
            className="fixed bottom-6 right-5 z-[99999] flex items-center justify-center rounded-full cursor-pointer select-none"
            style={{
                width: 48, height: 48,
                background: 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(10px)',
                border: '1.5px solid rgba(255,255,255,0.18)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.45)',
            }}
            aria-label={muted ? 'Unmute' : 'Mute'}
        >
            {/* spinning reel ring when playing */}
            {!muted && (
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 rounded-full"
                    style={{
                        background: 'conic-gradient(from 0deg, rgba(201,168,76,0.6), rgba(201,168,76,0.1), rgba(201,168,76,0.6))',
                        borderRadius: '50%',
                    }}
                />
            )}

            {/* icon */}
            <div className="relative z-10" style={{ color: '#fff', fontSize: 18, lineHeight: 1 }}>
                {muted ? (
                    /* muted — speaker with X */
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="rgba(255,255,255,0.85)" stroke="none" />
                        <line x1="23" y1="9" x2="17" y2="15" stroke="white" strokeWidth="2.2" />
                        <line x1="17" y1="9" x2="23" y2="15" stroke="white" strokeWidth="2.2" />
                    </svg>
                ) : (
                    /* playing — speaker with sound waves */
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="rgba(255,255,255,0.85)" stroke="none" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="white" strokeWidth="2" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
                    </svg>
                )}
            </div>
        </motion.button>
    );
}

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
export default function EnvelopeReveal({ onReveal }) {
    const [phase, setPhase] = useState('idle');
    const [muted, setMuted] = useState(false);
    const audioRef = useRef(null);

    /* initialise audio once */
    useEffect(() => {
        const audio = new Audio('/audio/Roshni-Hi-Roshni.mp3');
        audio.loop = true;
        audio.volume = 0.5;
        audioRef.current = audio;
        return () => { audio.pause(); audio.src = ''; };
    }, []);

    /* sync mute state */
    useEffect(() => {
        if (audioRef.current) audioRef.current.muted = muted;
    }, [muted]);

    const handleTap = () => {
        if (phase !== 'idle') return;

        /* start music on tap (needs user gesture) */
        audioRef.current?.play().catch(() => { });

        setPhase('opening');
        setTimeout(() => setPhase('glow'), 900);
        setTimeout(() => { setPhase('done'); onReveal?.(); }, 2400);
    };

    const toggleMute = (e) => {
        e.stopPropagation(); // don't trigger envelope tap
        setMuted(m => !m);
    };

    return (
        <>
            <AnimatePresence>
                {phase !== 'done' && (
                    <motion.div
                        key="envelope"
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7 }}
                        onClick={handleTap}
                        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center cursor-pointer overflow-hidden"
                    >
                        {/* ── BACKGROUND IMAGE ── */}
                        <div
                            className="absolute inset-0 z-0"
                            style={{
                                backgroundImage: 'url(/envelope-bg.png)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                        {/* dark red tint */}
                        <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(80,8,8,0.45)' }} />

                        {/* twinkling dots */}
                        {Array.from({ length: 16 }).map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{ opacity: [0.15, 0.6, 0.15] }}
                                transition={{ duration: 1.5 + i * 0.2, repeat: Infinity, delay: i * 0.15 }}
                                className="absolute w-[3px] h-[3px] rounded-full pointer-events-none"
                                style={{ background: 'rgba(255,240,180,0.7)', top: `${8 + ((i * 5.7) % 84)}%`, left: `${4 + ((i * 6.3) % 92)}%` }}
                            />
                        ))}

                        {/* ── ENVELOPE ── */}
                        <div className="relative w-[300px] h-[220px]" style={{ perspective: 600 }}>

                            {/* body */}
                            <div className="absolute inset-0 rounded-[6px]"
                                style={{ background: 'linear-gradient(145deg,#d43a3a,#c0302e,#a82828)', boxShadow: '0 24px 60px rgba(0,0,0,0.55)' }} />

                            {/* bottom V */}
                            <div className="absolute bottom-0 left-0 right-0 h-[110px]"
                                style={{ background: 'linear-gradient(160deg,#b02525 0%,#8c1c1c 100%)', clipPath: 'polygon(0 100%,50% 0%,100% 100%)' }} />

                            {/* left flap */}
                            <div className="absolute top-0 left-0 bottom-0 w-[150px]"
                                style={{ background: 'linear-gradient(90deg,#b82a2a,#c93232)', clipPath: 'polygon(0 0,100% 50%,0 100%)' }} />

                            {/* right flap */}
                            <div className="absolute top-0 right-0 bottom-0 w-[150px]"
                                style={{ background: 'linear-gradient(270deg,#b82a2a,#c93232)', clipPath: 'polygon(100% 0,0 50%,100% 100%)' }} />

                            {/* top flap */}
                            <motion.div
                                animate={{ rotateX: phase === 'opening' || phase === 'glow' ? -175 : 0 }}
                                transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
                                className="absolute top-0 left-0 right-0 h-[120px] z-[8]"
                                style={{ background: 'linear-gradient(170deg,#e04040,#c43030)', clipPath: 'polygon(0 0,50% 100%,100% 0)', transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
                            />


                            {/* wax seal */}
                            <motion.div
                                animate={phase === 'opening' ? { scale: 0.7, opacity: 0, y: 8 } : { scale: 1, opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: 0.25 }}
                                className="absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[12]"
                            >
                                <WaxSeal src="/ptlogo.webp" width={82} height={82} />
                            </motion.div>
                        </div>
                        {/* ── END ENVELOPE ── */}

                        {/* glow burst */}
                        <AnimatePresence>
                            {phase === 'glow' && (
                                <motion.div key="glow"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 10, opacity: [0, 0.9, 1] }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.1, ease: 'easeOut' }}
                                    className="absolute w-45 h-45 rounded-full pointer-events-none"
                                    style={{ background: 'radial-gradient(circle,#fffde7 0%,#fff9c4 35%,#fdf8f0 60%,transparent 80%)' }}
                                />
                            )}
                        </AnimatePresence>

                        {/* tap hint */}
                        <AnimatePresence>
                            {phase === 'idle' && (
                                <motion.div
                                    key="hint"
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: [0.55, 1, 0.55], y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute bottom-26 pointer-events-none text-center flex flex-col items-center"
                                    style={{
                                        fontFamily: 'var(--font-serif)',
                                        fontStyle: 'italic',
                                        fontSize: 17,
                                        color: 'rgba(255,255,255,0.88)',
                                        letterSpacing: 2,
                                        textShadow: '0 2px 10px rgba(0,0,0,0.4)',
                                    }}
                                >
                                    <div>The Kothari Family Welcomes You</div>
                                    <div>Tap to Reveal ✨</div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── MUTE BUTTON — always visible once audio has started ── */}
            <AnimatePresence>
                {phase !== 'idle' && (
                    <MuteButton muted={muted} onToggle={toggleMute} />
                )}
            </AnimatePresence>
        </>
    );
}