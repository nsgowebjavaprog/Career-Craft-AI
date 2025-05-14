/** @type { import ("drizzle-kit").Config }*/
// import { defineConfig } from "drizzle-kit";

export default{
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials:{
    url:'postgresql://ai-inter-resum-db_owner:npg_iDHalvPwn1s8@ep-holy-flower-a44iusgr-pooler.us-east-1.aws.neon.tech/ai-inter-resum-db?sslmode=require'
  }
};
