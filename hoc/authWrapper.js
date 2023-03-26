import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingState from "../pages/common/loadingState";


export default function AuthWrapper(props) {
    const router = useRouter()
    const { children } = props;
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let authUser = localStorage.getItem("user")
        if(authUser){
            setLoading(false)
        }else{
            router.push("/signin")
        }
	}, [router]);
	if (loading) {
		return <LoadingState />;
	} else {
		return <>{children}</>;
	}
}
