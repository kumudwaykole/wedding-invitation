import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// ─── Replace these src values with your own image URLs or local paths ───────
const CARDS = [
    {
        caption: 'How it started…',
        src: '/engagement.jpg',   // ← replace
        rotation: -5,
        tape: true,
        tapeAngle: -12,
    },
    {
        caption: 'When we Know…',
        src: '/engagement-1.jpg',   // ← replace
        rotation: 3,
        tape: true,
        tapeAngle: 8,
    },
    {
        caption: 'Made it Official…',
        src: 'engagement-3.jpg',   // ← replace
        rotation: -2,
        tape: true,
        tapeAngle: -6,
    },

];
// ─────────────────────────────────────────────────────────────────────────────

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Cormorant+Garamond:ital,wght@0,400;1,400;1,600&family=Dancing+Script:wght@600&display=swap');
  .story-cinzel   { font-family: 'Cinzel', serif; }
  .story-script   { font-family: 'Dancing Script', cursive; }
  .story-cormorant{ font-family: 'Cormorant Garamond', serif; }
`;

/* ── Tape strip decoration ── */
function Tape({ angle }) {
    return (
        <div
            className="absolute -top-[14px] left-1/2 z-10 pointer-events-none"
            style={{
                transform: `translateX(-50%) rotate(${angle}deg)`,
                width: 54,
                height: 22,
                background: 'rgba(255,248,200,0.72)',
                borderRadius: 2,
                boxShadow: '0 1px 4px rgba(180,150,60,0.18)',
                backdropFilter: 'blur(1px)',
                border: '1px solid rgba(201,168,76,0.22)',
            }}
        />
    );
}

/* ── Single polaroid card ── */
function Polaroid({ card, index }) {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 });

    // Fan-in: cards rise from below with stagger, starting from their tilted rotation
    const fanVariants = {
        hidden: {
            opacity: 0,
            y: 90 + index * 18,
            rotate: card.rotation * 2,
            scale: 0.88,
        },
        visible: {
            opacity: 1,
            y: 0,
            rotate: card.rotation,
            scale: 1,
            transition: {
                duration: 0.9,
                delay: index * 0.16,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            variants={fanVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            whileHover={{
                scale: 1.05,
                rotate: 0,
                zIndex: 30,
                y: -6,
                transition: { duration: 0.3, ease: 'easeOut' },
            }}
            className="relative mx-auto cursor-default"
            style={{ width: 230, zIndex: 10 + index }}
        >
            {/* Tape */}
            {card.tape && <Tape angle={card.tapeAngle} />}

            {/* Polaroid body */}
            <div
                className="bg-white rounded-sm overflow-visible"
                style={{
                    padding: '13px 13px 42px',
                    boxShadow: '0 10px 38px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.08)',
                    outline: '1px solid rgba(220,200,160,0.35)',
                }}
            >
                {/* Photo area */}
                <div
                    className="w-full rounded-sm overflow-hidden relative"
                    style={{ height: 200 }}
                >
                    <img
                        src={card.src}
                        alt={card.caption}
                        className="w-full h-full object-cover"
                        style={{ display: 'block' }}
                        onError={e => {
                            // Graceful fallback — soft gradient placeholder
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement.style.background =
                                'linear-gradient(135deg,#fdf0e0,#f5e6d3)';
                            // Insert placeholder label
                            if (!e.currentTarget.parentElement.querySelector('.ph-label')) {
                                const el = document.createElement('div');
                                el.className = 'ph-label';
                                el.style.cssText =
                                    'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:Cinzel,serif;font-size:10px;color:rgba(160,120,48,0.6);letter-spacing:2px;text-transform:uppercase;';
                                el.textContent = 'Pranav ♥︎ Tejaswi';
                                e.currentTarget.parentElement.appendChild(el);
                            }
                        }}
                    />

                    {/* Subtle vignette overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background:
                                'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.18) 100%)',
                        }}
                    />
                </div>

                {/* Caption */}
                <p
                    className="story-script text-center mt-2.5 leading-none"
                    style={{ fontSize: 21, color: '#5c3d1e' }}
                >
                    {card.caption}
                </p>
            </div>
        </motion.div>
    );
}

/* ── Animated gold divider ── */
function GoldDivider({ inView }) {
    return (
        <motion.div
            className="flex items-center gap-3 w-full max-w-[200px] mx-auto mb-10"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right,transparent,#c9a84c)' }} />
            <span style={{ color: '#c9a84c', fontSize: 10 }}>✦</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left,transparent,#c9a84c)' }} />
        </motion.div>
    );
}

/* ── Main section ── */
export default function OurStorySection() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.06 });

    return (
        <>
            <style>{fontStyle}</style>
            <section
                ref={ref}
                className="min-h-screen px-7 pt-[80px] pb-[80px] relative overflow-hidden"
                style={{ background: 'linear-gradient(180deg,#f7f3ea 0%,#fdf8f0 100%)' }}
            >
                {/* Ambient floating sparkles */}
                {Array.from({ length: 9 }).map((_, i) => (
                    <motion.span
                        key={i}
                        animate={{ opacity: [0.15, 0.65, 0.15], scale: [0.8, 1.2, 0.8] }}
                        transition={{ duration: 2.4 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
                        className="absolute pointer-events-none"
                        style={{
                            color: '#c9a84c',
                            fontSize: 10 + (i % 3) * 3,
                            top: `${7 + ((i * 11) % 83)}%`,
                            left: `${3 + ((i * 10.7) % 93)}%`,
                            opacity: 0.3,
                        }}
                    >
                        ✦
                    </motion.span>
                ))}

                <div className="max-w-[400px] mx-auto relative z-10">

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.75 }}
                        className="text-center mb-10"
                    >
                        <p
                            className="story-cinzel text-[10px] tracking-[4px] uppercase mb-3"
                            style={{ color: '#a07830' }}
                        >
                            A Journey of Two Hearts
                        </p>
                        <h2
                            className="font-greatvibes leading-[1.05] mb-2"
                            style={{ fontSize: 60, color: '#3d2b1f', filter: 'drop-shadow(0 2px 8px rgba(201,168,76,0.18))' }}
                        >
                            Our Story
                        </h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.7, delay: 0.22 }}
                            className="story-cormorant italic text-base leading-[1.7] mt-3"
                            style={{ color: '#8a6e58' }}
                        >
                            Two strangers, one moment in time — and suddenly the world felt a little different.
                        </motion.p>
                    </motion.div>

                    <GoldDivider inView={inView} />

                    {/* Polaroid cards — fan in from bottom with stagger */}
                    <div className="flex flex-col gap-[42px] items-center">
                        {CARDS.map((c, i) => (
                            <Polaroid key={i} card={c} index={i} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}