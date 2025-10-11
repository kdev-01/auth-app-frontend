function InfoItem({ icon: Icon, children }) {
	return (
		<div className="flex gap-1 border border-gray-300 rounded-xl">
			{Icon && <Icon />}
			<span className="text-xs">{children}</span>
		</div>
	);
}

export default InfoItem;
