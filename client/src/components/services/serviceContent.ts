export type ServiceBenefit = {
  title: string
  description: string
}

export type ServiceProcessStep = {
  stepLabel: string
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  imageObjectPosition?: string
}

export type ServiceFaqItem = {
  question: string
  answer: string
}

export type ServiceContactVariant = "financing" | "trade-in" | "contact"

export type ContactInfoItem = {
  label: string
  href?: string
}

export type ContactInfoGroup = {
  title: string
  items: ContactInfoItem[]
}

export type ServiceLinkCard = {
  title: string
  description: string
  href: string
  ctaLabel: string
}

export type ServicePageContent = {
  hero: {
    title: string
    imageSrc: string
    imageAlt: string
    imageObjectPosition?: string
  }
  benefits: {
    eyebrow: string
    title: string
    items: ServiceBenefit[]
    imageSrc: string
    imageAlt: string
    imageObjectPosition?: string
  }
  process: {
    eyebrow: string
    title: string
    steps: ServiceProcessStep[]
  }
  contact: {
    eyebrow: string
    title: string
    imageSrc: string
    imageAlt: string
    imageObjectPosition?: string
    variant: ServiceContactVariant
  }
  faq: {
    eyebrow: string
    title: string
    items: ServiceFaqItem[]
    defaultOpenIndex?: number | null
  }
}

export type ContactPageContent = {
  hero: {
    title: string
    imageSrc: string
    imageAlt: string
    imageObjectPosition?: string
  }
  contact: ServicePageContent["contact"]
  info: {
    eyebrow: string
    title: string
    groups: ContactInfoGroup[]
  }
  services: {
    eyebrow: string
    title: string
    cards: ServiceLinkCard[]
    imageSrc: string
    imageAlt: string
    imageObjectPosition?: string
  }
  faq: ServicePageContent["faq"]
}

export type LegalDocumentSection = {
  title: string
  body: string
}

export type LegalDocumentContent = {
  title: string
  updatedAt: string
  sections: LegalDocumentSection[]
}

export const financingPageContent: ServicePageContent = {
  hero: {
    title: "Financing Options",
    imageSrc: "/categoriesHero/financingHero.png",
    imageAlt: "Financing options hero",
    imageObjectPosition: "48.7% 85.1%",
  },
  benefits: {
    eyebrow: "Benefits",
    title: "Why finance with us",
    imageSrc: "/financing/benefits.png",
    imageAlt: "Why finance with us",
    items: [
      {
        title: "Flexible payment options",
        description: "Options that fit different budgets.",
      },
      {
        title: "Clear process",
        description: "Simple steps, no unnecessary complexity.",
      },
      {
        title: "Expert support",
        description: "Guidance from our team at every stage.",
      },
      {
        title: "Transparent terms",
        description: "Clear terms, no hidden fees.",
      },
    ],
  },
  process: {
    eyebrow: "Process",
    title: "How Financing Works",
    steps: [
      {
        stepLabel: "(Step 01)",
        title: "Choose Your Vehicle",
        description: "Select a vehicle from our current inventory.",
        imageSrc: "/financing/step-1.png",
        imageAlt: "Choose your vehicle",
      },
      {
        stepLabel: "(Step 02)",
        title: "Explore Financing Options",
        description: "Review financing options with our team.",
        imageSrc: "/financing/step-2.png",
        imageAlt: "Explore financing options",
      },
      {
        stepLabel: "(Step 03)",
        title: "Finalize Your Purchase",
        description: "Complete the purchase with clear next steps.",
        imageSrc: "/financing/step-3.png",
        imageAlt: "Finalize your purchase",
        imageObjectPosition: "49.3% 100%",
      },
    ],
  },
  contact: {
    eyebrow: "Get in touch",
    title: "Get Financing Options",
    imageSrc: "/financing/form.png",
    imageAlt: "Financing contact form",
    imageObjectPosition: "56.8% 74.6%",
    variant: "financing",
  },
  faq: {
    eyebrow: "Customer questions",
    title: "Frequently Asked Questions",
    defaultOpenIndex: null,
    items: [
      {
        question: "Do you offer financing for pre-owned vehicles?",
        answer: "Yes. Financing options may be available for both new and pre-owned vehicles, depending on availability, eligibility, and specific vehicle conditions.",
      },
      {
        question: "What documents are required to apply for financing?",
        answer: "Required documents may vary, but typically include a valid ID and basic financial information. Our team will guide you through the process.",
      },
      {
        question: "How long does the financing approval process take?",
        answer: "Approval timelines vary based on individual circumstances, but our team works to provide clear next steps as quickly as possible.",
      },
      {
        question: "Can I discuss financing options before choosing a vehicle?",
        answer: "Yes. You can contact our team to discuss available financing options and general terms before making a final vehicle selection.",
      },
    ],
  },
}

