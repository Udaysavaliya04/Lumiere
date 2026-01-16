import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Check if near right scrollbar (within 20px of edge) or leaving window
      const isOnScrollbar = e.clientX > window.innerWidth - 20;
      
      if (isOnScrollbar) {
          document.body.style.cursor = 'auto';
          setIsVisible(false);
      } else {
          document.body.style.cursor = 'none';
          setIsVisible(true);
      }
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    window.addEventListener('mousemove', updateMousePosition);
    
    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.body.style.cursor = 'auto'; // Cleanup
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 bg-white border border-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: isVisible ? (isHovered ? 2.5 : 1) : 0,
        opacity: isVisible ? 1 : 0,
        backgroundColor: isHovered ? "#ffffff" : "transparent"
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1
      }}
    />
  );
}
