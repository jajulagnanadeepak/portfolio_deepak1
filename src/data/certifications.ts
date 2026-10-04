export interface Certification {
    id: number;
    name: string;
    issuer: string;
    issued: string;
    expires: string;
    credentialId: string;
    url: string;
    imageUrl?: string;
}

export const certifications: Certification[] = [
    {
        id: 1,
        name: "AWS Certified Developer - Associate",
        issuer: "Amazon Web Services (AWS)",
        issued: "Aug 2026",
        expires: "Aug 2029",
        credentialId: "c1ee70cbabb3417d90cd3c086a82e7ff",
        url: "",
        imageUrl: "",
    },
    {
        id: 2,
        name: "Microsoft Certified: Azure AI Engineer Associate",
        issuer: "Microsoft",
        issued: "Jun 2026",
        expires: "Jun 2027",
        credentialId: "6FDC31EDA4B8A229",
        url: "",
        imageUrl: "",
    },
    {
        id: 3,
        name: "MongoDB Certified Developer, Associate (C100DEV)",
        issuer: "MongoDB",
        issued: "Nov 2025",
        expires: "",
        credentialId: "VbfJM6uf",
        url: "",
        imageUrl: "",
    },
    {
        id: 4,
        name: "Automation Anywhere Certified Advanced RPA Professional",
        issuer: "Automation Anywhere",
        issued: "Jun 2026",
        expires: "Jun 2028",
        credentialId: "AAADVC2024A360 - 184088722",
        url: "",
        imageUrl: "",
    },
    {
        id: 5,
        name: "Data Engineering Virtual Internship",
        issuer: "EduSkills Foundation®",
        issued: "Sep 2025",
        expires: "",
        credentialId: "8c570f48dd473b55d86fe617e1e79d0a",
        url: "",
        imageUrl: "",
    },
    {
        id: 6,
        name: "Artificial Intelligence and Machine Learning Virtual Internship",
        issuer: "Kodacy",
        issued: "Aug 2025",
        expires: "",
        credentialId: "bb548dcd99c59f7f",
        url: "",
        imageUrl: "",
    },
    {
        id: 7,
        name: "GitHub Foundations",
        issuer: "GitHub",
        issued: "Oct 2026",
        expires: "Oct 2028",
        credentialId: "29E994B1490B7F28",
        url: "",
        imageUrl: "",
    },
    {
        id: 8,
        name: "AWS Certified Data Engineer - Associate",
        issuer: "Amazon Web Services (AWS)",
        issued: "Oct 2026",
        expires: "Oct 2029",
        credentialId: "1234911796824526b2ff125cd1fb6a03",
        url: "",
        imageUrl: "",
    },

];