function TextLabel({ show, children }) {
	return show ? <span>{children}</span> : null;
}

export default TextLabel;
