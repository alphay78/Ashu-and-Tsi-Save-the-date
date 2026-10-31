import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MapPin, Heart, Instagram, Send, Phone } from 'lucide-react';
import { DigitalEnvelope } from './components/DigitalEnvelope';

export default function App() {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'am'>('am');
  const [timeLeft, setTimeLeft] = useState({ years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [married, setMarried] = useState(false);

  useEffect(() => {
    const weddingDate = new Date('2026-11-14T08:00:00').getTime();
    const MS_DAY = 1000 * 60 * 60 * 24;
    const MS_YEAR = MS_DAY * 365.25;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance > 0) {
        // ⏳ Counting DOWN to wedding
        setMarried(false);
        setTimeLeft({
          years: 0,
          days: Math.floor(distance / MS_DAY),
          hours: Math.floor((distance % MS_DAY) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        // 🎉 Counting UP since wedding — show years of marriage
        setMarried(true);
        const elapsed = Math.abs(distance);
        const years = Math.floor(elapsed / MS_YEAR);
        const remainder = elapsed % MS_YEAR;
        setTimeLeft({
          years,
          days: Math.floor(remainder / MS_DAY),
          hours: Math.floor((remainder % MS_DAY) / (1000 * 60 * 60)),
          minutes: Math.floor((remainder % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((remainder % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {!envelopeOpen && (
        <DigitalEnvelope
          key="envelope"
          onOpenComplete={() => setEnvelopeOpen(true)}
          lang={lang}
          toggleLang={() => setLang(l => l === 'en' ? 'am' : 'en')}
        />
      )}
      {envelopeOpen && (
    <div className="min-h-screen bg-[#F8F7F5]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl tracking-wider" style={{ fontFamily: 'Great Vibes, cursive' }}>
              A & T
            </div>
            <div className="hidden md:flex gap-8 text-sm tracking-wider uppercase">
              <a href="#home" className="hover:text-[#D4AF37] transition-colors">{lang === 'am' ? 'መነሻ' : 'Home'}</a>
              <a href="#events" className="hover:text-[#D4AF37] transition-colors">{lang === 'am' ? 'ዝግጅቶች' : 'Events'}</a>
              <a href="#gallery" className="hover:text-[#D4AF37] transition-colors">{lang === 'am' ? 'ፎቶዎች' : 'Gallery'}</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative w-full h-screen overflow-hidden">
        {/* Blurred bg — fills wide screens with colour so portrait isn't stretched */}
        <div
          className="absolute inset-0 scale-110"
          style={{
            backgroundImage: `url('/hero.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(10px) brightness(0.7)',
          }}
        />
        {/* Actual portrait — shown at natural width, centred */}
        <img
          src="/hero.jpg"
          alt="Ashu & Tsi"
          className="absolute inset-0 h-full w-auto mx-auto"
          style={{ objectFit: 'contain', objectPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        {/* Text pinned to bottom so couple's faces are fully visible */}
        <div className="absolute bottom-0 left-0 right-0 z-10 text-center text-white px-4 sm:px-8 pb-10 sm:pb-16">

          <h1
            className="mb-4 sm:mb-6 leading-none"
            style={{ fontFamily: 'Great Vibes, cursive', fontSize: 'clamp(3rem, 10vw, 8rem)' }}
          >
            {lang === 'am' ? 'አሹ እና ፂ' : 'Ashu & Tsi'}
          </h1>
          <p className="text-base sm:text-lg mb-5 sm:mb-7 tracking-wide">
            {lang === 'am' ? 'ህዳር 5 ቀን 2019 ዓ.ም' : 'NOVEMBER 14, 2026'}
          </p>
          <button className="bg-[#D4AF37] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full tracking-wider uppercase text-xs sm:text-sm hover:bg-[#C19B2B] transition-colors shadow-lg">
            {lang === 'am' ? 'ተጋብዛችሁዋል' : 'You Are Invited'}
          </button>
        </div>
      </section>

      {/* Countdown & Venue Section */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#D4AF37] mb-1" style={{ fontFamily: 'Great Vibes, cursive', fontSize: '1.8rem' }}>
            {married
              ? (lang === 'am' ? 'ደስታ ሞሉ ዓመታት' : 'Happily Married For')
              : (lang === 'am' ? 'ልንጋባ ቀናት እየቆጠርን ነው' : 'Counting Down To')}
          </p>
          <h2 className="text-2xl sm:text-3xl mb-10" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {married
              ? (lang === 'am' ? 'ቆንጆ ጉዞ አብሮ' : 'A Beautiful Journey Together')
              : (lang === 'am' ? 'ልዩ ቀናችን' : 'Our Special Day')}
          </h2>

          {/* Countdown / Count-up Timer */}
          <div className="flex flex-wrap gap-3 sm:gap-5 justify-center mb-10">
            {(married
              ? [
                  { value: timeLeft.years, label: 'ዓመታት' },
                  { value: timeLeft.days, label: 'ቀናት' },
                  { value: timeLeft.hours, label: 'ሰዓታት' },
                  { value: timeLeft.minutes, label: 'ደቂቃዎች' },
                  { value: timeLeft.seconds, label: 'ሰኮንዶች' },
                ]
              : [
                  { value: timeLeft.days, label: 'ቀናት' },
                  { value: timeLeft.hours, label: 'ሰዓታት' },
                  { value: timeLeft.minutes, label: 'ደቂቃዎች' },
                  { value: timeLeft.seconds, label: 'ሰኮንዶች' },
                ]
            ).map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center bg-[#F8F7F5] border border-[#D4AF37]/30 rounded-xl p-3 sm:p-5 min-w-[60px] sm:min-w-[85px] shadow-sm"
              >
                <span
                  className="font-light text-[#2C2C2C]"
                  style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.5rem, 4vw, 2.6rem)' }}
                >
                  {String(value).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs tracking-widest uppercase text-gray-500 mt-1">{label}</span>
              </div>
            ))}
          </div>

          {/* Venue */}
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-5 sm:px-8 py-2.5 sm:py-3">
            <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
            <span className="text-xs sm:text-sm tracking-wider uppercase text-gray-700 font-medium">
              ኮተቤ ሙሉ ወንጌል ቤተ ክርስቲያን
            </span>
            <span className="text-gray-400 hidden sm:inline">•</span>
            <span className="text-xs sm:text-sm text-gray-500 hidden sm:inline">አዲስ አበባ ኢትዮጵያ</span>
          </div>
        </div>
      </section>

      {/* Dear Family Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
 እግዚአብሔር ታላቅ ነገርን አደረገልን፥ ደስም አለን።        </h2>
        {/* <p className="text-gray-600 italic mb-4">
          እግዚአብሔር ታላቅ ነገርን አደረገልን፥ ደስም አለን።
        </p> */}
        <p className="text-sm tracking-wider mb-6">መዝሙር 126:3</p>
        {/* <p className="text-gray-700 leading-relaxed mb-4">
          <strong>በ ህዳር 5 ቀን 2019 ዓ.ም</strong> ለሚካሄደው ሰርጋችን እንድትገኙ በአክብሮት ጋብዘናችኋል።
          ሥነ ሥርዓቱ <strong>በኮተቤ ሙሉ ወንጌል ቤተ ክርስቲያን</strong> ይካሄዳል፣
        </p> */}
        {/* <p className="text-gray-700 leading-relaxed mb-6">
          <strong>8:00 – 12:00</strong>
        </p> */}
        <div className="mt-8">
          <Heart className="w-12 h-12 mx-auto text-[#D4AF37]" fill="#D4AF37" />
        </div>
     
      </section>

      {/* Calendar Section */}
      <section id="events" className="py-20 px-6 relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/calendar-bg2.jpg')` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8">
          <h3 className="text-3xl text-center mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>ህዳር 2019 ዓ.ም</h3>
          <p className="text-center text-[#D4AF37] mb-6" style={{ fontFamily: 'Great Vibes, cursive', fontSize: '1.5rem' }}>
            ቀኑን ያስቀምጡ
          </p>
          <p className="text-center text-lg font-semibold mb-4 text-[#2C2C2C]">ቅዳሜ ህዳር 5</p>

          {/* November 2026: starts Tuesday with 1, empty first 2 days */}
          <div className="grid grid-cols-7 gap-2 text-center text-sm">
            <div className="font-medium">እሁድ</div>
            <div className="font-medium">ሰኞ</div>
            <div className="font-medium">ማክሰኞ</div>
            <div className="font-medium">ረቡዕ</div>
            <div className="font-medium">ሐሙስ</div>
            <div className="font-medium">ዓርብ</div>
            <div className="font-medium">ቅዳሜ</div>

            <div className="py-2"></div>
            <div className="py-2"></div>
            <div className="py-2">1</div>
            <div className="py-2">2</div>
            <div className="py-2">3</div>
            <div className="py-2">4</div>
            <div className="py-2 bg-[#D4AF37] text-white rounded-full relative">
              5
              <Heart className="w-3 h-3 absolute -top-1 -right-1 text-red-500" fill="currentColor" />
            </div>
            <div className="py-2">6</div>
            <div className="py-2">7</div>
            <div className="py-2">8</div>
            <div className="py-2">9</div>
            <div className="py-2">10</div>
            <div className="py-2">11</div>
            <div className="py-2">12</div>
            <div className="py-2">13</div>
            <div className="py-2">14</div>
            <div className="py-2">15</div>
            <div className="py-2">16</div>
            <div className="py-2">17</div>
            <div className="py-2">18</div>
            <div className="py-2">19</div>
            <div className="py-2">20</div>
            <div className="py-2">21</div>
            <div className="py-2">22</div>
            <div className="py-2">23</div>
            <div className="py-2">24</div>
            <div className="py-2">25</div>
            <div className="py-2">26</div>
            <div className="py-2">27</div>
            <div className="py-2">28</div>
            <div className="py-2">29</div>
            <div className="py-2">30</div>
          </div>
        </div>
      </section>

      {/* Location Map */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-center mb-8" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            ኮተቤ ሙሉ ወንጌል ቤተ ክርስቲያን
          </h2>

          {/* Real Google Maps embed */}
          <div className="rounded-2xl overflow-hidden shadow-lg h-96 mb-8">
            <iframe
              title="Kotebe Full Gospel Church"
              src="https://www.openstreetmap.org/export/embed.html?bbox=38.770%2C9.037%2C38.800%2C9.057&amp;layer=mapnik&amp;marker=9.047%2C38.786"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://www.google.com/maps?daddr=2RJP%2B3VQ,+%E1%8A%A0%E1%8B%B2%E1%88%B5+%E1%8A%A0%E1%89%A0%E1%89%A3"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-white rounded-full hover:bg-[#C19B2B] transition-colors shadow-sm"
            >
              <MapPin className="w-4 h-4" />
              አቅጣጫ ይፈልጉ
            </a>

          </div>
        </div>
      </section>


      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-6 bg-[#F8F7F5]">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-[#D4AF37] mb-2" style={{ fontFamily: 'Great Vibes, cursive', fontSize: '2rem' }}>
        
          </p>
          <h2 className="text-4xl text-center mb-12" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            ትዝታዎቻችን
          </h2>

          {/* Responsive masonry gallery */}
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
            {['/memory-1.jpg', '/memory-2.jpg', '/memory-3.jpg', '/memory-4.jpg', '/memory-5.jpg', '/memory-6.jpg'].map((src, i) => (
              <div key={i} className="break-inside-avoid mb-4">
                <img
                  src={src}
                  alt={`Ashu & Tsi memory ${i + 1}`}
                  className="w-full rounded-2xl object-cover shadow-md hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>








      {/* Footer */}
      <footer className="bg-[#2C2C2C] text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <p className="text-yellow-600 mb-4 leading-relaxed text-3xl" style={{ fontFamily: 'serif' }}>
              እግዚአብሔር ያጣመረውን እንግዲህ ሰው አይለየው።
            </p>
            <p className="text-2xl text-gray-400">ማቴዎስ 19:6</p>
          </div>

          <h2 className="text-15xl mb-6 font-bold" style={{ fontFamily: 'Great Vibes, cursive', fontSize: '8rem' }}>
            Ashu & Tsi
          </h2>

          {/* <p className="text-xs text-gray-400">
            ለልዩ ቀናችን ❤️ ተሰርቷል
          </p> */}
        </div>
      </footer>
    </div>
      )}
    </AnimatePresence>
  );
}