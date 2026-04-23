import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import confetti from 'canvas-confetti';

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&display=swap');
  .save-cinzel { font-family: 'Cinzel', serif; font-weight: 700; letter-spacing: 0.06em; }
  .save-cormorant { font-family: 'Cormorant Garamond', serif; }
`;

function SparkleBurst() {
    return (
        <motion.div
            className="absolute inset-0 pointer-events-none z-20"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
        >
            {[...Array(8)].map((_, i) => {
                const angle = (i / 8) * 360;
                return (
                    <motion.div
                        key={i}
                        className="absolute top-1/2 left-1/2 w-[3px] h-[3px] rounded-full"
                        style={{ background: i % 2 === 0 ? '#c9a84c' : '#e8c96a', originX: '0%', originY: '0%' }}
                        initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                        animate={{
                            x: Math.cos((angle * Math.PI) / 180) * 54,
                            y: Math.sin((angle * Math.PI) / 180) * 54,
                            scale: 0,
                            opacity: 0,
                        }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                    />
                );
            })}
        </motion.div>
    );
}

function ShimmerLayer({ active }) {
    return (
        <AnimatePresence>
            {active && (
                <motion.div
                    className="absolute inset-0 pointer-events-none z-10 rounded-[10px] overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,220,0.45) 50%, transparent 65%)',
                            backgroundSize: '200% 100%',
                        }}
                        animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function ScratchCard({ label, value, delay, onRevealed }) {
    const canvasRef = useRef(null);
    const [revealed, setRevealed] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [showSparkle, setShowSparkle] = useState(false);
    const drawing = useRef(false);
    const [cardRef, inView] = useInView({ triggerOnce: true });

    const CARD_W = 108;
    const CARD_H = 120;
    const DPR = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;

    useEffect(() => {
        const c = canvasRef.current;
        if (!c) return;

        // Set physical size for crisp rendering
        c.width = CARD_W * DPR;
        c.height = CARD_H * DPR;
        c.style.width = `${CARD_W}px`;
        c.style.height = `${CARD_H}px`;

        const ctx = c.getContext('2d');
        ctx.scale(DPR, DPR);

        const g = ctx.createLinearGradient(0, 0, CARD_W, CARD_H);
        g.addColorStop(0, '#b8922a');
        g.addColorStop(0.3, '#e8c96a');
        g.addColorStop(0.6, '#c9a84c');
        g.addColorStop(1, '#8a6420');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, CARD_W, CARD_H);

        for (let i = 0; i < 400; i++) {
            ctx.fillStyle = `rgba(${Math.random() > 0.5 ? 255 : 0},${Math.random() > 0.5 ? 200 : 100},0,0.03)`;
            ctx.fillRect(Math.random() * CARD_W, Math.random() * CARD_H, 2, 2);
        }

        // Crisp text — no blur
        ctx.fillStyle = 'rgba(60,35,5,0.75)';
        ctx.font = 'bold 11px "Cormorant Garamond", serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.letterSpacing = '2px';
        ctx.fillText('✦ SCRATCH ✦', CARD_W / 2, CARD_H / 2 - 8);
        ctx.fillText('HERE', CARD_W / 2, CARD_H / 2 + 10);
    }, []);

    const getXY = (e, c) => {
        const r = c.getBoundingClientRect();
        // Account for DPR when mapping to canvas coords
        const src = e.touches ? e.touches[0] : e;
        return {
            x: (src.clientX - r.left),
            y: (src.clientY - r.top),
        };
    };

    const erase = (e) => {
        if (!drawing.current || revealed) return;
        const c = canvasRef.current;
        const ctx = c.getContext('2d');
        const { x, y } = getXY(e, c);
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        // Scale brush radius by DPR
        ctx.arc(x * DPR, y * DPR, 28 * DPR, 0, Math.PI * 2);
        ctx.fill();

        const px = ctx.getImageData(0, 0, c.width, c.height).data;
        let gone = 0;
        for (let i = 3; i < px.length; i += 4) if (px[i] < 128) gone++;
        if (gone / (px.length / 4) > 0.5) {
            setRevealed(true);
            setShowSparkle(true);
            setTimeout(() => setShowSparkle(false), 1200);
            onRevealed?.();
        }
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 40, scale: 0.82, rotateY: -15 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1, rotateY: 0 } : {}}
            transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-[9px] flex-1"
            style={{ perspective: 400 }}
        >
            {/* Label */}
            <motion.span
                className="save-cinzel text-[10px] tracking-[2.5px] uppercase"
                style={{ color: '#a07830' }}
            >
                {label}
            </motion.span>

            {/* Card */}
            <motion.div
                className="relative rounded-[12px] overflow-hidden"
                style={{
                    width: CARD_W,
                    height: CARD_H,
                    boxShadow: revealed
                        ? '0 0 0 2px #c9a84c, 0 8px 28px rgba(201,168,76,0.35)'
                        : '0 4px 18px rgba(201,168,76,0.22)',
                    cursor: revealed ? 'default' : 'crosshair',
                }}
                animate={revealed ? { scale: [1, 1.07, 1] } : {}}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                onMouseEnter={() => !revealed && setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {/* Value underneath */}
                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{ background: 'linear-gradient(145deg,#fffdf5,#faf3e0)' }}
                    animate={revealed ? { background: ['linear-gradient(145deg,#fffdf5,#faf3e0)', 'linear-gradient(145deg,#fffbe8,#fdf5d0)', 'linear-gradient(145deg,#fffdf5,#faf3e0)'] } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <motion.span
                        className="save-cinzel leading-none"
                        style={{
                            fontSize: 34,
                            color: '#3d2b1f',
                            filter: 'drop-shadow(0 2px 6px rgba(201,168,76,0.3))',
                        }}
                        animate={revealed ? { scale: [0.8, 1.12, 1], opacity: [0, 1] } : { scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {value}
                    </motion.span>
                    {revealed && (
                        <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                            className="h-px w-10 mt-2"
                            style={{ background: 'linear-gradient(to right,transparent,#c9a84c,transparent)' }}
                        />
                    )}
                </motion.div>

                <ShimmerLayer active={hovered && !revealed} />

                {/* Scratch canvas — CSS size set in JS via useEffect */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 touch-none"
                    style={{
                        opacity: revealed ? 0 : 1,
                        transition: revealed ? 'opacity 0.6s ease' : 'none',
                        cursor: revealed ? 'default' : 'crosshair',
                    }}
                    onMouseDown={() => { drawing.current = true; }}
                    onMouseUp={() => { drawing.current = false; }}
                    onMouseLeave={() => { drawing.current = false; setHovered(false); }}
                    onMouseMove={erase}
                    onTouchStart={e => { e.preventDefault(); drawing.current = true; }}
                    onTouchEnd={() => { drawing.current = false; }}
                    onTouchMove={e => { e.preventDefault(); erase(e); }}
                />

                {showSparkle && <SparkleBurst />}

                {revealed && (
                    <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 400, damping: 18 }}
                        className="absolute top-[6px] right-[6px] z-20 flex items-center justify-center"
                    >
                        <span style={{ color: '#D4AF37', fontSize: 10, lineHeight: 1, fontWeight: 600 }}>✓</span>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
}

function GoldDivider({ inView }) {
    return (
        <motion.div
            className="flex items-center gap-2.5 w-full max-w-[260px] mx-auto mb-9"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right,transparent,#c9a84c)' }} />
            <span style={{ color: '#c9a84c', fontSize: 11 }}>✦</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left,transparent,#c9a84c)' }} />
        </motion.div>
    );
}

/* ── Google Calendar Add Button ── */
function AddToCalendarButton() {
    // Google Calendar link for May 18, 2026
    const gcalUrl =
        'https://calendar.google.com/calendar/render?action=TEMPLATE' +
        '&text=PreWedding+Celebration❤️' +
        '&dates=20260518/20260519' +
        '&details=You+are+cordially+invited+to+our+prewedding+celebration.' +
        '&location=Jalgaon%2C+Maharashtra';

    return (
        <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-col items-center gap-3"
        >


            {/* Heading */}
            <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="save-cormorant italic text-[22px] leading-tight"
                style={{ color: '#3d2b1f' }}
            >
                Mark this special day
            </motion.p>

            {/* Button */}
            <motion.a
                href={gcalUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45, type: 'spring', stiffness: 300, damping: 20 }}
                whileHover={{ scale: 1.04, boxShadow: '0 6px 28px rgba(201,168,76,0.4)' }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 px-6 py-3 rounded-full no-underline"
                style={{
                    background: 'linear-gradient(135deg, #fdf3dc, #fae8b4)',
                    border: '1px solid rgba(201,168,76,0.55)',
                    boxShadow: '0 3px 16px rgba(201,168,76,0.25)',
                    textDecoration: 'none',
                }}
            >
                <span
                    className="save-cinzel text-xs uppercase"
                    style={{ color: '#7a5515' }}
                >
                    <p className="save-cinzel text-xs tracking-[3px] uppercase" style={{ color: '#a07830' }}>
                        On Your Calendar
                    </p>
                    <p className="save-greatvibes  text-lg mt-0.5" style={{ color: '#3d2b1f' }}>
                        May 18, 2026
                    </p>
                </span>
            </motion.a>
        </motion.div>
    );
}

export default function SaveTheDateSection() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
    const [revealedCount, setRevealedCount] = useState(0);
    const allRevealed = revealedCount >= 3;
    const confettiFired = useRef(false);

    const handleRevealed = () => setRevealedCount(n => n + 1);

    useEffect(() => {
        if (allRevealed && !confettiFired.current) {
            confettiFired.current = true;
            const colors = ['#c9a84c', '#e8c96a', '#fff4cf', '#f5d6a0', '#a07830', '#4a7c59'];
            confetti({ particleCount: 100, spread: 80, startVelocity: 45, origin: { x: 0.5, y: 0.5 }, colors, gravity: 1.1, scalar: 1.0 });
            setTimeout(() => {
                confetti({ particleCount: 50, angle: 60, spread: 60, startVelocity: 38, origin: { x: 0.1, y: 0.55 }, colors });
                confetti({ particleCount: 50, angle: 120, spread: 60, startVelocity: 38, origin: { x: 0.9, y: 0.55 }, colors });
            }, 250);
            setTimeout(() => {
                confetti({ particleCount: 40, spread: 100, startVelocity: 30, origin: { x: 0.5, y: 0.4 }, colors });
            }, 550);
        }
    }, [allRevealed]);

    return (
        <>
            <style>{fontStyle}</style>
            <section
                ref={ref}
                className="min-h-[80vh] flex flex-col items-center justify-center px-7 py-10 relative overflow-hidden"
                style={{ background: 'linear-gradient(180deg,#fdf8f0 0%,#faf3e0 55%,#fdf8f0 100%)' }}
            >
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-80 rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle,rgba(255,248,200,0.55) 0%,transparent 70%)' }}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 2, ease: 'easeOut' }}
                />

                <div className="relative z-[1] text-center max-w-[360px] w-full">
                    <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="save-cinzel text-xs tracking-widest uppercase mb-3"
                        style={{ color: '#a07830' }}
                    >
                        A Celebration of Love
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 22 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.75, delay: 0.12 }}
                        className="font-greatvibes text-[58px] leading-[1.1] my-1"
                        style={{ color: '#3d2b1f', filter: 'drop-shadow(0 2px 8px rgba(201,168,76,0.2))' }}
                    >
                        Save the Date
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.25 }}
                        className="save-cormorant italic text-lg mb-5"
                        style={{ color: '#8a6e58' }}
                    >
                        A beautiful chapter of forever is about to begin.
                    </motion.p>

                    <GoldDivider inView={inView} />

                    <motion.div
                        className="flex gap-4 justify-center items-start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.45 }}
                    >
                        <ScratchCard label="Month" value="May" delay={0.5} onRevealed={handleRevealed} />
                        <ScratchCard label="Date" value="18" delay={0.65} onRevealed={handleRevealed} />
                        <ScratchCard label="Year" value="2026" delay={0.8} onRevealed={handleRevealed} />
                    </motion.div>



                    {/* Google Calendar CTA */}
                    <AnimatePresence>
                        {allRevealed && <AddToCalendarButton />}
                    </AnimatePresence>
                </div>
            </section>
        </>
    );
}