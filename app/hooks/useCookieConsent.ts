'use client';

import { useState, useEffect } from 'react';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

export const defaultCookiePreferences: CookiePreferences = {
  necessary: true, // Always required
  analytics: false,
  marketing: false,
  functional: false,
};

export function useCookieConsent() {
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultCookiePreferences);
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);
  const [consentDate, setConsentDate] = useState<string | null>(null);

  useEffect(() => {
    // Check if running on client side
    if (typeof window === 'undefined') return;

    const consent = localStorage.getItem('cookie-consent');
    const date = localStorage.getItem('cookie-consent-date');
    
    if (consent) {
      try {
        const savedPreferences = JSON.parse(consent);
        setPreferences(savedPreferences);
        setHasConsent(true);
        setConsentDate(date);
      } catch (error) {
        console.error('Error parsing cookie preferences:', error);
        setHasConsent(false);
      }
    } else {
      setHasConsent(false);
    }
  }, []);

  const updatePreferences = (newPreferences: CookiePreferences) => {
    if (typeof window === 'undefined') return;

    const currentDate = new Date().toISOString();
    localStorage.setItem('cookie-consent', JSON.stringify(newPreferences));
    localStorage.setItem('cookie-consent-date', currentDate);
    
    setPreferences(newPreferences);
    setHasConsent(true);
    setConsentDate(currentDate);

    // Initialize or disable tracking based on preferences
    handleAnalytics(newPreferences.analytics);
    handleMarketing(newPreferences.marketing);
    handleFunctional(newPreferences.functional);
  };

  const clearConsent = () => {
    if (typeof window === 'undefined') return;

    localStorage.removeItem('cookie-consent');
    localStorage.removeItem('cookie-consent-date');
    setPreferences(defaultCookiePreferences);
    setHasConsent(false);
    setConsentDate(null);

    // Disable all non-necessary tracking
    handleAnalytics(false);
    handleMarketing(false);
    handleFunctional(false);
  };

  const handleAnalytics = (enabled: boolean) => {
    if (enabled) {
      // Initialize Google Analytics or other analytics
      // Example: gtag('config', 'GA_MEASUREMENT_ID');
      console.log('Analytics tracking enabled');
      
      // You can add your analytics initialization here
      // window.gtag?.('consent', 'update', {
      //   analytics_storage: 'granted'
      // });
    } else {
      // Disable analytics
      console.log('Analytics tracking disabled');
      
      // window.gtag?.('consent', 'update', {
      //   analytics_storage: 'denied'
      // });
    }
  };

  const handleMarketing = (enabled: boolean) => {
    if (enabled) {
      // Initialize marketing pixels (Facebook, Google Ads, etc.)
      console.log('Marketing tracking enabled');
      
      // window.gtag?.('consent', 'update', {
      //   ad_storage: 'granted'
      // });
    } else {
      // Disable marketing tracking
      console.log('Marketing tracking disabled');
      
      // window.gtag?.('consent', 'update', {
      //   ad_storage: 'denied'
      // });
    }
  };

  const handleFunctional = (enabled: boolean) => {
    if (enabled) {
      // Initialize functional cookies (chat widgets, preferences, etc.)
      console.log('Functional cookies enabled');
    } else {
      // Disable functional cookies
      console.log('Functional cookies disabled');
    }
  };

  const isConsentExpired = () => {
    if (!consentDate) return true;
    
    const consentTimestamp = new Date(consentDate).getTime();
    const currentTimestamp = Date.now();
    const oneYear = 365 * 24 * 60 * 60 * 1000; // 1 year in milliseconds
    
    return (currentTimestamp - consentTimestamp) > oneYear;
  };

  const canUseAnalytics = () => preferences.analytics && hasConsent && !isConsentExpired();
  const canUseMarketing = () => preferences.marketing && hasConsent && !isConsentExpired();
  const canUseFunctional = () => preferences.functional && hasConsent && !isConsentExpired();

  return {
    preferences,
    hasConsent,
    consentDate,
    updatePreferences,
    clearConsent,
    isConsentExpired,
    canUseAnalytics,
    canUseMarketing,
    canUseFunctional,
  };
}
