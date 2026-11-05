import details from './services.json';

// Index-level info for each service; the rich page content lives in services.json.
const SUMMARY = [
  {
    slug: 'uv-printing',
    name: 'UV Flatbed Printing',
    short: 'UV Printing',
    tag: '0.05mm precision',
    blurb: 'Vivid, waterproof direct-to-substrate printing on acrylic, wood, glass and leather.',
  },
  {
    slug: 'laser-cutting',
    name: 'CO2 Laser Cutting',
    short: 'Laser Cutting',
    tag: 'Flame-polished',
    blurb: '0.1mm accuracy beam slicing for acrylic, MDF and plywood with flame-polished edges.',
  },
  {
    slug: 'laser-engraving',
    name: 'Laser Engraving',
    short: 'Laser Engraving',
    tag: 'Permanent mark',
    blurb: 'Permanent micro-etching on solid timber, acrylic, leather and glass items.',
  },
  {
    slug: '3d-printing',
    name: '3D Printing & Prototyping',
    short: '3D Printing',
    tag: '0.08mm layer',
    blurb: 'FDM and resin SLA layer-by-layer manufacturing from digital 3D CAD files.',
  },
  {
    slug: 'custom-gifts',
    name: 'Custom Gifts & Awards',
    short: 'Custom Gifts',
    tag: 'Single & bulk',
    blurb: 'Bespoke corporate recognition trophies, personalised wooden keepsakes and gift sets.',
  },
  {
    slug: 'sign-boards',
    name: '3D Sign Boards & Fitting',
    short: 'Sign Boards',
    tag: 'Turnkey fit',
    blurb: 'Storefront illuminated 3D LED letters, built-up acrylic logo signs and site mounting.',
  },
];

export const SERVICES = SUMMARY.map((s, i) => ({
  ...s,
  index: String(i + 1).padStart(2, '0'),
  image: details[s.slug].heroImage,
  ...details[s.slug],
}));

export const getService = (slug) => SERVICES.find((s) => s.slug === slug);
