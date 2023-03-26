import Head from "next/head";
import React from "react";
import SignIn from "../components/common/SignIn";

const Signin = () => {
	return (
		<div>
			<Head>
				<title> SignIn - Job Locator </title>
			</Head>
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
		</div>
	);
};

export default Signin;
