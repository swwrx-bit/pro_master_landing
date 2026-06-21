// v2.0import React, { useState, useEffect, useRef } from 'react';
import { supabase } from './supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award, Star, Shield, Zap, Phone, MessageCircle, ArrowUp, MapPin,
  Clock, UserCheck, Wrench, Sparkles, Car, Calendar, X, Check,
  ChevronLeft, ChevronRight
} from 'lucide-react';

// Images imports (from public / assets folder)
import logoImg from './assets/logo.png';
import heroBg from './assets/hero_bg.png';
import polishingImg from './assets/service_polishing.png';
import ceramicImg from './assets/service_ceramic.png';
import interiorImg from './assets/service_interior.png';
import ppfImg from './assets/service_ppf.png';
import engineImg from './assets/service_engine.png';
import complexImg from './assets/service_complex.png';

// Services Data
const SERVICES = [
  {
    id: 'polishing',
    name: 'Полировка кузова',
    desc: 'Устранение царапин, восстановление глубины цвета и зеркального блеска лакокрасочного покрытия.',
    image: polishingImg,
    price: 'от 60 000 ₸',
    duration: '1-2 дня',
    details: ['Трехэтапная полировка', 'Удаление до 95% царапин', 'Очистка глиной автоскрабом', 'Финишный блеск-проход']
  },
  {
    id: 'ceramic',
    name: 'Керамическое покрытие',
    desc: 'Долговременная защита кузова от химии, реагентов, ультрафиолета с мощнейшим гидрофобным эффектом.',
    image: ceramicImg,
    price: 'от 120 000 ₸',
    duration: '2 дня',
    details: ['Нанесение в 2-3 слоя', 'Защита от реагентов и УФ', 'Мощнейший гидрофоб', 'Срок службы до 3-х лет']
  },
  {
    id: 'interior',
    name: 'Химчистка салона',
    desc: 'Глубокая очистка всех элементов салона, кожи, текстиля, пластика с полной дезинфекцией.',
    image: interiorImg,
    price: 'от 50 000 ₸',
    duration: '1 день',
    details: ['Разборный детейлинг салона', 'Очистка кожи премиум-составами', 'Сушка турбосушкой', 'Озонация и антисептик']
  },
  {
    id: 'ppf',
    name: 'Защитная пленка (PPF)',
    desc: 'Бронирование кузова ультрапрочной антигравийной полиуретановой пленкой от сколов и царапин.',
    image: ppfImg,
    price: 'от 350 000 ₸',
    duration: '3-4 дня',
    details: ['Полиуретан 190-210 микрон', 'Эффект самовосстановления', 'Защита от гравия и пескоструя', 'Гарантия до 5 лет']
  },
  {
    id: 'engine',
    name: 'Детейлинг двигателя',
    desc: 'Безопасная очистка подкапотного пространства диэлектрическими составами и консервация.',
    image: engineImg,
    price: 'от 25 000 ₸',
    duration: '4-6 часов',
    details: ['Мойка паром и спец-гелем', 'Безопасно для электроники', 'Консервация пластика и резины', 'Антикоррозийный эффект']
  },
  {
    id: 'complex',
    name: 'Комплексный детейлинг',
    desc: 'Полный пакет глубокого восстановления и защиты автомобиля изнутри и снаружи со скидкой.',
    image: complexImg,
    price: 'от 200 000 ₸',
    duration: '3 дня',
    details: ['Полировка + Керамика', 'Детейлинг химчистка салона', 'Консервация дисков и фар', 'Премиум уход в подарок']
  }
];

// Why Choose Us Benefits
const BENEFITS = [
  { icon: Clock, title: 'Более 12 лет опыта', desc: 'Работаем с 2013 года, отточили технологии до совершенства.' },
  { icon: Shield, title: 'Премиум материалы', desc: 'Используем только топовую автохимию Koch Chemie, Gyeon, XPEL.' },
  { icon: UserCheck, title: 'Сертифицированные мастера', desc: 'Наши специалисты регулярно проходят обучение в Германии и Корее.' },
  { icon: Award, title: 'Гарантия на работы', desc: 'Предоставляем официальную гарантию на пленки, керамику и полировку.' },
  { icon: Wrench, title: 'Современное оборудование', desc: 'Светодиодные инспекционные лампы, немецкие полировальные машинки.' },
  { icon: Sparkles, title: 'Индивидуальный подход', desc: 'Подбираем оптимальный комплекс под состояние и бюджет вашего авто.' },
  { icon: Car, title: 'Любой класс автомобилей', desc: 'От повседневных кроссоверов до коллекционных суперкаров.' },
  { icon: Star, title: 'Бесплатная консультация', desc: 'Детальный осмотр кузова под лампами и подбор ухода.' }
];

