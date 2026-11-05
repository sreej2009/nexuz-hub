// Business details used across the site.
export const SITE = {
  name: 'Nexuz Hub',
  tagline: 'Your Vision, Our Nexuz',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  phone: '+91 90036 24196',
  phoneHref: 'tel:+919003624196',
  phone2: '+91 73976 24196',
  phone2Href: 'tel:+917397624196',
  email: 'nexuzhub.cbe@gmail.com',
  whatsapp: '919003624196',
  address: ['221 D/1, Sathy Road (East)', 'Saravanampatti, Coimbatore', 'Tamil Nadu – 641035'],
  coords: { lat: 11.0806, lng: 77.0069 },
  gstin: '33ABAFN0838J1ZF',
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    linkedin: 'https://linkedin.com',
    youtube: 'https://youtube.com',
  },
};

export const whatsappLink = (text = "Hi Nexuz Hub! I'd like to get a quote for a project.") =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${SITE.coords.lat},${SITE.coords.lng}`;

export const NAV = [
  { label: 'Services', href: '/services', menu: 'services' },
  { label: 'Products', href: '/products', menu: 'products' },
  { label: 'Process', href: '/process' },
  { label: 'About', href: '/about' },
  { label: 'Reviews', href: '/testimonial' },
  { label: 'FAQ', href: '/faq' },
];

export const STATS = [
  { value: '0.1', unit: 'mm', label: 'Cutting precision' },
  { value: '48', unit: 'hr', label: 'Standard turnaround' },
  { value: '98', unit: '%', label: 'On-time dispatch' },
  { value: '500', unit: '+', label: 'Happy clients' },
];

export const MATERIALS = [
  'Cast acrylic',
  'Birch plywood',
  'MDF',
  'Solid hardwood',
  'Tempered glass',
  'Genuine leather',
  'Ceramic tile',
  'Composite panels',
  'PETG & PLA',
  'SLA resin',
  'Stainless steel',
  'PVC foam board',
];
