import { db } from "@/lib/db";
import { useQuery } from "@tanstack/react-query";

export const getUserQuery = ({
	userEmail,
}: {
	userEmail: string | undefined;
}) => {
	return useQuery({
		queryKey: ["getUser", userEmail],
		queryFn: async () => {
			if (!userEmail) return null;
			const user = await db.user.findFirst({
				where: {
					email: userEmail,
				},
			});
			return user;
		},
	});
};