// Process Timeline Steps
const STEPS = [
  { number: '01', name: 'Заявка', desc: 'Оставьте заявку на сайте или свяжитесь с нами по телефону.' },
  { number: '02', name: 'Консультация', desc: 'Обсуждаем ваши пожелания, делаем предварительную оценку стоимости.' },
  { number: '03', name: 'Осмотр авто', desc: 'Оцениваем состояние ЛКП под инспекционным светом в боксе.' },
  { number: '04', name: 'Выполнение работ', desc: 'Проводим комплекс процедур с соблюдением всех технологических карт.' },
  { number: '05', name: 'Выдача автомобиля', desc: 'Вы принимаете идеально чистый и защищенный автомобиль.' }
];

// Reviews Data
const REVIEWS = [
  { name: 'Аскар М.', rating: 5, date: '3 дня назад', text: 'Заезжал на полировку и покрытие керамикой своего Lexus LX. Результат превзошел все ожидания! Машина блестит лучше, чем из салона. Персонал вежливый, боксы чистые, как хирургическое отделение. Рекомендую!' },
  { name: 'Елена К.', rating: 5, date: '1 неделю назад', text: 'Делала комплексную химчистку салона. Кожа на сиденьях стала мягкой, исчезли все неприятные запахи, салон выглядит как новый. Отдельное спасибо за подарок — антидождь на лобовое стекло!' },
  { name: 'Данияр Т.', rating: 5, date: '2 недели назад', text: 'Поклеил переднюю часть Range Rover в полиуретановую пленку. Сделали очень аккуратно, краев вообще не видно. Мастера настоящие профессионалы. Сервис на высшем уровне!' },
  { name: 'Марат Б.', rating: 5, date: '3 недели назад', text: 'Регулярно привожу свои машины в PRO MASTER. Делал здесь и детейлинг двигателя, и полировку. Всегда идеальный результат. 12 лет опыта говорят сами за себя.' },
  { name: 'Алина С.', rating: 5, date: '1 месяц назад', text: 'Отличная студия! Очень вежливый менеджер, все подробно объяснил, показал примеры работ. Делали комплекс. Машина выглядит дорого и ухоженно. Спасибо!' }
];

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState('polishing');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Gallery Slider
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const galleryImages = [
    { src: heroBg, title: 'Шоурум PRO MASTER' },
    { src: polishingImg, title: 'Идеальная полировка кузова' },
    { src: ceramicImg, title: 'Невероятный гидрофобный эффект' },
    { src: interiorImg, title: 'Детейлинг химчистка салона' },
    { src: ppfImg, title: 'Бронирование кузова полиуретаном' },
    { src: engineImg, title: 'Безупречный детейлинг двигателя' },
    { src: complexImg, title: 'Завершенный комплекс Mercedes G-Class' }
  ];

  const containerRef = useRef(null);

  // Handle local scroll events inside simulated phone or body
  useEffect(() => {
    const handleScroll = (e) => {
      const target = e.target;
      const scrollTop = target.scrollTop;
      if (scrollTop > 100) {
        setScrolled(true);
        setShowScrollTop(true);
      } else {
        setScrolled(false);
        setShowScrollTop(false);
      }
    };

    const scrollContainer = containerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }
    
    // For mobile devices where container doesn't scroll but window does
    const handleWindowScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
        setShowScrollTop(true);
      } else {
        setScrolled(false);
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleWindowScroll);

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, []);


  const handleScrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone) return;

    setSubmitting(true);

    const { error } = await supabase
      .from('salih')
      .insert([{
        name,
        surname,
        phone,
        service: selectedService,
        status: 'new',
        date: new Date().toLocaleString('ru-RU')
      }]);

    console.log('Supabase error:', error)
    console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL)

    if (error) {
      console.error('Ошибка:', error);
      alert('Ошибка при отправке. Попробуйте ещё раз.');
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    setSubmitted(true);

    // Clear inputs
    setName('');
    setSurname('');
    setPhone('');
  };

  const sendToWhatsApp = () => {
    const selectedServiceLabel = SERVICES.find(s => s.id === selectedService)?.name || selectedService;
    const text = `Здравствуйте! Я хочу записаться в PRO MASTER ALMATY.\n\n👤 Имя: ${name} ${surname}\n📞 Телефон: ${phone}\n🚗 Услуга: ${selectedServiceLabel}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/77027776896?text=${encodedText}`, '_blank');
  };

  const handleServiceClick = (serviceId) => {
    setSelectedService(serviceId);
    setShowModal(true);
  };

  const nextSlide = () => {
    setCurrentGalleryIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex justify-center px-0 overflow-x-hidden">
      
      {/* BACKGROUND GLOWS - DESKTOP ONLY */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden hidden md:block">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-gold/5 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[20%] w-[600px] h-[600px] rounded-full bg-gold/5 blur-[150px]" />
      </div>

      {/* MAIN CONTAINER: FULL MOBILE LANDING MAX 480PX */}
      <div 
        ref={containerRef}
        className="relative w-full max-w-[480px] min-h-screen bg-dark-bg flex flex-col border-x border-white/5 shadow-2xl pb-[120px]"
      >

        {/* HEADER */}
        <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] h-20 z-40 px-5 flex items-center justify-between bg-black/80 backdrop-blur-md border-b border-gold/20 shadow-lg shadow-black/50 transition-all duration-300">
          <div className="flex items-center space-x-3">
            <img src={logoImg} alt="PRO MASTER Logo" className="w-11 h-11 object-contain rounded-full border border-gold/30 shadow-gold-glow" />
            <div className="flex flex-col justify-center">
              <span className="font-outfit font-extrabold text-base tracking-widest text-gold leading-none">PRO MASTER</span>
              <span className="text-[10px] tracking-widest text-gray-400 font-urbanist uppercase leading-none mt-1">Almaty</span>
            </div>
          </div>
          <button 
            onClick={() => { setSelectedService('complex'); setShowModal(true); }}
            className="text-xs font-outfit font-semibold px-5 py-2 rounded-full border border-gold/50 text-gold hover:bg-gold hover:text-black transition-all duration-300 shadow-gold-glow active:scale-95"
          >
            Консультация
          </button>
        </header>

        {/* CONTENT */}
        <main className="flex-1 w-full pt-0">
          
          {/* SECTION 1: HERO SCREEN */}
          <section id="hero" className="relative min-h-screen flex flex-col justify-between px-5 pb-12 pt-24 overflow-hidden">
            {/* Background Image with a single smooth gradient overlay */}
            <div className="absolute inset-0 z-0">
              <img src={heroBg} alt="Premium Detailing Box" className="w-full h-full object-cover" />
              {/* Smooth single gradient overlay: transparent at top, solid black-bg at bottom */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/55 to-[#0A0A0A] z-1" />
            </div>

            {/* Top Premium Info Block */}
            <div className="relative z-10 w-full space-y-4">
              {/* Horizontal Marquee */}
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full overflow-hidden py-2 border-y border-gold/15 bg-black/40 backdrop-blur-md rounded-lg"
              >
                <div className="animate-marquee whitespace-nowrap flex space-x-12 text-[9px] tracking-[0.2em] text-gold/80 font-outfit font-bold uppercase">
                  <span>ПОЛИРОВКА • КЕРАМИКА • ХИМЧИСТКА • PPF ПЛЕНКА • ДЕТЕЙЛИНГ • ЗАЩИТА КУЗОВА</span>
                  <span>ПОЛИРОВКА • КЕРАМИКА • ХИМЧИСТКА • PPF ПЛЕНКА • ДЕТЕЙЛИНГ • ЗАЩИТА КУЗОВА</span>
                </div>
              </motion.div>

              {/* Statistics Cards */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="grid grid-cols-3 gap-2.5"
              >
                <div className="glass-premium bg-black/55 rounded-[20px] p-3 flex flex-col items-center justify-center border border-gold/25 shadow-gold-glow text-center h-[75px]">
                  <span className="text-base font-outfit font-black text-gold">12+</span>
                  <span className="text-[9px] text-gray-400 font-light font-manrope leading-tight mt-0.5">лет опыта</span>
                </div>
                <div className="glass-premium bg-black/55 rounded-[20px] p-3 flex flex-col items-center justify-center border border-gold/25 shadow-gold-glow text-center h-[75px]">
                  <span className="text-base font-outfit font-black text-gold">99k+</span>
                  <span className="text-[9px] text-gray-400 font-light font-manrope leading-tight mt-0.5">клиентов</span>
                </div>
                <div className="glass-premium bg-black/55 rounded-[20px] p-3 flex flex-col items-center justify-center border border-gold/25 shadow-gold-glow text-center h-[75px]">
                  <span className="text-base font-outfit font-black text-gold">5700+</span>
                  <span className="text-[9px] text-gray-400 font-light font-manrope leading-tight mt-0.5">работ</span>
                </div>
              </motion.div>
            </div>

            {/* Bottom Content (Title & Subtitle) */}
            <div className="relative z-10 w-full space-y-3.5 mt-auto">
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full glass-premium shadow-gold-glow text-[11px] text-gold font-semibold uppercase tracking-wider"
              >
                <Award className="w-3.5 h-3.5" />
                <span>🏆 Лучший детейлинг 2025</span>
              </motion.div>

              {/* Title */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-3xl sm:text-4xl font-outfit font-extrabold tracking-tight leading-tight"
              >
                Премиальный детейлинг <br />
                <span className="text-gold-gradient">в Алматы</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light font-manrope"
              >
                Более 12 лет возвращаем автомобилям идеальное состояние. Профессиональный уход, керамика, полировка и защита кузова.
              </motion.p>
            </div>
          </section>


          {/* SECTION 2: ABOUT US */}
          <section id="about" className="px-5 pt-20 pb-8 space-y-6 relative">
            <div className="absolute inset-0 gold-glow-radial-sm pointer-events-none" />
            
            {/* Separator removed */}

            <div className="space-y-6">
              {/* Header Label and Title */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="space-y-2"
              >
                <span className="text-[10px] tracking-widest text-gold uppercase font-semibold">О компании</span>
                <h2 className="text-2xl font-outfit font-extrabold tracking-tight">PRO MASTER ALMATY</h2>
              </motion.div>

              {/* Text paragraph */}
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xs text-gray-400 leading-relaxed font-light"
              >
                PRO MASTER ALMATY — профессиональный детейлинг-центр в Алматы с более чем 12-летним опытом работы. Мы специализируемся на полировке, керамической защите, химчистке салона, оклейке защитными пленками и комплексном уходе за автомобилями любого класса.
              </motion.p>

              {/* Stats Grid */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="grid grid-cols-2 gap-3 pt-2"
              >
                <div className="glass rounded-card p-4 flex flex-col justify-between h-[100px] border border-white/5 shadow-premium">
                  <span className="text-2xl font-outfit font-extrabold text-gold">12+ лет</span>
                  <span className="text-[10px] text-gray-400 font-light font-manrope">Опыта в детейлинге</span>
                </div>
                <div className="glass rounded-card p-4 flex flex-col justify-between h-[100px] border border-white/5 shadow-premium">
                  <span className="text-2xl font-outfit font-extrabold text-gold">99 000+</span>
                  <span className="text-[10px] text-gray-400 font-light font-manrope">Довольных клиентов</span>
                </div>
                <div className="glass rounded-card p-4 flex flex-col justify-between h-[100px] border border-white/5 shadow-premium">
                  <span className="text-2xl font-outfit font-extrabold text-gold">5 700+</span>
                  <span className="text-[10px] text-gray-400 font-light font-manrope">Сверх-чистых авто</span>
                </div>
                <div className="glass rounded-card p-4 flex flex-col justify-between h-[100px] border border-white/5 shadow-premium">
                  <div className="flex items-center space-x-1">
                    <span className="text-2xl font-outfit font-extrabold text-gold">5.0</span>
                    <div className="flex text-gold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400 font-light font-manrope">Рейтинг клиентов</span>
                </div>
              </motion.div>
            </div>
          </section>


          {/* SECTION 3: OUR SERVICES */}
          <section id="services" className="px-5 py-8 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] tracking-widest text-gold uppercase font-semibold">Наш сервис</span>
              <h2 className="text-2xl font-outfit font-extrabold tracking-tight">Услуги детейлинга</h2>
            </div>

            <div className="space-y-4">
              {SERVICES.map((service) => (
                <div 
                  key={service.id} 
                  className="group relative rounded-card overflow-hidden h-[180px] flex flex-col justify-end p-4 border border-white/5 shadow-premium"
                >
                  {/* Service Background Image */}
                  <div className="absolute inset-0 z-0">
                    <img src={service.image} alt={service.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]/20" />
                  </div>

                  {/* Service info overlay */}
                  <div className="relative z-10 space-y-1">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-gold" />
                      <h3 className="font-outfit font-bold text-sm sm:text-base text-white">{service.name}</h3>
                    </div>
                    <p className="text-[10px] text-gray-300 font-light line-clamp-2 pr-4">{service.desc}</p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-[11px] font-outfit font-bold text-gold">{service.price}</span>
                      <button 
                        onClick={() => handleServiceClick(service.id)}
                        className="text-[10px] font-outfit font-semibold px-4 py-1.5 rounded-full btn-gold-gradient text-black"
                      >
                        Записаться
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>


          {/* SECTION 4: WHY CHOOSE US */}
          <section id="why-us" className="px-5 py-8 space-y-6 relative">
            <div className="absolute inset-0 gold-glow-radial pointer-events-none" />
            
            <div className="space-y-2">
              <span className="text-[10px] tracking-widest text-gold uppercase font-semibold">Наши преимущества</span>
              <h2 className="text-2xl font-outfit font-extrabold tracking-tight">Почему выбирают нас</h2>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {BENEFITS.map((b, i) => (
                <div key={i} className="glass rounded-card p-4 flex items-start space-x-3 border border-white/5">
                  <div className="p-2 rounded-xl bg-gold/10 text-gold shadow-gold-glow">
                    <b.icon className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-outfit font-bold text-white">{b.title}</h3>
                    <p className="text-[10px] text-gray-400 font-light leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>


          {/* SECTION 5: PROCESS TIMELINE */}
          <section id="process" className="px-5 py-8 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] tracking-widest text-gold uppercase font-semibold">Как мы работаем</span>
              <h2 className="text-2xl font-outfit font-extrabold tracking-tight">Этапы работы</h2>
            </div>

            <div className="relative pl-6 space-y-6 border-l border-gold/20 ml-3 pt-2">
              {STEPS.map((step, idx) => (
                <div key={idx} className="relative space-y-1">
                  {/* Timeline bullet */}
                  <div className="absolute -left-[35px] top-0.5 w-6 h-6 rounded-full glass-premium border border-gold/40 flex items-center justify-center shadow-gold-glow">
                    <span className="text-[9px] font-outfit font-bold text-gold">{step.number}</span>
                  </div>
                  
                  <h3 className="text-xs font-outfit font-bold text-white">{step.name}</h3>
                  <p className="text-[10px] text-gray-400 font-light leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>


          {/* SECTION 6: GALLERY */}
          <section id="gallery" className="px-5 py-8 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] tracking-widest text-gold uppercase font-semibold">Портфолио</span>
              <h2 className="text-2xl font-outfit font-extrabold tracking-tight">Галерея работ</h2>
            </div>

            {/* Carousel Slider */}
            <div className="relative rounded-card overflow-hidden h-[240px] shadow-premium group">
              <img 
                src={galleryImages[currentGalleryIndex].src} 
                alt={galleryImages[currentGalleryIndex].title} 
                className="w-full h-full object-cover" 
              />
              
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0A0A0A] to-transparent p-4">
                <span className="text-[10px] text-gold uppercase tracking-wider font-semibold">Выполненная работа</span>
                <h4 className="text-xs font-outfit font-bold text-white">{galleryImages[currentGalleryIndex].title}</h4>
              </div>

              {/* Slider Arrows */}
              <button 
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full glass text-white hover:text-gold active:scale-90 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full glass text-white hover:text-gold active:scale-90 transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Pagination Dots */}
              <div className="absolute top-3 right-3 flex space-x-1">
                {galleryImages.map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentGalleryIndex ? 'bg-gold w-3' : 'bg-white/40'}`} 
                  />
                ))}
              </div>
            </div>
          </section>


          {/* SECTION 7: REVIEWS */}
          <section id="reviews" className="px-5 py-8 space-y-6 relative">
            <div className="absolute inset-0 gold-glow-radial-sm pointer-events-none" />
            
            <div className="space-y-2">
              <span className="text-[10px] tracking-widest text-gold uppercase font-semibold">Отзывы</span>
              <h2 className="text-2xl font-outfit font-extrabold tracking-tight">Отзывы клиентов</h2>
            </div>

            <div className="space-y-3">
              {REVIEWS.map((review, i) => (
                <div key={i} className="glass rounded-card p-4 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-outfit font-bold text-white">{review.name}</h4>
                      <span className="text-[9px] text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex text-gold">
                      {[...Array(review.rating)].map((_, idx) => (
                        <Star key={idx} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-300 font-light leading-relaxed">
                    «{review.text}»
                  </p>
                  <div className="flex items-center space-x-1 text-[9px] text-gray-400">
                    <span className="text-emerald-500">✓</span>
                    <span>Источник: Google Maps</span>
                  </div>
                </div>
              ))}
            </div>
          </section>


          {/* SECTION 8: CONTACTS */}
          <section id="contacts" className="px-5 py-8 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] tracking-widest text-gold uppercase font-semibold">Связь с нами</span>
              <h2 className="text-2xl font-outfit font-extrabold tracking-tight">Контакты</h2>
            </div>

            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-center space-x-3 p-3 rounded-2xl glass border border-white/5">
                <div className="p-2.5 rounded-xl bg-gold/10 text-gold">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] text-gray-400 block font-light">Адрес студии:</span>
                  <span className="text-xs font-outfit font-bold text-white">Forum, Alma-Ata, Almaty, Kazakhstan</span>
                </div>
              </div>

              {/* Phone */}
              <a href="tel:+77027776896" className="flex items-center space-x-3 p-3 rounded-2xl glass border border-white/5 hover:border-gold/30 transition-all block">
                <div className="p-2.5 rounded-xl bg-gold/10 text-gold">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] text-gray-400 block font-light">Телефон для связи:</span>
                  <span className="text-xs font-outfit font-bold text-white">+7 (702) 777-68-96</span>
                </div>
              </a>

              {/* WhatsApp */}
              <a href="https://wa.me/77027776896" target="_blank" rel="noreferrer" className="flex items-center space-x-3 p-3 rounded-2xl glass border border-white/5 hover:border-emerald-500/30 transition-all block">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <MessageCircle className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <span className="text-[9px] text-gray-400 block font-light">Написать в WhatsApp:</span>
                  <span className="text-xs font-outfit font-bold text-white">+7 (702) 777-68-96</span>
                </div>
              </a>

              {/* Instagram */}
              <a href="https://instagram.com/promasterauto" target="_blank" rel="noreferrer" className="flex items-center space-x-3 p-3 rounded-2xl glass border border-white/5 hover:border-pink-500/30 transition-all block">
                <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-400">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
                <div>
                  <span className="text-[9px] text-gray-400 block font-light">Наш Instagram:</span>
                  <span className="text-xs font-outfit font-bold text-white">@promasterauto</span>
                </div>
              </a>
            </div>

            {/* Google Maps Container */}
            <div className="rounded-card overflow-hidden border border-white/5 h-[200px] shadow-premium relative">
              <iframe 
                src="https://maps.google.com/maps?q=Forum%20Almaty&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(80%)' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </section>

        </main>

        {/* FLOATING ACTION PANEL */}
        <div className="fixed bottom-24 right-4 md:right-[calc(50%-240px+16px)] z-[9999] flex flex-col space-y-3 pointer-events-auto">
          {/* Scroll To Top */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.button 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={handleScrollToTop}
                className="w-11 h-11 rounded-full bg-black/80 text-white flex items-center justify-center border border-white/10 hover:border-gold/50 transition-all shadow-md active:scale-90"
              >
                <ArrowUp className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Call Button */}
          <a 
            href="tel:+77027776896"
            className="w-11 h-11 rounded-full bg-gold text-black flex items-center justify-center border border-gold/50 shadow-gold-glow hover:bg-gold-light active:scale-90 transition-all animate-gold-pulse"
          >
            <Phone className="w-4.5 h-4.5 fill-current" />
          </a>

          {/* WhatsApp Button */}
          <a 
            href="https://wa.me/77027776896"
            target="_blank"
            rel="noreferrer"
            className="w-11 h-11 rounded-full bg-emerald-500 text-white flex items-center justify-center border border-emerald-400/50 shadow-lg hover:bg-emerald-600 active:scale-90 transition-all animate-whatsapp-pulse"
          >
            <MessageCircle className="w-5.5 h-5.5 fill-current" />
          </a>
        </div>

        {/* FIXED BOTTOM CTA PANEL */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-[448px] z-[9999]">
          <button 
            onClick={() => setShowModal(true)}
            className="w-full h-[60px] rounded-full btn-gold-gradient text-black font-outfit text-sm font-extrabold uppercase tracking-widest flex items-center justify-center space-x-2 shadow-gold-glow-lg transition-all active:scale-95"
          >
            <span>🚗 Оставить заявку</span>
          </button>
        </div>

        {/* LEAD GENERATION MODAL */}
        <AnimatePresence>
          {showModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[10000] flex items-end justify-center cursor-pointer"
              onClick={() => { setShowModal(false); setSubmitted(false); }}
            >
              <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="w-full max-w-[480px] bg-[#0E0E0E] rounded-t-[32px] border-t border-gold/20 p-6 space-y-5 flex flex-col cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] text-gold uppercase tracking-widest font-semibold block">Рассчитать стоимость</span>
                    <h3 className="text-lg font-outfit font-extrabold text-white">Заявка на детейлинг</h3>
                  </div>
                  <button 
                    onClick={() => { setShowModal(false); setSubmitted(false); }}
                    className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-white transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {!submitted ? (
                  /* Form */
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    {/* First Name */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold font-manrope">Имя *</label>
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Александр"
                        className="w-full h-[50px] px-4 rounded-input bg-dark-input border border-white/5 text-xs text-white focus:border-gold/50 focus:outline-none transition-all placeholder:text-gray-600 font-manrope"
                      />
                    </div>

                    {/* Surname */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold font-manrope">Фамилия</label>
                      <input 
                        type="text" 
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        placeholder="Иванов"
                        className="w-full h-[50px] px-4 rounded-input bg-dark-input border border-white/5 text-xs text-white focus:border-gold/50 focus:outline-none transition-all placeholder:text-gray-600 font-manrope"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold font-manrope">Телефон *</label>
                      <input 
                        type="tel" 
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+7 (702) 777-68-96"
                        className="w-full h-[50px] px-4 rounded-input bg-dark-input border border-white/5 text-xs text-white focus:border-gold/50 focus:outline-none transition-all placeholder:text-gray-600 font-manrope"
                      />
                    </div>

                    {/* Service Select */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold font-manrope">Выберите услугу</label>
                      <div className="relative">
                        <select 
                          value={selectedService}
                          onChange={(e) => setSelectedService(e.target.value)}
                          className="w-full h-[50px] px-4 rounded-input bg-dark-input border border-white/5 text-xs text-white focus:border-gold/50 focus:outline-none transition-all appearance-none cursor-pointer font-manrope"
                        >
                          {SERVICES.map((service) => (
                            <option key={service.id} value={service.id} className="bg-[#0E0E0E] text-white py-2">
                              {service.name} ({service.price})
                            </option>
                          ))}
                          <option value="other" className="bg-[#0E0E0E] text-white py-2">Другое / Нужен осмотр</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gold text-[10px]">▼</div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit" 
                      disabled={submitting}
                      className="w-full h-[55px] rounded-full btn-gold-gradient text-black font-outfit text-xs font-extrabold tracking-wider uppercase flex items-center justify-center shadow-gold-glow-lg transition-all pt-1 disabled:opacity-50"
                    >
                      {submitting ? 'Отправка...' : 'Отправить заявку'}
                    </button>
                  </form>
                ) : (
                  /* Success State */
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 text-center space-y-5"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                      <Check className="w-8 h-8" />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-base font-outfit font-extrabold text-white">✅ Спасибо за обращение!</h4>
                      <p className="text-[11px] text-gray-400 font-light leading-relaxed max-w-[250px] mx-auto">
                        Наш менеджер свяжется с вами в ближайшее время для подтверждения записи.
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2 pt-2">
                      <button 
                        onClick={sendToWhatsApp}
                        className="w-full h-[50px] rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-outfit text-xs font-bold flex items-center justify-center space-x-2 shadow-lg hover:shadow-emerald-500/20 active:scale-95 transition-all"
                      >
                        <MessageCircle className="w-4 h-4 fill-current" />
                        <span>Дублировать в WhatsApp</span>
                      </button>
                      
                      <button 
                        onClick={() => { setShowModal(false); setSubmitted(false); }}
                        className="w-full h-[50px] rounded-full border border-gold/50 text-gold font-outfit text-xs font-bold tracking-wider uppercase hover:bg-gold/10 active:scale-95 transition-all flex items-center justify-center pt-1"
                      >
                        Вернуться на сайт
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
