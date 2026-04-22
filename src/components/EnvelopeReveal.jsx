import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Wax Seal SVG ── */
function WaxSeal() {
    const c = 36;

    return (
        <svg
            width="72"
            height="72"
            viewBox="0 0 72 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <radialGradient id="sealBg" cx="35%" cy="28%" r="70%">
                    <stop offset="0%" stopColor="#fffef9" />
                    <stop offset="22%" stopColor="#fdf8ef" />
                    <stop offset="55%" stopColor="#efe4d1" />
                    <stop offset="100%" stopColor="#d8c4a2" />
                </radialGradient>

                <radialGradient id="sealEdge" cx="50%" cy="50%" r="55%">
                    <stop offset="68%" stopColor="transparent" />
                    <stop offset="100%" stopColor="rgba(126, 92, 30, 0.22)" />
                </radialGradient>

                <linearGradient id="goldStroke" x1="0" y1="0" x2="72" y2="72">
                    <stop offset="0%" stopColor="#f8e7b0" />
                    <stop offset="25%" stopColor="#e0c06b" />
                    <stop offset="50%" stopColor="#fff4cf" />
                    <stop offset="75%" stopColor="#c89b3c" />
                    <stop offset="100%" stopColor="#f2d78e" />
                </linearGradient>

                <linearGradient id="innerGold" x1="18" y1="14" x2="54" y2="58">
                    <stop offset="0%" stopColor="#fff7df" />
                    <stop offset="35%" stopColor="#f0cf87" />
                    <stop offset="70%" stopColor="#c9983f" />
                    <stop offset="100%" stopColor="#8e6423" />
                </linearGradient>

                <linearGradient id="ivoryHighlight" x1="12" y1="10" x2="52" y2="44">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>

                <filter id="paperTexture" x="-20%" y="-20%" width="140%" height="140%">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.9"
                        numOctaves="2"
                        seed="7"
                        result="noise"
                    />
                    <feColorMatrix
                        in="noise"
                        type="saturate"
                        values="0"
                        result="monoNoise"
                    />
                    <feComponentTransfer in="monoNoise" result="softNoise">
                        <feFuncA type="table" tableValues="0 0.025" />
                    </feComponentTransfer>
                    <feBlend in="SourceGraphic" in2="softNoise" mode="multiply" />
                </filter>

                <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.18" />
                </filter>

                <filter id="emboss" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0.4" dy="0.9" stdDeviation="0.6" floodColor="#8e6b2e" floodOpacity="0.25" />
                </filter>

                <filter id="textGlow" x="-40%" y="-40%" width="180%" height="180%">
                    <feDropShadow dx="0" dy="0" stdDeviation="1.2" floodColor="#fff4d6" floodOpacity="0.85" />
                    <feDropShadow dx="0" dy="0.6" stdDeviation="0.8" floodColor="#a9772b" floodOpacity="0.35" />
                </filter>
            </defs>

            {/* Main seal */}
            <g filter="url(#shadow)">
                <circle cx={c} cy={c + 2.5} r={34} fill="rgba(77,49,15,0.16)" />
                <circle cx={c} cy={c} r={34} fill="url(#sealBg)" filter="url(#paperTexture)" />
                <circle cx={c} cy={c} r={34} fill="url(#sealEdge)" />
            </g>

            {/* Outer gold ring only */}
            <circle
                cx={c}
                cy={c}
                r={30}
                stroke="url(#goldStroke)"
                strokeWidth="1.2"
                fill="none"
                opacity="0.95"
            />

            {/* Floral ring */}
            {Array.from({ length: 18 }).map((_, i) => {
                const a = (i / 18) * Math.PI * 2;
                const x = c + 26 * Math.cos(a);
                const y = c + 26 * Math.sin(a);
                return (
                    <ellipse
                        key={i}
                        cx={x}
                        cy={y}
                        rx={3.2}
                        ry={1.45}
                        transform={`rotate(${(i / 18) * 360} ${x} ${y})`}
                        fill="#d7b36a"
                        opacity="0.82"
                    />
                );
            })}

            {/* Inner ring */}
            <circle
                cx={c}
                cy={c}
                r={22}
                stroke="#b88a3c"
                strokeWidth="1.1"
                fill="none"
                opacity="0.95"
            />

            {/* Top floral arc */}
            {Array.from({ length: 7 }).map((_, i) => {
                const a = -Math.PI * 0.35 + (i / 6) * Math.PI * 0.7;
                const mx = c + 19 * Math.cos(a);
                const my = c + 19 * Math.sin(a);
                return (
                    <ellipse
                        key={i}
                        cx={mx}
                        cy={my}
                        rx={3.8}
                        ry={1.7}
                        transform={`rotate(${(a * 180) / Math.PI + 90} ${mx} ${my})`}
                        fill="#ba8b3d"
                        opacity="0.76"
                    />
                );
            })}

            {/* Bottom floral arc */}
            {Array.from({ length: 7 }).map((_, i) => {
                const a = Math.PI * 0.65 + (i / 6) * Math.PI * 0.7;
                const mx = c + 19 * Math.cos(a);
                const my = c + 19 * Math.sin(a);
                return (
                    <ellipse
                        key={i}
                        cx={mx}
                        cy={my}
                        rx={3.8}
                        ry={1.7}
                        transform={`rotate(${(a * 180) / Math.PI + 90} ${mx} ${my})`}
                        fill="#ba8b3d"
                        opacity="0.76"
                    />
                );
            })}

            {/* Small top ornament */}
            <circle cx={c} cy={c - 22} r={2.2} fill="#c89b45" />
            {[0, 1, 2, 3, 4].map((i) => {
                const a = (i / 5) * Math.PI * 2;
                const x = c + 3.8 * Math.cos(a);
                const y = c - 22 + 3.8 * Math.sin(a);
                return (
                    <ellipse
                        key={i}
                        cx={x}
                        cy={y}
                        rx={2}
                        ry={1.1}
                        transform={`rotate(${i * 72} ${x} ${y})`}
                        fill="#efd7a1"
                        opacity="0.9"
                    />
                );
            })}

            {/* One-line initials */}
            {/* <g filter="url(#emboss)">
                <text
                    x={c}
                    y={c + 4}
                    textAnchor="middle"
                    fontFamily="'Cormorant Garamond', Georgia, serif"
                    fontSize="14"
                    fontStyle="italic"
                    fontWeight="700"
                    fill="#ab6d3a"
                    filter="url(#textGlow)"
                    letterSpacing="0.8"
                >
                    P&amp;T
                </text>
            </g> */}

            {/* Soft highlight */}
            <ellipse
                cx={c - 7}
                cy={c - 9}
                rx={9}
                ry={5}
                fill="url(#ivoryHighlight)"
                opacity="0.7"
                transform={`rotate(-35 ${c - 7} ${c - 9})`}
            />

            {/* Tiny inner sheen */}
            <ellipse
                cx={c + 8}
                cy={c + 10}
                rx={11}
                ry={6}
                fill="rgba(255,255,255,0.08)"
                transform={`rotate(25 ${c + 8} ${c + 10})`}
            />
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
                                    className="absolute w-45 h-45 rounded-full pointer-events-none"
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
                                    className="absolute bottom-26 pointer-events-none"
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