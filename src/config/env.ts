import { createEnv } from "@t3-oss/env-nextjs";
import z from "zod";

export const env = createEnv({
	server: {
		NODE_ENV: z.enum(["development", "production"]),

		SENTRY_AUTH_TOKEN: z.string().min(1),
		DATABASE_URL: z.string().min(1),

		BUILD_VERSION: z.string().min(1).default("development"),
		BUILD_COMMIT: z.string().min(1).default("N/A"),
		SENTRY_RELEASE: z.string().min(1).default("semestersync@development-na"),
	},
	client: {
		NEXT_PUBLIC_BUILD_VERSION: z.string().min(1).default("development"),
		NEXT_PUBLIC_BUILD_COMMIT: z.string().min(1).default("N/A"),
	},
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,

		SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
		DATABASE_URL: process.env.DATABASE_URL,

		// Versioning
		BUILD_VERSION: process.env.BUILD_VERSION,
		BUILD_COMMIT: process.env.BUILD_COMMIT,
		SENTRY_RELEASE: process.env.SENTRY_RELEASE,
		NEXT_PUBLIC_BUILD_VERSION: process.env.NEXT_PUBLIC_BUILD_VERSION,
		NEXT_PUBLIC_BUILD_COMMIT: process.env.NEXT_PUBLIC_BUILD_COMMIT,
	},
});
