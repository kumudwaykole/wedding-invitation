import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Wax Seal SVG ── */
function WaxSeal() {
    const c = 36;
    return (
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="sealBg" cx="38%" cy="32%" r="65%">
                    <stop offset="0%" stopColor="#fff0a0" />
                    <stop offset="40%" stopColor="#f2ece0" />
                    <stop offset="100%" stopColor="#d4cabb" />
                </radialGradient>
                <radialGradient id="sealEdge" cx="50%" cy="50%" r="50%">
                    <stop offset="68%" stopColor="transparent" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0.14)" />
                </radialGradient>
            </defs>
            <circle cx={c} cy={c + 2.5} r={34} fill="rgba(0,0,0,0.2)" />
            <circle cx={c} cy={c} r={34} fill="url(#sealBg)" />
            <circle cx={c} cy={c} r={34} fill="url(#sealEdge)" />
            {Array.from({ length: 28 }).map((_, i) => {
                const a = (i / 28) * Math.PI * 2;
                return <circle key={i} cx={c + 33 * Math.cos(a)} cy={c + 33 * Math.sin(a)} r={2.4} fill="#c6bdb0" opacity="0.8" />;
            })}
            <circle cx={c} cy={c} r={30} stroke="#c0b5a4" strokeWidth="0.8" fill="none" strokeDasharray="2.5 2.5" />
            {Array.from({ length: 18 }).map((_, i) => {
                const a = (i / 18) * Math.PI * 2;
                const x = c + 26 * Math.cos(a), y = c + 26 * Math.sin(a);
                return <ellipse key={i} cx={x} cy={y} rx={3.2} ry={1.5} transform={`rotate(${(i / 18) * 360} ${x} ${y})`} fill="#b4a898" opacity="0.75" />;
            })}
            <circle cx={c} cy={c} r={22} stroke="#a89c8c" strokeWidth="1.1" fill="none" />
            <circle cx={c} cy={c} r={19.5} stroke="#b0a698" strokeWidth="0.5" fill="none" strokeDasharray="1.5 2" />
            {Array.from({ length: 7 }).map((_, i) => {
                const a = Math.PI * 0.65 + (i / 6) * Math.PI * 0.7;
                const mx = c + 19 * Math.cos(a), my = c + 19 * Math.sin(a);
                return <ellipse key={i} cx={mx} cy={my} rx={3.8} ry={1.7} transform={`rotate(${(a * 180) / Math.PI + 90} ${mx} ${my})`} fill="#9a8e7c" opacity="0.72" />;
            })}
            {Array.from({ length: 7 }).map((_, i) => {
                const a = -Math.PI * 0.35 + (i / 6) * Math.PI * 0.7;
                const mx = c + 19 * Math.cos(a), my = c + 19 * Math.sin(a);
                return <ellipse key={i} cx={mx} cy={my} rx={3.8} ry={1.7} transform={`rotate(${(a * 180) / Math.PI + 90} ${mx} ${my})`} fill="#9a8e7c" opacity="0.72" />;
            })}
            <path d={`M${c - 5} ${c + 21} C${c - 2.5} ${c + 18} ${c} ${c + 20} ${c} ${c + 20} C${c} ${c + 20} ${c + 2.5} ${c + 18} ${c + 5} ${c + 21}`} stroke="#9a8e7c" strokeWidth="1.1" fill="none" />
            <circle cx={c} cy={c - 22} r={2.2} fill="#a89e8c" />
            {[0, 1, 2, 3, 4].map((i) => {
                const a = (i / 5) * Math.PI * 2;
                return <ellipse key={i} cx={c + 3.8 * Math.cos(a)} cy={(c - 22) + 3.8 * Math.sin(a)} rx={2} ry={1.1} transform={`rotate(${i * 72} ${c + 3.8 * Math.cos(a)} ${(c - 22) + 3.8 * Math.sin(a)})`} fill="#b4a898" opacity="0.78" />;
            })}
            <text x={c} y={c - 3} textAnchor="middle" fontFamily="'Cormorant Garamond',Georgia,serif" fontSize="14" fontStyle="italic" fontWeight="600" fill="#5a4c3a">P</text>
            <text x={c} y={c + 5.5} textAnchor="middle" fontFamily="'Cormorant Garamond',Georgia,serif" fontSize="8" fill="#7a6c5a" letterSpacing="2">&amp;</text>
            <text x={c} y={c + 14} textAnchor="middle" fontFamily="'Cormorant Garamond',Georgia,serif" fontSize="14" fontStyle="italic" fontWeight="600" fill="#5a4c3a">T</text>
            <ellipse cx={c - 7} cy={c - 9} rx={8} ry={4.5} fill="white" opacity="0.2" transform={`rotate(-35 ${c - 7} ${c - 9})`} />
        </svg>
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
                                <WaxSeal />
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
                                    className="absolute w-[180px] h-[180px] rounded-full pointer-events-none"
                                    style={{ background: 'radial-gradient(circle,#fffde7 0%,#fff9c4 35%,#fdf8f0 60%,transparent 80%)' }}
                                />
                            )}
                        </AnimatePresence>

                        {/* tap hint */}
                        <AnimatePresence>
                            {phase === 'idle' && (
                                <motion.p key="hint"
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: [0.55, 1, 0.55], y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute bottom-16 pointer-events-none"
                                    style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 17, color: 'rgba(255,255,255,0.85)', letterSpacing: 2, textShadow: '0 2px 10px rgba(0,0,0,0.4)' }}
                                >
                                    Tap to Reveal
                                </motion.p>
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