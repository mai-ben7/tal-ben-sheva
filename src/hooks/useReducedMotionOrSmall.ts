import * as React from "react";

export const useReducedMotionOrSmall = () => {
  const [reduce, set] = React.useState(false);
  
  React.useEffect(() => {
    const m1 = window.matchMedia("(prefers-reduced-motion: reduce)");
    const m2 = window.matchMedia("(max-width: 767px)");
    
    const on = () => set(m1.matches || m2.matches);
    
    on(); 
    m1.addEventListener?.("change", on); 
    m2.addEventListener?.("change", on);
    
    return () => { 
      m1.removeEventListener?.("change", on); 
      m2.removeEventListener?.("change", on); 
    };
  }, []);
  
  return reduce;
};
