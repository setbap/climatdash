import names from "lib/utility/names";

/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "ClimatDash",
  titleTemplate: "%s | Business Intelligence Dashboard Osmosis",
  defaultTitle: "ClimatDash | Business Intelligence Dashboard Osmosis ",
  description:
    "Best Business Intelligence Dashboard Osmosis by MetricsDao, Flipside Crypto and Setbap ",
  canonical: "https://ClimatDash.vercel.app/",
  openGraph: {
    url: "https://ClimatDash.vercel.app/",
    title: "ClimatDash",
    description:
      "Best Business Intelligence Dashboard Osmosis by MetricsDao, Flipside Crypto and Setbap ",
    images: [
      {
        url: `https://${names.SITE_URL}/og.png`,
        alt: `${names.APP_NAME} by Flipside Crypto and Setbap`,
      },
    ],
    site_name: "ClimatDash",
  },
  twitter: {
    handle: "@flipsidecrypto",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;
