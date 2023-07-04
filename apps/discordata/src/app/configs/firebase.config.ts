import { registerAs } from '@nestjs/config';

export default registerAs(
  'firebase',
  (): Record<string, any> => ({
    url: process.env.FB_URL,
    type: process.env.FB_SDK_TYPE,
    project_id: process.env.FB_SDK_PROJECT_ID,
    private_key_id: process.env.FB_PRIVATE_KEY_ID,
    private_key: process.env.FB_PRIVATE_KEY.split(String.raw`\n`).join('\n'),
    client_email: process.env.FB_CLIENT_EMAIL,
    client_id: process.env.FB_CLIENT_ID,
    auth_uri: process.env.FB_AUTH_URI,
    token_uri: process.env.FB_TOKEN_URI,
    auth_provider: process.env.FB_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FB_CLIENT_X509_CERT_URL,
    universe_domain: process.env.FB_UNIVERSE_DOMAIN,
    file: require('../../../../../turbor-firebase.json'),
  })
);
