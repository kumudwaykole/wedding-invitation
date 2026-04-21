import { useEffect, useRef } from 'react';

const LEAF_SVGS = [
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 40'><path d='M15 2 C5 10 2 25 15 38 C28 25 25 10 15 2Z' fill='%234a7c59' opacity='0.55'/><line x1='15' y1='38' x2='15' y2='8' stroke='%236fa882' stroke-width='0.8' opacity='0.6'/></svg>`,
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 25 35'><path d='M12 2 C3 8 1 20 12 33 C23 20 21 8 12 2Z' fill='%236fa882' opacity='0.45'/></svg>`,
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 30'><path d='M10 1 C2 7 1 18 10 29 C19 18 18 7 10 1Z' fill='%23c9a84c' opacity='0.38'/></svg>`,
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 35 25'><path d='M2 12 C10 2 25 1 33 12 C25 23 10 23 2 12Z' fill='%234a7c59' opacity='0.42'/></svg>`,
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 22 32'><path d='M11 1 C4 6 2 16 11 31 C20 16 18 6 11 1Z' fill='%238bc34a' opacity='0.35'/><path d='M11 1 L11 31' stroke='%23558b2f' stroke-width='0.6' opacity='0.5'/></svg>`,
];

export default function FloatingLeaves({ children }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const style = document.createElement('style');
        style.id = 'leaves-style';
        style.textContent = `
      @keyframes leafDrift {
        0%   { transform: translateY(-60px) translateX(0px) rotate(0deg);   opacity: 0; }
        5%   { opacity: 1; }
        25%  { transform: translateY(25vh)  translateX(30px)  rotate(90deg); }
        50%  { transform: translateY(50vh)  translateX(-20px) rotate(180deg); }
        75%  { transform: translateY(75vh)  translateX(40px)  rotate(270deg); }
        95%  { opacity: 0.7; }
        100% { transform: translateY(108vh) translateX(10px)  rotate(360deg); opacity: 0; }
      }
      @keyframes leafDriftAlt {
        0%   { transform: translateY(-60px) translateX(0px)   rotate(20deg);  opacity: 0; }
        5%   { opacity: 0.9; }
        30%  { transform: translateY(30vh)  translateX(-35px) rotate(120deg); }
        60%  { transform: translateY(60vh)  translateX(25px)  rotate(240deg); }
        95%  { opacity: 0.6; }
        100% { transform: translateY(108vh) translateX(-15px) rotate(400deg); opacity: 0; }
      }
      .floating-leaf {
        position: fixed;
        pointer-events: none;
        z-index: 9000;
        will-change: transform;
      }
    `;
        document.head.appendChild(style);

        const wrapper = document.createElement('div');
        wrapper.id = 'leaves-wrapper';
        wrapper.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9000;overflow:hidden;';
        document.body.appendChild(wrapper);

        const count = 18;
        for (let i = 0; i < count; i++) {
            const leaf = document.createElement('div');
            leaf.className = 'floating-leaf';
            const svgIndex = i % LEAF_SVGS.length;
            const size = 10 + Math.random() * 18;
            const startX = 2 + Math.random() * 96;
            const duration = 9 + Math.random() * 11;
            const delay = -(Math.random() * duration);
            const anim = i % 2 === 0 ? 'leafDrift' : 'leafDriftAlt';
            leaf.style.cssText = `
        left: ${startX}vw;
        top: 0;
        width: ${size}px;
        height: ${size * 1.4}px;
        animation: ${anim} ${duration}s ${delay}s linear infinite;
      `;
            const img = document.createElement('img');
            img.src = `data:image/svg+xml,${LEAF_SVGS[svgIndex]}`;
            img.style.cssText = 'width:100%;height:100%;object-fit:contain;display:block;';
            img.setAttribute('aria-hidden', 'true');
            leaf.appendChild(img);
            wrapper.appendChild(leaf);
        }

        return () => {
            document.getElementById('leaves-style')?.remove();
            document.getElementById('leaves-wrapper')?.remove();
        };
    }, []);

    return <div ref={containerRef}>{children}</div>;
}
