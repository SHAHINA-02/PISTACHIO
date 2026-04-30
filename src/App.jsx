import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import './App.css';

const GlobalCanvasBackground = () => {
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const frameCount = 240;

  // Preload images
  useEffect(() => {
    const loadedImages = [];
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `/images/herosection/ezgif-frame-${String(i).padStart(3, '0')}.png`;
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const { scrollYProgress } = useScroll(); // Tracks entire page scroll

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  const renderFrameRef = useRef(null);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (images.length > 0 && canvasRef.current) {
      const index = Math.round(latest);
      const img = images[index];
      if (img && img.complete) {
        if (renderFrameRef.current) cancelAnimationFrame(renderFrameRef.current);
        renderFrameRef.current = requestAnimationFrame(() => {
          if (!canvasRef.current) return;
          const ctx = canvasRef.current.getContext('2d');
          const canvas = canvasRef.current;
          const hRatio = canvas.width / img.width;
          const vRatio = canvas.height / img.height;
          const ratio = Math.max(hRatio, vRatio);
          const centerShift_x = (canvas.width - img.width * ratio) / 2;
          const centerShift_y = (canvas.height - img.height * ratio) / 2;  
          
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, img.width, img.height,
                        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
        });
      }
    }
  });

  useEffect(() => {
    if (images[0]) {
      images[0].onload = () => {
        const ctx = canvasRef.current.getContext('2d');
        const img = images[0];
        const canvas = canvasRef.current;
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;  
        ctx.drawImage(img, 0, 0, img.width, img.height,
                      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
      };
    }
  }, [images]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        const index = Math.round(frameIndex.get());
        const img = images[index];
        if (img && img.complete) {
          const ctx = canvasRef.current.getContext('2d');
          const canvas = canvasRef.current;
          const hRatio = canvas.width / img.width;
          const vRatio = canvas.height / img.height;
          const ratio = Math.max(hRatio, vRatio);
          const centerShift_x = (canvas.width - img.width * ratio) / 2;
          const centerShift_y = (canvas.height - img.height * ratio) / 2;
          ctx.drawImage(img, 0, 0, img.width, img.height,
                        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
        }
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [images, frameIndex]);

  return (
    <div className="global-canvas-container">
      <canvas ref={canvasRef} className="global-canvas" />
    </div>
  );
};


const HeroContent = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const text1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.2], [0, 1, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.2], [50, 0, 0, -50]);

  const text2Opacity = useTransform(scrollYProgress, [0.25, 0.3, 0.4, 0.45], [0, 1, 1, 0]);
  const text2Y = useTransform(scrollYProgress, [0.25, 0.3, 0.4, 0.45], [50, 0, 0, -50]);

  const text3Opacity = useTransform(scrollYProgress, [0.5, 0.55, 0.65, 0.7], [0, 1, 1, 0]);
  const text3Y = useTransform(scrollYProgress, [0.5, 0.55, 0.65, 0.7], [50, 0, 0, -50]);

  const text4Opacity = useTransform(scrollYProgress, [0.75, 0.8, 0.9, 0.95], [0, 1, 1, 0]);
  const text4Y = useTransform(scrollYProgress, [0.75, 0.8, 0.9, 0.95], [50, 0, 0, -50]);

  return (
    <div ref={sectionRef} className="hero-section">
      <div className="sticky-content-container">
        <div className="canvas-text-overlay">
          <motion.div className="canvas-feature center-feature" style={{ opacity: text1Opacity, y: text1Y }}>
            <h1 className="hero-title">GALAXY STUDIO</h1>
            <p className="hero-subtitle">Engineering Luxury Digital Experiences</p>
          </motion.div>

          <motion.div className="canvas-feature top-left-feature" style={{ opacity: text2Opacity, y: text2Y }}>
            <h2 className="feature-title">High-Performance Rendering</h2>
            <p className="feature-subtitle">60FPS Canvas Image Sequences tailored for modern browsers without compromise.</p>
          </motion.div>

          <motion.div className="canvas-feature bottom-right-feature" style={{ opacity: text3Opacity, y: text3Y }}>
            <h2 className="feature-title">Hardware Acceleration</h2>
            <p className="feature-subtitle">Optimized execution leveraging device GPUs for flawless, butter-smooth scrubbing.</p>
          </motion.div>

          <motion.div className="canvas-feature bottom-left-feature" style={{ opacity: text4Opacity, y: text4Y }}>
            <h2 className="feature-title">Dubai-Ready Standards</h2>
            <p className="feature-subtitle">Impeccable Design & Engineering for the Middle East's elite tech ecosystem.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const DetailsSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"]
  });

  const text1Opacity = useTransform(scrollYProgress, [0.1, 0.2, 0.35, 0.45], [0, 1, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0.1, 0.2, 0.35, 0.45], [50, 0, 0, -50]);

  const text2Opacity = useTransform(scrollYProgress, [0.45, 0.55, 0.7, 0.8], [0, 1, 1, 0]);
  const text2Y = useTransform(scrollYProgress, [0.45, 0.55, 0.7, 0.8], [50, 0, 0, -50]);

  const text3Opacity = useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 1, 1]);
  const text3Y = useTransform(scrollYProgress, [0.8, 0.9, 1], [50, 0, 0]);

  const boxOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const boxScale = useTransform(scrollYProgress, [0, 1], [0.95, 1.05]);

  return (
    <div ref={sectionRef} className="details-section">
      <div className="details-sticky-container">
        
        <motion.div 
          className="details-image-side"
          style={{ scale: boxScale, opacity: boxOpacity }}
        >
          <div className="tech-spec-box">
            <ul>
              <li>React 18 Architecture</li>
              <li>Framer Motion Physics</li>
              <li>Canvas 2D Context Optimization</li>
              <li>requestAnimationFrame Syncing</li>
              <li>Sub-pixel Anti-aliasing</li>
            </ul>
          </div>
        </motion.div>

        <div className="details-text-side">
          <motion.div className="detail-block" style={{ opacity: text1Opacity, y: text1Y }}>
            <h2>The Architecture <br/>of Elegance.</h2>
            <p>We don't just build interfaces. We engineer state-driven visual journeys. Using React and Framer Motion, every pixel is synchronized perfectly to the user's scroll.</p>
          </motion.div>

          <motion.div className="detail-block" style={{ opacity: text2Opacity, y: text2Y }}>
            <h2>Zero Layout<br/>Thrashing.</h2>
            <p>Our pipeline guarantees buttery smooth frame rates by isolating DOM reads and batching writes via perfectly timed requestAnimationFrame loops.</p>
          </motion.div>

          <motion.div className="detail-block" style={{ opacity: text3Opacity, y: text3Y }}>
            <h2>Global Standards.</h2>
            <p>Pre-loaded Asset Pipelines ensure immediate time-to-interactive, delivering uncompromising quality on every network configuration.</p>
            <div className="tech-highlight">100% Lighthouse Score</div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

const UaeEditionSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"]
  });

  const titleScale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1.2]);
  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.8, 1], [0, 0.05, 0.05, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.3], [50, -50]);

  const contentOpacity = useTransform(scrollYProgress, [0.2, 0.3, 0.9, 1], [0, 1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0.2, 0.3, 0.9, 1], [100, 0, 0, -100]);

  const text1Opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.55, 0.65], [0, 1, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0.3, 0.4, 0.55, 0.65], [50, 0, 0, -50]);

  const text2Opacity = useTransform(scrollYProgress, [0.65, 0.75, 1], [0, 1, 1]);
  const text2Y = useTransform(scrollYProgress, [0.65, 0.75, 1], [50, 0, 0]);

  return (
    <div ref={sectionRef} className="uae-section">
      <div className="uae-sticky-container">
        
        <motion.h1 className="uae-title" style={{ scale: titleScale, opacity: titleOpacity, y: titleY }}>
          MENA SCALING
        </motion.h1>

        <motion.div className="uae-content glass-card" style={{ opacity: contentOpacity, y: contentY }}>
          <div className="uae-image-side">
            <h3>Built for the UAE.</h3>
            <p>Designed to meet the rigorous performance and aesthetic demands of Dubai and Abu Dhabi's hyper-competitive tech sectors.</p>
          </div>
          <div className="uae-text-side">
            <motion.div className="uae-detail-block" style={{ opacity: text1Opacity, y: text1Y }}>
              <h2>Seamless Localization</h2>
              <p>RTL-ready architecture capable of handling complex Arabic typography without structural or performance degradation.</p>
            </motion.div>

            <motion.div className="uae-detail-block" style={{ opacity: text2Opacity, y: text2Y }}>
              <h2>Enterprise Grade</h2>
              <p>Ready for deployment across scalable cloud infrastructures, built by engineers who understand the regional market's unique challenges.</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};


function App() {
  return (
    <>
      <GlobalCanvasBackground />
      <main className="content-overlay">
        <HeroContent />
        <DetailsSection />
        <UaeEditionSection />
        <div className="footer-spacer">
          <h3>END OF TRANSMISSION</h3>
        </div>
      </main>
    </>
  );
}

export default App;
