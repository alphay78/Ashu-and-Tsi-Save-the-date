import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, Heart, Camera, MessageSquare, Instagram, Send, Phone } from 'lucide-react';
import { DigitalEnvelope } from './components/DigitalEnvelope';

export default function App() {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'am'>('en');
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
              <a href="#home" className="hover:text-[#D4AF37] transition-colors">Home</a>
              <a href="#story" className="hover:text-[#D4AF37] transition-colors">Our Story</a>
              <a href="#events" className="hover:text-[#D4AF37] transition-colors">Events</a>
              <a href="#gallery" className="hover:text-[#D4AF37] transition-colors">Gallery</a>
              <a href="#schedule" className="hover:text-[#D4AF37] transition-colors">Schedule</a>
              <a href="#rsvp" className="hover:text-[#D4AF37] transition-colors">RSVP</a>
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
          <p className="text-xs sm:text-sm tracking-widest uppercase mb-2 sm:mb-3 opacity-90">We're Getting Married</p>
          <h1
            className="mb-4 sm:mb-6 leading-none"
            style={{ fontFamily: 'Great Vibes, cursive', fontSize: 'clamp(3rem, 10vw, 8rem)' }}
          >
            Ashu & Tsi
          </h1>
          <p className="text-base sm:text-lg mb-5 sm:mb-7 tracking-wide">NOVEMBER 14, 2026</p>
          <button className="bg-[#D4AF37] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full tracking-wider uppercase text-xs sm:text-sm hover:bg-[#C19B2B] transition-colors shadow-lg">
            You Are Invited
          </button>
        </div>
      </section>

      {/* Countdown & Venue Section */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#D4AF37] mb-1" style={{ fontFamily: 'Great Vibes, cursive', fontSize: '1.8rem' }}>
            {married ? 'Happily Married For' : 'Counting Down To'}
          </p>
          <h2 className="text-2xl sm:text-3xl mb-10" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {married ? 'A Beautiful Journey Together' : 'Our Special Day'}
          </h2>

          {/* Countdown / Count-up Timer */}
          <div className="flex flex-wrap gap-3 sm:gap-5 justify-center mb-10">
            {(married
              ? [
                  { value: timeLeft.years, label: 'Years' },
                  { value: timeLeft.days, label: 'Days' },
                  { value: timeLeft.hours, label: 'Hours' },
                  { value: timeLeft.minutes, label: 'Minutes' },
                  { value: timeLeft.seconds, label: 'Seconds' },
                ]
              : [
                  { value: timeLeft.days, label: 'Days' },
                  { value: timeLeft.hours, label: 'Hours' },
                  { value: timeLeft.minutes, label: 'Minutes' },
                  { value: timeLeft.seconds, label: 'Seconds' },
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
              Kotebe Full Gospel Church
            </span>
            <span className="text-gray-400 hidden sm:inline">•</span>
            <span className="text-xs sm:text-sm text-gray-500 hidden sm:inline">Addis Ababa, Ethiopia</span>
          </div>
        </div>
      </section>

      {/* Dear Family Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Dear Family And Friends
        </h2>
        <p className="text-gray-600 italic mb-4">
          "the Lord alone guided him, no foreign god was with him."
        </p>
        <p className="text-sm tracking-wider mb-6">Deuteronomy 32:12</p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Together with our families, we joyfully invite you to celebrate our marriage on <strong>14 November 2026</strong>.
          The ceremony will be held at the <strong>KOTEBE FULL GOSPEL CHURCH</strong>,
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">
          from <strong>8:00 to 12:00 LT</strong>.
        </p>
        <p className="text-gray-700">
          We would be honored to have you share this special day with us.
        </p>
        <div className="mt-8">
          <Heart className="w-12 h-12 mx-auto text-[#D4AF37]" fill="#D4AF37" />
        </div>
      </section>

      {/* Our Love Story */}
      <section id="story" className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-[#D4AF37] mb-2" style={{ fontFamily: 'Great Vibes, cursive', fontSize: '2rem' }}>
            Our Love Story
          </p>
          <h2 className="text-4xl text-center mb-16" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            How It All Began
          </h2>

          <div className="space-y-12">
            {/* Timeline Item 1 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1596457221755-b96bc3a6df18?w=100&h=100&fit=crop"
                  alt="Couple"
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-[#D4AF37] text-sm tracking-wider mb-2">HAMLET 24, 2019 E.C</p>
                <h3 className="text-2xl mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>How We Met</h3>
                <p className="text-gray-600 leading-relaxed">
                  My story with her began at a Christian fellowship program at the university. I met her for the first time when I was invited to preach the Word of God, while she was serving as a leader in the fellowship. From that moment, something about her stayed in my heart, and over the next four years, my feelings for her grew into something truly special.
                </p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="flex gap-6 items-start flex-row-reverse">
              <div className="flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1618566864264-fb013f791da4?w=100&h=100&fit=crop"
                  alt="Couple"
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
              <div className="flex-1 text-right">
                <p className="text-[#D4AF37] text-sm tracking-wider mb-2">MESKEREM 21, 2019 E.C</p>
                <h3 className="text-2xl mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>She Said Yes</h3>
                <p className="text-gray-600 leading-relaxed">
                  With courage and hope, I decided to take a step of faith, and ask her to start dating. As we spent more time getting to know each other and growing closer, she said yes — a moment that filled my heart with joy and marked the beginning of our journey together.
                </p>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1563808599481-34a342e44508?w=100&h=100&fit=crop"
                  alt="Couple"
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-[#D4AF37] text-sm tracking-wider mb-2">MESKEREM 21, 2018 E.C</p>
                <h3 className="text-2xl mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Our Engagement</h3>
                <p className="text-gray-600 leading-relaxed">
                  Exactly one year later, I took another important step and we got engaged! It was a beautiful milestone that strengthened my commitment and deepened my love for her.
                </p>
              </div>
            </div>

            {/* Timeline Item 4 */}
            <div className="flex gap-6 items-start flex-row-reverse">
              <div className="flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1621621667797-e06afc217fb0?w=100&h=100&fit=crop"
                  alt="Couple"
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
              <div className="flex-1 text-right">
                <p className="text-[#D4AF37] text-sm tracking-wider mb-2">TIKIMT 2 — MIYAZIA 24, 2018 E.C</p>
                <h3 className="text-2xl mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Shemglena & Wedding</h3>
                <p className="text-gray-600 leading-relaxed">
                  On Tikimt 2, I formally sent the Shimglena request, honoring our family traditions and bringing both families together in preparation for our future. Now, with a grateful heart and deep love, I joyfully look forward to our wedding on Miyazia 24, 2018 E.C, the beginning of our lifelong journey together.
                </p>
              </div>
            </div>
          </div>
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
          <h3 className="text-3xl text-center mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>November 2026</h3>
          <p className="text-center text-[#D4AF37] mb-6" style={{ fontFamily: 'Great Vibes, cursive', fontSize: '1.5rem' }}>
            Save the Date
          </p>

          {/* November 2026: starts on Sunday */}
          <div className="grid grid-cols-7 gap-2 text-center text-sm">
            <div className="font-medium">Sun</div>
            <div className="font-medium">Mon</div>
            <div className="font-medium">Tue</div>
            <div className="font-medium">Wed</div>
            <div className="font-medium">Thu</div>
            <div className="font-medium">Fri</div>
            <div className="font-medium">Sat</div>

            <div className="py-2">1</div>
            <div className="py-2">2</div>
            <div className="py-2">3</div>
            <div className="py-2">4</div>
            <div className="py-2">5</div>
            <div className="py-2">6</div>
            <div className="py-2">7</div>
            <div className="py-2">8</div>
            <div className="py-2">9</div>
            <div className="py-2">10</div>
            <div className="py-2">11</div>
            <div className="py-2">12</div>
            <div className="py-2">13</div>
            <div className="py-2 bg-[#D4AF37] text-white rounded-full relative">
              14
              <Heart className="w-3 h-3 absolute -top-1 -right-1 text-red-500" fill="currentColor" />
            </div>
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
          <p className="text-center text-[#D4AF37] mb-2" style={{ fontFamily: 'Great Vibes, cursive', fontSize: '2rem' }}>
            Find Us
          </p>
          <h2 className="text-3xl text-center mb-8" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Kotebe Full Gospel Church
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
              Get Directions
            </a>
            <button className="flex items-center gap-2 px-6 py-3 border-2 border-[#D4AF37] text-[#D4AF37] rounded-full hover:bg-[#D4AF37] hover:text-white transition-colors">
              <MapPin className="w-4 h-4" />
              Groom's House
            </button>
            <button className="flex items-center gap-2 px-6 py-3 border-2 border-[#D4AF37] text-[#D4AF37] rounded-full hover:bg-[#D4AF37] hover:text-white transition-colors">
              <MapPin className="w-4 h-4" />
              Bride's House
            </button>
          </div>
        </div>
      </section>


      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-6 bg-[#F8F7F5]">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-[#D4AF37] mb-2" style={{ fontFamily: 'Great Vibes, cursive', fontSize: '2rem' }}>
            Captured Moments
          </p>
          <h2 className="text-4xl text-center mb-12" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Our Memories
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

      {/* Wedding Schedule */}
      <section id="schedule" className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-[#D4AF37] mb-2" style={{ fontFamily: 'Great Vibes, cursive', fontSize: '2rem' }}>
            The Big Day
          </p>
          <h2 className="text-4xl text-center mb-16" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Wedding Schedule
          </h2>

          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center">
                <Camera className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div className="flex-1">
                <p className="text-[#D4AF37] text-sm mb-1">10:00 AM</p>
                <h3 className="text-xl mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Groom & Bride Houses</h3>
                <p className="text-gray-600">Morning photo sessions at both groom's and bride's houses.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div className="flex-1">
                <p className="text-[#D4AF37] text-sm mb-1">1:00 PM</p>
                <h3 className="text-xl mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Bride's House</h3>
                <p className="text-gray-600">Guests gather and move to the bride's house.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div className="flex-1">
                <p className="text-[#D4AF37] text-sm mb-1">2:00 PM</p>
                <h3 className="text-xl mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Church Ceremony</h3>
                <p className="text-gray-600">Holy matrimony ceremony at the church.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center">
                <Camera className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div className="flex-1">
                <p className="text-[#D4AF37] text-sm mb-1">4:00 PM</p>
                <h3 className="text-xl mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Cake & Photos</h3>
                <p className="text-gray-600">Cake cutting and photo session at the church.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="py-20 px-6 bg-[#F8F7F5]">
        <div className="max-w-md mx-auto">
          <p className="text-center text-[#D4AF37] mb-2" style={{ fontFamily: 'Great Vibes, cursive', fontSize: '2rem' }}>
            Be Our Guest
          </p>
          <h2 className="text-4xl text-center mb-12" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            RSVP
          </h2>

          <form className="bg-white rounded-2xl shadow-lg p-8 space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
            <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-gray-700">
              <option>Joyfully Accept</option>
              <option>Regretfully Decline</option>
            </select>
            <textarea
              placeholder="Leave your wishes for the couple..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] resize-none"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-[#D4AF37] text-white py-3 rounded-full tracking-wider uppercase text-sm hover:bg-[#C19B2B] transition-colors"
            >
              Confirm Attendance
            </button>
          </form>
        </div>
      </section>

      {/* Messages from Guests */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-[#D4AF37] mb-2" style={{ fontFamily: 'Great Vibes, cursive', fontSize: '2rem' }}>
            Wishes
          </p>
          <h2 className="text-4xl text-center mb-12" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Messages from Guests
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#F8F7F5] p-6 rounded-lg">
              <h4 className="font-medium mb-2">Yohana sisie</h4>
              <p className="text-sm text-gray-600 italic">
                "OMy my God this is so Heart warming ❤️ I'm so happy for both of you wishing yall beautiful things life you guys are"
              </p>
            </div>
            <div className="bg-[#F8F7F5] p-6 rounded-lg">
              <h4 className="font-medium mb-2">Abraham Mekonnen</h4>
              <p className="text-sm text-gray-600 italic">
                "May God bless your life long journey. May He bless you with his presence and make you fruitful according to His meaningful will"
              </p>
            </div>
            <div className="bg-[#F8F7F5] p-6 rounded-lg">
              <h4 className="font-medium mb-2">Henon Negusedin</h4>
              <p className="text-sm text-gray-600 italic">
                "Ewwww 🥹🥹 you guys look so good together. I wish you all the best in life and may. God be with you in your ups and downs."
              </p>
            </div>
          </div>

          <div className="text-center">
            <button className="inline-flex items-center gap-2 px-8 py-3 border-2 border-[#D4AF37] text-[#D4AF37] rounded-full hover:bg-[#D4AF37] hover:text-white transition-colors">
              <MessageSquare className="w-4 h-4" />
              View All Messages
            </button>
          </div>
        </div>
      </section>

      {/* Guest Photos */}
      <section className="py-20 px-6 bg-[#F8F7F5]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-center text-[#D4AF37] mb-2" style={{ fontFamily: 'Great Vibes, cursive', fontSize: '2rem' }}>
            Shared Memories
          </p>
          <h2 className="text-4xl text-center mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Guest Photos
          </h2>
          <p className="text-gray-600 mb-8">Photos shared by our guests via Telegram</p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button className="inline-flex items-center gap-2 px-8 py-3 border-2 border-[#D4AF37] text-[#D4AF37] rounded-full hover:bg-[#D4AF37] hover:text-white transition-colors">
              <Camera className="w-4 h-4" />
              View Guest Photos
            </button>
            <button className="inline-flex items-center gap-2 px-8 py-3 border-2 border-[#D4AF37] text-[#D4AF37] rounded-full hover:bg-[#D4AF37] hover:text-white transition-colors">
              <Send className="w-4 h-4" />
              Share Your Photos
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2C2C2C] text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <p className="text-yellow-600 mb-4 leading-relaxed" style={{ fontFamily: 'Amharic font, serif' }}>
              እግዚአብሔር ብሎናልን መልካም ነገሮች አስመኝ ፊቶ ንዳለልን አስነሪ አይመልሀንም
              ዘልማጥም።
            </p>
            <p className="text-sm text-gray-400">Psalms 84:12</p>
          </div>

          <h2 className="text-6xl mb-6" style={{ fontFamily: 'Great Vibes, cursive' }}>
            Ashu & Tsi
          </h2>
          <p className="text-sm mb-2">NOVEMBER 14, 2026</p>
          <p className="text-sm text-gray-400 mb-8">Addis Ababa, Ethiopia</p>

          <div className="flex justify-center gap-6 mb-8">
            <a href="#" className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors">
              <Send className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors">
              <Phone className="w-5 h-5" />
            </a>
          </div>

          <p className="text-xs text-gray-400">
            Made with ❤️ for our special day
          </p>
        </div>
      </footer>
    </div>
      )}
    </AnimatePresence>
  );
}