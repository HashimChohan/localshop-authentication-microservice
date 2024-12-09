const admin = require('firebase-admin');

// Load service account key from environment variables or a JSON file
const serviceAccount = {
  type: process.env.TYPE || "service_account",
  project_id: process.env.PROJECT_ID || "school-surveillance",
  private_key_id: process.env.PRIVATE_KEY_ID || "949b6dbe506683da17104b65c9d27e461e67894d",
  private_key: (process.env.PRIVATE_KEY || "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCrlZuCZEMREyVV\nFkjPvZoABaTwLaIfQzPCB/U2TTf+/Sqo/ZRvZpadwa6AoEstCPNCPCktKi2hf03k\nkYGfGHE6DJ0It0m3CacNtGCR0CwHYq10dy54lyc5l3FVGdVklZtsQCtW8Qpnt1Aq\nOKIlUiTiogdt4Hf3fhcTUuZ/POKYujp1yo/LrDJ7U+GduVEqCXS6I1Nhhpb8qdcI\nDmJwccVTmaP+iOEumOEOhbLKs7zBt2N+/iUr7eSIw3COYQQ2bhNzX+aZSOaQlFZ9\nory9B827Iu/Og2kKRjQa7xV5647w5tGBs7/7v06rcXAP5YoZ+dM1E3JUpuGVN5it\nNhq81bVFAgMBAAECggEAG7eteRUOs3OrEHFq3ioj9jRzNjw85/1wXzvvW/AB525I\npadfAtbo5j+LG6qpMjNzrmOvCCV73Q6GS/HIZWWqpsSyWl3XadrEkmVswylEb4X8\nfKejCWZrdvV0oJltfBPh2U0NYzxJYMM/Ty66XLqGDFk9x31fC8sh2aSG6Q9yEFcj\nIi//CjYnB9cXnoXMN7o9DGIc7PpO6XrwudHOGWvkRUJGM/ZXn+DgFRZ42ZHFOYgq\nkgDRCOtmstydNXlr5Mx2uPCn/AQxfGmbSYqemqUrCBMR108fypRaXZ9LgSCKYDOe\nzsleonbyZ/QebYwvG/yaLQdsq8ljOM3klmEMRrMf4QKBgQDh/YmJxCjqvsMDQX/n\nLcEJHLTWKNZDYdcwN6tymFYBDzwwL14uRT2y1FIGCB85F7HDHTBm/SMz3qH6qFZk\nFCle+RHInAH2q3wBZtoKhdzUjLUzJZy+QT74OxCGgFuiKO2/+ga4hApg36CkEMuI\n8T/um1I4n8rQkolpmAQdU5aUJQKBgQDCXo7xHqS8LNYKMR+Tn/XSqocg2mzHdj2F\nd8q+GRh3o6sCI9Lv8IH8e0WmJUEpJxuWKVG3fbC/NAQp0QNIn3hG4QFpBoEDn8oh\ntmf3y+TD3jxDqopH0aOpx0wjcW1bnaAwu2Oa3jDM0MEHDhK0PZ6eZLkaDFh/Gkpg\n9kOoEd1CoQKBgAkfyWvMhbJknU8GV/mneUG67Powj+YMjzmdJcjsqZxFVzLC1tSb\naxBLTjx8G3acpEqyZP/jfIZdmMCcB1DnF3yEJdmpotKovcr4shj2qqHSRIaaICf2\nTmqLR/GGQSzc5ix4FclhW2Hp5Xx6SR1wUBp8Hue2W+Pr5qxivNfKRiwZAoGBAKYO\n0UKxMn7OM4N7moWuOP/lzxLDagIzQ7ZetOkaWawFOZnXb2Ss7vD9hHDBDV2SWuA8\npuMEUFfaod/0AUEvdTvhCipncxvcjX2l8EdlfCnXGVeaQQ/AzHnFmogBZTPLhEt+\nHUf3omupwfA8FsDEkFq0pOvbNlRI6tjSLNVPheBhAoGATbXRJ3fQwoX+1MQ66sJy\nqpoXKfhY6p+cZEjxRgx1/NxLObF/3dGJoFDltJStwis7H9K88PTP36ST5gAukP4o\nkR8xZHFv6KVWw8HlKnBC2V7KXtdL6Us3r51OgEU9tgVokFr5VkuBNA7XqRHNWh2B\nZUx7g7k/3Dt42wz+VmyMGJc=\n-----END PRIVATE KEY-----\n").replace(/\\n/g, '\n'),
  client_email: process.env.CLIENT_EMAIL || "firebase-adminsdk-lzrjz@school-surveillance.iam.gserviceaccount.com",
  client_id: process.env.CLIENT_ID || "110260537547120616156",
  auth_uri: process.env.AUTH_URI || "https://accounts.google.com/o/oauth2/auth",
  token_uri: process.env.TOKEN_URI || "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_CERT_URL || "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.CLIENT_CERT_URL || "your-client-cert-url"
};

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL || "https://school-surveillance-default-rtdb.firebaseio.com/",
  });
}

module.exports = admin;