export const tradeInPageContent: ServicePageContent = {
  hero: {
    title: "Trade-In Options",
    imageSrc: "/categoriesHero/tradeInHero.png",
    imageAlt: "Trade-in options hero",
  },
  benefits: {
    eyebrow: "Benefits",
    title: "Why trade in with us",
    imageSrc: "/tradeIn/benefits.png",
    imageAlt: "Why trade in with us",
    items: [
      {
        title: "Fair market value",
        description: "Competitive offers based on market data.",
      },
      {
        title: "Simple evaluation",
        description: "No complicated steps or hidden conditions.",
      },
      {
        title: "Seamless upgrade",
        description: "Apply your trade-in value to your vehicle.",
      },
      {
        title: "No obligation offer",
        description: "Request an estimate without any pressure.",
      },
    ],
  },
  process: {
    eyebrow: "Process",
    title: "How Trade-In Works",
    steps: [
      {
        stepLabel: "(Step 01)",
        title: "Submit Vehicle Details",
        description: "Provide basic details about your vehicle.",
        imageSrc: "/tradeIn/step-1.png",
        imageAlt: "Submit vehicle details",
      },
      {
        stepLabel: "(Step 02)",
        title: "Receive Trade-In Estimate",
        description: "We review details and calculate value.",
        imageSrc: "/tradeIn/step-2.png",
        imageAlt: "Receive trade-in estimate",
      },
      {
        stepLabel: "(Step 03)",
        title: "Apply Value to Your Purchase",
        description: "Use trade-in value toward your purchase.",
        imageSrc:
          "/tradeIn/step-3.png",
        imageAlt: "Apply value to your purchase",
      },
    ],
  },
  contact: {
    eyebrow: "Get in touch",
    title: "Get a Trade-In Offer",
    imageSrc: "/tradeIn/form.png",
    imageAlt: "Trade-in contact form",
    imageObjectPosition: "0% 44.1%",
    variant: "trade-in",
  },
  faq: {
    eyebrow: "Customer questions",
    title: "Frequently Asked Questions",
    defaultOpenIndex: 0,
    items: [
      {
        question: "Do you accept trade-ins for any vehicle type?",
        answer:
          "Yes. We evaluate most makes and models, including pre-owned vehicles.",
      },
      {
        question: "Is the trade-in estimate final?",
        answer:
          "Estimates are based on provided details and may be adjusted after inspection.",
      },
      {
        question: "Can I trade in a vehicle with an existing loan?",
        answer:
          "In many cases, yes. Our team will explain available options.",
      },
      {
        question: "Do I need to trade in to buy a vehicle?",
        answer:
          "No. Trade-in is optional and not required to complete a purchase.",
      },
    ],
  },
}

