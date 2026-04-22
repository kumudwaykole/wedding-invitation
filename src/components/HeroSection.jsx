import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
});

// Inject Cinzel font from Google Fonts
const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&display=swap');
  .name-cinzel {
    font-family: 'Cinzel', serif;
    font-weight: 700;
    letter-spacing: 0.08em;
  }
`;

export default function HeroSection() {
    return (
        <>
            <style>{fontStyle}</style>
            <section
                className="min-h-screen flex flex-col items-center justify-center px-7 py-7 relative overflow-hidden"
                style={{
                    background: `
                      radial-gradient(circle at top, rgba(255,248,220,0.7) 0%, transparent 32%),
                      radial-gradient(circle at bottom, rgba(201,168,76,0.12) 0%, transparent 30%),
                      linear-gradient(180deg, #fcf7ef 0%, #f6ecdc 45%, #fdf8f0 100%)
                    `,
                }}
            >
                {/* Decorative corner frames */}
                <div
                    className="pointer-events-none absolute top-4 left-4 w-14 h-14 z-10"
                    style={{
                        borderTop: '1.5px solid rgba(201,168,76,0.9)',
                        borderLeft: '1.5px solid rgba(201,168,76,0.9)',
                    }}
                />
                <div
                    className="pointer-events-none absolute top-4 right-4 w-14 h-14 z-10"
                    style={{
                        borderTop: '1.5px solid rgba(201,168,76,0.9)',
                        borderRight: '1.5px solid rgba(201,168,76,0.9)',
                    }}
                />
                <div
                    className="pointer-events-none absolute bottom-4 left-4 w-14 h-14 z-10"
                    style={{
                        borderBottom: '1.5px solid rgba(201,168,76,0.9)',
                        borderLeft: '1.5px solid rgba(201,168,76,0.9)',
                    }}
                />
                <div
                    className="pointer-events-none absolute bottom-4 right-4 w-14 h-14 z-10"
                    style={{
                        borderBottom: '1.5px solid rgba(201,168,76,0.9)',
                        borderRight: '1.5px solid rgba(201,168,76,0.9)',
                    }}
                />

                {/* Outer glow orb */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2.5, ease: 'easeOut' }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-130 h-130 rounded-full pointer-events-none z-0"
                    style={{ background: 'radial-gradient(circle,rgba(255,253,200,0.95) 0%,rgba(255,248,168,0.65) 35%,rgba(253,248,240,0.18) 70%,transparent 85%)' }}
                />

                {/* Inner glow orb */}
                <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: [0.6, 1.08, 1], opacity: 1 }}
                    transition={{ duration: 3.2, ease: 'easeOut' }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-65 h-65 rounded-full blur-[22px] pointer-events-none z-0"
                    style={{ background: 'radial-gradient(circle,rgba(255,255,220,1) 0%,rgba(255,252,180,0.85) 45%,transparent 78%)' }}
                />

                {/* Content */}
                <div className="relative z-10 text-center max-w-90 w-full">

                    <motion.div
                        {...fadeUp(0.3)}
                        className="text-base font-dancing text-gold mb-5 font-serif text-amber-950 leading-loose"
                        style={{ filter: 'drop-shadow(0 2px 8px rgba(201,168,76,0.4))' }}
                    >
                        <div>|| श्री महावीराय नमः ||</div>
                        <div>|| श्री गणेशाय नमः ||</div>
                    </motion.div>

                    {/* Quote */}
                    <motion.blockquote
                        {...fadeUp(0.5)}
                        className="font-serif italic text-[24px] text-brown-light leading-9 mb-5 px-2"
                    >
                        "We cordially invite you to join us
                        for Pre-Wedding Reception of "
                    </motion.blockquote>

                    {/* Gold rule */}
                    <motion.div {...fadeUp(0.9)} className="flex items-center gap-2.5 mb-7">
                        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right,transparent,#c9a84c)' }} />
                        <span className="text-gold text-[13px]">✦</span>
                        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left,transparent,#c9a84c)' }} />
                    </motion.div>

                    {/* Groom */}
                    <motion.h1
                        {...fadeUp(1.0)}
                        className="name-cinzel text-[52px] text-brown leading-[1.1] mb-1 uppercase"
                        style={{ filter: 'drop-shadow(0 2px 10px rgba(201,168,76,0.18))' }}
                    >
                        Pranav
                    </motion.h1>

                    <motion.p
                        {...fadeUp(1.15)}
                        className="font-body text-xs tracking-wide font-bold text-amber-950 uppercase mb-1.5 whitespace-nowrap"
                    >
                        Grand S/O
                        Sau Sharda &amp; Shri Kantilalji Kothari
                    </motion.p>
                    <motion.p
                        {...fadeUp(1.15)}
                        className="font-body text-[10px] tracking-widest font-bold text-amber-950 uppercase mb-1.5"
                    >
                        (Pirgal)
                    </motion.p>
                    <motion.p
                        {...fadeUp(1.15)}
                        className="font-body text-xs tracking-widest font-bold text-amber-950 uppercase mb-5.5"
                    >
                        S/O of Anamika &amp; Hemant Kothari
                    </motion.p>

                    {/* AND divider */}
                    <motion.div
                        {...fadeUp(1.25)}
                        className="font-cormorant text-xl tracking-[4px] font-bold text-brown-muted uppercase leading-none my-3"
                    >
                        and
                    </motion.div>

                    {/* Bride */}
                    <motion.h1
                        {...fadeUp(1.35)}
                        className="name-cinzel text-[52px] text-brown leading-[1.1] mb-1 uppercase"
                        style={{ filter: 'drop-shadow(0 2px 10px rgba(201,168,76,0.18))' }}
                    >
                        Tejaswi
                    </motion.h1>
                    <motion.p
                        {...fadeUp(1.15)}
                        className="font-body text-xs tracking-wide font-bold text-amber-950 uppercase mb-1.5 whitespace-nowrap"
                    >
                        Grand D/O
                        Late. Jatan Devi &amp; Shri Jagat SinghJi Kothari
                    </motion.p>
                    <motion.p
                        {...fadeUp(1.15)}
                        className="font-body text-[10px] tracking-widest font-bold text-amber-950 uppercase mb-1.5"
                    >
                        (Chopra)
                    </motion.p>
                    <motion.p
                        {...fadeUp(1.5)}
                        className="font-body text-xs tracking-widest font-bold text-amber-950 uppercase mb-11"
                    >
                        D/O of Priyanka &amp; Sandeepji Kothari
                    </motion.p>

                    {/* Scroll hint */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.4 }}
                        className="flex flex-col items-center gap-1.25"
                    >
                        <span className="font-body text-xs font-bold italic tracking-[3px] text-gold-dark uppercase pt-5">
                            Scroll down
                        </span>
                        <motion.span
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 1.6, repeat: Infinity }}
                            className="text-gold text-xl"
                        >
                            ↓
                        </motion.span>
                    </motion.div>
                </div>
            </section>
        </>
    );
}