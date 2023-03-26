import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingState from "../pages/common/loadingState";
import routes from "./user-access-routes";

export default function WithAuthWrapper(props) {
	const router = useRouter();
	const { children } = props;
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let authUser = localStorage.getItem("user");
		if (authUser && routes.indexOf(router.asPath) !== -1) {
			router.push("/");
		} else {
			setLoading(false);
		}
	}, [router]);
	if (loading) {
		return <LoadingState />;
	} else {
		return <>{children}</>;
	}
}
