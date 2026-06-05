export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  estimatedPrice: string;
  isGuessed: boolean; // Flag to remind owner to confirm prices
  timeRequired: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const services: ServiceItem[] = [
  {
    id: "screen",
    name: "Screen & Display Replacement",
    description: "Premium quality display replacements for all brands of smartphones, resolving cracks, touch issues, and display lines.",
    estimatedPrice: "₹1,499 - ₹4,999",
    isGuessed: true,
    timeRequired: "Under 30 minutes"
  },
  {
    id: "battery",
    name: "Original Battery Replacement",
    description: "Restore your phone's battery life with reliable, tested replacements that solve fast draining and overheating issues.",
    estimatedPrice: "₹799 - ₹1,999",
    isGuessed: true,
    timeRequired: "Under 20 minutes"
  },
  {
    id: "charging",
    name: "Charging Port Repair",
    description: "Fix loose connections, slow charging, or complete charging failure with high quality port replacements.",
    estimatedPrice: "₹399 - ₹899",
    isGuessed: true,
    timeRequired: "Under 15 minutes"
  },
  {
    id: "camera",
    name: "Camera & Glass Replacement",
    description: "Replace cracked back camera glass lenses or faulty front/back camera modules to get your crisp photos back.",
    estimatedPrice: "₹499 - ₹1,499",
    isGuessed: true,
    timeRequired: "Under 25 minutes"
  },
  {
    id: "software",
    name: "Software & Unlocking Services",
    description: "Resolve boot loops, logo hanging issues, software updates, or device unlocking safely and quickly.",
    estimatedPrice: "₹299 - ₹799",
    isGuessed: true,
    timeRequired: "Under 30 minutes"
  },
  {
    id: "speaker",
    name: "Mic & Ear Speaker Repair",
    description: "Fix low volume, crackling sound, or mute mic issues, restoring clear call quality.",
    estimatedPrice: "₹299 - ₹699",
    isGuessed: true,
    timeRequired: "Under 20 minutes"
  }
];

export const testimonials: TestimonialItem[] = [
  {
    id: "1",
    name: "Ramesh Kumar",
    location: "Yadiki",
    text: "My Android phone screen cracked badly. I visited SP Mobiles and they replaced the display in just twenty minutes. The touch quality feels original.",
    rating: 5
  },
  {
    id: "2",
    name: "Haritha P.",
    location: "Anantapuram",
    text: "Very fast service. I got my phone battery replaced here. Shasha was professional and the overheating issue is completely gone.",
    rating: 5
  },
  {
    id: "3",
    name: "Sekhar Maddela",
    location: "Yadiki",
    text: "They repaired my phone's charging port in fifteen minutes flat. Prompt service and transparent prices right in Yadiki.",
    rating: 5
  }
];

export const faqs: FAQItem[] = [
  {
    id: "faq-1",
    question: "Do you really complete repairs in under thirty minutes?",
    answer: "Yes, for standard repairs like screens, batteries, and charging ports, we stock high quality replacement parts and complete the work in fifteen to thirty minutes while you wait."
  },
  {
    id: "faq-2",
    question: "How can I check if you have a specific phone or spare part in stock?",
    answer: "You can click our Call to Enquire button or message us directly on WhatsApp. We will let you know about stock availability and exact pricing instantly."
  },
  {
    id: "faq-3",
    question: "Where are you located in Yadiki?",
    answer: "We are located beside Apollo Pharmacy in Yadiki. You can easily find us on the main road, and we welcome walk-in customers."
  },
  {
    id: "faq-4",
    question: "Do you sell new and used mobile phones?",
    answer: "Yes, we sell smartphones, mobile accessories, chargers, and premium tempered glasses. Call us to ask about our current deals on new and pre-owned smartphones."
  }
];
