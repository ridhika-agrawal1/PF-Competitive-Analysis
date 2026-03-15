import { useState, useEffect, useRef, useCallback } from "react";

/* ─── PALETTE ────────────────────────────────────────────────────────────── */
const C = {
  bg:"#0B0F1E", surface:"#111827", surface2:"#161D2E", surface3:"#1E2740",
  border:"rgba(255,255,255,0.08)", borderHi:"rgba(255,255,255,0.14)",
  teal:"#00C4A1", orange:"#F97316", red:"#EF4444", amber:"#F59E0B",
  pf:"#E8002D", pfDim:"rgba(232,0,45,0.10)",
  bayut:"#F97316", bayutDim:"rgba(249,115,22,0.10)",
  textPri:"#FFFFFF", textSec:"#E2E8F0", textMuted:"#94A3B8",
};

/* ─── BRAND LOGOS ────────────────────────────────────────────────────────── */
const PF_LOGO_B64   = "data:image/jpeg;base64,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";
const BAYUT_LOGO_B64 = "data:image/png;base64,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";

const Logo = {
  PF: ({ size=28 }) => (
    <img src={PF_LOGO_B64} width={size} height={size} style={{borderRadius:6, objectFit:"contain"}} alt="Property Finder"/>
  ),
  Bayut: ({ size=28 }) => (
    <img src={BAYUT_LOGO_B64} width={size} height={size} style={{borderRadius:6, objectFit:"contain"}} alt="Bayut"/>
  ),
  BayutIcon: ({ size=28 }) => (
    <img src={BAYUT_LOGO_B64} width={size} height={size} style={{borderRadius:6, objectFit:"contain"}} alt="Bayut"/>
  ),
  Meta: ({ size=28 }) => (
    <svg width={size} height={size*0.55} viewBox="0 0 50 28" fill="none">
      <defs>
        <linearGradient id="mg1" x1="0" y1="14" x2="22" y2="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0081FB"/><stop offset="1" stopColor="#0064E0"/>
        </linearGradient>
        <linearGradient id="mg2" x1="23" y1="14" x2="50" y2="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0081FB"/><stop offset="1" stopColor="#FF5C35"/>
        </linearGradient>
      </defs>
      <ellipse cx="11" cy="14" rx="8" ry="5.5" stroke="url(#mg1)" strokeWidth="3" fill="none"/>
      <path d="M19 14 C19 8 23 4 28 4 C33 4 37 8 37 14 C37 20 33 24 28 24" stroke="url(#mg2)" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M28 24 C23 24 19 20 19 14" stroke="url(#mg2)" strokeWidth="3" fill="none"/>
      <text x="41" y="18.5" fill="#0081FB" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">a</text>
    </svg>
  ),
  MetaFull: ({ size=24 }) => (
    <svg width={size*2.5} height={size} viewBox="0 0 100 40" fill="none">
      <defs>
        <linearGradient id="mf1" x1="0" y1="20" x2="36" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0081FB"/><stop offset="1" stopColor="#0064E0"/>
        </linearGradient>
        <linearGradient id="mf2" x1="36" y1="20" x2="70" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0081FB"/><stop offset="1" stopColor="#FF5C35"/>
        </linearGradient>
      </defs>
      <ellipse cx="18" cy="20" rx="13" ry="8.5" stroke="url(#mf1)" strokeWidth="4.5" fill="none"/>
      <path d="M31 20 C31 10 37 4 45 4 C53 4 59 10 59 20 C59 30 53 36 45 36" stroke="url(#mf2)" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <path d="M45 36 C37 36 31 30 31 20" stroke="url(#mf2)" strokeWidth="4.5" fill="none"/>
      <text x="68" y="27" fill="#0081FB" fontSize="18" fontWeight="700" fontFamily="Arial,sans-serif">eta</text>
    </svg>
  ),
  Facebook: ({ size=28 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="8" fill="#1877F2"/>
      <path d="M26 10h-3.5C20 10 19 11.3 19 13.5V17h7l-1 6h-6v13h-6V23h-4v-6h4v-3.5C13 8.3 16.1 6 20.5 6H26v4z" fill="white"/>
    </svg>
  ),
  Instagram: ({ size=28 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient id="ig1" x1="0" y1="40" x2="40" y2="0">
          <stop offset="0%" stopColor="#F9CE34"/>
          <stop offset="35%" stopColor="#EE2A7B"/>
          <stop offset="100%" stopColor="#6228D7"/>
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill="url(#ig1)"/>
      <rect x="9" y="9" width="22" height="22" rx="7" stroke="white" strokeWidth="2.5" fill="none"/>
      <circle cx="20" cy="20" r="5.5" stroke="white" strokeWidth="2.5" fill="none"/>
      <circle cx="28" cy="12" r="1.8" fill="white"/>
    </svg>
  ),
  Google: ({ size=28 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="8" fill="white"/>
      <path d="M33 20.2c0-.8-.07-1.6-.2-2.3H20v4.4h7.3c-.32 1.6-1.27 2.95-2.7 3.85v3.2h4.37C31.6 27.4 33 24.1 33 20.2z" fill="#4285F4"/>
      <path d="M20 34c3.47 0 6.38-1.15 8.5-3.12l-4.15-3.22c-1.15.77-2.62 1.22-4.35 1.22-3.35 0-6.18-2.26-7.19-5.3H8.52v3.32C10.62 31.3 15.06 34 20 34z" fill="#34A853"/>
      <path d="M12.81 23.58C12.55 22.8 12.4 21.97 12.4 21.1s.15-1.7.41-2.48v-3.32H8.52A13.06 13.06 0 007 21.1c0 2.12.5 4.12 1.52 5.8l4.29-3.32z" fill="#FBBC05"/>
      <path d="M20 12.32c1.89 0 3.58.65 4.92 1.93l3.68-3.68C26.37 8.4 23.46 7 20 7c-4.94 0-9.38 2.7-11.48 6.8l4.29 3.32C13.82 14.08 16.65 12.32 20 12.32z" fill="#EA4335"/>
    </svg>
  ),
  TikTok: ({ size=28 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="8" fill="#010101"/>
      <path d="M28.5 9.5c-.05 3.24 2.56 5.76 5.5 5.76v4.22a9.76 9.76 0 01-5.5-1.7v7.72c0 3.87-3.15 7-7 7s-7-3.13-7-7 3.15-7 7-7c.38 0 .75.03 1.12.08v4.32a2.97 2.97 0 00-1.12-.2A2.98 2.98 0 0018.5 26a2.98 2.98 0 002.98 2.98A2.98 2.98 0 0024.47 26V8h4.03v1.5z" fill="#EE1D52"/>
      <path d="M27.5 8.5c-.05 3.24 2.56 5.76 5.5 5.76v4.22a9.76 9.76 0 01-5.5-1.7v7.72c0 3.87-3.15 7-7 7s-7-3.13-7-7 3.15-7 7-7c.38 0 .75.03 1.12.08v4.32a2.97 2.97 0 00-1.12-.2A2.98 2.98 0 0017.5 25a2.98 2.98 0 002.98 2.98A2.98 2.98 0 0023.47 25V7h4.03v1.5z" fill="white"/>
      <path d="M28.5 8.5c-.05 3.24 2.56 5.76 5.5 5.76" stroke="#69C9D0" strokeWidth="1" fill="none"/>
    </svg>
  ),
  LinkedIn: ({ size=28 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="8" fill="#0A66C2"/>
      <path d="M11 15.5h4.5V30H11V15.5zm2.25-1.4a2.6 2.6 0 100-5.2 2.6 2.6 0 000 5.2zM18.5 15.5H23v2c.9-1.5 2.5-2.5 4.5-2.5 4.5 0 5.5 3 5.5 6.8V30h-4.5v-7.5c0-1.8-.03-4.1-2.5-4.1s-2.5 1.93-2.5 3.9V30h-4.5V15.5z" fill="white"/>
    </svg>
  ),
  X: ({ size=28 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="8" fill="#000"/>
      <path d="M9 9l9.2 12.3L9 32h2.2l8-9.2 6.5 9.2H32L22.3 19.2 31 9h-2.2l-7.3 8.4L15.5 9H9z" fill="white"/>
    </svg>
  ),
  YouTube: ({ size=28 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="8" fill="#FF0000"/>
      <path d="M34 14.7s-.4-2.5-1.5-3.6c-1.4-1.5-3-1.5-3.7-1.6C25.2 9.2 20 9 20 9s-5.2.2-8.8.5c-.7.1-2.3.1-3.7 1.6-1.1 1.1-1.5 3.6-1.5 3.6S6 17.5 6 20.3v2.6c0 2.8.3 5.6.3 5.6s.4 2.5 1.5 3.6c1.4 1.5 3.3 1.4 4.2 1.6C15 34 20 34 20 34s5.2-.1 8.8-.5c.7-.1 2.3-.1 3.7-1.6 1.1-1.1 1.5-3.6 1.5-3.6s.3-2.8.3-5.6v-2.6C34.3 17.5 34 14.7 34 14.7zM17.1 25.3V15.1l9.7 5.1-9.7 5.1z" fill="white"/>
    </svg>
  ),
};

/* ─── CHANNEL CONFIG ─────────────────────────────────────────────────────── */
const CHANNELS = {
  Meta: {
    logo: Logo.MetaFull,
    iconLogo: Logo.Meta,
    subPlatforms: [
      { id:"all",       label:"All",       logo: null },
      { id:"facebook",  label:"Facebook",  logo: Logo.Facebook },
      { id:"instagram", label:"Instagram", logo: Logo.Instagram },
    ],
    formats: ["Video","Image","Carousel"],
    liveApi: true,
    apiSearchTerms: { pf:"Property Finder UAE", bayut:"Bayut UAE" },
  },
  Google: {
    logo: Logo.Google,
    iconLogo: Logo.Google,
    subPlatforms: [
      { id:"all",     label:"All",     logo: null },
      { id:"search",  label:"Search",  logo: null },
      { id:"display", label:"Display", logo: null },
      { id:"youtube", label:"YouTube", logo: Logo.YouTube },
    ],
    formats: ["Search Ad","Display Banner","YouTube Pre-roll"],
    liveApi: false,
    libraryUrl: "https://adstransparency.google.com/?region=AE",
  },
  TikTok: {
    logo: Logo.TikTok,
    iconLogo: Logo.TikTok,
    subPlatforms: [{ id:"all", label:"All", logo: null }],
    formats: ["In-feed Video","TopView"],
    liveApi: false,
    libraryUrl: "https://library.tiktok.com/",
  },
  LinkedIn: {
    logo: Logo.LinkedIn,
    iconLogo: Logo.LinkedIn,
    subPlatforms: [{ id:"all", label:"All", logo: null }],
    formats: ["Sponsored Post","Message Ad"],
    liveApi: false,
    libraryUrl: "https://www.linkedin.com/ad-library/",
  },
  "Twitter/X": {
    logo: Logo.X,
    iconLogo: Logo.X,
    subPlatforms: [{ id:"all", label:"All", logo: null }],
    formats: ["Promoted Post","Promoted Video"],
    liveApi: false,
    libraryUrl: "https://ads.twitter.com/transparency/",
  },
};

/* ─── DEMO AD DATA ───────────────────────────────────────────────────────── */
const DEMO_ADS = {
  Meta:{
    pf:[
      { id:"pf-m-1", format:"Video", platform:"Facebook",
        headline:"Your Next Home is One Search Away",
        body:"The UAE's most trusted property platform. 200K+ verified listings updated daily.",
        cta:"Start Searching", bgColor:"#1a0a12", accentColor:C.pf,
        visual:"Aerial view of Dubai skyline at sunset with Property Finder logo reveal — premium cinematic feel",
        spend:"High", since:"Jan 2025", tags:["Brand","Awareness","Premium"],
        sourceUrl:"https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=AE&q=Property%20Finder" },
      { id:"pf-m-2", format:"Carousel", platform:"Instagram",
        headline:"Dubai's Best Neighbourhoods for 2025",
        body:"From Downtown to Dubai Hills — curated area guides with live price data.",
        cta:"Explore Now", bgColor:"#1a0a12", accentColor:C.pf,
        visual:"6-card carousel: area hero photos with PF-branded price index overlays",
        spend:"High", since:"Feb 2025", tags:["Area-targeting","Education","Mid-funnel"],
        sourceUrl:"https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=AE&q=Property%20Finder" },
      { id:"pf-m-3", format:"Image", platform:"Facebook",
        headline:"The UAE Property Market Report is Here",
        body:"Price trends, demand signals, and expert insights for Q1 2025.",
        cta:"Download Free", bgColor:"#1a0a12", accentColor:C.pf,
        visual:"Property Finder branded chart graphic with Q1 headline stat in red",
        spend:"Medium", since:"Mar 2025", tags:["Thought Leadership","Lead Gen","Data"],
        sourceUrl:"https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=AE&q=Property%20Finder" },
    ],
    bayut:[
      { id:"b-m-1", format:"Video", platform:"Facebook",
        headline:"Find Your Dream Home in Dubai",
        body:"Browse 100,000+ verified listings. Trusted by millions across the UAE.",
        cta:"Search Now", bgColor:"#1a0d00", accentColor:C.orange,
        visual:"Cinematic aerial drone over Dubai Marina — slow luxury pan at golden hour",
        spend:"High", since:"Feb 2025", tags:["Awareness","Emotional","Premium"],
        sourceUrl:"https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=AE&q=Bayut" },
      { id:"b-m-2", format:"Carousel", platform:"Instagram",
        headline:"Top Areas to Live in Dubai 2025",
        body:"Swipe to explore Dubai Hills, JVC, Business Bay & more.",
        cta:"Explore Areas", bgColor:"#1a0d00", accentColor:C.orange,
        visual:"6-slide carousel — area photography with animated price overlays",
        spend:"Medium", since:"Jan 2025", tags:["Educational","Area-targeting","Mid-funnel"],
        sourceUrl:"https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=AE&q=Bayut" },
      { id:"b-m-3", format:"Image", platform:"Facebook",
        headline:"Rent Smarter. Live Better.",
        body:"1BHK from AED 35,000/yr in Dubai. Find yours today on Bayut.",
        cta:"View Listings", bgColor:"#1a0d00", accentColor:C.orange,
        visual:"Modern apartment interior — bold orange price callout badge bottom-right",
        spend:"Medium", since:"Mar 2025", tags:["Performance","Price-led","Renters"],
        sourceUrl:"https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=AE&q=Bayut" },
    ],
  },
  Google:{
    pf:[
      { id:"pf-g-1", format:"Search Ad", platform:"Google Search",
        headline:"Property Finder UAE | #1 Property Platform",
        body:"200K+ Properties | Buy, Rent & Invest | Verified Agents | Free Search\npropertyfinder.ae › buy-sell-rent",
        cta:"Sitelinks: Apartments · Villas · Off-Plan · Area Guide",
        bgColor:"#fff", accentColor:"#1a73e8",
        visual:"Brand search ad targeting 'property for sale dubai'",
        spend:"High", since:"Ongoing", tags:["Brand","High-intent","Defensive"],
        sourceUrl:"https://adstransparency.google.com/?region=AE&advertiser_name=Property+Finder" },
      { id:"pf-g-2", format:"YouTube Pre-roll", platform:"YouTube",
        headline:"Find More. Decide Faster.",
        body:"15s skippable — Property Finder app features: map search, price alerts, verified badges.",
        cta:"propertyfinder.ae",
        bgColor:"#1a0a12", accentColor:C.pf,
        visual:"Product-led 15s: app UI demo + social proof stats + CTA screen",
        spend:"High", since:"Feb 2025", tags:["App Install","Product","Performance"],
        sourceUrl:"https://adstransparency.google.com/?region=AE&advertiser_name=Property+Finder" },
      { id:"pf-g-3", format:"Display Banner", platform:"Google Display",
        headline:"New Projects in Dubai — Pre-Register Now",
        body:"Exclusive off-plan launches. Register your interest today.",
        cta:"View Projects", bgColor:"#1a0a12", accentColor:C.pf,
        visual:"Responsive banner: off-plan render + Property Finder logo + red CTA button",
        spend:"Medium", since:"Jan 2025", tags:["Off-plan","Lead Gen","Retargeting"],
        sourceUrl:"https://adstransparency.google.com/?region=AE&advertiser_name=Property+Finder" },
    ],
    bayut:[
      { id:"b-g-1", format:"Search Ad", platform:"Google Search",
        headline:"Bayut — #1 Property Site UAE",
        body:"100,000+ Properties | Buy, Rent & Sell | Verified Listings | Free Search\nbayut.com › properties › dubai",
        cta:"Sitelinks: Apartments · Villas · New Projects · Map Search",
        bgColor:"#fff", accentColor:"#1a73e8",
        visual:"Text ad targeting high-intent queries like 'apartments for rent dubai'",
        spend:"High", since:"Ongoing", tags:["Brand","High-intent","Top-of-funnel"],
        sourceUrl:"https://adstransparency.google.com/?region=AE&advertiser_name=Bayut" },
      { id:"b-g-2", format:"YouTube Pre-roll", platform:"YouTube",
        headline:"Your Dream Home Awaits",
        body:"15s skippable — family moving into bright new Dubai home. Emotional arc.",
        cta:"Visit Bayut.com", bgColor:"#1a0d00", accentColor:C.orange,
        visual:"15s cinematic: family unpacking, children running through new home",
        spend:"High", since:"Feb 2025", tags:["Emotional","Brand","Storytelling"],
        sourceUrl:"https://adstransparency.google.com/?region=AE&advertiser_name=Bayut" },
      { id:"b-g-3", format:"Display Banner", platform:"Google Display",
        headline:"Apartments for Rent in Dubai",
        body:"From AED 2,500/mo. Browse now.",
        cta:"Search Bayut", bgColor:"#1a0d00", accentColor:C.orange,
        visual:"Responsive banner — property photo + price callout + orange CTA",
        spend:"Medium", since:"Jan 2025", tags:["Retargeting","Price-led","Performance"],
        sourceUrl:"https://adstransparency.google.com/?region=AE&advertiser_name=Bayut" },
    ],
  },
  TikTok:{
    pf:[
      { id:"pf-tt-1", format:"In-feed Video", platform:"TikTok",
        headline:"How I found my apartment in Dubai in 3 days 🔑",
        body:"Creator-style walkthrough using Property Finder app — map search, filters, agent chat.",
        cta:"Download App", bgColor:"#1a0a12", accentColor:C.pf,
        visual:"Phone screen recording of PF app with creator VO narration",
        spend:"High", since:"Feb 2025", tags:["App Install","Tutorial","Creator"],
        sourceUrl:"https://library.tiktok.com/" },
      { id:"pf-tt-2", format:"TopView", platform:"TikTok",
        headline:"Dubai property prices revealed 📊",
        body:"Property Finder data team breaks down which areas are up and which are down in 2025.",
        cta:"See Full Data", bgColor:"#1a0a12", accentColor:C.pf,
        visual:"Animated price chart with Property Finder analyst on camera",
        spend:"Medium", since:"Mar 2025", tags:["Data","Thought Leadership","TopView"],
        sourceUrl:"https://library.tiktok.com/" },
    ],
    bayut:[
      { id:"b-tt-1", format:"TopView", platform:"TikTok",
        headline:"POV: Finding your dream home in Dubai 🏠",
        body:"Trending audio + first-person walkthrough of luxury Dubai apartment.",
        cta:"Download App", bgColor:"#1a0d00", accentColor:C.orange,
        visual:"First-person POV tour — trending audio, Bayut app UI revealed at end",
        spend:"Medium", since:"Mar 2025", tags:["Native","POV Trend","App Install"],
        sourceUrl:"https://library.tiktok.com/" },
      { id:"b-tt-2", format:"In-feed Video", platform:"TikTok",
        headline:"Affordable areas in Dubai nobody talks about 👀",
        body:"Top 5 budget-friendly neighborhoods backed by Bayut data.",
        cta:"Search Bayut", bgColor:"#1a0d00", accentColor:C.orange,
        visual:"Text-on-screen listicle, casual presenter, Bayut price stats overlaid",
        spend:"Low", since:"Feb 2025", tags:["Educational","Listicle","Organic"],
        sourceUrl:"https://library.tiktok.com/" },
    ],
  },
  LinkedIn:{
    pf:[
      { id:"pf-li-1", format:"Sponsored Post", platform:"LinkedIn",
        headline:"Property Finder Q1 2025 UAE Market Report",
        body:"Data on transaction volumes, price movements, and investor sentiment. Download free.",
        cta:"Download Report", bgColor:"#1a0a12", accentColor:C.pf,
        visual:"Professional report cover — Property Finder branding, key stat callout",
        spend:"High", since:"Jan 2025", tags:["Thought Leadership","B2B","Lead Gen"],
        sourceUrl:"https://www.linkedin.com/ad-library/search?companyIds=propertyfinder" },
      { id:"pf-li-2", format:"Message Ad", platform:"LinkedIn",
        headline:"List Your Development on Property Finder",
        body:"Reach 4M+ qualified UAE property seekers. Premium developer packages available.",
        cta:"Request Demo", bgColor:"#1a0a12", accentColor:C.pf,
        visual:"Direct message targeting developers with ROI stats",
        spend:"Medium", since:"Feb 2025", tags:["B2B","Developer","Supply"],
        sourceUrl:"https://www.linkedin.com/ad-library/" },
    ],
    bayut:[
      { id:"b-li-1", format:"Sponsored Post", platform:"LinkedIn",
        headline:"Relocating to Dubai? Bayut Makes It Easy.",
        body:"Discover neighborhoods, compare prices, connect with verified agents.",
        cta:"Explore Properties", bgColor:"#1a0d00", accentColor:C.orange,
        visual:"Professional expat in modern Dubai office — property search UI in background",
        spend:"Medium", since:"Jan 2025", tags:["Expat","Relocation","Professional"],
        sourceUrl:"https://www.linkedin.com/ad-library/" },
    ],
  },
  "Twitter/X":{
    pf:[
      { id:"pf-tw-1", format:"Promoted Post", platform:"X (Twitter)",
        headline:"🏠 UAE property market update — March 2025",
        body:"Dubai transaction volumes up 22% YoY. Here's what's driving demand 👇",
        cta:"See Full Report", bgColor:"#1a0a12", accentColor:C.pf,
        visual:"Branded data graphic — links to weekly market intelligence hub",
        spend:"Medium", since:"Mar 2025", tags:["Thought Leadership","Data","Organic Boost"],
        sourceUrl:"https://ads.twitter.com/transparency/" },
    ],
    bayut:[
      { id:"b-tw-1", format:"Promoted Post", platform:"X (Twitter)",
        headline:"Dubai property prices just hit a new high 📊",
        body:"Here's what it means for buyers and renters in 2025.",
        cta:"Read Report", bgColor:"#1a0d00", accentColor:C.orange,
        visual:"Branded price-trend chart linking to Bayut's quarterly report hub",
        spend:"Low", since:"Mar 2025", tags:["Thought Leadership","Data","Content"],
        sourceUrl:"https://ads.twitter.com/transparency/" },
      { id:"b-tw-2", format:"Promoted Video", platform:"X (Twitter)",
        headline:"The UAE property market is booming 🚀",
        body:"Bayut has the freshest listings updated every hour.",
        cta:"Browse Now", bgColor:"#1a0d00", accentColor:C.orange,
        visual:"Short animated video — listing counter ticking up",
        spend:"Low", since:"Feb 2025", tags:["Urgency","Market Trend","Awareness"],
        sourceUrl:"https://ads.twitter.com/transparency/" },
    ],
  },
};

/* ─── META AD LIBRARY API ────────────────────────────────────────────────── */
const META_GRAPH = "https://graph.facebook.com/v19.0";

async function fetchMetaAds({ query, platform, token }) {
  const fields = [
    "id","ad_creation_time","ad_creative_bodies","ad_creative_link_titles",
    "ad_creative_link_descriptions","ad_snapshot_url","page_name","page_id",
    "media_type","spend","impressions","publisher_platforms","ad_delivery_start_time",
  ].join(",");

  const params = new URLSearchParams({
    search_terms: query,
    ad_reached_countries: '["AE"]',
    ad_active_status: "ACTIVE",
    fields,
    limit: "6",
    access_token: token,
  });

  if (platform && platform !== "all") {
    params.append("publisher_platforms", JSON.stringify([platform]));
  }

  const res = await fetch(`${META_GRAPH}/ads_archive?${params}`);
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return (data.data || []).map(ad => ({
    id: `live-${ad.id}`,
    format: mediaTypeToFormat(ad.media_type),
    platform: (ad.publisher_platforms||[]).includes("instagram") ? "Instagram" : "Facebook",
    headline: (ad.ad_creative_link_titles||[])[0] || ad.page_name,
    body: (ad.ad_creative_bodies||[])[0] || "(No copy available)",
    cta: (ad.ad_creative_link_descriptions||[])[0] || "Learn More",
    visual: `Live ${ad.media_type || "ad"} creative`,
    spend: spendLabel(ad.spend),
    since: ad.ad_delivery_start_time ? new Date(ad.ad_delivery_start_time).toLocaleDateString("en-GB",{month:"short",year:"numeric"}) : "Active",
    tags: ad.publisher_platforms || [],
    sourceUrl: ad.ad_snapshot_url || `https://www.facebook.com/ads/library/?id=${ad.id}`,
    isLive: true,
    snapshotUrl: ad.ad_snapshot_url,
    bgColor: "#1a0d00",
    accentColor: C.orange,
  }));
}

function mediaTypeToFormat(t) {
  if (!t) return "Image";
  if (t === "VIDEO") return "Video";
  if (t === "MULTI_SHARE") return "Carousel";
  return "Image";
}

function spendLabel(spend) {
  if (!spend) return "Unknown";
  const low = parseInt(spend.lower_bound || 0);
  if (low > 10000) return "High";
  if (low > 1000) return "Medium";
  return "Low";
}

/* ─── CLAUDE API ─────────────────────────────────────────────────────────── */
async function callClaude(prompt, anthropicKey) {
  const headers = { "Content-Type": "application/json" };
  if (anthropicKey) {
    headers["x-api-key"] = anthropicKey;
    headers["anthropic-version"] = "2023-06-01";
    headers["anthropic-dangerous-direct-browser-access"] = "true";
  }
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method:"POST", headers,
    body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1500, messages:[{role:"user",content:prompt}] }),
  });
  if (!res.ok) throw new Error("Claude API error: "+res.status);
  const data = await res.json();
  const raw = data.content?.[0]?.text || "";
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("No JSON");
  return JSON.parse(match[0]);
}

/* ─── GST CLOCK ──────────────────────────────────────────────────────────── */
function useGSTTime() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-GB", { timeZone:"Asia/Dubai", hour:"2-digit", minute:"2-digit" }));
      setDate(now.toLocaleDateString("en-GB", { timeZone:"Asia/Dubai", day:"numeric", month:"long", year:"numeric" }));
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);
  return { time, date };
}

/* ─── HELPERS ─────────────────────────────────────────────────────────────── */
const pill = (color,bg) => ({ background:bg||`${color}18`, border:`1px solid ${color}35`, color, borderRadius:4, padding:"2px 8px", fontSize:10, fontWeight:600, letterSpacing:"0.04em", whiteSpace:"nowrap" });
const lbl = (color=C.textMuted) => ({ fontSize:9, color, textTransform:"uppercase", letterSpacing:"0.1em", fontWeight:700, marginBottom:4 });
const SPEND_DOT = { High:C.teal, Medium:C.amber, Low:C.textMuted };

/* ─── AD PREVIEW ─────────────────────────────────────────────────────────── */
function AdPreview({ ad, brand }) {
  const accent = ad.accentColor || (brand==="pf" ? C.pf : C.orange);
  const bg = ad.bgColor || C.surface3;
  const fmt = ad.format;
  const brandName = brand==="pf" ? "Property Finder" : "Bayut";
  const initial = brand==="pf" ? "P" : "B";

  // Live ad from Meta API — show snapshot link
  if (ad.isLive) {
    return (
      <div style={{ background:bg, borderRadius:8, padding:"14px", border:`1px solid ${accent}30`, cursor:"pointer" }}
           onClick={() => window.open(ad.snapshotUrl, "_blank")}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
          <span style={{ background:`${accent}20`, border:`1px solid ${accent}40`, color:accent, fontSize:9, fontWeight:700, padding:"2px 7px", borderRadius:3 }}>LIVE · {fmt.toUpperCase()}</span>
          <span style={{ fontSize:9, color:C.textMuted }}>{ad.platform}</span>
        </div>
        <div style={{ fontSize:12, fontWeight:700, color:C.textPri, marginBottom:5, lineHeight:1.4 }}>{ad.headline}</div>
        <div style={{ fontSize:11, color:C.textSec, lineHeight:1.55, marginBottom:10 }}>{ad.body}</div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span style={{ fontSize:10, color:C.textMuted }}>{ad.since}</span>
          <span style={{ background:accent, borderRadius:5, padding:"5px 12px", fontSize:10, fontWeight:700, color:"#fff", display:"flex", alignItems:"center", gap:5 }}>
            View Live Ad ↗
          </span>
        </div>
      </div>
    );
  }

  if (fmt === "Search Ad") {
    return (
      <div style={{ background:"#fff", borderRadius:8, padding:"11px 13px", fontFamily:"Arial,sans-serif" }}>
        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:3 }}>
          <span style={{ border:"1px solid #dadce0", borderRadius:3, fontSize:10, color:"#0d652d", padding:"1px 5px", fontWeight:700 }}>Ad</span>
          <span style={{ fontSize:11, color:"#202124" }}>{brand==="pf"?"propertyfinder.ae":"bayut.com"}</span>
        </div>
        <div style={{ fontSize:15, color:"#1a0dab", lineHeight:1.3, marginBottom:3 }}>{ad.headline}</div>
        <div style={{ fontSize:11, color:"#4d5156", lineHeight:1.5, whiteSpace:"pre-line" }}>{ad.body}</div>
        <div style={{ marginTop:7, display:"flex", gap:10, flexWrap:"wrap" }}>
          {ad.cta.replace("Sitelinks: ","").split("·").map(s=>(
            <span key={s} style={{ fontSize:11, color:"#1a0dab", textDecoration:"underline" }}>{s.trim()}</span>
          ))}
        </div>
      </div>
    );
  }

  if (fmt === "TopView" || (fmt === "In-feed Video" && ad.platform === "TikTok")) {
    return (
      <div style={{ background:"#000", borderRadius:8, overflow:"hidden", position:"relative", height:190 }}>
        <div style={{ position:"absolute", inset:0, background:`linear-gradient(180deg, #111 0%, ${bg} 60%, #000 100%)` }} />
        <div style={{ position:"absolute", top:8, left:0, right:0, textAlign:"center" }}>
          <span style={{ fontSize:11, color:"rgba(255,255,255,0.6)", fontWeight:600 }}>For You</span>
        </div>
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <span style={{ fontSize:32, opacity:0.2 }}>▶</span>
        </div>
        <div style={{ position:"absolute", bottom:0, left:0, right:40, padding:"8px 10px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:4 }}>
            <div style={{ width:24, height:24, borderRadius:"50%", background:accent, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ fontSize:9, fontWeight:800, color:"#fff" }}>{initial}</span>
            </div>
            <span style={{ fontSize:11, color:"#fff", fontWeight:600 }}>@{brandName.toLowerCase().replace(/\s/g,"")}</span>
            <span style={{ fontSize:9, background:"rgba(255,255,255,0.15)", color:"white", padding:"1px 5px", borderRadius:3 }}>AD</span>
          </div>
          <div style={{ fontSize:11, color:"white", fontWeight:600, lineHeight:1.3, marginBottom:5 }}>{ad.headline}</div>
          <div style={{ background:accent, borderRadius:4, padding:"4px 10px", display:"inline-block", fontSize:10, fontWeight:700, color:"#fff" }}>{ad.cta}</div>
        </div>
        <div style={{ position:"absolute", right:8, top:"35%", display:"flex", flexDirection:"column", gap:10 }}>
          {["❤️","💬","↗️"].map(ic=><span key={ic} style={{ fontSize:16 }}>{ic}</span>)}
        </div>
      </div>
    );
  }

  if (ad.platform === "LinkedIn") {
    return (
      <div style={{ background:"#fff", borderRadius:8, overflow:"hidden", fontFamily:"system-ui,sans-serif" }}>
        <div style={{ padding:"9px 11px", display:"flex", gap:7, alignItems:"center", borderBottom:"1px solid #e0e0e0" }}>
          <div style={{ width:30, height:30, borderRadius:4, background:accent, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontSize:11, fontWeight:800, color:"#fff" }}>{initial}</span>
          </div>
          <div>
            <div style={{ fontSize:12, fontWeight:700, color:"#000" }}>{brandName}</div>
            <div style={{ fontSize:10, color:"#666" }}>Sponsored · 🌐</div>
          </div>
        </div>
        <div style={{ padding:"9px 11px" }}>
          <div style={{ fontSize:12, fontWeight:600, color:"#000", marginBottom:3 }}>{ad.headline}</div>
          <div style={{ fontSize:11, color:"#444", lineHeight:1.5 }}>{ad.body}</div>
        </div>
        <div style={{ background:"#f3f2ef", borderTop:"1px solid #e0e0e0", padding:"7px 11px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:10, color:"#666" }}>{brand==="pf"?"propertyfinder.ae":"bayut.com"}</span>
          <span style={{ background:accent, color:"#fff", fontSize:10, fontWeight:700, padding:"4px 12px", borderRadius:20 }}>{ad.cta}</span>
        </div>
      </div>
    );
  }

  if (ad.platform === "X (Twitter)") {
    return (
      <div style={{ background:"#000", borderRadius:8, padding:"11px" }}>
        <div style={{ display:"flex", gap:7, marginBottom:7 }}>
          <div style={{ width:32, height:32, borderRadius:"50%", background:accent, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontSize:13, fontWeight:700, color:"#fff" }}>{initial}</span>
          </div>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:5 }}>
              <span style={{ fontSize:12, fontWeight:700, color:"#fff" }}>{brandName}</span>
              <span style={{ fontSize:9, background:"rgba(255,255,255,0.1)", color:"#aaa", padding:"1px 5px", borderRadius:3 }}>Promoted</span>
            </div>
            <span style={{ fontSize:10, color:"#555" }}>@{brandName.toLowerCase().replace(/\s/g,"")}</span>
          </div>
        </div>
        <div style={{ fontSize:12, color:"#e7e9ea", lineHeight:1.55, marginBottom:7 }}>{ad.headline}</div>
        <div style={{ background:"#16181c", borderRadius:7, padding:"9px", border:"1px solid #2f3336" }}>
          <div style={{ fontSize:10, color:"#555", marginBottom:2 }}>{brand==="pf"?"propertyfinder.ae":"bayut.com"}</div>
          <div style={{ fontSize:11, color:"#e7e9ea", fontWeight:600 }}>{ad.body.slice(0,65)}…</div>
        </div>
      </div>
    );
  }

  if (fmt === "YouTube Pre-roll") {
    return (
      <div style={{ background:"#000", borderRadius:8, overflow:"hidden", position:"relative", height:130 }}>
        <div style={{ position:"absolute", inset:0, background:`linear-gradient(135deg, ${bg} 0%, #000 100%)`, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <span style={{ fontSize:28, opacity:0.3 }}>▶</span>
        </div>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"linear-gradient(transparent,rgba(0,0,0,0.9))", padding:"8px 10px" }}>
          <div style={{ fontSize:12, color:"white", fontWeight:600 }}>{ad.headline}</div>
          <div style={{ fontSize:10, color:"rgba(255,255,255,0.5)" }}>{ad.body.slice(0,55)}…</div>
        </div>
        <div style={{ position:"absolute", bottom:8, right:8 }}>
          <span style={{ background:"rgba(0,0,0,0.75)", color:"white", fontSize:9, padding:"2px 7px", borderRadius:3, border:"1px solid rgba(255,255,255,0.2)" }}>Skip Ad ›</span>
        </div>
        <div style={{ position:"absolute", top:7, left:7, background:"#FFD600", borderRadius:3, padding:"1px 5px", fontSize:8, fontWeight:700, color:"#000" }}>Ad</div>
      </div>
    );
  }

  if (fmt === "Display Banner") {
    return (
      <div style={{ background:bg, borderRadius:8, padding:"12px", border:`1px solid ${accent}30`, position:"relative" }}>
        <div style={{ position:"absolute", top:5, right:7, fontSize:8, color:"rgba(255,255,255,0.3)" }}>Ad</div>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
          <div style={{ width:26, height:26, borderRadius:4, background:accent, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <span style={{ fontSize:10, fontWeight:800, color:"#fff" }}>{initial}</span>
          </div>
          <div>
            <div style={{ fontSize:12, fontWeight:700, color:"#fff" }}>{ad.headline}</div>
            <div style={{ fontSize:10, color:"rgba(255,255,255,0.55)" }}>{ad.body}</div>
          </div>
        </div>
        <div style={{ background:accent, borderRadius:5, padding:"5px 0", textAlign:"center", fontSize:11, fontWeight:700, color:"#fff" }}>{ad.cta}</div>
      </div>
    );
  }

  if (fmt === "Carousel") {
    return (
      <div style={{ background:bg, borderRadius:8, overflow:"hidden" }}>
        <div style={{ padding:"8px 10px 5px", display:"flex", alignItems:"center", gap:6 }}>
          <div style={{ width:24, height:24, borderRadius:"50%", background:accent, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontSize:9, fontWeight:800, color:"#fff" }}>{initial}</span>
          </div>
          <div>
            <div style={{ fontSize:10, fontWeight:700, color:"#fff" }}>{brandName}</div>
            <div style={{ fontSize:8, color:"rgba(255,255,255,0.35)" }}>Sponsored</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:4, padding:"4px 8px", overflowX:"auto" }}>
          {["Dubai Hills","JVC","Downtown"].map((s,i)=>(
            <div key={i} style={{ flex:"0 0 80px", background:i===0?`${accent}30`:"rgba(255,255,255,0.04)", borderRadius:5, padding:"6px 5px", border:`1px solid ${i===0?accent:"transparent"}` }}>
              <div style={{ height:30, background:`${accent}18`, borderRadius:3, marginBottom:3, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ fontSize:9 }}>🏙️</span>
              </div>
              <div style={{ fontSize:8, color:"#fff", fontWeight:600, marginBottom:1 }}>{s}</div>
              <div style={{ fontSize:7, color:accent }}>AED ×,×××</div>
            </div>
          ))}
        </div>
        <div style={{ padding:"5px 10px 10px" }}>
          <div style={{ fontSize:11, fontWeight:700, color:"#fff", marginBottom:2 }}>{ad.headline}</div>
          <div style={{ fontSize:9, color:"rgba(255,255,255,0.55)", marginBottom:5 }}>{ad.body.slice(0,55)}…</div>
          <span style={{ background:accent, borderRadius:4, padding:"3px 10px", fontSize:9, fontWeight:700, color:"#fff" }}>{ad.cta}</span>
        </div>
      </div>
    );
  }

  // Default: Facebook/Instagram Video or Image
  return (
    <div style={{ background:bg, borderRadius:8, overflow:"hidden" }}>
      <div style={{ padding:"7px 10px", display:"flex", alignItems:"center", gap:6 }}>
        <div style={{ width:26, height:26, borderRadius:"50%", background:accent, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <span style={{ fontSize:9, fontWeight:800, color:"#fff" }}>{initial}</span>
        </div>
        <div>
          <div style={{ fontSize:10, fontWeight:700, color:"#fff" }}>{brandName}</div>
          <div style={{ fontSize:8, color:"rgba(255,255,255,0.35)" }}>Sponsored · {ad.platform}</div>
        </div>
      </div>
      <div style={{ height:100, background:`linear-gradient(135deg, ${bg} 0%, ${accent}22 100%)`, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:3, borderTop:`1px solid rgba(255,255,255,0.05)`, borderBottom:`1px solid rgba(255,255,255,0.05)` }}>
        {fmt==="Video"&&<span style={{ fontSize:22, opacity:0.35 }}>▶</span>}
        <span style={{ fontSize:8, color:"rgba(255,255,255,0.25)" }}>{fmt} creative</span>
      </div>
      <div style={{ padding:"8px 10px 10px" }}>
        <div style={{ fontSize:12, fontWeight:700, color:"#fff", marginBottom:2 }}>{ad.headline}</div>
        <div style={{ fontSize:10, color:"rgba(255,255,255,0.65)", lineHeight:1.5, marginBottom:6 }}>{ad.body}</div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:9, color:"rgba(255,255,255,0.3)" }}>{brand==="pf"?"propertyfinder.ae":"bayut.com"}</span>
          <span style={{ background:accent, borderRadius:4, padding:"4px 10px", fontSize:9, fontWeight:700, color:"#fff" }}>{ad.cta}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── AD CARD ────────────────────────────────────────────────────────────── */
function AdCard({ ad, brand }) {
  const accent = brand==="pf" ? C.pf : C.orange;
  return (
    <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:9, overflow:"hidden" }}>
      <div style={{ padding:"6px 10px 5px", display:"flex", justifyContent:"flex-end", gap:4, flexWrap:"wrap" }}>
        {ad.tags.slice(0,3).map(t=>(
          <span key={t} style={{ background:"rgba(255,255,255,0.04)", color:C.textMuted, borderRadius:3, padding:"1px 5px", fontSize:9 }}>{t}</span>
        ))}
      </div>
      <div style={{ padding:"0 10px" }}>
        <AdPreview ad={ad} brand={brand} />
      </div>
      <div style={{ padding:"7px 10px 9px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ display:"flex", alignItems:"center", gap:5, fontSize:9, color:C.textMuted }}>
          <span style={{ width:5, height:5, borderRadius:"50%", background:SPEND_DOT[ad.spend]||C.textMuted, flexShrink:0 }}/>
          {ad.spend} spend
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:9, color:C.textMuted }}>{ad.since}</span>
          {ad.sourceUrl && (
            <a href={ad.sourceUrl} target="_blank" rel="noopener noreferrer"
               style={{ fontSize:9, color:accent, textDecoration:"none", border:`1px solid ${accent}40`, borderRadius:4, padding:"2px 7px", fontWeight:600 }}>
              View ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── FORMAT SUMMARY ─────────────────────────────────────────────────────── */
function FormatSummary({ channel, format, pfAds, bayutAds, summaries, setSummaries, anthropicKey }) {
  const key = `${channel}::${format}`;
  const summary = summaries[key];
  const isLoading = summary === "loading";
  const generated = useRef(false);

  useEffect(() => {
    if (generated.current || summary) return;
    generated.current = true;
    setSummaries(prev=>({...prev,[key]:"loading"}));

    const desc = (ads, name) => ads.length===0
      ? `No ${format} ads for ${name} on ${channel}.`
      : ads.map(a=>`"${a.headline}" — ${a.body} | CTA: ${a.cta} | Tags: ${a.tags.join(", ")}`).join("\n");

    callClaude(
      `You are a senior performance marketing strategist at Property Finder UAE.
Analyse these ads. Return ONLY valid JSON.

Channel: ${channel} | Format: ${format}

PROPERTY FINDER:\n${desc(pfAds,"Property Finder")}

BAYUT:\n${desc(bayutAds,"Bayut")}

Return this exact JSON:
{
  "messaging_angle": "1-2 sentences comparing core narrative from each brand",
  "audience_signal": "1-2 sentences comparing who each brand is targeting",
  "funnel_stage": "Where in funnel each brand deploys this format",
  "creative_approach": "Visual and format strategy comparison",
  "cta_strength": "Comparison of CTA compelling-ness and differentiation",
  "pf_gap": "What Bayut is doing here that PF is NOT — and why it matters",
  "pf_context": "2-sentence summary of PF posture in this format",
  "bayut_context": "2-sentence summary of Bayut posture in this format"
}`, anthropicKey
    ).then(r => setSummaries(prev=>({...prev,[key]:r})))
     .catch(() => setSummaries(prev=>({...prev,[key]:{error:true}})));
  }, [channel, format]);

  if (isLoading) return (
    <div style={{ background:C.surface2, border:`1px solid ${C.border}`, borderRadius:10, padding:"16px 20px", display:"flex", alignItems:"center", gap:10 }}>
      <div style={{ fontSize:16, animation:"spin 1.2s linear infinite", display:"inline-block", color:C.textMuted }}>⟳</div>
      <span style={{ fontSize:12, color:C.textMuted }}>Generating AI strategic summary…</span>
    </div>
  );

  if (!summary) return null;
  if (summary.error) return (
    <div style={{ background:C.surface2, border:`1px solid ${C.red}25`, borderRadius:10, padding:"12px 18px" }}>
      <span style={{ fontSize:11, color:C.red }}>Summary unavailable. Check your Anthropic API key in Settings.</span>
    </div>
  );

  const POINTS = [
    { key:"messaging_angle",   icon:"💬", label:"Messaging Angle"   },
    { key:"audience_signal",   icon:"🎯", label:"Audience Signal"   },
    { key:"funnel_stage",      icon:"📊", label:"Funnel Stage"      },
    { key:"creative_approach", icon:"🎨", label:"Creative Approach" },
    { key:"cta_strength",      icon:"⚡", label:"CTA Strength"      },
    { key:"pf_gap",            icon:"🚨", label:"Property Finder Gap / Threat", red:true },
  ];

  return (
    <div style={{ background:C.surface2, border:`1px solid ${C.borderHi}`, borderRadius:10, overflow:"hidden" }}>
      <div style={{ padding:"11px 18px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", gap:8 }}>
        <div style={{ width:3, height:14, background:`linear-gradient(180deg, ${C.pf}, ${C.bayut})`, borderRadius:2 }}/>
        <span style={{ fontSize:11, fontWeight:700, color:C.textPri }}>Strategic Summary — {format} on {channel}</span>
        <span style={{ marginLeft:"auto", fontSize:9, color:C.textMuted, background:"rgba(255,255,255,0.04)", padding:"2px 8px", borderRadius:4, border:`1px solid ${C.border}` }}>AI Generated</span>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"150px 1fr 150px" }}>
        <div style={{ padding:"14px 14px", borderRight:`1px solid ${C.border}`, background:C.pfDim }}>
          <div style={lbl(C.pf)}>Property Finder</div>
          <div style={{ fontSize:11, color:C.textSec, lineHeight:1.6 }}>{summary.pf_context}</div>
        </div>
        <div style={{ padding:"14px 16px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px 16px" }}>
          {POINTS.map(p=>(
            <div key={p.key} style={{ borderLeft:`2px solid ${p.red?C.red:C.borderHi}`, paddingLeft:8 }}>
              <div style={lbl(p.red?C.red:C.teal)}>{p.icon} {p.label}</div>
              <div style={{ fontSize:12, color:p.red?"#FCA5A5":C.textSec, lineHeight:1.55, fontWeight:p.red?500:400 }}>{summary[p.key]}</div>
            </div>
          ))}
        </div>
        <div style={{ padding:"14px 14px", borderLeft:`1px solid ${C.border}`, background:C.bayutDim }}>
          <div style={lbl(C.bayut)}>Bayut</div>
          <div style={{ fontSize:11, color:C.textSec, lineHeight:1.6 }}>{summary.bayut_context}</div>
        </div>
      </div>
    </div>
  );
}

/* ─── FORMAT SECTION ─────────────────────────────────────────────────────── */
function FormatSection({ channel, format, subPlatform, pfAds, bayutAds, summaries, setSummaries, anthropicKey }) {
  const filteredPf    = subPlatform==="all" ? pfAds    : pfAds.filter(a=>a.platform.toLowerCase().includes(subPlatform));
  const filteredBayut = subPlatform==="all" ? bayutAds : bayutAds.filter(a=>a.platform.toLowerCase().includes(subPlatform));
  if (filteredPf.length===0 && filteredBayut.length===0) return null;

  return (
    <div style={{ marginBottom:30 }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
        <div style={{ fontSize:13, fontWeight:700, color:C.textPri }}>{format}</div>
        <div style={{ flex:1, height:1, background:C.border }}/>
        <span style={{ fontSize:10, color:C.textMuted }}>{filteredPf.length} Property Finder · {filteredBayut.length} Bayut</span>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1px 1fr", marginBottom:12 }}>
        <div style={{ paddingRight:16 }}>
          {filteredPf.length===0 ? (
            <div style={{ background:`${C.pf}06`, border:`1px dashed ${C.pf}28`, borderRadius:8, padding:16, textAlign:"center" }}>
              <div style={{ fontSize:11, color:`${C.pf}60` }}>No {format} ads detected</div>
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {filteredPf.map(ad=><AdCard key={ad.id} ad={ad} brand="pf"/>)}
            </div>
          )}
        </div>
        <div style={{ background:C.border, margin:"0 8px" }}/>
        <div style={{ paddingLeft:16 }}>
          {filteredBayut.length===0 ? (
            <div style={{ background:`${C.bayut}06`, border:`1px dashed ${C.bayut}28`, borderRadius:8, padding:16, textAlign:"center" }}>
              <div style={{ fontSize:11, color:`${C.bayut}60` }}>No {format} ads detected</div>
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {filteredBayut.map(ad=><AdCard key={ad.id} ad={ad} brand="bayut"/>)}
            </div>
          )}
        </div>
      </div>
      <FormatSummary channel={channel} format={format} pfAds={filteredPf} bayutAds={filteredBayut} summaries={summaries} setSummaries={setSummaries} anthropicKey={anthropicKey}/>
    </div>
  );
}

/* ─── SETTINGS MODAL ─────────────────────────────────────────────────────── */
function SettingsModal({ settings, onSave, onClose }) {
  const [metaToken, setMetaToken] = useState(settings.metaToken||"");
  const [anthropicKey, setAnthropicKey] = useState(settings.anthropicKey||"");

  const save = () => {
    onSave({ metaToken:metaToken.trim(), anthropicKey:anthropicKey.trim() });
    onClose();
  };

  return (
    <div style={{ position:"fixed", inset:0, zIndex:500, background:"rgba(0,0,0,0.7)", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:14, padding:28, width:480, maxWidth:"90vw" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22 }}>
          <div style={{ fontWeight:700, fontSize:15, color:C.textPri }}>⚙️  Dashboard Settings</div>
          <button onClick={onClose} style={{ background:"none", border:"none", color:C.textMuted, fontSize:20, cursor:"pointer" }}>×</button>
        </div>

        {/* Meta Token */}
        <div style={{ marginBottom:20 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
            <Logo.MetaFull size={16}/>
            <div style={{ fontSize:12, fontWeight:700, color:C.textPri }}>Meta Ad Library API Token</div>
            <span style={{ ...pill(C.teal), fontSize:9 }}>Enables Live Data</span>
          </div>
          <input value={metaToken} onChange={e=>setMetaToken(e.target.value)}
                 placeholder="EAAxxxxxxxxxx... (your Facebook User Access Token)"
                 style={{ width:"100%", background:C.surface2, border:`1px solid ${C.border}`, borderRadius:7, padding:"9px 12px", color:C.textPri, fontSize:12, fontFamily:"monospace", outline:"none" }}/>
          <div style={{ fontSize:10, color:C.textMuted, marginTop:5 }}>
            Get your token at{" "}
            <a href="https://www.facebook.com/ads/library/api/" target="_blank" rel="noopener noreferrer" style={{ color:C.teal }}>
              facebook.com/ads/library/api
            </a>
            {" "}→ Register → Get Token
          </div>
        </div>

        {/* Anthropic Key */}
        <div style={{ marginBottom:24 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
            <Logo.PF size={16}/>
            <div style={{ fontSize:12, fontWeight:700, color:C.textPri }}>Anthropic API Key</div>
            <span style={{ ...pill(C.amber), fontSize:9 }}>Enables AI Summaries</span>
          </div>
          <input value={anthropicKey} onChange={e=>setAnthropicKey(e.target.value)}
                 placeholder="sk-ant-xxxxxxxxxx..."
                 style={{ width:"100%", background:C.surface2, border:`1px solid ${C.border}`, borderRadius:7, padding:"9px 12px", color:C.textPri, fontSize:12, fontFamily:"monospace", outline:"none" }}/>
          <div style={{ fontSize:10, color:C.textMuted, marginTop:5 }}>
            Get your key at{" "}
            <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" style={{ color:C.teal }}>
              console.anthropic.com
            </a>
          </div>
        </div>

        <div style={{ display:"flex", gap:10 }}>
          <button onClick={save} style={{ flex:1, background:C.teal, border:"none", borderRadius:8, padding:"10px 0", color:"#0B0F1E", fontWeight:700, fontSize:13, cursor:"pointer" }}>
            Save & Apply
          </button>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,0.05)", border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 20px", color:C.textMuted, fontSize:13, cursor:"pointer" }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── REPORT VIEW ────────────────────────────────────────────────────────── */
function ReportView({ report, loading, onClose }) {
  const { date } = useGSTTime();
  const CHANNEL_LIST = Object.keys(CHANNELS);
  return (
    <div style={{ background:C.bg, minHeight:"100%", fontFamily:"DM Sans,sans-serif", color:C.textPri }}>
      <div style={{ background:C.surface, borderBottom:`1px solid ${C.border}`, padding:"14px 32px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <Logo.PF />
          <div>
            <div style={{ fontWeight:700, fontSize:15, color:C.textPri }}>Competitive Intelligence Report</div>
            <div style={{ fontSize:11, color:C.textMuted, marginTop:1 }}>{report?.period||"March 10–16, 2025"} · Growth Marketing Team</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={()=>window.print()} style={{ background:"rgba(255,255,255,0.05)", border:`1px solid ${C.border}`, color:C.textSec, borderRadius:7, padding:"7px 14px", fontSize:11, cursor:"pointer" }}>🖨 Print / PDF</button>
          <button onClick={onClose} style={{ background:"rgba(239,68,68,0.1)", border:`1px solid rgba(239,68,68,0.35)`, color:C.red, borderRadius:7, padding:"7px 14px", fontSize:11, cursor:"pointer" }}>✕ Close</button>
        </div>
      </div>
      <div style={{ maxWidth:980, margin:"0 auto", padding:"26px 32px" }}>
        {loading ? (
          <div style={{ textAlign:"center", padding:"100px 0", color:C.textMuted }}>
            <div style={{ fontSize:32, animation:"spin 1.2s linear infinite", display:"inline-block", marginBottom:14 }}>⟳</div>
            <div style={{ fontSize:14, color:C.textSec, marginBottom:5 }}>Generating your weekly briefing…</div>
          </div>
        ) : report?.error ? (
          <div style={{ textAlign:"center", padding:60, color:C.red }}>Report generation failed. Check your Anthropic API key in Settings.</div>
        ) : report ? (
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <div style={{ background:"rgba(245,158,11,0.05)", border:`1px solid rgba(245,158,11,0.25)`, borderRadius:10, padding:20 }}>
              <div style={lbl(C.amber)}>📋 Executive Summary — {report.period}</div>
              <div style={{ fontSize:14, color:C.textSec, lineHeight:1.8 }}>{report.exec_summary}</div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
              {[
                { key:"pf_strategy",    name:"Property Finder", color:C.pf },
                { key:"bayut_strategy", name:"Bayut",           color:C.bayut },
              ].map(b=>(
                <div key={b.key} style={{ background:`${b.color}07`, border:`1px solid ${b.color}22`, borderRadius:10, padding:16 }}>
                  <div style={lbl(b.color)}>{b.name} — Strategy This Week</div>
                  <div style={{ fontSize:13, color:C.textSec, lineHeight:1.75 }}>{report[b.key]}</div>
                </div>
              ))}
            </div>
            <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, overflow:"hidden" }}>
              <div style={{ padding:"11px 18px", borderBottom:`1px solid ${C.border}` }}>
                <div style={lbl()}>📡 Channel Breakdown</div>
              </div>
              {CHANNEL_LIST.map((ch,i)=>(
                <div key={ch} style={{ display:"flex", gap:16, padding:"11px 18px", borderBottom:i<CHANNEL_LIST.length-1?`1px solid ${C.border}`:"none", alignItems:"flex-start" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:7, width:100, flexShrink:0 }}>
                    {(() => { const L = CHANNELS[ch].iconLogo; return <L size={16}/>; })()}
                    <span style={{ fontWeight:700, color:C.textSec, fontSize:11 }}>{ch}</span>
                  </div>
                  <div style={{ fontSize:13, color:C.textSec, lineHeight:1.65, flex:1 }}>{report.channel_insights?.[ch]||"—"}</div>
                </div>
              ))}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 }}>
              {[
                { l:"Top Threats",      items:report.top_threats,      color:C.red,   icon:"⚠️" },
                { l:"Opportunities",    items:report.opportunities,    color:C.teal,  icon:"✨" },
                { l:"Priority Actions", items:report.priority_actions, color:C.amber, icon:"🚀" },
              ].map(col=>(
                <div key={col.l} style={{ background:`${col.color}07`, border:`1px solid ${col.color}22`, borderRadius:10, padding:16 }}>
                  <div style={lbl(col.color)}>{col.icon}  {col.l}</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
                    {(col.items||[]).map((item,i)=>(
                      <div key={i} style={{ display:"flex", gap:8 }}>
                        <span style={{ color:col.color, fontSize:10, marginTop:2, flexShrink:0, fontWeight:700 }}>{i+1}.</span>
                        <span style={{ fontSize:12, color:C.textSec, lineHeight:1.6 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ):null}
      </div>
    </div>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────────────────── */
function Footer() {
  const { time, date } = useGSTTime();
  const todayDate = new Date().toLocaleDateString("en-GB", { timeZone:"Asia/Dubai", day:"numeric", month:"long", year:"numeric" });
  return (
    <footer style={{ background:C.surface, borderTop:`1px solid ${C.border}`, padding:"16px 28px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8 }}>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <Logo.PF size={22}/>
        <span style={{ fontSize:12, color:C.textSec, fontWeight:600 }}>Property Finder</span>
        <span style={{ color:C.border }}>|</span>
        <span style={{ fontSize:12, color:C.textMuted }}>Growth Marketing Team</span>
        <span style={{ color:C.border }}>|</span>
        <span style={{ fontSize:12, color:C.textMuted }}>Data as of {todayDate}</span>
      </div>
      <div style={{ fontSize:11, color:C.textMuted }}>
        Last updated: {date} at {time} <span style={{ color:C.teal, fontWeight:600 }}>(GST, GMT+4)</span>
      </div>
    </footer>
  );
}

/* ─── MAIN APP ───────────────────────────────────────────────────────────── */
export default function App() {
  const [channel,      setChannel]      = useState("Meta");
  const [subPlatform,  setSubPlatform]  = useState("all");
  const [summaries,    setSummaries]    = useState({});
  const [showReport,   setShowReport]   = useState(false);
  const [report,       setReport]       = useState(null);
  const [rptLoad,      setRptLoad]      = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [liveAds,      setLiveAds]      = useState({});
  const [liveLoading,  setLiveLoading]  = useState(false);
  const [settings,     setSettings]     = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("pf_settings")||"{}");
    } catch { return {}; }
  });

  const chCfg = CHANNELS[channel];
  const isLiveChannel = chCfg.liveApi && !!settings.metaToken;
  const liveKey = `${channel}::live`;

  // Fetch live Meta ads when token + Meta selected
  useEffect(() => {
    if (!isLiveChannel || liveAds[liveKey]) return;
    setLiveLoading(true);
    Promise.all([
      fetchMetaAds({ query: chCfg.apiSearchTerms.pf,    platform:subPlatform, token:settings.metaToken }),
      fetchMetaAds({ query: chCfg.apiSearchTerms.bayut,  platform:subPlatform, token:settings.metaToken }),
    ]).then(([pfResults, bayutResults]) => {
      setLiveAds(prev=>({...prev,[liveKey]:{ pf:pfResults, bayut:bayutResults }}));
    }).catch(() => {
      setLiveAds(prev=>({...prev,[liveKey]:{error:true}}));
    }).finally(() => setLiveLoading(false));
  }, [channel, settings.metaToken]);

  const pfAds    = isLiveChannel ? (liveAds[liveKey]?.pf    || []) : (DEMO_ADS[channel]?.pf    || []);
  const bayutAds = isLiveChannel ? (liveAds[liveKey]?.bayut || []) : (DEMO_ADS[channel]?.bayut || []);

  const formats = chCfg.formats;
  const subPlatforms = chCfg.subPlatforms;

  const pfTotal    = Object.values(DEMO_ADS).flatMap(c=>c.pf   ||[]).length;
  const bayutTotal = Object.values(DEMO_ADS).flatMap(c=>c.bayut||[]).length;

  const saveSettings = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem("pf_settings", JSON.stringify(newSettings));
    setLiveAds({});
    setSummaries({});
  };

  const generateReport = async () => {
    setShowReport(true);
    if (report) return;
    setRptLoad(true);
    const inventory = Object.entries(DEMO_ADS).flatMap(([ch,comps])=>
      Object.entries(comps).flatMap(([comp,adList])=>
        adList.map(a=>`${comp==="pf"?"Property Finder":"Bayut"}|${ch}|${a.platform}|${a.format}|"${a.headline}"|Spend:${a.spend}`)
      )
    ).join("\n");
    try {
      const result = await callClaude(
        `You are Head of Competitive Intelligence at Property Finder UAE.
Generate a weekly briefing comparing Property Finder vs Bayut. Return ONLY valid JSON.

AD INVENTORY — WEEK OF MARCH 10–16, 2025:\n${inventory}

Return this exact JSON:
{"period":"March 10–16, 2025","exec_summary":"3 sharp sentences on key competitive developments","pf_strategy":"2-3 sentences on PF advertising posture","bayut_strategy":"2-3 sentences on Bayut advertising posture","channel_insights":{"Meta":"...","Google":"...","TikTok":"...","LinkedIn":"...","Twitter/X":"..."},"top_threats":["...","...","..."],"opportunities":["...","...","..."],"priority_actions":["...","...","..."]}`,
        settings.anthropicKey
      );
      setReport(result);
    } catch { setReport({error:true}); }
    setRptLoad(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'DM Sans',sans-serif;background:#0B0F1E;color:#fff}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:2px}
        @keyframes spin{to{transform:rotate(360deg)}}
        @media print{.no-print{display:none!important}}
        input:focus{outline:none;border-color:rgba(0,196,161,0.5)!important}
      `}</style>

      <div style={{ display:"flex", flexDirection:"column", minHeight:"100vh" }}>

        {/* ── HEADER ── */}
        <header className="no-print" style={{ background:C.surface, borderBottom:`1px solid ${C.border}`, padding:"0 24px", height:56, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:50 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <Logo.PF size={28}/>
            <div style={{ width:1, height:26, background:C.border, margin:"0 4px" }}/>
            <div>
              <div style={{ fontWeight:600, fontSize:13, color:C.textPri, lineHeight:1.2 }}>Competitive Intelligence</div>
              <div style={{ display:"flex", alignItems:"center", gap:5, marginTop:1 }}>
                <span style={{ fontSize:9, color:C.textMuted, letterSpacing:"0.08em", textTransform:"uppercase" }}>Property Finder vs Bayut</span>
                <span style={{ fontSize:9, background:isLiveChannel?"rgba(0,196,161,0.15)":"rgba(245,158,11,0.15)", border:`1px solid ${isLiveChannel?C.teal:C.amber}35`, color:isLiveChannel?C.teal:C.amber, borderRadius:4, padding:"1px 6px", fontWeight:600 }}>
                  {isLiveChannel ? "● LIVE" : "○ DEMO"}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display:"flex", gap:24, alignItems:"center" }}>
            {[
              { lbl:"Property Finder Ads", val:pfTotal, color:C.pf },
              { lbl:"Bayut Ads", val:bayutTotal, color:C.bayut },
            ].map(s=>(
              <div key={s.lbl} style={{ textAlign:"center" }}>
                <div style={{ fontSize:20, fontWeight:700, color:s.color, lineHeight:1 }}>{s.val}</div>
                <div style={{ fontSize:9, color:C.textMuted, textTransform:"uppercase", letterSpacing:"0.07em", marginTop:1 }}>{s.lbl}</div>
              </div>
            ))}
          </div>

          <div style={{ display:"flex", gap:8 }}>
            <button onClick={()=>setShowSettings(true)} style={{ background:"rgba(255,255,255,0.05)", border:`1px solid ${C.border}`, color:C.textSec, borderRadius:8, padding:"7px 14px", fontSize:12, cursor:"pointer" }}>
              ⚙️ Settings
            </button>
            <button onClick={generateReport} style={{ background:C.teal, color:"#0B0F1E", border:"none", borderRadius:8, padding:"8px 16px", fontFamily:"DM Sans,sans-serif", fontWeight:700, fontSize:12, cursor:"pointer", display:"flex", alignItems:"center", gap:6 }}>
              📋 Weekly Report
            </button>
          </div>
        </header>

        {/* ── CHANNEL TABS ── */}
        <nav className="no-print" style={{ background:C.surface, borderBottom:`1px solid ${C.border}`, padding:"0 24px", display:"flex", alignItems:"stretch", position:"sticky", top:56, zIndex:49 }}>
          {Object.entries(CHANNELS).map(([ch, cfg])=>{
            const L = cfg.iconLogo;
            const active = ch===channel;
            return (
              <button key={ch} onClick={()=>{ setChannel(ch); setSubPlatform("all"); }} style={{ background:"none", border:"none", borderBottom:`2px solid ${active?C.teal:"transparent"}`, color:active?C.teal:C.textMuted, padding:"8px 16px", fontFamily:"DM Sans,sans-serif", fontWeight:active?600:400, fontSize:13, cursor:"pointer", transition:"color 0.2s,border-color 0.2s", display:"flex", alignItems:"center", gap:7, whiteSpace:"nowrap" }}>
                <L size={17}/>
                {ch}
              </button>
            );
          })}

          {/* Sub-platform tabs */}
          {subPlatforms.length > 1 && (
            <div style={{ display:"flex", alignItems:"center", marginLeft:16, gap:4, borderLeft:`1px solid ${C.border}`, paddingLeft:16 }}>
              {subPlatforms.map(sp=>{
                const active = sp.id===subPlatform;
                return (
                  <button key={sp.id} onClick={()=>setSubPlatform(sp.id)} style={{ background:active?"rgba(255,255,255,0.08)":"none", border:`1px solid ${active?C.borderHi:C.border}`, borderRadius:20, color:active?C.textPri:C.textMuted, padding:"3px 12px", fontSize:11, fontWeight:active?600:400, cursor:"pointer", display:"flex", alignItems:"center", gap:5, transition:"all 0.2s" }}>
                    {sp.logo && <sp.logo size={13}/>}
                    {sp.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Library link for non-live channels */}
          {!chCfg.liveApi && chCfg.libraryUrl && (
            <div style={{ marginLeft:"auto", display:"flex", alignItems:"center" }}>
              <a href={chCfg.libraryUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize:11, color:C.teal, textDecoration:"none", display:"flex", alignItems:"center", gap:4 }}>
                View {channel} Ad Library ↗
              </a>
            </div>
          )}
        </nav>

        {/* ── CONTENT ── */}
        <main style={{ flex:1, maxWidth:1200, margin:"0 auto", width:"100%", padding:"24px 24px 40px" }}>

          {/* Column headers */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1px 1fr", marginBottom:22 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, paddingRight:16 }}>
              <Logo.PF size={22}/>
              <span style={{ fontSize:14, fontWeight:700, color:C.pf }}>Property Finder</span>
              <span style={{ marginLeft:"auto", ...pill(C.pf) }}>Your Brand</span>
            </div>
            <div/>
            <div style={{ display:"flex", alignItems:"center", gap:8, paddingLeft:16 }}>
              <Logo.BayutIcon size={22}/>
              <span style={{ fontSize:14, fontWeight:700, color:C.bayut }}>Bayut</span>
              <span style={{ marginLeft:"auto", ...pill(C.bayut) }}>Competitor</span>
            </div>
          </div>

          {liveLoading ? (
            <div style={{ textAlign:"center", padding:"60px 0", color:C.textMuted }}>
              <div style={{ fontSize:26, animation:"spin 1.2s linear infinite", display:"inline-block", marginBottom:10 }}>⟳</div>
              <div style={{ fontSize:13, color:C.textSec }}>Fetching live ads from Meta Ad Library…</div>
            </div>
          ) : liveAds[liveKey]?.error ? (
            <div style={{ background:"rgba(239,68,68,0.07)", border:`1px solid rgba(239,68,68,0.25)`, borderRadius:10, padding:20, marginBottom:20 }}>
              <div style={{ fontSize:13, color:C.red, fontWeight:600, marginBottom:4 }}>Live data fetch failed</div>
              <div style={{ fontSize:12, color:C.textMuted }}>Check your Meta API token in Settings. Showing demo data below.</div>
            </div>
          ) : null}

          {formats.map(fmt=>(
            <FormatSection
              key={`${channel}-${fmt}-${subPlatform}`}
              channel={channel} format={fmt} subPlatform={subPlatform}
              pfAds={pfAds.filter ? pfAds.filter(a=>a.format===fmt) : pfAds}
              bayutAds={bayutAds.filter ? bayutAds.filter(a=>a.format===fmt) : bayutAds}
              summaries={summaries} setSummaries={setSummaries}
              anthropicKey={settings.anthropicKey}
            />
          ))}
        </main>

        {/* ── FOOTER ── */}
        <Footer/>
      </div>

      {showSettings && <SettingsModal settings={settings} onSave={saveSettings} onClose={()=>setShowSettings(false)}/>}

      {showReport && (
        <div style={{ position:"fixed", inset:0, zIndex:200, overflow:"auto" }}>
          <ReportView report={report} loading={rptLoad} onClose={()=>setShowReport(false)}/>
        </div>
      )}
    </>
  );
}
