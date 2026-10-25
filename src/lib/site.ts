// Production domain; NEXT_PUBLIC_SITE_URL overrides it (e.g. for preview deploys)
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://vaidik.mystackden.co.in").replace(/\/$/, "");
