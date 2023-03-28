const TextInput = ({
	customClass,
	labelText,
	value,
	prependValue,
	onChange,
	name,
	id,
	placeholder,
	containerStyle,
	inputStyle,
	labelStyle,
	type,
	maxLength,
	min,
	disabled,
	readOnly,
	onKeyDown,
	image,
}) => {
	return (
		<div className="">
			<div className={`h-14 ${containerStyle} `}>
				<label className={`  `} htmlFor={id}>
					<div className={` margin_label  ${labelStyle}`}>{labelText}</div>
					<div className=" h-full ">
						<div className="">{prependValue}</div>
						<input
							onKeyDown={onKeyDown}
							maxLength={maxLength}
							type={type}
							min={min}
							x
							disabled={disabled}
							name={name}
							id={id}
							onChange={onChange}
							value={value}
							className={` border border-gray-100 text-gray-900 text-sm h-12   placeholder:text-gray-500 placeholder:font-base  placeholder:text-sm w-full p-2.5 !mb-5 outline-none  ${customClass} ${inputStyle}`}
							image={image}
							placeholder={placeholder}
							readOnly={readOnly}
						/>
					</div>
				</label>
			</div>
		</div>
	);
};

export default TextInput;
