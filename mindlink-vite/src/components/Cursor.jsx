import { useEffect, useRef } from 'react';

export default function Cursor() {
  const cursorRef = useRef(null);
  const x = useRef(0), y = useRef(0);
  const mx = useRef(0), my = useRef(0);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    document.body.style.cursor = 'none';

    const onMove = (e) => { mx.current = e.clientX; my.current = e.clientY; };
    window.addEventListener('mousemove', onMove);

    const animate = () => {
      x.current += (mx.current - x.current) * 0.12;
      y.current += (my.current - y.current) * 0.12;
      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(${x.current - 18}px, ${y.current - 18}px)`;
      }
      requestAnimationFrame(animate);
    };
    animate();

    // Hover scale on links/buttons
    const addHover = () => {
      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => {
          if (cursorRef.current) {
            cursorRef.current.style.transition = 'width 0.2s, height 0.2s';
            cursorRef.current.style.width = '54px';
            cursorRef.current.style.height = '54px';
          }
        });
        el.addEventListener('mouseleave', () => {
          if (cursorRef.current) {
            cursorRef.current.style.width = '36px';
            cursorRef.current.style.height = '36px';
          }
        });
      });
    };
    // Run after DOM settles
    setTimeout(addHover, 1000);

    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return <div ref={cursorRef} className="cursor-dome" />;
}
