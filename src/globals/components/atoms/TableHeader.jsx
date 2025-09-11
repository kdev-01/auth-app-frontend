function TableHeader({ columns }) {
	return (
		<thead className="border-b border-gray-100">
			<tr className="text-xs">
				{columns.map(({ id, label }) => (
					<th
						key={id}
						scope="col"
						className="px-5 py-3 font-medium text-gray-500 text-start"
					>
						{label}
					</th>
				))}
			</tr>
		</thead>
	);
}

export default TableHeader;
