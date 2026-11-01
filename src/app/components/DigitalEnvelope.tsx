import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DigitalEnvelopeProps {
  onOpenComplete: () => void;
  lang: 'am' | 'en';
}

const envelopeTranslations = {
  en: {
    invitation: 'Wedding Invitation',
    names: 'Ashu & Tsi',
    body: 'Together with their families, joyfully invite you to celebrate their marriage',
    date: 'November 14, 2026 · Addis Ababa',
    tapToOpen: 'Tap to open',
    especiallyFor: 'Invitation For',
    defaultGuest: 'Our Beloved Family & Friends'
  },
  am: {
    invitation: 'የጋብቻ ጥሪ',
    names: 'አሹ እና ፂ',
    body: 'የተወደዳችሁ ቤተስቦቻችን ፣ ጓደኞቻችን የጋብቻችንን ሥነ ሥርዓት አብረው እንዲያከብሩ በታላቅ ደስታ ጋብዘናችኋል',
    date: 'ህዳር 5 ቀን 2019 ዓ.ም · አዲስ አበባ',
    tapToOpen: 'ለመክፈት ይጫኑ',
    especiallyFor: 'ልዩ ጥሪ ለ',
    defaultGuest: 'ለተከበራችሁ ቤተሰቦቻችንና ወዳጆቻችን'
  }
};

