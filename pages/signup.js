import Head from "next/head";
import SignUp from "../components/common/SignUp";

const Signup = () => {
	return (
		<div className="">
			<Head>
				<title> SignUp - Job Locator </title>
			</Head>
			<SignUp
				profilepic="/images/signup.png"
				h2="Hire"
				spantext="Right"
				spantext2="Candidate"
				para2="Jobs, Employment & Future Career 
				Opportunities..."
				placeholdert3="Enter Your Email Address"
				placeholdert4="Full Name"
				placeholdert1="Username"
				placeholdert2="Password"
			/>
		</div>
	);
};

export default Signup;
