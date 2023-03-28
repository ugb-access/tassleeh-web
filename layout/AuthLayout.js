import Slider from "../components/slider/slider";
import AuthHeader from "../components/common/AuthHeader";

const AuthLayout = ({ children,text }) => {
	return (
		<div className="flex">
			<div className="basis-1/2 md:block hidden">
				<Slider />
			</div>
			<div className="md:basis-1/2 basis-full">
				<AuthHeader text={text} />
				<div>{children}</div>
			</div>
		</div>
	);
};

export default AuthLayout;
