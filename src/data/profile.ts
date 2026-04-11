import { publicAssetUrl } from "../utils/publicAsset";

export type ExpertiseCard = {
  title: string;
  subtitle: string;
  description: string;
  metric: string;
  tags: string[];
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  summary: string;
};

export type FeaturedWorkItem = {
  title: string;
  category: string;
  tools: string;
  summary: string;
  visualLabel: string;
  highlights: string[];
  link?: string;
};

export const profile = {
  name: {
    first: "Hardik",
    last: "Dagha",
    initials: "HD",
  },
  hero: {
    eyebrow: "Cybersecurity analyst focused on security operations, detection quality, and dependable incident response support.",
    role: "Cybersecurity Analyst",
    summary:
      "I work across SOC monitoring, investigation workflows, enterprise IT support, and process improvement with a practical, operations-first mindset.",
    rotatingPrimary: ["Security", "Detection"],
    rotatingSecondary: ["Incident", "Response"],
    highlights: [
      "40+ detections tuned",
      "500+ alerts triaged monthly",
      "Cross-functional SOC and IT support",
    ],
  },
  about:
    "Cybersecurity and IT operations professional with 2+ years of experience across SOC monitoring, technical support, incident triage, enterprise systems troubleshooting, and operational process support. I bring hands-on experience with SIEM and EDR investigations, endpoint and log analysis, documentation, and cross-functional issue resolution in fast-moving technical environments.",
  aboutPanels: [
    {
      label: "Core Environment",
      value: "SOC monitoring, incident triage, WAF and endpoint investigations, ticket-driven operations",
    },
    {
      label: "Strengths",
      value: "Analytical problem solving, documentation, structured execution, stakeholder communication, mentorship",
    },
    {
      label: "Framework Exposure",
      value: "MITRE ATT&CK, NIST 800-61, ISO 27001 fundamentals, IOC enrichment and log correlation",
    },
  ],
  expertise: [
    {
      title: "SOC Monitoring",
      subtitle: "Alert triage, investigation quality, and threat visibility",
      description:
        "I investigate alerts across SIEM, EDR, WAF, and endpoint telemetry, enrich findings, reduce analyst noise, and improve escalation quality through structured workflows.",
      metric: "500+ alerts/month supported",
      tags: [
        "CrowdStrike Falcon",
        "DNIF Hypercloud",
        "CrowdStrike EDR",
        "Akamai WAF",
        "OpenCTI",
        "IOC enrichment",
      ],
    },
    {
      title: "Security Operations",
      subtitle: "Operational resilience across systems, users, and processes",
      description:
        "I combine technical troubleshooting with security-minded operations, from user support and access issues to SOP creation, workflow automation, and team support.",
      metric: "20+ users supported on-site",
      tags: [
        "Windows & Linux",
        "Wireshark",
        "Burp Suite",
        "API integrations",
        "Documentation & SOPs",
        "Mentorship",
      ],
    },
  ] satisfies ExpertiseCard[],
  experience: [
    {
      role: "Security Analyst",
      company: "Doyen Infosolutions",
      period: "May 2024 - May 2025",
      summary:
        "Developed and tuned 40+ detection rules in CrowdStrike Falcon NG-SIEM and DNIF Hypercloud, triaged 500+ alerts per month, investigated WAF and endpoint anomalies, enriched IOCs with OpenCTI, and mentored junior analysts on investigations and log analysis.",
    },
    {
      role: "IT Support Associate",
      company: "Shree Hospital",
      period: "Aug 2023 - Apr 2024",
      summary:
        "Delivered day-to-day IT support for 20+ users, handled desktop, application, printer, access, and operational issues, coordinated hardware and vendor escalations, and helped maintain continuity for business-critical hospital systems.",
    },
    {
      role: "IT Analyst Intern",
      company: "GoFirst Airways",
      period: "Jan 2023 - Jul 2023",
      summary:
        "Resolved 150+ IT service tickets, supported access and malware-related issues, built 3 RPA automations and 2 API integrations, assisted audit preparation, and maintained SOPs and onboarding documentation for stronger internal consistency.",
    },
  ] satisfies ExperienceItem[],
  featuredWork: [
    {
      title: "Detection Engineering Program",
      category: "Enterprise SOC coverage and analyst efficiency",
      tools:
        "CrowdStrike Falcon NG-SIEM, DNIF Hypercloud, MITRE ATT&CK, IOC enrichment",
      summary:
        "Expanded enterprise detection coverage while tuning noise down so investigations could move faster and escalations carried clearer evidence.",
      visualLabel: "Detection Ops",
      highlights: [
        "40+ rules developed and tuned",
        "Suppression logic to reduce alert fatigue",
        "Recurring pattern documentation for stronger escalation quality",
      ],
    },
    {
      title: "NeuroSafe",
      category: "Neuro-inclusive phishing and malware defense tool",
      tools:
        "Google Safe Browsing API, AlienVault OTX, URLHaus, Chrome Manifest V3",
      summary:
        "Hackathon project focused on real-time URL inspection, explainable risk scoring, and clearer security warnings for phishing defense.",
      visualLabel: "Hackville 2026",
      highlights: [
        "Real-time URL inspection",
        "Typosquatting and homoglyph detection concepts",
        "Security logic and prototype architecture lead",
      ],
    },
    {
      title: "Black Box Assessment",
      category: "Linux target penetration testing and remediation reporting",
      tools:
        "Reconnaissance, enumeration, exploitation, privilege escalation, post-exploitation",
      summary:
        "Performed a black-box lab assessment, documented attack paths, and translated findings into remediation guidance using business-risk framing.",
      visualLabel: "Research Lab",
      highlights: [
        "Initial access and privilege escalation path documented",
        "Post-exploitation analysis completed",
        "Remediation guidance tied to real risk",
      ],
    },
    {
      title: "IT Automation at GoFirst",
      category: "Operational efficiency through scripts, APIs, and SOPs",
      tools: "RPA automations, API integrations, ticket workflows, documentation",
      summary:
        "Reduced repetitive manual work in IT operations by automating process steps and tightening internal documentation for smoother support delivery.",
      visualLabel: "Process Ops",
      highlights: [
        "3 RPA automations delivered",
        "2 API integrations built",
        "Internal SOPs and onboarding guides strengthened",
      ],
    },
  ] satisfies FeaturedWorkItem[],
  toolkit: [
    "CrowdStrike",
    "DNIF",
    "OpenCTI",
    "Wireshark",
    "Burp Suite",
    "Akamai WAF",
    "Windows",
    "Linux",
    "TCP/IP",
    "DNS",
    "MITRE ATT&CK",
    "IOC Enrichment",
  ],
  contact: {
    location: "Toronto, Ontario, Canada",
    email: "hardikcdagha@gmail.com",
    phone: "+1 (438) 832-9024",
    tel: "+14388329024",
    linkedin: "https://linkedin.com/in/hardik-dagha-2ba191167",
    linkedinLabel: "linkedin.com/in/hardik-dagha-2ba191167",
    resume: publicAssetUrl("Hardik_Dagha_Resume.pdf"),
  },
  education: [
    "Post-Graduate Certificate in Cyber Security Operations, York University - 2026",
    "Master of Science in Computer Science, University of Mumbai - 2025",
    "Bachelor of Science in Information Technology, University of Mumbai - 2022",
  ],
  certifications: [
    "CompTIA Security+ - In progress",
    "CCNA - 2026 (theory)",
    "CEH v11 - 2022",
  ],
  availability:
    "Focused on SOC operations, detection engineering, incident triage, and practical security process improvement.",
} as const;
