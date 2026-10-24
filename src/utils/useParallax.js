import { useEffect } from 'react';

/* the 3D scene follows the pointer */
export default function useParallax(sceneRef, worldRef) {
  useEffect(() => {
    const on = (e) => {
      const sc = sceneRef.current;
      const w = worldRef.current;
      if (!sc || !w) return;
      const r = sc.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
      const y = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
      w.style.setProperty('--ry', 20 + x * 34 + 'deg');
      w.style.setProperty('--rx', -14 - y * 24 + 'deg');
    };
    document.addEventListener('pointermove', on);
    return () => document.removeEventListener('pointermove', on);
  }, [sceneRef, worldRef]);
}
