import frontwide from '../assets/frontwide.jpg'
import frontsidewide from '../assets/frontsidewide.jpg'
import backwide from '../assets/backwide.jpg'
import sideup from '../assets/sideup.jpg'

export const WHATSAPP_URL = "https://wa.me/PHONE_NUMBER?text=Hello%2C%20I%20would%20like%20to%20discuss%20an%20architecture%20project."
export const EASING = "cubic-bezier(0.22, 1, 0.36, 1)"

export const HERO_SLIDES = [
  {
    id: 1,
    image: frontwide,
    title: "CONCRETE\nAND LIGHT",
    subtitle: "Where material and atmosphere converge.",
    cta: "View Selected Projects",
    project: "The Nakula Residence — Bandung, 2024",
  },
  {
    id: 2,
    image: frontsidewide,
    title: "FORM FOLLOWS\nPURPOSE",
    subtitle: "Spaces shaped by material, light, and context.",
    cta: "Explore the Studio",
    project: "The Karang House — Bali, 2023",
  },
  {
    id: 3,
    image: backwide,
    title: "PRECISION IN\nEVERY DETAIL",
    subtitle: "Architecture as a considered act.",
    cta: "Start Your Project",
    project: "Pavilion Timur — Yogyakarta, 2024",
  },
  {
    id: 4,
    image: sideup,
    title: "WARMTH\nAND STRUCTURE",
    subtitle: "Timber, stone, and the art of dwelling.",
    cta: "View Selected Projects",
    project: "Villa Ubud — Bali, 2023",
  }
]

export const PROJECTS = [
  {
    id: 1,
    name: "The Nakula Residence",
    category: "Residential",
    location: "Bandung, Indonesia",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1566457993476-4167522c8fc3?w=800&h=1100&fit=crop&auto=format",
    aspectRatio: "portrait",
    alt: "Concrete residential building, portrait view",
  },
  {
    id: 2,
    name: "Pavilion Timur",
    category: "Cultural",
    location: "Yogyakarta, Indonesia",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1660502316360-327f4741d887?w=1100&h=740&fit=crop&auto=format",
    aspectRatio: "landscape",
    alt: "Contemporary pavilion with railing and trees",
  },
  {
    id: 3,
    name: "The Karang House",
    category: "Residential",
    location: "Bali, Indonesia",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1774516534097-76eb46de7229?w=800&h=1000&fit=crop&auto=format",
    aspectRatio: "portrait",
    alt: "Modern concrete interior with wooden floor and large window",
  },
  {
    id: 4,
    name: "Villa Ubud",
    category: "Hospitality",
    location: "Ubud, Bali",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1760067537376-265afef0f362?w=1100&h=740&fit=crop&auto=format",
    aspectRatio: "landscape",
    alt: "Spacious modern living room with large windows",
  },
  {
    id: 5,
    name: "Amerta Studio",
    category: "Commercial",
    location: "Jakarta, Indonesia",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1760067537639-0fb475c87657?w=880&h=880&fit=crop&auto=format",
    aspectRatio: "square",
    alt: "Bedroom with large window and forest view",
  },
  {
    id: 6,
    name: "The Bandung Compound",
    category: "Residential",
    location: "Bandung, Indonesia",
    year: "2022",
    image:
      "https://images.unsplash.com/photo-1771344161733-9041ff4cc9a6?w=800&h=1100&fit=crop&auto=format",
    aspectRatio: "portrait",
    alt: "Modern building corner against clear blue sky",
  },
  {
    id: 7,
    name: "Taman Alam Retreat",
    category: "Hospitality",
    location: "Lombok, Indonesia",
    year: "2022",
    image:
      "https://images.unsplash.com/photo-1760067537524-a0c0703d9721?w=1100&h=700&fit=crop&auto=format",
    aspectRatio: "landscape",
    alt: "Modern living room with wood paneling and large windows",
  },
  {
    id: 8,
    name: "Selatan House",
    category: "Residential",
    location: "Surabaya, Indonesia",
    year: "2022",
    image:
      "https://images.unsplash.com/photo-1781467841646-c9da6fad3780?w=800&h=1100&fit=crop&auto=format",
    aspectRatio: "portrait",
    alt: "Modern curved building with trees",
  },
]

