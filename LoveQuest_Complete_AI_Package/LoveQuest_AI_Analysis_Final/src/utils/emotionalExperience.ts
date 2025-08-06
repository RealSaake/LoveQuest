/**
 * Emotional Experience Validation System
 * Inspired by the katbday masterpiece - ensures every interaction creates delight
 */

export interface DelightMoment {
  type: 'first_load' | 'interaction' | 'animation' | 'discovery' | 'completion';
  element: string;
  description: string;
  intensity: 'subtle' | 'gentle' | 'magical' | 'spectacular';
  userReaction: 'smile' | 'aww' | 'delight' | 'joy';
  timestamp: number;
}

export interface EmotionalMetrics {
  firstLoadDelight: boolean;
  interactionQuality: number;
  visualHarmony: boolean;
  animationSmoothness: boolean;
  whimsicalElements: number;
  userSmileIndicators: number;
}

class EmotionalExperienceValidator {
  private delightMoments: DelightMoment[] = [];
  private startTime: number = Date.now();

  /**
   * Validates the magical first load experience
   */
  validateFirstLoadMagic(): boolean {
    const loadTime = Date.now() - this.startTime;
    const hasFloatingHearts = document.querySelectorAll('.floating-heart').length > 0;
    const hasSparkles = document.querySelectorAll('.sparkle').length > 0;
    const hasGentleAnimations = this.checkForGentleAnimations();
    
    const firstLoadDelight = {
      quickLoad: loadTime < 3000,
      magicalElements: (hasFloatingHearts ? 1 : 0) + (hasSparkles ? 1 : 0) >= 2,
      gentleAnimations: hasGentleAnimations,
      whimsicalStyling: this.checkWhimsicalStyling(),
    };

    const isDelightful = Object.values(firstLoadDelight).every(Boolean);
    
    if (isDelightful) {
      this.recordDelightMoment({
        type: 'first_load',
        element: 'page',
        description: 'Magical first load with floating hearts and sparkles',
        intensity: 'magical',
        userReaction: 'aww',
        timestamp: Date.now()
      });
    }

    return isDelightful;
  }

