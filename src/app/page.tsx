"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Phone, 
  MessageSquare, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Wrench, 
  Battery, 
  Smartphone, 
  Camera, 
  Volume2,
  Sparkles,
  ChevronRight,
  HelpCircle,
  X,
  Play,
  VolumeX,
  Volume2 as VolumeOn,
  Navigation
} from "lucide-react";

import { siteConfig } from "@/config/site";
import { services, testimonials, faqs } from "@/config/content";
import { getProfile, getPosts, InstagramPost } from "@/utils/media";

const MAPS_DIRECTIONS_URL =
  "https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqBwgCEAAYgAQyCggAEEUYFhgeGDkyBwgBEAAYgAQyBwgCEAAYgAQyCAgDEAAYFhgeMggIBBAAGBYYHjIICAUQABgWGB4yCAgGEAAYFhgeMggIBxAAGBYYHjIICAgQABgWGB4yCAgJEAAYFhge0gEIOTUwNmowajeoAgCwAgA&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KQVvnoCBobY7MdcyGOH74rn8&daddr=beside+Apolo+Pharmacy,+Yadiki,+Andhra+Pradesh+515455";

const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const POSTS_PER_PAGE = 6;

export default function HomePage() {
  const profile = getProfile();
  const allPosts = getPosts();

  // State for FAQ accordion
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  // State for Instagram Post detail modal
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  // Video playback sound control
  const [isMuted, setIsMuted] = useState(true);

  // Load more posts
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const posts = allPosts.slice(0, visibleCount);
  const hasMore = visibleCount < allPosts.length;

  // Map service icons
  const getServiceIcon = (id: string) => {
    switch (id) {
      case "screen":
        return <Smartphone className="w-6 h-6 text-blue-400" />;
      case "battery":
        return <Battery className="w-6 h-6 text-green-400" />;
      case "charging":
        return <Sparkles className="w-6 h-6 text-amber-400" />;
      case "camera":
        return <Camera className="w-6 h-6 text-purple-400" />;
      case "software":
        return <Wrench className="w-6 h-6 text-indigo-400" />;
      case "speaker":
        return <Volume2 className="w-6 h-6 text-rose-400" />;
      default:
        return <Smartphone className="w-6 h-6 text-zinc-400" />;
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-zinc-800 selection:text-white">
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-purple-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* HEADER */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-zinc-900">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-blue-500/20">
              SP
            </div>
            <div>
              <span className="font-heading font-extrabold text-xl tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                {siteConfig.name}
              </span>
              <span className="block text-[10px] text-zinc-400 font-medium tracking-widest uppercase">
                {siteConfig.subName}
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-zinc-400">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#showcase" className="hover:text-white transition-colors">Instagram</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Reviews</a>
            <a href="#location" className="hover:text-white transition-colors">Location</a>
          </nav>

          <div className="flex items-center space-x-3">
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center space-x-2 bg-white text-zinc-950 font-bold px-5 py-2.5 rounded-xl hover:bg-zinc-200 transition-all duration-300 text-sm shadow-md shadow-white/5 active:scale-95"
            >
              <Phone className="w-4 h-4 fill-zinc-950" />
              <span>Call Now</span>
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION — Cinematic full-width highlighting the technician */}
      <section className="relative w-full min-h-[92vh] flex flex-col justify-end overflow-hidden">
        {/* Background — YOU working at the microscope repair station */}
        <div className="absolute inset-0 z-0">
          <img
            src="/photos/post_3906886071364045921_main_2le3ph.jpg"
            alt="SP Mobiles expert technician at work"
            className="w-full h-full object-cover sm:object-center object-right-top"
            onError={(e) => {
              e.currentTarget.src = profile.profilePicUrlHD;
            }}
          />
          {/* Cinematic overlays — strong on left (text side), lighter on right (so your face shows) */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/50 to-transparent" />
        </div>

        {/* Floating thumbnails — top right, showing your work */}
        <div className="absolute top-8 right-6 hidden lg:flex flex-col gap-3 z-10">
          {[
            { src: "/photos/post_3906886071364045921_img_1_ysjjhx.jpg", label: "At the bench" },
            { src: "/photos/post_3911791825128738476_img_1_tthrnq.jpg", label: "Chip repair" },
            { src: "/photos/post_3911116300408311785_main_jn6iob.jpg", label: "Shop display" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
              className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl ring-1 ring-zinc-700/40 hover:ring-blue-500/40 hover:border-blue-400/30 transition-all duration-300"
            >
              <img src={item.src} alt={item.label} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 pb-16 pt-32 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center space-x-2 bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/60 px-3 py-1.5 rounded-full text-xs font-semibold text-zinc-300 w-fit mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Open Now · Yadiki, Andhra Pradesh</span>
            </div>

            {/* Big bold shop name */}
            <h1 className="font-heading font-black text-5xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-none mb-4">
              SP{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                Mobiles
              </span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-300 mt-2 tracking-wide">
                Shasha Professionals
              </span>
            </h1>

            <p className="text-zinc-300 text-lg leading-relaxed mb-8 max-w-xl">
              Expert screen, battery &amp; charging port repairs — done in under{" "}
              <span className="text-white font-bold">30 minutes</span>. Right beside Apollo Pharmacy, Yadiki.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-8 py-4 rounded-2xl shadow-2xl shadow-blue-900/40 transition-all duration-300 active:scale-95"
              >
                <Phone className="w-5 h-5 fill-white" />
                <span>Call to Enquire · {siteConfig.formattedPhone}</span>
              </a>

              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-3 bg-zinc-900/80 backdrop-blur-sm hover:bg-zinc-800 border border-zinc-700 text-zinc-100 font-bold px-8 py-4 rounded-2xl transition-all duration-300 active:scale-95"
              >
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </motion.div>

          {/* Quick Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12 flex flex-wrap gap-x-10 gap-y-4"
          >
            {[
              { value: "30 Min", label: "Average Repair Time" },
              { value: profile.followersCount > 0 ? `${profile.followersCount}+` : "30+", label: "Instagram Followers" },
              { value: "100%", label: "Customer Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-heading font-black text-3xl text-white tracking-tight">{stat.value}</span>
                <span className="text-xs text-zinc-400 mt-0.5 font-medium">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CORE CAPABILITY SECTION */}
      <section className="bg-zinc-950 border-y border-zinc-900 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex space-x-4 p-4">
              <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-blue-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-white">Expert Technician</h3>
                <p className="text-zinc-500 text-sm mt-1">High level precision service for all iPhone, Samsung, OnePlus, Vivo, Oppo, Realme, and Redmi devices.</p>
              </div>
            </div>

            <div className="flex space-x-4 p-4">
              <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-purple-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-white">Under 30 Minutes</h3>
                <p className="text-zinc-500 text-sm mt-1">Most replacements are completed in fifteen to thirty minutes. Avoid leaving your phone overnight.</p>
              </div>
            </div>

            <div className="flex space-x-4 p-4">
              <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-white">Convenient Location</h3>
                <p className="text-zinc-500 text-sm mt-1">Ideally situated beside Apollo Pharmacy in Yadiki. Drop in easily for immediate assistance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs text-blue-400 font-bold uppercase tracking-widest">Our Offerings</span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white mt-2">
            Professional Phone Solutions
          </h2>
          <p className="text-zinc-500 mt-4">
            We use premium spare parts to ensure durability. Price estimates vary by phone model. Please contact us to confirm.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="glass-card p-6 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-zinc-900/80 border border-zinc-800/80 flex items-center justify-center mb-6">
                  {getServiceIcon(service.id)}
                </div>
                <h3 className="font-heading font-bold text-lg text-white">{service.name}</h3>
                <p className="text-zinc-400 text-sm mt-2 leading-relaxed">{service.description}</p>
              </div>

              <div className="mt-6 pt-6 border-t border-zinc-900/60 flex items-center justify-between">
                <div>
                  <span className="block text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Estimated Cost</span>
                  <span className="text-white font-extrabold text-base">{service.estimatedPrice}</span>
                  {service.isGuessed && (
                    <span className="block text-[9px] text-amber-500 font-medium mt-0.5">*Estimate for verification</span>
                  )}
                </div>
                <div className="text-right">
                  <span className="block text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Speed</span>
                  <span className="text-zinc-300 text-xs font-semibold">{service.timeRequired}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Price Notice */}
        <div className="mt-10 glass-panel p-6 rounded-2xl border border-zinc-900 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 flex-shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Need a specific quote for your phone model?</h4>
              <p className="text-zinc-500 text-xs mt-0.5">Call us with your phone model number for an exact quote within seconds.</p>
            </div>
          </div>
          <a
            href={`tel:${siteConfig.phone}`}
            className="flex items-center space-x-2 bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 font-bold px-6 py-2.5 rounded-xl transition-all text-xs flex-shrink-0"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call to Enquire</span>
          </a>
        </div>
      </section>

      {/* INSTAGRAM POSTS SHOWCASE — directly under hero */}
      <section id="showcase" className="py-20 border-b border-zinc-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs text-purple-400 font-bold uppercase tracking-widest">Real Updates</span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white mt-2">
                From Our Instagram
              </h2>
              <p className="text-zinc-500 mt-2 max-w-xl">
                Browse our real service record, products, and repair logs directly from our Instagram page.
              </p>
            </div>
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 md:mt-0 flex items-center space-x-2 bg-zinc-900 border border-zinc-800 hover:border-purple-500/50 text-zinc-300 hover:text-white font-bold text-sm px-4 py-2.5 rounded-xl transition-all group"
            >
              <InstagramIcon className="w-4 h-4 text-purple-400" />
              <span>@{profile.username}</span>
            </a>
          </div>

          {/* Grid of Posts */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                layoutId={`post-${post.id}`}
                onClick={() => {
                  setSelectedPost(post);
                  setActiveMediaIndex(0);
                }}
                className="group relative cursor-pointer rounded-2xl overflow-hidden bg-zinc-900 aspect-square shadow-lg hover:shadow-purple-900/40 hover:shadow-2xl transition-all duration-400 border border-zinc-800/60 hover:border-purple-500/30 hover:glow-purple"
              >
                {/* Media */}
                <div className="absolute inset-0">
                  <img
                    src={post.displayUrl}
                    alt={post.caption || "Instagram update"}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>

                {/* Glow overlay on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
                  }}
                />

                {/* Top badges */}
                <div className="absolute top-3 right-3 flex gap-2">
                  {post.type === "Video" && (
                    <div className="w-7 h-7 rounded-full bg-zinc-950/80 border border-zinc-700 flex items-center justify-center text-white backdrop-blur-sm">
                      <Play className="w-3 h-3 fill-white" />
                    </div>
                  )}
                  {post.childPosts && post.childPosts.length > 1 && (
                    <div className="px-1.5 py-0.5 rounded-md bg-zinc-950/80 border border-zinc-700 text-[10px] font-bold text-zinc-300 backdrop-blur-sm">
                      1/{post.childPosts.length}
                    </div>
                  )}
                </div>

                {/* Hover content */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  {post.caption ? (
                    <p className="text-white text-xs font-semibold line-clamp-2 leading-relaxed">
                      {post.caption}
                    </p>
                  ) : (
                    <p className="text-zinc-400 text-xs italic">Tap to view</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setVisibleCount(v => v + POSTS_PER_PAGE)}
                className="flex items-center space-x-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-purple-500/40 text-zinc-200 font-bold px-8 py-3.5 rounded-2xl transition-all duration-300 text-sm group"
              >
                <InstagramIcon className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                <span>Load More Posts</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-24 max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs text-emerald-400 font-bold uppercase tracking-widest">Customer Reviews</span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white mt-2">
            Loved by locals in Yadiki
          </h2>
          <p className="text-zinc-500 mt-4">
            Do not take our word for it. Read honest feedback from nearby smartphone owners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test) => (
            <div 
              key={test.id} 
              className="glass-card p-8 rounded-3xl relative"
            >
              {/* Star Rating */}
              <div className="flex items-center space-x-1 mb-6">
                {[...Array(test.rating)].map((_, i) => (
                  <Sparkles key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>

              <p className="text-zinc-300 text-sm leading-relaxed italic">
                "{test.text}"
              </p>

              <div className="mt-6 pt-6 border-t border-zinc-900/60 flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-300">
                  {test.name[0]}
                </div>
                <div>
                  <span className="block text-sm font-bold text-white">{test.name}</span>
                  <span className="block text-[11px] text-zinc-500">{test.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQS SECTION */}
      <section className="py-24 bg-zinc-900/10 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-xs text-blue-400 font-bold uppercase tracking-widest">Answers</span>
            <h2 className="font-heading font-extrabold text-3xl text-white mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div 
                  key={faq.id} 
                  className="glass-card rounded-2xl overflow-hidden border border-zinc-900"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between font-bold text-sm sm:text-base text-white hover:bg-zinc-900/40 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronRight 
                      className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${isOpen ? "rotate-90 text-white" : ""}`} 
                    />
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-5 text-sm text-zinc-400 leading-relaxed border-t border-zinc-900/40 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LOCATION & CONTACT SECTION */}
      <section id="location" className="py-24 max-w-6xl mx-auto px-4 border-t border-zinc-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact details */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
            <div>
              <span className="text-xs text-blue-400 font-bold uppercase tracking-widest">Visit Us</span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white mt-2">
                Come to our repair studio
              </h2>
              <p className="text-zinc-500 mt-4 leading-relaxed">
                We diagnose and fix problems immediately on site. Feel free to visit us or call to request directions.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-zinc-900/30 border border-zinc-900">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-sm text-white">Address</h4>
                  <p className="text-zinc-400 text-xs mt-1 leading-relaxed">{siteConfig.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-zinc-900/30 border border-zinc-900">
                <Clock className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-sm text-white">Store Hours</h4>
                  <p className="text-zinc-400 text-xs mt-1">{siteConfig.openingHours}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-zinc-900/30 border border-zinc-900">
                <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-sm text-white">Contact Phone</h4>
                  <p className="text-zinc-400 text-xs mt-1">{siteConfig.formattedPhone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Store photos + Get Directions */}
          <div className="lg:col-span-7">
            <div className="relative w-full aspect-square sm:aspect-video lg:aspect-square rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900">
              <img 
                src="/photos/post_3911116300408311785_img_3_35vflr.jpg" 
                alt="SP Mobiles shop" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = profile.profilePicUrlHD;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-8 left-8 right-8 glass-panel p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="block text-[10px] text-blue-400 font-bold uppercase tracking-widest">Main Landmark</span>
                  <span className="block text-base font-extrabold text-white mt-0.5">Beside Apollo Pharmacy</span>
                  <span className="block text-xs text-zinc-400 mt-0.5">Yadiki, Anantapuram (D), AP</span>
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <a
                    href={MAPS_DIRECTIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl transition-all text-xs shadow-lg active:scale-95"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Directions</span>
                  </a>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="flex items-center space-x-2 bg-zinc-900/80 border border-zinc-700 text-zinc-200 hover:bg-zinc-800 font-bold px-5 py-2.5 rounded-xl transition-all text-xs active:scale-95"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call for Directions</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-12 text-zinc-500 text-xs">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-xs text-white">
              SP
            </div>
            <div>
              <span className="font-heading font-black text-sm text-white tracking-tight">
                {siteConfig.name}
              </span>
              <span className="block text-[8px] text-zinc-400 font-semibold tracking-widest uppercase">
                {siteConfig.subName}
              </span>
            </div>
          </div>

          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} SP Mobiles. All rights reserved. Designed for Shasha Professionals.
          </p>

          <div className="flex space-x-6 text-sm">
            <a 
              href={siteConfig.instagram} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-zinc-500 hover:text-purple-400 transition-colors"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a 
              href={siteConfig.whatsapp} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-zinc-500 hover:text-emerald-400 transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>

      {/* DETAILED POST LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-zinc-950/90 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row z-10 aspect-video md:aspect-[1.8/1] max-h-[85vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-zinc-950/70 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white backdrop-blur-sm"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Media Section (Left/Top) */}
              <div className="relative w-full md:w-3/5 bg-zinc-950 flex items-center justify-center overflow-hidden aspect-square md:aspect-auto md:h-full">
                {/* Check if post is a video */}
                {selectedPost.type === "Video" && selectedPost.videoUrl ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <video
                      src={selectedPost.videoUrl}
                      className="w-full h-full object-contain"
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      controls
                    />
                    {/* Sound Control overlay */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMuted(!isMuted);
                      }}
                      className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-zinc-950/70 border border-zinc-800 flex items-center justify-center text-white backdrop-blur-sm z-20"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <VolumeOn className="w-4 h-4" />}
                    </button>
                  </div>
                ) : (
                  // Carousel display for multi-images / sidecars
                  <div className="relative w-full h-full flex items-center justify-center">
                    {selectedPost.childPosts && selectedPost.childPosts.length > 0 ? (
                      <div className="relative w-full h-full">
                        {/* Selected Child Media */}
                        {selectedPost.childPosts[activeMediaIndex].videoUrl ? (
                          <div className="relative w-full h-full flex items-center justify-center">
                            <video
                              src={selectedPost.childPosts[activeMediaIndex].videoUrl}
                              className="w-full h-full object-contain"
                              autoPlay
                              loop
                              muted={isMuted}
                              playsInline
                              controls
                            />
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsMuted(!isMuted);
                              }}
                              className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-zinc-950/70 border border-zinc-800 flex items-center justify-center text-white backdrop-blur-sm z-20"
                            >
                              {isMuted ? <VolumeX className="w-4 h-4" /> : <VolumeOn className="w-4 h-4" />}
                            </button>
                          </div>
                        ) : (
                          <img
                            src={selectedPost.childPosts[activeMediaIndex].displayUrl}
                            alt="Carousel slide"
                            className="w-full h-full object-contain"
                          />
                        )}

                        {/* Slide Indicator Dots */}
                        {selectedPost.childPosts.length > 1 && (
                          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-1.5 z-20">
                            {selectedPost.childPosts.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => setActiveMediaIndex(idx)}
                                className={`w-1.5 h-1.5 rounded-full transition-all ${idx === activeMediaIndex ? "bg-white w-3" : "bg-white/40"}`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      // Single static image
                      <img
                        src={selectedPost.displayUrl}
                        alt="Instagram post content"
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Info Section (Right/Bottom) */}
              <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-between md:h-full border-t md:border-t-0 md:border-l border-zinc-850 overflow-y-auto">
                <div className="space-y-6">
                  {/* Account detail */}
                  <div className="flex items-center space-x-3">
                    <img
                      src={profile.profilePicUrlHD}
                      alt="Account profile"
                      className="w-8 h-8 rounded-full border border-zinc-700 object-cover"
                    />
                    <div>
                      <span className="block text-sm font-bold text-white">@{profile.username}</span>
                      <span className="block text-[10px] text-zinc-500 font-medium">Yadiki, Anantapuram</span>
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="text-zinc-300 text-sm leading-relaxed max-h-40 overflow-y-auto no-scrollbar">
                    {selectedPost.caption || (
                      <span className="text-zinc-500 italic">No caption provided.</span>
                    )}
                  </div>

                  {/* Hashtags */}
                  {selectedPost.hashtags && selectedPost.hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {selectedPost.hashtags.map((tag, idx) => (
                        <span key={idx} className="text-xs text-blue-400 font-semibold">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-zinc-850 mt-6 space-y-4">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>{selectedPost.likesCount ? `${selectedPost.likesCount} Likes` : ""}</span>
                    <span>{selectedPost.timestamp ? new Date(selectedPost.timestamp).toLocaleDateString() : ""}</span>
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="flex-1 flex items-center justify-center space-x-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 rounded-xl text-xs hover:from-blue-500 hover:to-indigo-500 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 fill-white" />
                      <span>Call to Enquire</span>
                    </a>
                    <a
                      href={selectedPost.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center bg-zinc-800 border border-zinc-750 text-zinc-200 hover:text-white px-3.5 rounded-xl transition-colors"
                    >
                      <InstagramIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
