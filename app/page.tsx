'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion'
import { Heart, Cake, Gift } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'

// Placeholder for your actual images
const memories = [
  '/images/heli.png?height=300&width=400',
  '/images/publix.png?height=400&width=300',
  '/images/christmas.png?height=350&width=350',
  '/images/motherdat.png?height=250&width=400',
  '/images/lobster.png?height=400&width=250',
  '/images/outside.png?height=300&width=300',
  '/images/scuba.png?height=350&width=400',
  '/images/crab.png?height=400&width=350',
  '/images/thumbsup.png?height=300&width=300',
  '/images/sunset.png?height=400&width=400',
  '/images/scrabble.png?height=350&width=300',
  '/images/thug.png?height=300&width=350',
];


const messages = [
  "You're the best mom in the world!",
  "Your love and support mean everything to me.",
  "Thank you for always making my life fun.",
  "I love all our mother son dates <3",
  "Thank you for making me into a seafood lover",
  "You are so special to me, I love you!",
  "You make our family complete.",
  "You are so funny I love spending time with you",
  "Thank you for always being my biggest cheerleader",
  "You taught me what it means to love unconditionally <3 ",
  "Happy birthday to the scrabble queen!",
  "Happy birthday to the best mom ever!",
]

export default function BirthdayCard() {
  const [error, setError] = useState<string | null>(null)
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5], {
    clamp: true
  })
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0], {
    clamp: true
  })

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Error caught:', event.error)
      setError('Oops! Something went wrong. Please try refreshing the page.')
      event.preventDefault()
    }

    window.addEventListener('error', handleError)

    return () => {
      window.removeEventListener('error', handleError)
    }
  }, [])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-pink-600 mb-4">Happy Birthday, Mom!</h1>
          <p className="text-lg text-purple-700 mb-4">{error}</p>
          <Button
            variant="outline"
            size="lg"
            className="bg-white text-pink-600 hover:bg-pink-100"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </Button>
        </div>
      </div>
    )
  }

  const handleScroll = (position: number) => {
      window.scrollTo({ top: position, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-200 overflow-hidden relative">
      <PulsingHearts />
      <motion.header
        className="h-screen flex flex-col items-center justify-center text-center p-8 relative z-10"
        style={{ scale, opacity }}
      >
        <motion.h1
          className="text-6xl font-bold text-pink-600 mb-8"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Happy Birthday, Mom!
        </motion.h1>
        <motion.p
          className="text-2xl text-purple-700"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          From your favorite son,&apos;
        </motion.p>
        <motion.div
          className="mt-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <Button
            variant="outline"
            size="lg"
            className="bg-white text-pink-600 hover:bg-pink-100"
            onClick={() => handleScroll(window.innerHeight)}
          >
            <Cake className="mr-2 h-4 w-4" /> Let's Celebrate!
          </Button>
        </motion.div>
      </motion.header>

      <section className="py-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="relative" style={{ height: '200vh' }}>
            {memories.map((src, index) => (
              <MemoryCard key={index} src={src} message={messages[index]} index={index} />
            ))}
          </div>
        </div>
      </section>

      <footer className="text-center py-16 relative z-10">
        <motion.h2
          className="text-4xl font-bold text-pink-600 mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          You&apos;re the Best Mom Ever!
        </motion.h2>
        <motion.p
          className="text-xl text-purple-700"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          I love you more than words can express. ❤️
        </motion.p>
        <motion.div
          className="mt-8"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Button
            variant="outline"
            size="lg"
            className="bg-white text-purple-600 hover:bg-purple-100"
            onClick={() => handleScroll(0)}
          >
            <Gift className="mr-2 h-4 w-4" /> Back to Top
          </Button>
        </motion.div>
      </footer>
    </div>
  )
}

interface MemoryCardProps {
  src: string;
  message: string;
  index: number;
}

function MemoryCard({ src, message, index }: MemoryCardProps) {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)

  // Add error handling for animation controls
  const handleAnimationError = (error: Error) => {
    console.error('Animation error:', error)
    return null
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible").catch(handleAnimationError)
        }
      },
      { threshold: 0.1 }
    )

    const currentRef = ref.current

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [controls])

  const randomRotation = Math.random() * 30 - 15 // Random rotation between -15 and 15 degrees
  const randomScale = 0.8 + Math.random() * 0.4 // Random scale between 0.8 and 1.2
  const randomX = Math.random() * 100 - 50 // Random X position between -50% and 50%
  const randomY = index * 150 + Math.random() * 100 - 50 // Staggered Y position with some randomness

  const variants = {
    hidden: { 
      opacity: 0, 
      x: index % 2 === 0 ? -100 : 100, // Alternate left and right
      y: randomY + 100,
      rotate: randomRotation,
      scale: randomScale
    },
    visible: { 
      opacity: 1, 
      x: randomX,
      y: randomY,
      rotate: randomRotation,
      scale: randomScale,
      transition: { 
        duration: 1, 
        delay: index * 0.2,
        type: "spring",
        stiffness: 50
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      className="absolute bg-white rounded-lg shadow-lg overflow-hidden w-64 h-80"
      variants={variants}
      initial="hidden"
      animate={controls}
      whileHover={{ scale: 1.1, zIndex: 10 }}
      transition={{ duration: 0.3 }}
      style={{ left: `${(index % 3) * 33}%`, top: 0 }}
    >
      <Image 
        src={src} 
        alt={`Memory ${index + 1}`} 
        width={256}
        height={192}
        className="w-full h-48 object-cover"
      />
      <motion.div 
        className="p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-sm text-gray-800">{message}</p>
      </motion.div>
    </motion.div>
  )
}

function PulsingHearts() {
  const hearts = Array.from({ length: 50 }, (_, i) => i)

  return (
    <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-500 opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ scale: 0 }}
          animate={{
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
            delay: Math.random() * 2,
          }}
        >
          <Heart size={Math.random() * 24 + 12} />
        </motion.div>
      ))}
    </div>
  )
}