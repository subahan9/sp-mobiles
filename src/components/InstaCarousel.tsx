"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { InstagramPost } from "@/utils/media";

interface InstaCarouselProps {
  posts: InstagramPost[];
  onPostClick: (post: InstagramPost, mediaIndex: number) => void;
}

export function InstaCarousel({ posts, onPostClick }: InstaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStart, setDragStart] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const itemsPerView = 3; // Show 3 items at once
  const totalItems = posts.length;
  const maxIndex = Math.ceil(totalItems / itemsPerView) - 1;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragStart(e.clientX);
    setIsDragging(true);
  };

  const handleDragEnd = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    const dragEnd = e.clientX;
    const dragDistance = dragStart - dragEnd;
    
    if (Math.abs(dragDistance) > 50) {
      if (dragDistance > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setDragStart(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    const dragEnd = e.changedTouches[0].clientX;
    const dragDistance = dragStart - dragEnd;
    
    if (Math.abs(dragDistance) > 50) {
      if (dragDistance > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
    setIsDragging(false);
  };

  const visiblePosts = posts.slice(
    currentIndex * itemsPerView,
    (currentIndex + 1) * itemsPerView
  );

  return (
    <div className="w-full">
      {/* Carousel Container */}
      <div
        className="relative overflow-hidden rounded-2xl"
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {visiblePosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                layoutId={`post-${post.id}`}
                onClick={() => onPostClick(post, 0)}
                className="group relative cursor-pointer rounded-2xl overflow-hidden bg-zinc-900 aspect-square shadow-lg hover:shadow-purple-900/40 hover:shadow-2xl transition-all duration-400 border border-zinc-800/60 hover:border-purple-500/30"
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
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(168, 85, 247, 0.2) 0%, transparent 70%)",
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
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-8">
        {/* Dot Indicators */}
        <div className="flex gap-2">
          {[...Array(Math.ceil(totalItems / itemsPerView))].map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentIndex ? "bg-purple-500 w-8" : "bg-zinc-700 w-2"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            />
          ))}
        </div>

        {/* Arrow Buttons */}
        <div className="flex gap-3">
          <motion.button
            onClick={goToPrevious}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-purple-500/50 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            onClick={goToNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-purple-500/50 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
