/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";
import { 
  Globe, 
  Smartphone, 
  Search, 
  Zap, 
  Figma as FigmaIcon, 
  Code, 
  CheckCircle2, 
  ArrowRight,
  Send,
  MessageCircle,
  Mail,
  Linkedin,
  Github,
  Award,
  Instagram,
  Users,
  Briefcase,
  Twitter,
  Calendar,
  ExternalLink,
  Menu,
  X
} from "lucide-react";

// --- Custom Hooks ---

const useMousePosition = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target instanceof Element) {
        // Check if the target or any of its parents have cursor: pointer
        const hasPointer = window.getComputedStyle(target).cursor === "pointer" || 
                         (target.closest('button, a') !== null) ||
                         (window.getComputedStyle(target.parentElement || target).cursor === "pointer");
        setIsPointer(hasPointer);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return { mouseX, mouseY, isPointer };
};

// --- Components ---

const CustomCursor = ({ active }: { active: boolean }) => {
  const { mouseX, mouseY, isPointer } = useMousePosition();
  const springConfig = { damping: 40, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Disable on mobile/tablet for performance
  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

  return (
    <>
      <motion.div
        className="cursor-dot hidden md:block"
        animate={{
          scale: active && !isPointer ? 18 : (isPointer ? 0.3 : 1),
          opacity: 1,
          backgroundColor: active && !isPointer ? "#ffffff" : (isPointer ? "#22D3EE" : "#ffffff")
        }}
        style={{
          left: cursorX,
          top: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: active && !isPointer ? "difference" : "normal",
          zIndex: 9999
        }}
      />
      {(!active || isPointer) && (
        <motion.div
          className="cursor-outline hidden md:block"
          animate={{
            scale: isPointer ? 1.4 : 1,
            opacity: isPointer ? 1 : 0.5,
            borderColor: isPointer ? "#22D3EE" : "rgba(255, 255, 255, 0.3)",
            borderWidth: isPointer ? "2px" : "1px"
          }}
          style={{
            left: cursorX,
            top: cursorY,
            translateX: "-50%",
            translateY: "-50%",
            zIndex: 9998
          }}
        />
      )}
    </>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-auto md:min-w-[500px] max-w-5xl glass px-4 md:px-8 py-2 md:py-3 rounded-2xl md:rounded-full flex items-center justify-between shadow-2xl active:scale-[0.98] transition-transform"
    >
      <div className="text-lg md:text-xl font-black tracking-tighter text-white">M.<span className="text-brand-cyan">Sowrav</span></div>
      
      {/* Desktop Links */}
      <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
        {['Services', 'Portfolio', 'Process', 'About'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-brand-cyan transition-colors">{item}</a>
        ))}
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <a href="#contact" className="hidden md:block bg-white text-black px-6 py-2 rounded-full text-sm font-bold hover:scale-105 active:scale-95 transition-transform">
          Let's Talk
        </a>
        
        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2 glass rounded-xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-full left-0 right-0 mt-3 glass-strong rounded-[2rem] p-6 flex flex-col gap-2 md:hidden border-white/20 shadow-2xl"
        >
          {['Services', 'Portfolio', 'Process', 'About'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              onClick={() => setIsOpen(false)}
              className="text-lg font-semibold text-slate-300 hover:text-brand-cyan py-3 px-4 hover:bg-white/5 rounded-xl transition-all"
            >
              {item}
            </a>
          ))}
          <a href="#contact" onClick={() => setIsOpen(false)} className="bg-brand-cyan text-black py-4 rounded-xl font-bold mt-4 shadow-lg shadow-brand-cyan/20 text-center">
            Let's Talk
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
};

