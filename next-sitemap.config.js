const siteUrl = process.env.NEXT_PUBLIC_APP_SITE_URL;

module.exports = {
  siteUrl,
  exclude: [
    "/404",
    "/settings",
    "/settings/*",
    "saved",
    "/me",
    "/me/*",
    "/chat",
    "/job/create",
    "/messages",
    "/notifications",
    "/post/preview",
    "/school/create",
    `${siteUrl}/sitemap.xml`,
    `${siteUrl}/posts-sitemap.xml`,
    `${siteUrl}/jobs-sitemap.xml`,
  ],
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: ["/404"],
      },
      { userAgent: "*", allow: "/" },
    ],
    additionalSitemaps: [
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/posts-sitemap.xml`,
      `${siteUrl}/jobs-sitemap.xml`,
    ],
  },
};
