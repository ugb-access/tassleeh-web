import Slider from "../components/slider/slider";
import AuthHeader from "../components/common/AuthHeader";

const AuthLayout = ({ children,text }) => {
	return (
		<div className="flex">
			<div className="basis-1/2">
				<Slider />
			</div>
			<div className="basis-1/2">
				<AuthHeader text={text} />
				<div>{children}</div>
			</div>
		</div>
	);
};

export default AuthLayout;