export const contactPageContent: ContactPageContent = {
  hero: {
    title: "Contact Us",
    imageSrc:
      "https://framerusercontent.com/images/N9M6yXRQAFSaovdCZIqDLCXB0.jpg?width=3497&height=1749",
    imageAlt: "Drivehub contact hero",
    imageObjectPosition: "56.6% 100%",
  },
  contact: {
    eyebrow: "Get in touch",
    title: "Talk to our team",
    imageSrc:
      "https://framerusercontent.com/images/PpoqiiYD2UWYVUClJqYdh16D5U.webp?width=2200&height=2200",
    imageAlt: "Talk to our team",
    imageObjectPosition: "center",
    variant: "contact",
  },
  info: {
    eyebrow: "How to reach us",
    title: "Contact Information",
    groups: [
      {
        title: "Get in Touch",
        items: [
          { label: "+1 (555) 246-8100", href: "tel:+15552468100" },
          { label: "hello@drivehub.com", href: "mailto:hello@drivehub.com" },
        ],
      },
      {
        title: "Address & Working Hours",
        items: [
          {
            label: "2450 W Pico Blvd, Los Angeles, USA",
            href: "https://www.google.com/maps",
          },
          { label: "Mon-Sat, 9:00 AM - 6:00 PM" },
        ],
      },
      {
        title: "Socials",
        items: [
          { label: "Instagram", href: "https://www.instagram.com" },
          { label: "Facebook", href: "https://www.facebook.com" },
        ],
      },
    ],
  },
  services: {
    eyebrow: "Services",
    title: "Trade-in & Financing Options",
    imageSrc:
      "https://framerusercontent.com/images/uTYrLQMqVvekfeZkzM5H8A2H80.webp?width=2700&height=1350",
    imageAlt: "Trade-in and financing options",
    imageObjectPosition: "center",
    cards: [
      {
        title: "Trade-In",
        description:
          "Use your current vehicle as part of the purchase and streamline the upgrade process.",
        href: "/services/trade-in-options",
        ctaLabel: "Explore More",
      },
      {
        title: "Financing Options",
        description:
          "Explore flexible financing solutions designed to fit your budget and needs.",
        href: "/services/financing-options",
        ctaLabel: "Explore More",
      },
    ],
  },
  faq: {
    eyebrow: "Customer questions",
    title: "Frequently Asked Questions",
    defaultOpenIndex: null,
    items: [
      {
        question: "How does financing work?",
        answer:
          "Financing options depend on the vehicle and circumstances. The process includes selecting a vehicle, reviewing options, and confirming terms with the sales team.",
      },
      {
        question: "Can I trade in my current vehicle?",
        answer:
          "Yes. Trade-in allows you to apply the value of your current vehicle toward another one. The final offer depends on the vehicle's condition, mileage, and market value.",
      },
      {
        question: "Are prices final or can they change?",
        answer:
          "Prices are shown for reference and may vary based on availability, financing terms, or trade-in details. Final terms are confirmed during the purchase process.",
      },
      {
        question: "Can I reserve or save a vehicle?",
        answer:
          "Yes. You can save vehicles to review them later or compare options before making a decision.",
      },
    ],
  },
}

export const privacyPolicyContent: LegalDocumentContent = {
  title: "Privacy Policy",
  updatedAt: "Jan 14, 2026",
  sections: [
    {
      title: "Privacy Overview",
      body:
        "Drivehub respects your privacy and is committed to protecting any personal information you may provide while using this website. We believe transparency and clarity are essential when handling user data, which is why we only collect information necessary to operate the website, respond to inquiries, and improve the user experience.",
    },
    {
      title: "Information We Collect",
      body:
        "We may collect limited personal information when you submit a contact or inquiry form, request information about vehicles or services, or communicate with us directly through the website or other available channels. This information may include your name, email address, phone number, and any message you choose to provide. We may also collect non-personal data automatically, such as browser type, device information, and pages visited for basic analytics, monitoring, and ongoing website improvement purposes.",
    },
    {
      title: "How We Use Information",
      body:
        "The information we collect is used to respond to inquiries and requests, provide relevant information about our services, and improve website structure, performance, and usability over time. We do not sell, rent, or trade your personal information to third parties and use collected data only for the purposes described above and required operations.",
    },
    {
      title: "Cookies",
      body:
        "This website may use cookies or similar technologies to ensure proper functionality, improve user experience, and support basic analytics across the site. You can disable cookies or manage preferences through your browser settings if you prefer at any time.",
    },
    {
      title: "Third-Party Services",
      body:
        "We may use trusted third-party tools for analytics or form processing to support website functionality and performance. These services process data only as necessary to perform their functions and are governed by their own privacy policies and security practices.",
    },
    {
      title: "Data Security",
      body:
        "We take reasonable measures to protect your information from unauthorized access, disclosure, or misuse by applying appropriate technical and organizational safeguards across our systems and processes. However, no method of transmission over the internet or electronic storage is completely secure and absolute protection cannot be guaranteed.",
    },
    {
      title: "Your Rights",
      body:
        "You may request access to, correction of, or deletion of your personal data by contacting us directly. We will review and process requests in accordance with applicable data protection laws and may ask for verification to ensure your information is handled securely.",
    },
    {
      title: "Changes to This Policy",
      body:
        "This Privacy Policy may be updated from time to time to reflect changes in legal requirements, business practices, or how data is processed. Any updates will be published on this page along with an updated revision date so users can review the most current version of the policy.",
    },
    {
      title: "Contact",
      body:
        "If you have any questions about this Privacy Policy or how your data is handled, please contact us through the website. We are available to clarify how information is collected, used, and protected and to address any concerns related to your personal data or your use of the site.",
    },
  ],
}
