import type { HeroContent, Project } from './types';

export const HERO: HeroContent = {
  eyebrow: 'Project Logistics',
  title: 'Oversized & Project Cargo Logistics UAE: Planned, Permitted, Delivered',
  description:
    "Reactors, blades, transformers, cranes — cargo that won't fit standard freight. Zajel's project team engineers the route, clears the permits, and moves it, corridor by corridor.",
  image: '/Homepage/projects/project-cargo-hero.jpg',
  stats: [
    { value: '186+', label: 'project moves delivered' },
    { value: '46', label: 'countries worked in' },
    { value: '1,450t', label: 'heaviest single lift' },
  ],
};

/**
 * Every project below is a real move pulled from Zajel's freight portfolio.
 * Images live in /public/Homepage/projects and these paths resolve as-is.
 */
export const PROJECTS: Project[] = [
  {
    title: 'Vehicle export',
    place: 'Dubai, UAE',
    caption: 'A vehicle prepared and exported by air, with secure handling door to door.',
    image: '/Homepage/vehicle-export-flatbed.webp',
    alt: 'Vehicle loaded on a flatbed at an air cargo terminal',
  },
  {
    title: 'Exhibition display model',
    place: 'Dubai to India & London',
    caption:
      'A fragile, time-sensitive building model moved to real-estate exhibitions, with overseas warehousing arranged en route.',
    image: '/Homepage/project-cargo-pipes-flatbed.png',
    alt: 'Crated exhibition model being handled and displayed',
  },
  {
    title: 'Special equipment, sea freight',
    place: 'Flat-rack ocean transport',
    caption: 'Oversized cylindrical equipment loaded onto flat-rack containers for ocean transport.',
    image: '/Homepage/project-cargo-pipes-flatbed.png',
    alt: 'Large cylindrical equipment loaded onto a flat-rack container',
  },
  {
    title: 'Oil & gas process equipment',
    place: 'UAE',
    caption: 'A heat exchanger staged and secured for onward transport from an industrial yard.',
    image: '/Homepage/projects/oil-gas-process-equipment.jpg',
    alt: 'Heat exchanger unit on a trailer with a Zajel flag',
  },
  {
    title: 'Breakbulk shipment',
    place: 'UAE to Iraq',
    caption: 'A long process vessel moved as breakbulk cargo and loaded aboard an ocean carrier.',
    image: '/Homepage/projects/breakbulk-uae-iraq.jpg',
    alt: 'Long cylindrical vessel secured on the deck of a cargo ship',
  },
  {
    title: 'Heavy lift at port',
    place: 'Port heavy-lift',
    caption: 'Twin heat exchangers lifted by gantry crane and set down for vessel loading.',
    image: '/Homepage/projects/heavy-lift-heat-exchanger.jpg',
    alt: 'Gantry crane lifting a heat exchanger at a port yard',
  },
  {
    title: 'Heavy-weight girders',
    place: 'UAE to NEOM, Saudi Arabia',
    caption: 'Precast concrete units moved cross-border, with road permits secured across the UAE and KSA.',
    image: '/Homepage/projects/neom-heavy-weight.jpg',
    alt: 'Precast concrete girder being lifted onto a trailer',
  },
  {
    title: 'Oil & gas equipment',
    place: 'Cross-border, UAE and Saudi Arabia',
    caption: 'A pressure vessel transported across the border on a multi-axle low-bed trailer.',
    image: '/Homepage/projects/oil-gas-cross-border.jpg',
    alt: 'Pressure vessel on a low-bed trailer with a truck cab attached',
  },
  {
    title: 'Aluminium convoy, 100 trucks',
    place: 'UAE to Saudi Arabia',
    caption: 'A hundred trucks of aluminium products coordinated as a single cross-border movement.',
    image: '/Homepage/projects/aluminium-truck-convoy.jpg',
    alt: 'Fleet of flatbed trucks loaded with aluminium products',
  },
  {
    title: 'ISO tank containers',
    place: 'Cross-border road freight',
    caption: 'A fleet of ISO tank containers moved by road under full hazard-handling protocol.',
    image: '/Homepage/projects/iso-tank-containers.jpg',
    alt: 'ISO tank containers loaded on flatbed trucks',
  },
  {
    title: 'Oversized industrial equipment',
    place: 'KSA to UAE',
    caption: 'Out-of-gauge cooling equipment craned onto a low-bed trailer for cross-border transport.',
    image: '/Homepage/projects/oversized-industrial-equipment.jpg',
    alt: 'Large industrial cooling unit being lifted by a mobile crane',
  },
  {
    title: 'Breakbulk carbon steel',
    place: 'Ocean breakbulk',
    caption: '3,000 tons of carbon steel plates and rebar loaded aboard a breakbulk vessel.',
    image: '/Homepage/projects/breakbulk-carbon-steel.jpg',
    alt: 'Steel rebar and plates being loaded onto a breakbulk vessel',
  },
  {
    title: 'Overlength industrial pipes',
    place: 'Domestic, UAE',
    caption: 'Overlength steel pipe sections moved domestically, with route planning built around the dimensions.',
    image: '/Homepage/projects/industrial-pipes.jpg',
    alt: 'Long steel pipe sections on an extended flatbed trailer',
  },
  {
    title: 'Delivery to an oil & gas field',
    place: 'Field-site delivery',
    caption: 'Process equipment delivered directly to an active field site by road.',
    image: '/Homepage/projects/oil-gas-field-delivery.jpg',
    alt: 'Equipment on a truck arriving at an oil and gas field site',
  },
  {
    title: '120-tonne air freight project',
    place: 'India to Iraq',
    caption: 'A 120-metric-ton project shipment moved by air, with cranes staged at both ends.',
    image: '/Homepage/projects/air-freight-120mt.jpg',
    alt: 'Crane lifting a large crated shipment onto a trailer',
  },
  {
    title: 'Aircraft engine relocation',
    place: 'UAE to Saudi Arabia',
    caption: 'A high-value aircraft engine moved on an air-suspension low-bed trailer for extra stability.',
    image: '/Homepage/projects/aerospace-engine.jpg',
    alt: 'Wrapped aircraft engine secured on a specialized trailer',
  },
  {
    title: 'Yacht transport',
    place: 'Domestic & cross-border',
    caption: 'High-value yachts cradled, wrapped, and delivered with full route coordination.',
    image: '/Homepage/projects/yacht-logistics.jpg',
    alt: 'Wrapped yacht secured on a trailer for transport',
  },
];