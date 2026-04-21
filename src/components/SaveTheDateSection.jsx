import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import confetti from 'canvas-confetti';

/* ── single scratch card ── */
function ScratchCard({ label, value, delay }) {
    const canvasRef = useRef(null);
    const [revealed, setRevealed] = useState(false);
    const drawing = useRef(false);
    const [sectionRef, inView] = useInView({ triggerOnce: true });

    useEffect(() => {
        const c = canvasRef.current;
        if (!c) return;
        const ctx = c.getContext('2d');
        const g = ctx.createLinearGradient(0, 0, c.width, c.height);
        g.addColorStop(0, '#c9a84c');
        g.addColorStop(0.5, '#e8c96a');
        g.addColorStop(1, '#a07830');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.fillStyle = 'rgba(70,40,5,0.65)';
        ctx.font = 'bold 9px Raleway,sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('SCRATCH', c.width / 2, c.height / 2 - 7);
        ctx.fillText('HERE', c.width / 2, c.height / 2 + 8);
    }, []);

    const getXY = (e, c) => {
        const r = c.getBoundingClientRect();
        const sx = c.width / r.width, sy = c.height / r.height;
        const src = e.touches ? e.touches[0] : e;
        return { x: (src.clientX - r.left) * sx, y: (src.clientY - r.top) * sy };
    };

    const erase = (e) => {
        if (!drawing.current || revealed) return;
        const c = canvasRef.current;
        const ctx = c.getContext('2d');
        const { x, y } = getXY(e, c);
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 24, 0, Math.PI * 2);
        ctx.fill();
        const px = ctx.getImageData(0, 0, c.width, c.height).data;
        let gone = 0;
        for (let i = 3; i < px.length; i += 4) if (px[i] < 128) gone++;
        if (gone / (px.length / 4) > 0.52) { setRevealed(true); fireConfetti(); }
    };

    const fireConfetti = () => {
        const colors = ['#c9a84c', '#e8c96a', '#4a7c59', '#f5d6a0', '#a07830'];
        const end = Date.now() + 2200;
        const frame = () => {
            if (Date.now() > end) return;
            confetti({ particleCount: 2, angle: 60, spread: 55, startVelocity: 42, origin: { x: 0, y: 0.6 }, colors });
            confetti({ particleCount: 2, angle: 120, spread: 55, startVelocity: 42, origin: { x: 1, y: 0.6 }, colors });
            requestAnimationFrame(frame);
        };
        frame();
    };

    return (
        <motion.div
            ref={sectionRef}
            initial={{ opacity: 0, y: 32, scale: 0.88 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-[7px] flex-1"
        >
            <span className="font-body text-[8px] tracking-[2px] uppercase text-brown-muted">{label}</span>

            <div
                className="relative w-[88px] h-[88px] rounded-[10px] border border-gold overflow-hidden cursor-crosshair"
                style={{ boxShadow: '0 4px 18px rgba(201,168,76,0.22)' }}
            >
                {/* Value underneath */}
                <div className="absolute inset-0 bg-ivory flex items-center justify-center">
                    <span className="font-display italic font-bold text-[22px] text-brown">{value}</span>
                </div>

                {/* Scratch layer */}
                <canvas
                    ref={canvasRef}
                    width={88}
                    height={88}
                    className="absolute inset-0 w-full h-full touch-none"
                    style={{ opacity: revealed ? 0 : 1, transition: revealed ? 'opacity 0.55s ease' : 'none' }}
                    onMouseDown={() => { drawing.current = true; }}
                    onMouseUp={() => { drawing.current = false; }}
                    onMouseLeave={() => { drawing.current = false; }}
                    onMouseMove={erase}
                    onTouchStart={e => { e.preventDefault(); drawing.current = true; }}
                    onTouchEnd={() => { drawing.current = false; }}
                    onTouchMove={e => { e.preventDefault(); erase(e); }}
                />

                {revealed && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-[5px] right-[5px] w-4 h-4 rounded-full bg-forest text-white text-[9px] flex items-center justify-center"
                    >
                        ✓
                    </motion.span>
                )}
            </div>

            <span className={`font-body text-[8px] tracking-[1px] uppercase ${revealed ? 'text-forest' : 'text-gold-dark'}`}>
                {revealed ? '✓ Revealed' : 'Scratch'}
            </span>
        </motion.div>
    );
}

/* ── section ── */
export default function SaveTheDateSection() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.25 });

    const dots = Array.from({ length: 22 }, (_, i) => ({
        w: 4 + Math.random() * 7,
        h: 4 + Math.random() * 7,
        circle: Math.random() > 0.5,
        bg: ['#c9a84c', '#4a7c59', '#f5e6d3', '#e8c96a', '#6fa882'][i % 5],
        top: 4 + Math.random() * 92,
        left: 4 + Math.random() * 92,
        rot: Math.random() * 360,
    }));

    return (
        <section
            ref={ref}
            className="min-h-[80vh] flex flex-col items-center justify-center px-7 py-[70px] relative"
            style={{ background: 'linear-gradient(180deg,#fdf8f0 0%,#faf3e0 100%)' }}
        >
            {/* Confetti dots */}
            {dots.map((d, i) => (
                <div
                    key={i}
                    className="absolute opacity-[0.38] pointer-events-none"
                    style={{
                        width: d.w, height: d.h,
                        borderRadius: d.circle ? '50%' : 2,
                        background: d.bg,
                        top: `${d.top}%`, left: `${d.left}%`,
                        transform: `rotate(${d.rot}deg)`,
                    }}
                />
            ))}

            <div className="relative z-[1] text-center max-w-[360px] w-full">
                <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="font-body text-[9px] tracking-[4px] uppercase text-gold-dark mb-2"
                >
                    Find your date
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 18 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="font-script text-[60px] text-brown leading-[1.05] mb-2.5"
                >
                    Save the Date
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="font-serif italic text-[13px] text-brown-muted mb-[38px]"
                >
                    Scratch below to reveal our wedding date
                </motion.p>

                <div className="flex gap-3.5 justify-center items-start">
                    <ScratchCard label="Month" value="May" delay={0.3} />
                    <ScratchCard label="Day" value="30" delay={0.5} />
                    <ScratchCard label="Year" value="2026" delay={0.7} />
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 1.3 }}
                    className="mt-7 font-serif italic text-[13px] text-brown-muted"
                >
                    Saturday · Jalgaon, Maharashtra
                </motion.p>
            </div>
        </section>
    );
}
