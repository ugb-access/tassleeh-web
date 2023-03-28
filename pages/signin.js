import Head from "next/head";
import React from "react";
import SignIn from "../components/common/SignIn";
import AuthLayout from "../layout/AuthLayout";

const Signin = () => {
	return (
		<div>
			<Head>
				<title> SignIn - Tassleeh </title>
			</Head>
			<AuthLayout text={"Login to your account as:"}>
			<SignIn
				profilepic="/images/signin.png"
				h2="Find Your"
				spantext="Dream"
				spantext2="Job"
				para2="Jobs, Employment & Future Career 
				    Opportunities..."
				placeholdert1="Phone number, username or email address"
				placeholdert2="Password"
			/>
			</AuthLayout>
		</div>
	);
};

export default Signin;
