import details from './products.json';

// The three built-in product ranges. Products added in the admin page are
// filed under one of these (or "other").
const SUMMARY = [
  {
    slug: 'personalized-gifts',
    name: 'Personalized Gifts & Accessories',
    short: 'Personalized Gifts',
    blurb: 'Custom mobile covers & laptop skins, acrylic photo frames & Spotify plaques, keychains, pen drives, drinkware and coasters.',
    tag: '3D UV tactile texture',
  },
  {
    slug: 'signage-branding',
    name: 'Signage & Commercial Branding',
    short: 'Signage & Branding',
    blurb: 'Acrylic logo boards & reception signs, nameplates & desk ID badges, PVC sunboard displays and Braille signage.',
    tag: 'Braille compliant',
  },
  {
    slug: 'home-decor',
    name: 'Home Decor & Interior Elements',
    short: 'Home Decor',
    blurb: 'Custom printed tiles, wooden wall art & clocks, canvas prints, leatherette goods, printed cabinet doors and glass partitions.',
    tag: '1440 DPI flatbed',
  },
];

export const RANGES = SUMMARY.map((r) => ({ ...r, ...details[r.slug] }));

export const getRange = (slug) => RANGES.find((r) => r.slug === slug);

export const PRODUCT_CATEGORIES = [
  ...SUMMARY.map((r) => ({ value: r.slug, label: r.short })),
  { value: 'other', label: 'Other' },
];

export const categoryLabel = (value) => PRODUCT_CATEGORIES.find((c) => c.value === value)?.label ?? 'Other';
