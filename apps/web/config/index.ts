import { AppConfig } from "@/types/config";
import {
  Search,
  BarChart,
  Clock,
  Server,
  Home,
  Inbox,
  Users,
} from "lucide-react";
import { BillingMode } from "@/types/config";
import { LucideIcon } from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  hidden?: boolean;
}

interface DashboardConfig {
  sidebarNavItems: NavItem[];
}

export const config: AppConfig = {
  name: "RiseLoop",
  domainName: "riseloop.ai",
  appDescription:
    "Automate your social media growth with AI-powered content creation and scheduling",
  company: {
    name: "RiseLoop",
    address: "",
    phone: "",
    supportEmail: "support@riseloop.ai",
  },
  indieMaker: {
    name: "James Phoenix",
    avatar:
      "https://understandingdata.com/_next/image/?url=%2F_next%2Fstatic%2Fmedia%2Favatar.00f76042.webp&w=64&q=75",
    twitter: "https://twitter.com/jamesaphoenix12",
    linkedin: "https://www.linkedin.com/feed/",
    website: "https://understandingdata.com/",
  },
  googleTagManagerId: "GTM-PRC7J6X8",
  stripe: {
    publicKey:
      process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "default_public_key",
    secretKey: process.env.STRIPE_SECRET_KEY || "default_secret_key",
    webhookSecret:
      process.env.STRIPE_WEBHOOK_SECRET || "default_webhook_secret",
    plans: [
      {
        name: "Standard Plan",
        price: "$40",
        description: "Perfect for small to medium projects",
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_SINGLE_PAYMENT!,
        mode: "payment",
        features: [
          "Next.js boilerplate",
          "Supabase local stack",
          "Type Generation & Strong SDKs",
          "Stripe integration",
          "SEO & Blog setup",
          "Google OAuth & Magic Links",
          "Basic components & animations",
          "ChatGPT prompts for terms & privacy",
        ],
      },
      {
        name: "Pro Plan",
        price: "$60",
        description: "For serious SaaS builders",
        priceId:
          process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_SINGLE_PAYMENT_SECONDARY!,
        mode: "payment",
        features: [
          "All Standard Plan features",
          "Advanced components & animations",
          "Discord community access",
          "Lifetime updates",
        ],
      },
    ],
  },
  environment: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  },
  auth: {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    signInRedirectUrl: "/onboarding",
    authCallbackUrl: "/api/auth/callback",
    dashboardUrl: "/dashboard",
    loginUrl: "/login",
  },
  homepage: {
    numberOfMakersShipped: 50,
    heroTitle: "Automate Your Social Media Growth",
    heroSubtitle:
      "Create, schedule, and analyze your social media content with AI-powered automation.",
    usps: [
      {
        title: "AI Content Creation",
        description:
          "Generate engaging social media content tailored to your brand voice.",
        icon: Clock,
      },
      {
        title: "Smart Analytics",
        description:
          "Track performance and engagement across all your social platforms.",
        icon: BarChart,
      },
      {
        title: "Automated Scheduling",
        description: "Schedule posts at optimal times for maximum engagement.",
        icon: Search,
      },
    ],
    painPointsSection: {
      title: "Transform Your Social Media Strategy",
      withoutProduct: {
        points: [
          "Manual content creation",
          "Inconsistent posting",
          "Time-consuming scheduling",
          "Scattered analytics",
          "Limited growth",
        ],
      },
      withProduct: {
        points: [
          "AI-powered content creation",
          "Consistent brand presence",
          "Automated scheduling",
          "Unified analytics dashboard",
          "Accelerated growth",
        ],
      },
    },
    featuresSection: {
      title: "Powerful Features",
      useTabLayout: true,
      description: "Everything you need to automate your social media growth",
      features: [
        {
          title: "AI Content Creation",
          description:
            "Generate engaging social media content with our AI engine. Create posts that resonate with your audience while maintaining your brand voice.",
          image: "/features/ai-content.png",
          icon: Search,
        },
        {
          title: "Smart Analytics",
          description:
            "Track your social media performance across all platforms. Get insights into engagement, reach, and growth trends.",
          image: "/features/analytics.png",
          icon: BarChart,
        },
        {
          title: "Automated Scheduling",
          description:
            "Schedule your posts at optimal times for maximum engagement. Our AI determines the best posting times for your audience.",
          image: "/features/scheduling.png",
          icon: Server,
        },
        {
          title: "Multi-Platform Management",
          description:
            "Manage all your social media accounts from one dashboard. Create, schedule, and analyze content across platforms.",
          image: "/features/multi-platform.png",
          icon: Clock,
        },
      ],
    },
    testimonials: [
      {
        imageId: 1,
        name: "Sarah Johnson",
        company: "Social Media Manager",
        quote:
          "RiseLoop has transformed how I manage social media. The AI content creation and scheduling features save me hours every week.",
      },
      {
        imageId: 2,
        name: "Michael Chen",
        company: "Digital Marketing Agency",
        quote:
          "The automated scheduling and analytics have helped us scale our social media management services significantly.",
      },
      {
        imageId: 3,
        name: "Emily Rodriguez",
        company: "Tech Startup",
        quote:
          "RiseLoop's AI content creation is a game-changer. We're posting more consistently and seeing better engagement.",
      },
    ],
    faqs: [
      {
        question: "How does RiseLoop's AI content creation work?",
        answer:
          "Our AI analyzes your brand voice, target audience, and industry trends to generate engaging social media content. You can customize and refine the generated content before posting.",
      },
      {
        question: "Which social media platforms do you support?",
        answer:
          "We currently support Twitter, LinkedIn, and Instagram, with more platforms coming soon. You can manage all your accounts from a single dashboard.",
      },
      {
        question: "How does the automated scheduling work?",
        answer:
          "Our AI analyzes your audience's engagement patterns to determine optimal posting times. You can schedule content in advance, and our system will automatically post at the best times.",
      },
      {
        question: "What kind of analytics do you provide?",
        answer:
          "We provide comprehensive analytics including engagement rates, reach, follower growth, and content performance metrics across all your connected platforms.",
      },
      {
        question: "How often can I generate content?",
        answer:
          "Your content generation limit depends on your plan. Each plan comes with a monthly quota of AI-generated posts, and you can purchase additional credits as needed.",
      },
      {
        question: "How does the credit system work?",
        answer:
          "Credits are used for AI content generation and scheduling. The system automatically recharges when credits fall below £10, adding £50 worth of credits to ensure uninterrupted service.",
      },
      {
        question: "Can I manage multiple brands or clients?",
        answer:
          "Yes, our platform supports organization and team management, allowing you to manage multiple brands or clients under a single account.",
      },
      {
        question: "How do you ensure content quality?",
        answer:
          "Our AI is trained on successful social media content and follows your brand guidelines. You can always review and edit generated content before posting.",
      },
    ],
    ctaSection: {
      title: "Ready to Automate Your Social Media Growth?",
      description:
        "Start creating and scheduling AI-powered content today with RiseLoop.",
      ctaText: "Get Started",
      ctaLink: "/login",
    },
  },
  blog: {
    title: "RiseLoop Blog",
    description:
      "Tips, strategies, and insights for social media growth and automation.",
  },
  dashboard: {
    sidebarNavItems: [
      {
        title: "Workspaces",
        href: "workspaces",
        icon: Server,
      },
      {
        title: "Inbox",
        href: "[teamId]/inbox",
        icon: Inbox,
      },
      {
        title: "Social Accounts",
        href: "[teamId]/social-accounts",
        icon: Users,
      },
    ],
  },
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  },
  billing: {
    // NOTE If this is switched to consumption, then any plans on the client side before login will be ignored
    // and the user will be charged based on usage upon entering the dashboard.
    mode: "consumption" as BillingMode, // or 'subscription_and_single_pricing'
    consumption: {
      creditCost: 0.01, // $0.01 per credit
      minPurchase: 1000, // Minimum 1000 credits ($10)
      autoRechargeThreshold: 100, // Recharge when credits fall below 100
      autoRechargeAmount: 1000, // Recharge with 1000 credits
    },
  },
};

export const getEnvironment = () => {
  return config.environment;
};

export const getPlans = () => {
  return config.stripe.plans;
};

export const getCompanyInfo = () => {
  return config.company;
};

export const getBlogConfig = () => {
  return config.blog;
};

export const getDashboardConfig = (): DashboardConfig => {
  return {
    sidebarNavItems: config.dashboard.sidebarNavItems,
  };
};