export const CANVAS_PROJECTS = [
  { id: 1, x: 80, y: 80, w: 380, h: 260, image: "https://images.unsplash.com/photo-1614595737476-42487331b8a1?w=760&h=520&fit=crop&auto=format", name: "The Nakula Residence", year: "2024", category: "Residential", alt: "Concrete building exterior" },
  { id: 2, x: 520, y: 50, w: 260, h: 360, image: "https://images.unsplash.com/photo-1566457993476-4167522c8fc3?w=520&h=720&fit=crop&auto=format", name: "Villa Ubud", year: "2023", category: "Hospitality", alt: "Concrete residential building" },
  { id: 3, x: 840, y: 90, w: 420, h: 280, image: "https://images.unsplash.com/photo-1660502316360-327f4741d887?w=840&h=560&fit=crop&auto=format", name: "Pavilion Timur", year: "2024", category: "Cultural", alt: "Pavilion with trees" },
  { id: 4, x: 60, y: 390, w: 280, h: 380, image: "https://images.unsplash.com/photo-1774516534097-76eb46de7229?w=560&h=760&fit=crop&auto=format", name: "The Karang House", year: "2023", category: "Residential", alt: "Concrete interior with wood" },
  { id: 5, x: 400, y: 460, w: 460, h: 300, image: "https://images.unsplash.com/photo-1760067537376-265afef0f362?w=920&h=600&fit=crop&auto=format", name: "Taman Alam Retreat", year: "2022", category: "Hospitality", alt: "Modern living room" },
  { id: 6, x: 920, y: 410, w: 300, h: 420, image: "https://images.unsplash.com/photo-1771344161733-9041ff4cc9a6?w=600&h=840&fit=crop&auto=format", name: "Selatan House", year: "2022", category: "Residential", alt: "Modern building corner" },
  { id: 7, x: 160, y: 820, w: 420, h: 270, image: "https://images.unsplash.com/photo-1766445318570-1dc4bf3f5d79?w=840&h=540&fit=crop&auto=format", name: "Amerta Studio", year: "2023", category: "Commercial", alt: "Curved wooden ceiling" },
  { id: 8, x: 640, y: 800, w: 260, h: 360, image: "https://images.unsplash.com/photo-1781467841646-c9da6fad3780?w=520&h=720&fit=crop&auto=format", name: "The Bandung Compound", year: "2022", category: "Residential", alt: "Curved building with trees" },
  { id: 9, x: 960, y: 870, w: 360, h: 240, image: "https://images.unsplash.com/photo-1608619769165-25647672335f?w=720&h=480&fit=crop&auto=format", name: "Cikaret Villa", year: "2021", category: "Residential", alt: "Concrete compound exterior" },
  { id: 10, x: 1380, y: 100, w: 300, h: 420, image: "https://images.unsplash.com/photo-1760067537639-0fb475c87657?w=600&h=840&fit=crop&auto=format", name: "Forest Retreat", year: "2021", category: "Residential", alt: "Bedroom with forest view" },
  { id: 11, x: 1740, y: 80, w: 440, h: 290, image: "https://images.unsplash.com/photo-1770462957172-955ded9e6154?w=880&h=580&fit=crop&auto=format", name: "Halaman House", year: "2021", category: "Residential", alt: "Concrete building with person" },
  { id: 12, x: 1400, y: 570, w: 460, h: 300, image: "https://images.unsplash.com/photo-1760067537524-a0c0703d9721?w=920&h=600&fit=crop&auto=format", name: "Bumi Studio", year: "2020", category: "Commercial", alt: "Wood panel interior" },
]