  /**
   * Records a moment of delight for analytics
   */
  recordDelightMoment(moment: DelightMoment): void {
    this.delightMoments.push(moment);
    
    // Optional: Send to analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'delight_moment', {
        event_category: 'emotional_experience',
        event_label: moment.type,
        custom_parameter_intensity: moment.intensity,
        custom_parameter_reaction: moment.userReaction
      });
    }
  }

  /**
   * Validates interaction quality
   */
  validateInteractionDelight(element: HTMLElement, interactionType: string): boolean {
    const hasHoverEffect = this.checkHoverEffect(element);
    const hasGentleTransition = this.checkGentleTransition(element);
    const providesVisualFeedback = this.checkVisualFeedback(element);

    const isDelightful = hasHoverEffect && hasGentleTransition && providesVisualFeedback;

    if (isDelightful) {
      this.recordDelightMoment({
        type: 'interaction',
        element: element.className || element.tagName,
        description: `Delightful ${interactionType} interaction`,
        intensity: 'gentle',
        userReaction: 'smile',
        timestamp: Date.now()
      });
    }

    return isDelightful;
  }

  /**
   * Checks for gentle animations using proper easing
   */
  private checkForGentleAnimations(): boolean {
    const computedStyles = Array.from(document.querySelectorAll('*')).map(el => 
      window.getComputedStyle(el)
    );

    return computedStyles.some(style => {
      const transition = style.transitionTimingFunction;
      const animation = style.animationTimingFunction;
      
      // Check for gentle easing curves
      const gentleEasing = [
        'cubic-bezier(0.4, 0, 0.2, 1)', // ease-gentle
        'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // ease-whimsical
        'ease-out',
        'ease-in-out'
      ];

      return gentleEasing.some(easing => 
        transition.includes(easing) || animation.includes(easing)
      );
    });
  }

  /**
   * Checks for whimsical styling elements
   */
  private checkWhimsicalStyling(): boolean {
    const elements = document.querySelectorAll('*');
    let whimsicalCount = 0;

    elements.forEach(el => {
      const style = window.getComputedStyle(el);
      
      // Check for rounded corners
      if (parseFloat(style.borderRadius) >= 12) whimsicalCount++;
      
      // Check for soft shadows
      if (style.boxShadow.includes('rgba') && !style.boxShadow.includes('inset')) {
        whimsicalCount++;
      }
      
      // Check for pastel colors
      const bgColor = style.backgroundColor;
      if (this.isPastelColor(bgColor)) whimsicalCount++;
    });

    return whimsicalCount >= 5;
  }

  /**
   * Checks if a color is in the pastel range
   */
  private isPastelColor(color: string): boolean {
    const pastelColors = [
      'rgb(248, 216, 231)', // blush
      'rgb(255, 229, 212)', // peach
      'rgb(212, 240, 231)', // mint
      'rgb(231, 212, 240)', // lavender
    ];

    return pastelColors.some(pastel => color.includes(pastel));
  }

  /**
   * Checks for hover effects
   */
  private checkHoverEffect(element: HTMLElement): boolean {
    const style = window.getComputedStyle(element);
    return style.cursor === 'pointer' || element.classList.contains('hover:');
  }

  /**
   * Checks for gentle transitions
   */
  private checkGentleTransition(element: HTMLElement): boolean {
    const style = window.getComputedStyle(element);
    const transition = style.transition;
    return transition !== 'none' && parseFloat(style.transitionDuration) > 0;
  }

  /**
   * Checks for visual feedback
   */
  private checkVisualFeedback(element: HTMLElement): boolean {
    // Check if element has transform, scale, or color changes on interaction
    const classList = Array.from(element.classList);
    return classList.some(className => 
      className.includes('hover:') || 
      className.includes('active:') ||
      className.includes('focus:')
    );
  }

  /**
   * Gets emotional experience metrics
   */
  getEmotionalMetrics(): EmotionalMetrics {
    return {
      firstLoadDelight: this.validateFirstLoadMagic(),
      interactionQuality: this.calculateInteractionQuality(),
      visualHarmony: this.checkVisualHarmony(),
      animationSmoothness: this.checkAnimationSmoothness(),
      whimsicalElements: this.countWhimsicalElements(),
      userSmileIndicators: this.delightMoments.length
    };
  }

  /**
   * Calculates overall interaction quality score
   */
  private calculateInteractionQuality(): number {
    const interactiveElements = document.querySelectorAll('button, a, [role="button"]');
    let qualityScore = 0;

    interactiveElements.forEach(el => {
      if (this.validateInteractionDelight(el as HTMLElement, 'click')) {
        qualityScore++;
      }
    });

    return Math.min(100, (qualityScore / interactiveElements.length) * 100);
  }

  /**
   * Checks visual harmony across the interface
   */
  private checkVisualHarmony(): boolean {
    const colorElements = Array.from(document.querySelectorAll('*')).map(el => {
      const style = window.getComputedStyle(el);
      return {
        bg: style.backgroundColor,
        color: style.color,
        border: style.borderColor
      };
    });

    // Check if colors are from our defined palette
    const paletteColors = [
      'rgb(248, 216, 231)', // blush
      'rgb(255, 229, 212)', // peach
      'rgb(212, 240, 231)', // mint
      'rgb(231, 212, 240)', // lavender
      'rgb(46, 46, 46)',    // charcoal
      'rgb(255, 253, 248)'  // ivory
    ];

    let harmoniousCount = 0;
    colorElements.forEach(colors => {
      Object.values(colors).forEach(color => {
        if (color && color !== 'rgba(0, 0, 0, 0)' && 
            paletteColors.some(palette => color.includes(palette))) {
          harmoniousCount++;
        }
      });
    });

    return harmoniousCount > colorElements.length * 0.7;
  }

  /**
   * Checks animation smoothness (60fps target)
   */
  private checkAnimationSmoothness(): boolean {
    // This would require performance monitoring in a real implementation
    // For now, we check if animations use transform properties (GPU accelerated)
    const animatedElements = document.querySelectorAll('[style*="transform"], .animate-');
    
    return animatedElements.length > 0;
  }

  /**
   * Counts whimsical elements throughout the interface
   */
  private countWhimsicalElements(): number {
    let count = 0;
    
    // Count floating hearts
    count += document.querySelectorAll('.floating-heart, [class*="heart"]').length;
    
    // Count sparkles
    count += document.querySelectorAll('.sparkle, [class*="sparkle"]').length;
    
    // Count magical gradients
    const gradientElements = Array.from(document.querySelectorAll('*')).filter(el => {
      const style = window.getComputedStyle(el);
      return style.background.includes('gradient');
    });
    count += gradientElements.length;
    
    // Count rounded elements
    count += document.querySelectorAll('[class*="rounded"]').length;
    
    return count;
  }

  /**
   * The ultimate test - does this make Kat smile?
   */
  doesThisMakeKatSmile(): boolean {
    const metrics = this.getEmotionalMetrics();
    
    return (
      metrics.firstLoadDelight &&
      metrics.interactionQuality > 80 &&
      metrics.visualHarmony &&
      metrics.whimsicalElements > 10 &&
      metrics.userSmileIndicators > 0
    );
  }
}

// Export singleton instance
export const emotionalValidator = new EmotionalExperienceValidator();

// Auto-validate on page load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const result = emotionalValidator.validateFirstLoadMagic();
      console.log('🎨 First Load Magic Validation:', result ? '✨ MAGICAL!' : '❌ Needs more magic');
      
      const smileTest = emotionalValidator.doesThisMakeKatSmile();
      console.log('💕 Does this make Kat smile?', smileTest ? '😊 YES!' : '😐 Needs more love');
    }, 1000);
  });
}