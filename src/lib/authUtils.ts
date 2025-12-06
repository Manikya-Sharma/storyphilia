import { auth } from "@/auth";
import { type ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { db } from "./db";

export async function getUser(headers: ReadonlyHeaders) {
	const session = await auth.api.getSession({
		headers,
	});
	const authUser = session?.user;
	const user = await db.user.findFirst({
		where: {
			email: authUser?.email,
		},
	});
	return user;
}
