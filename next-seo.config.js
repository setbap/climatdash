import names from "lib/utility/names";

/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "ClimateDash",
  titleTemplate: "%s | Review Climate change in 2022 in Japan and France",
  defaultTitle:
    "ClimateDash | Review Climate change in 2022 in Japan and France ",
  canonical: "https://ClimateDash.vercel.app/",
  openGraph: {
    url: "https://ClimateDash.vercel.app/",
    title: "ClimateDash",
    description:
      "ClimateDash | Review Climate change in 2022 in Japan and France ",
    images: [
      {
        url: `https://${names.SITE_URL}/og.png`,
        alt: `${names.APP_NAME} by MetricsDao and elSina`,
      },
    ],
    site_name: "ClimateDash",
  },
  twitter: {
    handle: "@elSinaCrypto",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;
