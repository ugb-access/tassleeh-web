const Button = ({
	customClass,
	id,
	bg,
	color,
	textDir,
	fontSize,
	fontWeight,
	onClick,
	text,
	img,
	padding,
	type,
	disabledClass,
	disabled,
	href,
}) => {
	return (
		<button
			href={href}
			id={id}
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={` h-full w-full cursor-pointer blocks ${customClass} ${padding} ${bg} ${color} ${textDir} ${fontSize} ${fontWeight} ${disabledClass} `}
		>
			{img}
			{text}
		</button>
	);
};

export default Button;