const SkillMarquee = () => {
  const skills = [
    "WordPress", "Elementor", "UI/UX Design", "React.js", "Figma", 
    "SEO", "Performance", "E-commerce", "Branding", "Strategy"
  ];
  
  return (
    <div className="py-8 md:py-20 overflow-hidden bg-white/[0.02] border-y border-white/5">
      <div className="flex whitespace-nowrap animate-marquee-fast">
        {[...skills, ...skills, ...skills].map((skill, i) => (
          <span 
            key={i} 
            className="text-lg md:text-5xl font-black text-white/20 hover:text-brand-cyan/40 transition-colors px-4 md:px-12 uppercase italic tracking-tighter"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

const Hero = ({ onEnterHero, onLeaveHero }: { onEnterHero: () => void, onLeaveHero: () => void }) => (
  <header 
    onMouseEnter={onEnterHero} 
    onMouseLeave={onLeaveHero}
    className="relative pt-24 pb-12 md:pt-48 md:pb-32 px-6 overflow-visible min-h-[85vh] flex items-center"
  >
    {/* Sticky Left Badge */}
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:block">
      <a href="https://wa.me/8801891645612" target="_blank" rel="noreferrer" className="block">
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ x: 10, scale: 1.05 }}
          className="glass-dark px-5 py-3 rounded-full flex items-center gap-3 border border-white/10 shadow-2xl bg-black/60 group cursor-pointer"
        >
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_12px_rgba(34,197,94,0.6)] animate-pulse group-hover:bg-brand-cyan transition-colors" />
          <span className="text-[11px] font-black uppercase tracking-widest text-[#22c55e] group-hover:text-brand-cyan transition-colors">Available for projects</span>
          <ArrowRight size={14} className="text-slate-500 -rotate-45 group-hover:translate-x-1 transition-transform" />
        </motion.div>
      </a>
    </div>

    <div className="max-w-7xl mx-auto relative z-10 w-full">
      <div className="flex flex-col items-center text-center">
        {/* Mobile Status - subtle */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="xl:hidden mb-6"
        >
          <a href="https://wa.me/8801891645612" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-full glass border-white/20 flex items-center gap-3 w-fit mx-auto">
            <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Available for projects</span>
            <ArrowRight size={12} className="text-slate-500" />
          </a>
        </motion.div>

        {/* Circular Avatar Backdrop */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative mb-4"
        >
          <div className="w-28 h-28 md:w-56 md:h-56 rounded-full p-2 bg-white/5 overflow-hidden relative group shadow-[0_0_50px_rgba(255,255,255,0.05)]">
            <img 
              src="https://raw.githubusercontent.com/meharujjamansowrav-source/sowrav/refs/heads/main/public/images/hero.jpg" 
              className="w-full h-full object-cover rounded-full transition-all duration-700"
              alt="Meharujjaman Sowrav"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const fallback = "https://images.unsplash.com/photo-1540569014015-19a7ee504e3a?auto=format&fit=crop&q=80&w=800";
                if (e.currentTarget.src !== fallback) {
                  e.currentTarget.src = fallback;
                }
              }}
            />
          </div>
        </motion.div>

        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-[7.5rem] font-black leading-[1.1] md:leading-[1] tracking-tight mb-6 max-w-6xl text-white py-4"
        >
          Web <span className="text-brand-cyan">Designer</span>
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-base md:text-2xl text-slate-400 max-w-2xl mb-8 leading-relaxed"
        >
          Crafting digital experiences that feel intuitive, look beautiful, and solve real problems with <span className="text-white italic">WordPress & SEO.</span>
        </motion.p>


        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <a href="#portfolio" className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10 hover:bg-brand-cyan">
            View my work
          </a>
          <a href="#about" className="px-8 py-4 rounded-full font-bold text-lg bg-white/5 backdrop-blur-[120px] border border-white/20 hover:bg-white/10 transition-all flex items-center justify-center gap-3 text-white shadow-[0_0_80px_rgba(255,255,255,0.05)] hover:border-brand-cyan/50">
             <Users size={18} /> About me
          </a>
        </motion.div>

        {/* Stats strip */}
        <div className="mt-24 grid grid-cols-3 gap-12 md:gap-24 opacity-60">
          {[
            { label: 'Years', val: '5+' },
            { label: 'Projects', val: '300+' },
            { label: 'Awards', val: '12' },
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="text-3xl md:text-5xl font-black text-white mb-1 group-hover:text-brand-cyan transition-colors">{stat.val}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Ambient Glows */}
    <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-brand-cyan/5 blur-[120px] rounded-full -z-10" />
    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full -z-10" />
  </header>
);

const Services = () => (
  <section id="services" className="py-10 md:py-32 px-6 max-w-7xl mx-auto">
    <div className="mb-10 md:mb-16 text-center">
      <span className="text-brand-cyan font-black uppercase tracking-widest text-[10px] mb-4 block">Our Expertise</span>
      <h2 className="text-4xl md:text-6xl font-black mb-4 text-white tracking-tighter">Core Services</h2>
      <p className="text-slate-400 max-w-lg mx-auto text-sm md:text-base">Expert solutions for your digital growth. We build, optimize, and scale brand experiences.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {[
        { title: 'WordPress Development', icon: <Globe />, text: 'Custom themes and plugin integration tailored to your business needs.' },
        { title: 'Custom Web Design', icon: <Code />, text: 'Unique, high-fidelity designs built from scratch for maximum brand impact.' },
        { title: 'SEO Optimization', icon: <Search />, text: 'Data-driven SEO strategies to dominate rankings and organic visibility.' },
        { title: 'Speed Performance', icon: <Zap />, text: 'Core Web Vitals optimization for blazing-fast user experiences.' },
        { title: 'UI/UX Design', icon: <FigmaIcon />, text: 'Strategic user journeys and visual interfaces built in Figma.' },
        { title: 'AI Integration', icon: <Zap />, text: 'Using cutting-edge AI tools to enhance content and functionality.' },
      ].map((service, i) => (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ y: -10 }}
          key={i} 
          className="glass p-6 md:p-8 rounded-3xl group hover:border-brand-cyan/30 transition-all"
        >
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-brand-cyan group-hover:bg-brand-cyan group-hover:text-black transition-all duration-500">
            {service.icon}
          </div>
          <h3 className="text-xl mb-3 text-white font-bold">{service.title}</h3>
          <p className="text-slate-400 leading-relaxed text-sm">{service.text}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

const Portfolio = () => {
  const [limit, setLimit] = useState(3);
  const items = [
    { title: 'Sophie Paterson', category: 'Interior Design', url: 'https://www.sophiepatersoninteriors.com/', color: 'from-brand-cyan/20', bg: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800' },
    { title: 'Construction Solution', category: 'Corporate', url: 'https://theconstructionsolution.com/', color: 'from-blue-500/20', bg: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800' },
    { title: 'Rokos Technology', category: 'SaaS / Tech', url: 'https://rokostechnology.com/', color: 'from-purple-500/20', bg: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800' },
    { title: 'Slot Predictor AI', category: 'AI Tools', url: 'https://slotpredictorai.com/', color: 'from-cyan-500/20', bg: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800' },
    { title: 'The Max Letters', category: 'Editorial', url: 'https://www.themaxletters.com/', color: 'from-white/10', bg: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800' },
    { title: 'Loft Kings UK', category: 'Real Estate', url: 'https://loftkingsuk.co.uk/', color: 'from-brand-cyan/10', bg: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800' },
  ];

  const visibleItems = items.slice(0, limit);

  return (
    <section id="portfolio" className="py-10 md:py-32 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div className="max-w-2xl text-left">
          <span className="text-brand-cyan font-black uppercase tracking-widest text-[10px] mb-4 block">Recent Works</span>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">My Best <br /> <span className="text-gradient">Work List</span></h2>
        </div>
        <button 
          onClick={() => setLimit(items.length)}
          className="hidden md:flex group items-center gap-3 bg-white/5 hover:bg-white/10 px-8 py-4 rounded-2xl font-bold transition-all shadow-2xl"
        >
          All Works <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        {visibleItems.map((item, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="group relative overflow-hidden rounded-[2.5rem] bg-zinc-900 aspect-video md:aspect-square flex flex-col justify-end border border-white/5 transition-all duration-700"
          >
            {/* Background Image on Hover */}
            <div className="absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity duration-700 grayscale group-hover:grayscale-0">
               <img src={item.bg} className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-1000" />
            </div>

            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:from-black/60 group-hover:via-black/20 transition-all duration-700`} />
            
            <div className="relative p-8 md:p-10 flex flex-col items-start gap-4 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 text-left">
              <span className="text-brand-cyan text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                <div className="w-1 h-1 bg-brand-cyan rounded-full" />
                {item.category}
              </span>
              <h3 className="text-3xl md:text-4xl text-white font-black tracking-tighter leading-[1.1] mb-2">{item.title}</h3>
              <a href={item.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold text-sm tracking-tight w-fit hover:bg-brand-cyan transition-colors shadow-xl group/btn">
                Launch Project <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>


      {limit < items.length && (
        <div className="mt-12 flex justify-center">
          <button 
            onClick={() => setLimit(limit + 3)}
            className="glass px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-cyan hover:text-black transition-all shadow-2xl"
          >
            Load More Works
          </button>
        </div>
      )}
    </section>
  );
};

const About = () => (
  <section id="about" className="py-10 md:py-32 px-6 max-w-7xl mx-auto relative overflow-hidden">
    {/* Decorative Elements */}
    <div className="absolute top-1/4 -right-20 w-80 h-80 bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none" />
    <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center relative z-10">
      <div className="relative group">
        <div className="absolute -top-10 -left-10 w-60 h-60 bg-brand-cyan/10 rounded-full blur-[120px] group-hover:bg-brand-cyan/30 transition-all duration-1000" />
        
        {/* Decorative Grid */}
        <div className="absolute -bottom-6 -right-6 w-32 h-32 opacity-20 pointer-events-none hidden md:block">
           <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: 36 }).map((_, i) => (
                <div key={i} className="w-1 h-1 bg-white rounded-full" />
              ))}
           </div>
        </div>

        <div className="glass rounded-[3.5rem] overflow-hidden aspect-[4/5] md:aspect-square border-2 border-white/10 relative z-10 transition-all duration-700 hover:scale-[1.01] hover:shadow-[0_0_80px_rgba(34,211,238,0.15)] flex items-center justify-center bg-black/40 group/img">
          <img 
            src="https://msoyraf.com/wp-content/uploads/2024/02/01881.3.png" 
            alt="Meharujjaman Sowrav" 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" 
            onError={(e) => {
              const fallback = "https://images.unsplash.com/photo-1540569014015-19a7ee504e3a?auto=format&fit=crop&q=80&w=800";
              if (e.currentTarget.src !== fallback) {
                e.currentTarget.src = fallback;
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover/img:opacity-40 transition-opacity" />
          <div className="absolute bottom-10 left-10 text-brand-cyan group-hover:scale-110 transition-transform">
             <div className="text-5xl md:text-7xl font-black mb-1 p-0 drop-shadow-2xl">5+</div>
             <div className="text-sm md:text-lg uppercase tracking-[0.4em] font-black border-l-4 border-brand-cyan pl-4">Years of Expertise</div>
          </div>
        </div>
      </div>
      <div>
        <span className="text-brand-cyan font-black uppercase tracking-widest text-[10px] mb-4 block">About Me</span>
        <h2 className="text-4xl md:text-6xl font-black mb-8 text-white tracking-tighter">Crafting Digital Solutions That Convert.</h2>
        <div className="space-y-6 text-sm md:text-lg text-slate-400 leading-relaxed">
          <p>I'm Meharujjaman Sowrav, with over 5 years of experience in the WordPress and SEO industry. My approach is simple: I build websites that look amazing and perform even better.</p>
          <p>I don't just design; I strategize. Every pixel and every meta tag is placed with a purpose — to grow your business and build your brand authority.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-white text-[10px] md:text-sm">
             {['WordPress Expert', 'SEO Strategist', 'UI/UX Designer', 'Conversion Specialist'].map((skill) => (
                <div key={skill} className="flex items-center gap-3">
                   <div className="w-5 h-5 rounded-full bg-brand-cyan/10 flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-brand-cyan" />
                   </div>
                   <span className="font-bold">{skill}</span>
                </div>
             ))}
          </div>

          <div className="flex gap-4 pt-8">
            {[
              { icon: Linkedin, url: "https://linkedin.com/in/meharujjaman-sowrav", color: "hover:text-[#0077B5]" },
              { icon: MessageCircle, url: "https://www.facebook.com/meheruzzaman.sowrav/", color: "hover:text-[#1877F2]" },
              { icon: Instagram, url: "https://www.instagram.com/meharuzzaman_sowrav/", color: "hover:text-[#E4405F]" }
            ].map((social, i) => (
              <a 
                key={i} 
                href={social.url} 
                target="_blank" 
                rel="noreferrer"
                className={`w-12 h-12 glass rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all group scale-100 hover:scale-110 ${social.color}`}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Process = () => (
  <section id="process" className="py-10 md:py-32 px-6 max-w-7xl mx-auto overflow-hidden">
    <div className="text-center mb-12 md:mb-20">
      <span className="text-brand-cyan font-black uppercase tracking-widest text-[10px] mb-4 block">My Process</span>
      <h2 className="text-4xl md:text-6xl font-black mb-4 text-white tracking-tighter">My Workflow</h2>
      <p className="text-slate-400 max-w-lg mx-auto text-sm">A systematic approach to digital success that ensures quality results.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative">
      <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 hidden lg:block -translate-y-1/2 -z-10" />
      {[
        { step: '01', title: 'Strategy', text: 'Researching your market and defining goals.' },
        { step: '02', title: 'Design', text: 'Creating modern, high-fidelity prototypes.' },
        { step: '03', title: 'Build', text: 'Developing SEO-ready WordPress sites.' },
        { step: '04', title: 'Growth', text: 'Optimizing for performance and ranking.' },
      ].map((item, i) => (
        <motion.div 
          whileHover={{ y: -10 }}
          key={i} 
          className="glass p-8 md:p-10 rounded-3xl text-center relative group overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-brand-cyan scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
          <span className="text-6xl font-black text-white/5 absolute -right-4 -bottom-4 group-hover:text-brand-cyan/10 transition-colors">{item.step}</span>
          <h3 className="text-2xl mb-4 text-white relative font-bold">{item.title}</h3>
          <p className="text-slate-500 text-sm">{item.text}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappNumber = "8801891645612";
    const text = `Hello Meharujjaman, I am ${formData.name}. ${formData.message}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="contact" className="py-6 md:py-32 px-4 md:px-6 max-w-5xl mx-auto">
      <div className="glass rounded-[2rem] md:rounded-[3rem] p-6 md:p-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-cyan/5 blur-3xl -z-10" />
        <span className="text-brand-cyan font-black uppercase tracking-widest text-[10px] mb-6 block">Get in Touch</span>
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 md:mb-8 tracking-tighter">Let's build something <span className="text-brand-cyan italic">amazing</span> together.</h2>
        <p className="text-slate-400 text-sm md:text-lg mb-8 md:mb-12 max-w-2xl mx-auto">Currently accepting new projects. Let's discuss your vision and make it a reality.</p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mb-12 flex-wrap items-center">
            <a href="mailto:meharujjaman.sowrav@gmail.com" className="bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold text-sm md:text-lg flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all w-full sm:w-auto shadow-xl shadow-white/10">
              <Mail size={18} /> Email Me
            </a>
            <a href="https://wa.me/8801891645612" target="_blank" rel="noreferrer" className="glass px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold text-sm md:text-lg flex items-center justify-center gap-3 hover:bg-white/5 transition-all group w-full sm:w-auto">
              <MessageCircle size={18} className="text-brand-cyan group-hover:animate-bounce" /> WhatsApp
            </a>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
           <input 
             required
             type="text" 
             placeholder="Your Name" 
             className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-4 focus:outline-none focus:border-brand-cyan transition-colors text-sm"
             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
           />
           <input 
             required
             type="email" 
             placeholder="Email Address" 
             className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-4 focus:outline-none focus:border-brand-cyan transition-colors text-sm"
             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
           />
           <textarea 
             required
             placeholder="Tell me about your project" 
             rows={3} 
             className="md:col-span-2 w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-4 focus:outline-none focus:border-brand-cyan transition-colors text-sm"
             onChange={(e) => setFormData({ ...formData, message: e.target.value })}
           />
           <button type="submit" className="md:col-span-2 bg-brand-cyan text-black py-4 md:py-5 rounded-xl font-black uppercase tracking-widest text-[10px] hover:translate-y-px transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-cyan/20">
             Send Message <Send className="w-3 h-3" />
           </button>
        </form>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="pt-20 pb-12 px-6 border-t border-white/5">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-start">
        {/* Left Side */}
        <div className="lg:col-span-7">
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-[0.95] tracking-tighter text-white">
            Let's create something <br /> amazing together
          </h2>
          <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-xl">
            Ready to bring your vision to life? I'd love to hear about your project and explore how we can work together.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-10">
            <a href="https://wa.me/8801891645612" target="_blank" rel="noreferrer" className="glass px-6 md:px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-white/10 transition-all w-fit text-xs sm:text-sm md:text-base">
              <MessageCircle size={18} className="text-brand-cyan" /> WhatsApp Me
            </a>
          </div>
        </div>

        {/* Right Side - Quick Links */}
        <div className="lg:col-span-5 w-full">
          <div className="glass p-10 md:p-12 rounded-[2.5rem] relative overflow-hidden border-white/10">
            <h3 className="text-xl font-black mb-8 uppercase tracking-widest text-slate-500">Quick Links</h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-8">
              {[
                { label: 'Work', href: '#portfolio' },
                { label: 'About', href: '#about' },
                { label: 'Process', href: '#process' },
                { label: 'Services', href: '#services' },
                { label: 'Resume', href: '#' },
                { label: 'Case Studies', href: '#' },
                { label: 'Speaking', href: '#' },
                { label: 'Mentoring', href: '#' },
              ].map((link) => (
                <a key={link.label} href={link.href} className="text-base font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-2 group">
                  {link.label}
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-brand-cyan" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 glass rounded-lg flex items-center justify-center text-sm font-black text-brand-cyan border-white/10 uppercase">Sowrav</div>
          <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">© 2024 Meharujjaman Sowrav. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
          <div className="flex gap-4">
            {[
              { icon: Mail, url: "mailto:meharujjaman.sowrav@gmail.com", color: "hover:text-brand-cyan" },
              { icon: Linkedin, url: "https://linkedin.com/in/meharujjaman-sowrav", color: "hover:text-[#0077B5]" },
              { icon: MessageCircle, url: "https://www.facebook.com/meheruzzaman.sowrav/", color: "hover:text-[#1877F2]" },
              { icon: Instagram, url: "https://www.instagram.com/meharuzzaman_sowrav/", color: "hover:text-[#E4405F]" }
            ].map((social, i) => (
              <a key={i} href={social.url} target="_blank" rel="noreferrer" className={`text-slate-500 transition-all hover:scale-110 ${social.color}`}>
                <social.icon size={16} />
              </a>
            ))}
          </div>
          <div className="h-4 w-px bg-white/10" />
          <span className="flex items-center gap-2">Crafted by <span className="text-white hover:text-brand-cyan cursor-pointer transition-colors font-black tracking-tighter text-sm">Sowrav</span></span>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [heroActive, setHeroActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen selection:bg-brand-cyan/30">
      <CustomCursor active={heroActive} />
      <Navbar />
      <Hero 
        onEnterHero={() => setHeroActive(true)} 
        onLeaveHero={() => setHeroActive(false)} 
      />
      <SkillMarquee />
      <Services />
      <Portfolio />
      <About />
      <Process />
      <Contact />
      <Footer />
    </div>
  );
}
