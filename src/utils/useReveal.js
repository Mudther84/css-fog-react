import { useEffect } from 'react';

/* adds .shown to every .rv element when it scrolls into view */
export default function useReveal(deps = []) {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('shown');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.rv').forEach((e, k) => {
      e.style.transitionDelay = (k % 3) * 90 + 'ms';
      io.observe(e);
    });
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