export function DigitalEnvelope({ onOpenComplete, lang }: DigitalEnvelopeProps) {
  const [step, setStep] = useState<'idle' | 'opening' | 'done'>('idle');
  const [guestName, setGuestName] = useState('');
  const [scale, setScale] = useState(1);

  const currentT = envelopeTranslations[lang];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to');
    if (to) {
      setGuestName(decodeURIComponent(to));
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 420) {
        setScale(Math.max(0.68, width / 440));
      } else {
        setScale(1);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOpen = () => {
    if (step !== 'idle') return;
    setStep('opening');
    setTimeout(() => {
      setStep('done');
      onOpenComplete();
    }, 6600);
  };

  if (step === 'done') return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden select-none"
      style={{ background: 'radial-gradient(ellipse at center, #1b0f05 0%, #080502 100%)' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Floating Language Toggle - Removed */}

      {/* Subtle ambient golden particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 rounded-full bg-[#D4AF37]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0, 0.65, 0], scale: [0, 1.8, 0] }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Main envelope container */}
      <div
        className="relative flex items-center justify-center cursor-pointer"
        style={{ 
          perspective: '1800px',
          transform: `scale(${scale})`,
          transition: 'transform 0.3s ease'
        }}
        onClick={handleOpen}
      >
        {/* Guest Tag on Envelope Front */}
        <motion.div
          className="absolute top-[12%] left-1/2 z-25 text-center pointer-events-none"
          style={{ x: '-50%' }}
          animate={step === 'opening' ? { opacity: 0, y: -30, scale: 0.8 } : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeIn' }}
        >
          <div className="px-6 py-3 rounded-md bg-[#FDFBF7]/95 border border-[#D4AF37]/50 shadow-[0_12px_30px_rgba(0,0,0,0.15)] flex flex-col items-center min-w-[200px]">
            <span className="text-[#9B7A2B]/85 text-base tracking-[0.25em] uppercase mb-1.5 font-bold font-sans">
              {currentT.especiallyFor}
            </span>
            <span className="font-cursive text-2xl text-[#7A5C2A] px-2 drop-shadow-sm whitespace-nowrap">
              {guestName || currentT.defaultGuest}
            </span>
          </div>
        </motion.div>

        {/* === ENVELOPE BODY === */}
        <motion.div
          className="relative"
          style={{ width: 350, height: 490 }}
          animate={step === 'opening' ? { scale: 1.08, y: 15 } : { scale: 1, y: 0 }}
          transition={{ duration: 1.0, ease: 'easeInOut' }}
        >
          {/* Base Paper backing (revealed behind open card) */}
          <div
            className="absolute inset-0 rounded-sm overflow-hidden shadow-[0_45px_110px_rgba(0,0,0,0.15)]"
            style={{
              background: 'linear-gradient(135deg, #FAF6EE 0%, #EFE9DB 100%)',
            }}
          >
            {/* Soft gold/floral inner lining visible behind the card */}
            <div 
              className="absolute inset-0 opacity-[0.95] mix-blend-multiply"
              style={{
                backgroundImage: 'url(/floral_bg.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            {/* Inner vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.15)_100%)]" />
          </div>

          {/* Gold border frame */}
          <div className="absolute inset-[10px] border border-[#D4AF37]/50 rounded-sm pointer-events-none z-10" />
          <div className="absolute inset-[14px] border border-[#D4AF37]/20 rounded-sm pointer-events-none z-10" />

          <motion.div
            className="absolute inset-4 rounded-sm overflow-hidden z-5 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
            style={{
              backgroundImage: 'url(/floral_bg.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            initial={{ scale: 0.96, opacity: 0 }}
            animate={step === 'opening' ? {
              scale: [0.96, 1, 1, 1.04, 0.95],
              opacity: [0, 1, 1, 1, 0],
            } : { scale: 1, opacity: 1 }}
            transition={{
              duration: 6.6,
              times: [0, 0.2, 0.8, 0.92, 1],
              ease: 'easeInOut',
              delay: 0.3,
            }}
          >

            {/* Elegant light cream tone card lining */}
            <div className="absolute inset-0 bg-[#FDFBF7]/92 mix-blend-lighten" />
            <div className="absolute inset-0 bg-[#FDFBF7]/50 mix-blend-multiply" />
            <div className="absolute inset-[10px] border border-[#D4AF37]/45 rounded-sm pointer-events-none" />
            <div className="absolute inset-[13px] border border-[#D4AF37]/15 rounded-sm pointer-events-none" />
            
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 relative z-10">
              <p className="text-[#9B7A2B] text-[10px] tracking-[0.35em] uppercase mb-5 font-semibold font-sans">
                {currentT.invitation}
              </p>
              <h2 className="font-cursive text-5xl text-[#4d3618] mb-4 leading-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                {currentT.names}
              </h2>
              <div className="w-16 h-px bg-[#D4AF37]/50 mx-auto mb-4" />
              <p className="font-serif text-[#665030] text-sm md:text-[15px] italic tracking-wide leading-relaxed max-w-[260px] mx-auto">
                {currentT.body}
              </p>
              <div className="mt-6 text-[#9B7A2B] text-[11px] tracking-[0.25em] uppercase font-semibold font-sans">
                {currentT.date}
              </div>
            </div>
          </motion.div>

          {/* LEFT FLAP (Vertical gatefold) */}
          <motion.div
            className="absolute top-0 bottom-0 left-0 z-20 overflow-hidden"
            style={{
              width: '50%',
              transformOrigin: 'left center',
              transformStyle: 'preserve-3d',
            }}
            animate={step === 'opening' ? { rotateY: -155 } : { rotateY: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          >
            {/* Flap front face (cream with gold floral pattern) */}
            <div
              className="absolute inset-0 rounded-l-sm overflow-hidden"
              style={{
                backgroundImage: 'url(/floral_bg.png)',
                backgroundSize: '700px 490px',
                backgroundPosition: 'left center',
                backfaceVisibility: 'hidden',
              }}
            >
              <div className="absolute inset-0 bg-[#FAF6EE]/20 mix-blend-multiply" />
              <div className="absolute top-2.5 bottom-2.5 left-2.5 right-0 border-y border-l border-[#D4AF37]/45 rounded-l-sm" />
              {/* Inner edge shading */}
              <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/10 to-transparent" />
            </div>

            {/* Flap back face (luxurious gold lining) */}
            <div
              className="absolute inset-0 rounded-l-sm overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #c59b27 0%, #fef1c9 30%, #b38600 70%, #d4af37 100%)',
                transform: 'rotateY(180deg)',
                backfaceVisibility: 'hidden',
              }}
            >
              <div className="absolute inset-0 opacity-[0.22] mix-blend-overlay"
                style={{
                  backgroundImage: 'url(/floral_bg.png)',
                  backgroundSize: '700px 490px',
                  backgroundPosition: 'left center',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/20" />
              <div className="absolute top-2.5 bottom-2.5 left-0 right-2.5 border-y border-r border-[#D4AF37]/40 rounded-r-sm" />
            </div>
          </motion.div>

          {/* RIGHT FLAP (Vertical gatefold) */}
          <motion.div
            className="absolute top-0 bottom-0 right-0 z-20 overflow-hidden"
            style={{
              width: '50%',
              transformOrigin: 'right center',
              transformStyle: 'preserve-3d',
            }}
            animate={step === 'opening' ? { rotateY: 155 } : { rotateY: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          >
            {/* Flap front face (cream with gold floral pattern) */}
            <div
              className="absolute inset-0 rounded-r-sm overflow-hidden"
              style={{
                backgroundImage: 'url(/floral_bg.png)',
                backgroundSize: '700px 490px',
                backgroundPosition: 'right center',
                backfaceVisibility: 'hidden',
              }}
            >
              <div className="absolute inset-0 bg-[#FAF6EE]/20 mix-blend-multiply" />
              <div className="absolute top-2.5 bottom-2.5 left-0 right-2.5 border-y border-r border-[#D4AF37]/45 rounded-r-sm" />
              {/* Inner edge shading */}
              <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/10 to-transparent" />
            </div>

            {/* Flap back face (luxurious gold lining) */}
            <div
              className="absolute inset-0 rounded-r-sm overflow-hidden"
              style={{
                background: 'linear-gradient(225deg, #c59b27 0%, #fef1c9 30%, #b38600 70%, #d4af37 100%)',
                transform: 'rotateY(180deg)',
                backfaceVisibility: 'hidden',
              }}
            >
              <div className="absolute inset-0 opacity-[0.22] mix-blend-overlay"
                style={{
                  backgroundImage: 'url(/floral_bg.png)',
                  backgroundSize: '700px 490px',
                  backgroundPosition: 'right center',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/10 via-transparent to-black/20" />
              <div className="absolute top-2.5 bottom-2.5 left-2.5 right-0 border-y border-l border-[#D4AF37]/40 rounded-l-sm" />
            </div>
          </motion.div>

          {/* Center seam line shadow */}
          {step === 'idle' && (
            <div className="absolute inset-y-0 left-1/2 w-px bg-black/40 z-25 pointer-events-none -translate-x-1/2" />
          )}

          {/* === GOLD WAX SEAL === */}
          <motion.div
            className="absolute left-1/2 top-1/2 z-30 pointer-events-none"
            style={{ x: '-50%', y: '-50%' }}
            animate={step === 'opening' ? { opacity: 0, scale: 0.25 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeIn' }}
          >
            <motion.div
              animate={step === 'idle' ? { scale: [1, 1.04, 1] } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-36 h-36 flex items-center justify-center"
            >
              {/* Gold glow aura */}
              <div className="absolute inset-0 rounded-full bg-[#D4AF37]/25 blur-xl animate-pulse" />
              {/* Photorealistic Wax Seal image */}
              <img
                src="/wax_seal.png"
                alt="Gold Wax Seal"
                className="w-32 h-32 object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.85)]"
                draggable={false}
              />
            </motion.div>
          </motion.div>

        </motion.div>

        {/* Click to open hint */}
        <AnimatePresence>
          {step === 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="absolute -bottom-16 flex flex-col items-center gap-2.5 pointer-events-none"
            >
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                  <path d="M10 3 L10 17 M4 11 L10 17 L16 11" stroke="#D4AF37" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
              <p className="text-[#D4AF37]/80 text-[11px] tracking-[0.4em] uppercase font-light font-sans">
                {currentT.tapToOpen}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
