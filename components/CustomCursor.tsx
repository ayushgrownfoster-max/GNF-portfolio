"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorLabel = "" | "VIEW" | "CLICK" | "EXPLORE";

interface CursorContextValue {
  setLabel: (label: CursorLabel) => void;
}

const CursorContext = createContext<CursorContextValue>({
  setLabel: () => {},
});

/** Call from any component to control the cursor while hovering it, e.g.
 *  const { setLabel } = useCursor();
 *  <div onMouseEnter={() => setLabel("VIEW")} onMouseLeave={() => setLabel("")} />
 */
export function useCursor() {
  return useContext(CursorContext);
}

export function CursorProvider({ children }: { children: ReactNode }) {
  const [label, setLabel] = useState<CursorLabel>("");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 30, stiffness: 300, mass: 0.4 });
  const springY = useSpring(y, { damping: 30, stiffness: 300, mass: 0.4 });
  const [isDesktop, setIsDesktop] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsDesktop(mq.matches);
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktop]);

  return (
    <CursorContext.Provider value={{ setLabel }}>
      <div className={isDesktop ? "cursor-none-desktop" : undefined}>
        {children}
      </div>
      {isDesktop && visible && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-[999] flex items-center justify-center rounded-full mix-blend-difference"
          style={{
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            width: label ? 88 : 10,
            height: label ? 88 : 10,
            backgroundColor: "#ffffff",
          }}
          transition={{ type: "spring", damping: 26, stiffness: 260 }}
        >
          {label && (
            <span className="text-[11px] font-medium tracking-[0.08em] text-ink">
              {label}
            </span>
          )}
        </motion.div>
      )}
    </CursorContext.Provider>
  );
}
