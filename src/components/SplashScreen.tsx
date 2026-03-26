import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExit(true);
      setTimeout(onFinish, 1000);
    }, 2500); // Slightly longer for the rotation effect

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#004d40] transition-all duration-1000 ease-in-out",
        exit ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="animate-in fade-in zoom-in duration-1000">
          <div className="relative group">
            <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full scale-110" />
            <div className="animate-[spin_4s_linear_infinite]">
              <img 
                src="/images/img_favicon.jpeg" 
                alt="Favicon" 
                className="h-16 w-16 md:h-20 md:w-20 object-contain bg-white p-3 rounded-full shadow-xl relative"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-16 text-center animate-in slide-in-from-bottom duration-1000 delay-500">
        <h2 className="text-sm md:text-base font-bold text-white tracking-[0.6em] uppercase opacity-60">
          WAIRB RDC
        </h2>
        <div className="w-8 h-px bg-white/20 mx-auto mt-3 rounded-full" />
      </div>
    </div>
  );
};

export default SplashScreen;
