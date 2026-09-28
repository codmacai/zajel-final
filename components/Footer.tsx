'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

// ==========================================
// SVG COMPONENTS & GRAPHICS
// ==========================================
const Logo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <div className="flex items-center gap-3 flex-shrink-0">
      <svg width="150" height="35" viewBox="434 388 1052 304" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path fill="#36B936" d="M1086.07,456.18c-17.92,0-26.17,9.76-31.62,16.22l-15.02,17.58l11.41,9.24l12.1-13.92
      c7.18-9.18,14.97-13.83,23.14-13.83c8.35,0,12.16,5.27,13.58,8.01c-13.56,3.24-27.85,14.35-27.85,36.04
      c0,28.6-7.64,46.97-25.49,61.07c1.13-3.48,2.1-6.95,2.88-10.34c5.95-26.04,0.41-46.49-16.03-59.14
      c-30.93-23.81-106.81-80.6-121.71-91.75l-9.85-7.36l-2.59,11.53c-0.38,1.7-3.67,17.26-3.24,37.5c0.59,28.09,8.29,51.46,22.27,67.59
      c15.08,17.4,37.18,26.69,65.7,27.65c-17.95,19.88-49.92,55.24-57.82,63.98l-14.04,15.53l18.25-0.78
      c14.03-0.9,38.51-4.62,58.42-10.09c5.67-8.96,12.82-19.88,12.82-19.88l-0.73,0.26c-16.35,5.8-39.21,10.9-52.01,12.64
      c18.54-20.51,53.75-59.47,58.38-64.63l12.76-14.21l-19.04,1.48c-32.33,2.53-56.26-4.84-71.1-21.93
      c-20.29-23.36-19.77-59.64-17.53-79.69c20.03,14.99,84.16,63.05,111.73,84.28c14.58,11.23,13.61,30.4,10.23,44.51
      c-3.76,15.7-11.13,28.61-11.2,28.74l-12.22,21.18l22.51-10.66c28.42-15.6,53.92-34.02,53.92-87.49c0-15.09,10.99-21.85,21.87-21.85
      h7.65v-7.65C1116.6,467.59,1100.76,456.18,1086.07,456.18"/>
          <polygon fill="#132818" points="454.16,631.84 454.16,614.24 515.31,550.03 454.96,550.03 454.96,532.8 538.53,532.8 538.53,550.1 
      538.4,550.14 478.19,614.52 540.54,614.52 540.54,631.84  "/>
          <path fill="#132818" d="M760.01,632.86c-4.35,0-8.7-0.47-12.94-1.4c-14.15-3.1-25.88-11.5-33.03-23.64
      c-7.23-12.28-8.88-26.78-4.67-40.83c5.36-17.87,19.52-30.94,36.97-34.1c2.78-0.5,5.59-0.76,8.35-0.76
      c13.7,0,26.01,6.03,34.67,16.98c8.91,11.29,12.64,25.78,10.51,40.87l-72.07,0.06l0.06,0.42c1.32,9.3,7.89,17.28,17.56,21.36
      c4.82,2.03,10.01,3.06,15.45,3.06h0c10.77,0,22.72-4.17,33.72-11.75l-0.14,19.5C784.18,629.21,772.22,632.86,760.01,632.86z
       M754.8,549.95c-3.79,0-7.6,0.77-11.32,2.27c-8.32,3.38-14.35,11.67-16.12,22.17l-0.07,0.43l53.98,0.03l-0.06-0.42
      c-0.96-7.14-4.1-13.32-9.34-18.36C766.97,552.06,761.07,549.95,754.8,549.95z"/>
          <path fill="#132818" d="M1454.71,493.72c-1.35,0-2.68,0.25-3.95,0.73c-2.78,1.05-4.98,3.13-6.2,5.84c-1.22,2.71-1.3,5.74-0.25,8.52
      c1.63,4.29,5.81,7.18,10.41,7.18l0,0c1.35,0,2.68-0.25,3.96-0.73c5.73-2.18,8.63-8.62,6.44-14.36
      C1463.49,496.61,1459.3,493.72,1454.71,493.72z"/>
          <path fill="#132818" d="M680.31,493.6c-1.35,0-2.68,0.25-3.95,0.73c-2.78,1.06-4.98,3.13-6.2,5.85c-1.22,2.71-1.31,5.73-0.25,8.51
      c1.63,4.29,5.81,7.18,10.41,7.18l0,0c1.35,0,2.68-0.25,3.95-0.73c2.78-1.05,4.98-3.13,6.2-5.84c1.22-2.71,1.31-5.74,0.25-8.52
      C689.09,496.49,684.91,493.6,680.31,493.6z"/>
          <path fill="#132818" d="M633.12,671.98v-16.31l7.84,0.01c5.95,0,11.84-1.42,17.04-4.09c8.01-4.12,12.98-11.84,12.98-20.13v-54.34
      l-0.08-27.11V532.8l17.74,0.04l-0.15,96.73c-0.02,16.76-9.77,31.29-25.45,37.93c-7.03,2.98-14.52,4.49-22.27,4.49l-0.38,0H633.12z"
      />
          <rect x="1408.23" y="493.72" fill="#132818" width="18.1" height="138.06"/>
          <rect x="818.88" y="493.72" fill="#132818" width="18.09" height="138.06"/>
          <circle fill="#132818" cx="1306.45" cy="659.24" r="11.13"/>
          <path fill="#132818" d="M600.23,633.51c-28,0-50.78-22.78-50.78-50.78c0-28,22.78-50.78,50.78-50.78c27.87,0,50.65,22.68,50.77,50.56
      l0.01,0.37v49.04h-17.53v-10.85l-0.61,0.51C623.72,629.27,612.12,633.51,600.23,633.51z M600.23,549.74
      c-18.18,0-32.98,14.79-32.98,32.98c0,18.19,14.8,32.98,32.98,32.98s32.98-14.79,32.98-32.98
      C633.21,564.54,618.41,549.74,600.23,549.74z"/>
          <path fill="#132818" d="M1407.75,671.32v-16.31l7.82,0.01c5.96,0,11.86-1.42,17.06-4.1c8-4.12,12.98-11.84,12.98-20.13v-54.34
      l-0.08-27.11v-16.52l17.74,0.04l-0.14,96.04c-0.03,16.75-9.78,31.28-25.45,37.93c-7.03,2.98-14.52,4.49-22.27,4.49l-0.38,0H1407.75
      z"/>
          <path fill="#132818" d="M1172.07,670.37c-28.48,0-51.65-23.17-51.65-51.65c0-11.29,3.65-22.05,10.56-31.13l14.11,10.71
      c-4.49,5.92-6.86,12.97-6.86,20.42c0,18.66,15.18,33.84,33.84,33.84c18.66,0,33.84-15.18,33.84-33.84v-125h17.81v120.25h145.07
      l-0.6-0.63c-2.4-2.5-4.59-6.59-6.5-12.16c-1.93-5.63-3.75-13.01-5.41-21.93c-1.16-7.11-2.73-12.91-4.68-17.22
      c-1.96-4.36-4.55-7.5-7.7-9.34c-3.15-1.84-7.19-2.77-12-2.77c-4.4,0-8.89,0.65-13.37,1.93c-4.36,1.25-8.99,3.19-13.76,5.78
      l-7.07-16.07c5.42-3.37,11.15-5.81,17.05-7.24c6.02-1.47,12.51-2.21,19.28-2.21c3.82,0,7.39,0.3,10.58,0.91
      c3.19,0.6,6.09,1.5,8.63,2.69c5.84,2.77,10.54,7.06,13.98,12.76c3.44,5.71,6.03,14.01,7.7,24.67c1.16,7.51,2.46,14,3.88,19.29
      c1.42,5.31,2.99,9.81,4.67,13.38c1.69,3.59,3.61,6.37,5.7,8.28l-0.12,17.7h-167.06l-0.07,0.27
      C1215.87,654.62,1195.37,670.37,1172.07,670.37z"/>
        </g>
      </svg>
    </div>
  </div>
);

