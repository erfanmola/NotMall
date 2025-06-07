import "./Switch.scss";

import type { FC } from "react";

type SwitchProps = {
	label?: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
	required?: boolean;
	disabled?: boolean;
};

const Switch: FC<SwitchProps> = (props) => {
	return (
		<div
			className={[
				"switch",
				props.required ? "required" : "",
				props.disabled ? "disabled" : "",
			].join(" ")}
			onClick={() => props.onChange(!props.checked)}
		>
			{props.label && <span>{props.label}</span>}
			<input type="checkbox" checked={props.checked} readOnly />
			<div />
		</div>
	);
};

export default Switch;
