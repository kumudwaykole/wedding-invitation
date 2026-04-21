import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const EVENTS = [
    { day: 'Day 1', date: 'Thursday, 28 May', title: 'Sufi Night', sub: 'An Evening of Soulful Music', time: '6:00 PM Onwards', icon: '🎵', color: '#7b1fa2', accent: '#ce93d8' },
    { day: 'Day 2', date: 'Saturday, 30 May', title: 'Sangeet', sub: 'Glits & Glam · Mystic & Magic', time: '5:45 PM Onwards', icon: '✨', color: '#1565c0', accent: '#90caf9' },
    { day: 'Day 3', date: 'Sunday, 31 May', title: 'Wedding', sub: 'The Sacred Union', time: '10:00 AM Onwards', icon: '💍', color: '#2e7d32', accent: '#a5d6a7' },
    { day: 'Day 3', date: 'Wednesday, 27 May', title: 'Reception', sub: 'Bing · Indo-Western', time: '5:00 PM Onwards', icon: '🥂', color: '#e65100', accent: '#ffcc80' },
];

function Item({ ev, index }) {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.25 });
    const isLeft = index % 2 === 0;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: isLeft ? -44 : 44 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
            className={`flex items-center gap-3.5 mb-1.5 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
        >
            {/* Text card */}
            <div
                className={`flex-1 rounded-xl py-[15px] px-4 ${isLeft ? 'text-right' : 'text-left'}`}
                style={{
                    background: 'rgba(255,255,255,0.82)',
                    backdropFilter: 'blur(8px)',
                    border: `1px solid ${ev.accent}50`,
                    boxShadow: `0 4px 22px ${ev.color}12`,
                }}
            >
                <p className="font-body text-[8px] tracking-[2px] uppercase opacity-85 mb-[3px]" style={{ color: ev.color }}>
                    {ev.day} · {ev.date}
                </p>
                <p className="font-script text-[29px] text-brown leading-[1.05] mb-0.5">{ev.title}</p>
                <p className="font-serif italic text-[11px] text-brown-muted mb-[5px]">{ev.sub}</p>
                <p className="font-body text-[10px] tracking-[0.5px]" style={{ color: ev.color }}>🕐 {ev.time}</p>
            </div>

            {/* Icon dot */}
            <motion.div
                whileHover={{ scale: 1.12 }}
                className="w-[46px] h-[46px] rounded-full shrink-0 z-[2] flex items-center justify-center text-[20px]"
                style={{
                    background: `linear-gradient(135deg,${ev.color},${ev.accent})`,
                    boxShadow: `0 4px 16px ${ev.color}45`,
                }}
            >
                {ev.icon}
            </motion.div>

            <div className="flex-1" />
        </motion.div>
    );
}

export default function TimelineSection() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section
            ref={ref}
            className="pt-[80px] pb-[60px] px-6 relative"
            style={{ background: 'linear-gradient(180deg,#fdf8f0 0%,#f7f3ea 100%)' }}
        >
            <div className="max-w-[420px] mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-12"
                >
                    <p className="font-body text-[9px] tracking-[4px] uppercase text-gold-dark mb-2">The Schedule</p>
                    <h2 className="font-script text-[54px] text-brown leading-[1.05]">Celebration</h2>
                    <h2 className="font-script text-[54px] text-brown leading-[1.05] mb-1.5">Timeline</h2>
                    <div className="flex items-center gap-2.5 justify-center">
                        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right,transparent,#c9a84c)' }} />
                        <span className="text-gold text-[12px]">✦</span>
                        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left,transparent,#c9a84c)' }} />
                    </div>
                </motion.div>

                {/* Vertical spine + items */}
                <div className="relative">
                    <div
                        className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 opacity-[0.28]"
                        style={{ background: 'linear-gradient(to bottom,transparent,#c9a84c 15%,#c9a84c 85%,transparent)' }}
                    />
                    {EVENTS.map((ev, i) => <Item key={i} ev={ev} index={i} />)}
                </div>
            </div>
        </section>
    );
}