// ==========================================
// MAIN FOOTER COMPONENT (Next.js Version)
// ==========================================
const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  return (
    <footer
      dir={isRtl ? 'rtl' : 'ltr'}
      className="w-full text-white font-sans relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #6CC24A 0%, #2FA84F 45%, #0E7A3D 75%, #045A2C 100%)'
      }}
    >
      <div className="max-w-[1440px] w-full mx-auto relative z-10 px-6 sm:px-10 lg:px-12 xl:px-16 pt-12 pb-10 lg:pt-16 lg:pb-12">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-10 lg:gap-8">

          {/* Brand Info */}
          <div className="flex flex-col w-full lg:w-[28%] shrink-0">
            <div className="mb-4 footer-logo">
              <Logo />
            </div>

            <p className="text-body-inverse mb-5 max-w-[260px]">
              {t('footer.description')}
            </p>

            {/* Socials */}
            <div className="flex items-center gap-4 mb-6">
              <a href="#" className="text-white hover:text-white/70 transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="text-white hover:text-white/70 transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle><path d="M8 9h4v2a4 4 0 0 1 4-2c3 0 4 2 4 5v7h-4v-6c0-1.5-.5-3-2-3s-2 1.5-2 3v6H8z"></path></svg>
              </a>
              <a href="#" className="text-white hover:text-white/70 transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.73 16h5L9 4z" /><path d="M4 20l6.76-6.76" /><path d="M20 4l-6.76 6.76" /></svg>
              </a>
              <a href="#" className="text-white hover:text-white/70 transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
            </div>

            <p className="text-body-inverse-muted">
              {t('footer.copyright')}
            </p>
          </div>

          {/* Links Grid — Filtered against provided navigation configuration */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 md:gap-x-8 lg:gap-x-10 w-full lg:w-auto">

            {/* Quick Links Column */}
            <div className="flex flex-col gap-2.5">
              <h4 className="text-h4-inverse mb-1">{t('footer.quickLinks.title')}</h4>
              <Link href="/" className="text-body-inverse hover:text-white transition-colors">{t('footer.quickLinks.home')}</Link>
              <Link href="/track" className="text-body-inverse hover:text-white transition-colors">{t('footer.quickLinks.track')}</Link>
              <Link href="/ecommerce" className="text-body-inverse hover:text-white transition-colors">{t('footer.quickLinks.ecommerce')}</Link>
              <Link href="/international-courier" className="text-body-inverse hover:text-white transition-colors">{t('footer.quickLinks.international')}</Link>
              <Link href="/air-freight" className="text-body-inverse hover:text-white transition-colors">{t('footer.quickLinks.airFreight')}</Link>
              <Link href="/support" className="text-body-inverse hover:text-white transition-colors">{t('footer.quickLinks.support')}</Link>
              <Link href="/about" className="text-body-inverse hover:text-white transition-colors">{t('footer.quickLinks.about')}</Link>
              <Link href="/careers" className="text-body-inverse hover:text-white transition-colors">{t('footer.quickLinks.careers')}</Link>
              <Link href="/blog" className="text-body-inverse hover:text-white transition-colors">{t('footer.quickLinks.blog')}</Link>
            </div>

            {/* Services Column */}
            <div className="flex flex-col gap-2.5">
              <h4 className="text-h4-inverse mb-1">{t('footer.services.title')}</h4>
              <Link href="/domestic-courier" className="text-body-inverse hover:text-white transition-colors">{t('footer.services.sameDay')}</Link>
              <Link href="/international-courier" className="text-body-inverse hover:text-white transition-colors">{t('footer.services.international')}</Link>
              <Link href="/ecommerce" className="text-body-inverse hover:text-white transition-colors">{t('footer.services.ecommerce')}</Link>
              <Link href="/air-freight" className="text-body-inverse hover:text-white transition-colors">{t('footer.services.airFreight')}</Link>
              <Link href="/land-freight" className="text-body-inverse hover:text-white transition-colors">{t('footer.services.landFreight')}</Link>
              <Link href="/sea-freight" className="text-body-inverse hover:text-white transition-colors">{t('footer.services.seaFreight')}</Link>
              <Link href="/customs-clearance" className="text-body-inverse hover:text-white transition-colors">{t('footer.services.customs')}</Link>
              <Link href="/warehouse" className="text-body-inverse hover:text-white transition-colors">{t('footer.services.warehousing')}</Link>
            </div>

            {/* Solutions Column */}
            <div className="flex flex-col gap-2.5">
              <h4 className="text-h4-inverse mb-1">Solutions</h4>
              <Link href="/individual-solutions" className="text-body-inverse hover:text-white transition-colors">Individual Business</Link>
              <Link href="/business-solutions" className="text-body-inverse hover:text-white transition-colors">Business Solutions</Link>
              <Link href="/secure-solutions" className="text-body-inverse hover:text-white transition-colors">Secure Solutions</Link>
              <Link href="/secure-gov" className="text-body-inverse hover:text-white transition-colors">Gov & Institutional</Link>
              <Link href="/secure-id" className="text-body-inverse hover:text-white transition-colors">Secure ID</Link>
              <Link href="/secure-docs" className="text-body-inverse hover:text-white transition-colors">Secure Docs</Link>
            </div>

            {/* Help & Legal Column */}
            <div className="flex flex-col gap-2.5">
              <h4 className="text-h4-inverse mb-1">{t('footer.helpLegal.title')}</h4>
              <Link href="/support" className="text-body-inverse hover:text-white transition-colors">{t('footer.helpLegal.helpCenter')}</Link>
              <Link href="/faq" className="text-body-inverse hover:text-white transition-colors">FAQ</Link>
              <Link href="/contact" className="text-body-inverse hover:text-white transition-colors">Contact Us</Link>
              <Link href="/industry" className="text-body-inverse hover:text-white transition-colors">Industries We Serve</Link>
              <Link href="/network" className="text-body-inverse hover:text-white transition-colors">Our Network</Link>
              <Link href="/projects" className="text-body-inverse hover:text-white transition-colors">Projects</Link>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;