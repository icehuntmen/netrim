import {registerAs} from "@nestjs/config";

export default registerAs(
  'app',
  (): Record<string, any> => ({
    port: parseInt(process.env.APP_PORT) || 5000,
  }),
);
