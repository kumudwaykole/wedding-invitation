import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CARDS = [
    { caption: 'How it started…', emoji: '💫', rotation: -3, bg: 'linear-gradient(135deg,#fdf0e0,#f5e6d3)', text: 'Two strangers met, one glance — and suddenly the world felt a little different.' },
    { caption: 'The moments between…', emoji: '🌿', rotation: 2, bg: 'linear-gradient(135deg,#e8f5e9,#f0faf0)', text: 'Late nights, long walks, and laughter that never seemed to end.' },
    { caption: 'When we knew…', emoji: '✨', rotation: -2, bg: 'linear-gradient(135deg,#fdf8e8,#fffde0)', text: 'A quiet, golden moment — when everything just made sense.' },
    { caption: 'And forever begins…', emoji: '💍', rotation: 3, bg: 'linear-gradient(135deg,#fce4ec,#fdf0f5)', text: 'Now we invite you to celebrate as our story becomes forever.' },
];

function Polaroid({ card, index }) {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.18 });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 55, rotate: card.rotation - 6 }}
            animate={inView ? { opacity: 1, y: 0, rotate: card.rotation } : {}}
            transition={{ duration: 0.85, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.04, rotate: 0, zIndex: 20, boxShadow: '0 20px 56px rgba(0,0,0,0.2)' }}
            className="bg-white rounded-[3px] w-[232px] mx-auto cursor-default"
            style={{
                padding: '14px 14px 38px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.13),0 2px 8px rgba(0,0,0,0.08)',
            }}
        >
            {/* Photo area */}
            <div
                className="w-full h-[190px] rounded-[1px] flex flex-col items-center justify-center mb-2.5 overflow-hidden relative"
                style={{ background: card.bg }}
            >
                <div className="text-[46px] mb-2.5">{card.emoji}</div>
                <p className="font-serif italic text-[12px] text-brown-muted text-center px-3.5 leading-[1.55]">
                    {card.text}
                </p>
                <span className="absolute bottom-[5px] right-[7px] text-[8px] text-[rgba(100,80,40,0.3)] font-mono">
                    /images/story-{index + 1}.jpg
                </span>
            </div>
            <p className="font-script text-[20px] text-brown-mid text-center">{card.caption}</p>
        </motion.div>
    );
}

export default function OurStorySection() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

    return (
        <section
            ref={ref}
            className="min-h-screen px-7 pt-[80px] pb-[60px] relative"
            style={{ background: 'linear-gradient(180deg,#f7f3ea 0%,#fdf8f0 100%)' }}
        >
            {/* Floating sparkles */}
            {Array.from({ length: 9 }).map((_, i) => (
                <motion.span
                    key={i}
                    animate={{ opacity: [0.2, 0.75, 0.2], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 2.2 + i * 0.45, repeat: Infinity, delay: i * 0.28 }}
                    className="absolute text-gold pointer-events-none"
                    style={{
                        fontSize: 11 + (i % 3) * 3,
                        top: `${8 + ((i * 11) % 82)}%`,
                        left: `${4 + ((i * 10.5) % 92)}%`,
                    }}
                >
                    ✦
                </motion.span>
            ))}

            <div className="max-w-[400px] mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-12"
                >
                    <p className="font-body text-[9px] tracking-[4px] uppercase text-gold-dark mb-2">
                        Celebrate our journey
                    </p>
                    <h2 className="font-script text-[58px] text-brown leading-[1.05] mb-1">Our Story</h2>
                    <p className="font-body text-[9px] tracking-[3px] uppercase text-gold-dark">How It Started</p>
                    <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="font-serif italic text-[13px] text-brown-muted mt-3.5 leading-[1.7]"
                    >
                        Two strangers, one moment in time — and suddenly the world felt a little different.
                    </motion.p>
                </motion.div>

                {/* Cards */}
                <div className="flex flex-col gap-[30px] items-center">
                    {CARDS.map((c, i) => <Polaroid key={i} card={c} index={i} />)}
                </div>
            </div>
        </section>
    );
}
