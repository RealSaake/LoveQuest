/**
 * Simple Enhancements - Stable katbday-inspired features
 * These are the core enhancements without complex state management
 */

// Simple emotional validation without complex dependencies
export const validateFirstLoadMagic = () => {
  if (typeof window === 'undefined') return false;
  
  const startTime = performance.now();
  
  setTimeout(() => {
    const loadTime = performance.now() - startTime;
    const hasFloatingHearts = document.querySelectorAll('.floating-heart, [class*="heart"]').length > 0;
    const hasSparkles = document.querySelectorAll('.sparkle, [class*="sparkle"]').length > 0;
    const hasAnimations = document.querySelectorAll('[class*="animate-"]').length > 0;
    
    const isDelightful = loadTime < 3000 && hasFloatingHearts && hasSparkles && hasAnimations;
    
    console.log('🎨 First Load Magic Validation:', {
      loadTime: `${loadTime.toFixed(0)}ms`,
      hasFloatingHearts,
      hasSparkles,
      hasAnimations,
      result: isDelightful ? '✨ MAGICAL!' : '❌ Needs more magic'
    });
    
    // The ultimate test
    const smileTest = isDelightful && hasFloatingHearts && hasSparkles;
    console.log('💕 Does this make Kat smile?', smileTest ? '😊 YES!' : '😐 Needs more love');
    
    return isDelightful;
  }, 1000);
};

// Simple visit tracking
export const trackVisit = () => {
  if (typeof window === 'undefined') return;
  
  const visits = parseInt(localStorage.getItem('lovequest-visits') || '0') + 1;
  localStorage.setItem('lovequest-visits', visits.toString());
  localStorage.setItem('lovequest-last-visit', new Date().toISOString());
  
  console.log(`💕 Welcome back! Visit #${visits}`);
  
  return visits;
};

// Simple delight moment tracking
export const recordDelightMoment = (type: string = 'interaction') => {
  if (typeof window === 'undefined') return;
  
  const moments = parseInt(localStorage.getItem('lovequest-delight-moments') || '0') + 1;
  localStorage.setItem('lovequest-delight-moments', moments.toString());
  
  console.log(`✨ Delight moment #${moments} recorded: ${type}`);
  
  return moments;
};

// Enhanced button click handler
export const createDelightfulClick = (originalHandler: () => void, delightType: string = 'navigation') => {
  return () => {
    recordDelightMoment(delightType);
    originalHandler();
  };
};

// Simple animation helpers
export const getGentleHoverProps = () => ({
  onMouseEnter: () => recordDelightMoment('hover'),
  style: { 
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer'
  }
});

// Auto-initialize on page load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    trackVisit();
    validateFirstLoadMagic();
  });
}