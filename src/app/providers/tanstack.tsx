"use client";

import { TanStackDevtools } from "@tanstack/react-devtools";
import { formDevtoolsPlugin } from "@tanstack/react-form-devtools";

export default function TanstackProvider() {
	return <TanStackDevtools plugins={[formDevtoolsPlugin()]} />;
}
