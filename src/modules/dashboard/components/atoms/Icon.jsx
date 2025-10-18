function Icon({ icon: Icon }) {
	return <span>{Icon && <Icon className="!w-6 !h-6" />}</span>;
}

export default Icon;
