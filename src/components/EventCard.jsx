import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function Sparkle({ left }) {
    return (
        <motion.div
            animate={{ y: ['0vh', '95vh'], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2.8 + Math.random() * 2.4, repeat: Infinity, delay: Math.random() * 4, ease: 'linear' }}
            className="absolute w-1 h-1 rounded-full pointer-events-none"
            style={{
                left: `${left}%`, top: 0,
                background: 'rgba(255,255,190,0.9)',
                boxShadow: '0 0 6px rgba(255,255,190,0.9)',
            }}
        />
    );
}

export default function EventCard({
    isDay2, day, date, month, year,
    title, time, venue, theme, theme2,
    bgGradient, accentColor = '#ffd700',
}) {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.18 });
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayLabel = isDay2 ? 'Day 2' : 'Day 3';
    const fullDate = `${String(date).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;

    return (
        <section
            ref={ref}
            className="min-h-[85vh] relative overflow-hidden flex items-center justify-center py-14"
            style={{ paddingBottom: 40 }}
        >
            {/* BG gradient */}
            <div className="absolute inset-0" style={{ background: bgGradient }} />

            {/* BG photo slot */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-[0.15]"
                style={{ backgroundImage: `url(/images/${isDay2 ? 'sangeet' : 'reception'}-bg.jpg)` }}
            />

            {/* Sparkle rain */}
            {Array.from({ length: 22 }).map((_, i) => (
                <Sparkle key={i} left={3 + (i * 4.5) % 94} />
            ))}

            {/* Top date bar */}
            <div
                className="absolute top-0 left-0 right-0 px-5 py-2.5 z-[8] flex justify-between items-center"
                style={{ background: 'rgba(0,0,0,0.28)', backdropFilter: 'blur(6px)' }}
            >
                <span className="font-body text-[10px] tracking-[2px] text-white/75">{dayLabel}</span>
                <span className="font-body text-[10px] tracking-[2px] text-white/75">
                    {fullDate} · {day.toUpperCase()}
                </span>
            </div>

            {/* Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 30 }}
                animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-[5] w-[295px] rounded-[14px] text-center mt-7"
                style={{
                    background: 'rgba(255,255,255,0.07)',
                    backdropFilter: 'blur(14px)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    padding: '38px 26px 32px',
                    boxShadow: '0 22px 64px rgba(0,0,0,0.45)',
                }}
            >
                {/* Corner stars */}
                {Array.from({ length: 5 }).map((_, i) => (
                    <motion.span
                        key={i}
                        animate={{ opacity: [0.25, 1, 0.25] }}
                        transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.3 }}
                        className="absolute"
                        style={{
                            color: accentColor,
                            fontSize: 8 + i * 2,
                            top: `${8 + i * 12}%`,
                            [i % 2 === 0 ? 'left' : 'right']: `${6 + (i % 3) * 5}%`,
                        }}
                    >
                        ★
                    </motion.span>
                ))}

                {/* Floating couple image */}
                <motion.div
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                    className="mb-[18px]"
                >
                    <div
                        className="w-24 h-[116px] mx-auto overflow-hidden flex items-center justify-center"
                        style={{
                            borderRadius: '50% 50% 50% 50% / 58% 58% 42% 42%',
                            border: '2px solid rgba(255,255,255,0.25)',
                            background: 'rgba(255,255,255,0.1)',
                        }}
                    >
                        <span className="text-[48px]">{isDay2 ? '🕺💃' : '👰🤵'}</span>
                    </div>
                </motion.div>

                <h2
                    className="font-script text-[48px] text-white leading-[1.05] mb-3.5"
                    style={{ textShadow: '0 2px 20px rgba(0,0,0,0.35)' }}
                >
                    {title}
                </h2>

                <p className="font-serif italic text-[16px] mb-1.5" style={{ color: accentColor }}>
                    {day} | {date} {monthNames[month - 1]} {year}
                </p>

                <p className="font-body text-[11px] tracking-[2px] text-white/70 uppercase mb-[18px]">
                    {time}
                </p>

                <div
                    className="h-px my-3.5"
                    style={{ background: `linear-gradient(to right,transparent,${accentColor}80,transparent)` }}
                />

                {/* Theme badge */}
                <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="inline-block rounded-[30px] px-[22px] py-[9px]"
                    style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
                >
                    <p className="font-serif italic text-[19px] mb-0.5" style={{ color: accentColor }}>
                        {theme}
                    </p>
                    {theme2 && (
                        <p className="font-body text-[9px] tracking-[3px] uppercase text-white/55">{theme2}</p>
                    )}
                </motion.div>

                <p className="mt-[18px] font-body text-[11px] text-white/65 tracking-[1px]">
                    📍 {venue}
                </p>
            </motion.div>
        </section>
    );
}
