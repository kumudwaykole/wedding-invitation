import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function RosePetal({ left }) {
    const dur = 4.5 + Math.random() * 4;
    const delay = Math.random() * 7;
    return (
        <motion.div
            animate={{
                y: ['0vh', '102vh'],
                x: [0, 18, -14, 22, -8],
                rotate: [0, 60, -45, 120, 200],
                opacity: [0, 0.85, 0.85, 0],
            }}
            transition={{ duration: dur, repeat: Infinity, delay, ease: 'linear' }}
            className="absolute top-0 pointer-events-none z-[2]"
            style={{ left: `${left}%` }}
        >
            <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
                <path d="M9 1 C2.5 5 1 12 4.5 17 C6.5 20 12 21 14 18 C17.5 13.5 17 5.5 9 1Z" fill="#e85d75" opacity="0.72" />
                <path d="M9 1 C13 5.5 14.5 12.5 12 17 C10 20 6 20 4.5 17 C7 13.5 9 7 9 1Z" fill="#c0364f" opacity="0.48" />
            </svg>
        </motion.div>
    );
}

export default function VenueSection() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.18 });

    return (
        <section
            ref={ref}
            className="min-h-[85vh] pt-[80px] pb-[60px] px-6 relative overflow-hidden"
            style={{ background: 'linear-gradient(180deg,#fdf8f0 0%,#fff5f7 55%,#fdf8f0 100%)' }}
        >
            {/* Petals */}
            {Array.from({ length: 14 }).map((_, i) => (
                <RosePetal key={i} left={4 + (i * 6.5) % 92} />
            ))}

            <div className="max-w-[420px] mx-auto relative z-[3]">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-[38px]"
                >
                    <p className="font-cinzel text-xs tracking-widest uppercase text-gold-dark mb-5">Join Us At</p>
                    <h2 className="font-greatvibes text-[68px] text-brown leading-[1.1] mb-2.5">The Venue</h2>
                    <div className="flex items-center gap-2.5 justify-center">
                        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right,transparent,#c9a84c)' }} />
                        <span className="text-[14px]">🌹</span>
                        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left,transparent,#c9a84c)' }} />
                    </div>
                </motion.div>

                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.85, delay: 0.18 }}
                    className="rounded-2xl overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg,#fff,#fffdf8)',
                        border: '1px solid rgba(201,168,76,0.28)',
                        boxShadow: '0 18px 56px rgba(0,0,0,0.07)',
                    }}
                >
                    {/* Banner top */}
                    {/* <div
                        className="px-6 py-8 text-center relative overflow-hidden"
                        style={{ background: 'linear-gradient(135deg,#1a3a5c 0%,#2d5986 50%,#1a3a5c 100%)' }}
                    >
                        {Array.from({ length: 12 }).map((_, i) => (
                            <motion.span
                                key={i}
                                animate={{ opacity: [0.18, 0.72, 0.18] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
                                className="absolute text-[rgba(255,255,190,0.7)] text-[9px]"
                                style={{ top: `${8 + i * 7}%`, left: `${4 + (i * 8.5) % 92}%` }}
                            >
                                ★
                            </motion.span>
                        ))}
                        <div className="text-[38px] mb-2">🏛️</div>
                        <p
                            className="font-script text-3xl text-[#ffd700]"
                            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.3)' }}
                        >
                            Aditya Lawn
                        </p>
                        <p className="font-cinzel text-xs tracking-[2px] text-white/70 uppercase mt-1">
                            Jalgaon, Maharashtra
                        </p>
                    </div> */}

                    {/* Details */}
                    <div className="p-6">
                        <div className="flex items-start gap-3 mb-5">
                            <span className="text-xl mt-0.5">📍</span>
                            <div>
                                <p className="font-display text-[16px] font-semibold text-brown mb-[3px]">Aditya Lawn</p>
                                <p className="font-body text-[12px] text-brown-muted leading-[1.5]">
                                    Jalgaon, Maharashtra 425001
                                </p>
                            </div>
                        </div>

                        {/* Map embed */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.7, delay: 0.5 }}
                            className="rounded-[10px] overflow-hidden"
                            style={{ border: '1px solid rgba(201,168,76,0.2)' }}
                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.112524024253!2d75.58420007423805!3d20.98812608917497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd90ee54b4c038f%3A0xba3c18b5657d66a1!2sAditya%20Farm%20Lawn!5e0!3m2!1sen!2sin!4v1776857477728!5m2!1sen!2sin"
                                width="100%"
                                height="195"
                                className="block border-0"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Aditya Lawn, Jalgaon"
                            />
                        </motion.div>

                        <motion.a
                            href="https://www.google.com/maps/place/Aditya+Farm+Lawn/@20.9881261,75.5842001,17z/data=!3m1!4b1!4m6!3m5!1s0x3bd90ee54b4c038f:0xba3c18b5657d66a1!8m2!3d20.9881211!4d75.586775!16s%2Fg%2F11g69y227v?entry=ttu&g_ep=EgoyMDI2MDQxOS4wIKXMDSoASAFQAw%3D%3D"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.025 }}
                            whileTap={{ scale: 0.975 }}
                            className="block mt-3.5 rounded-lg py-3 text-center text-white no-underline font-body text-[11px] tracking-[2px] uppercase font-semibold"
                            style={{
                                background: 'linear-gradient(135deg,#c9a84c,#a07830)',
                                boxShadow: '0 4px 16px rgba(201,168,76,0.32)',
                            }}
                        >
                            📍 Get Directions
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
