import { Bouncy } from "ldrs/react";

function TableBody({
	data = [],
	isLoading = false,
	RowComponent,
	colSpan = 1,
}) {
	return (
		<tbody className="divide-y divide-gray-100">
			{isLoading ? (
				<tr>
					<td colSpan={colSpan} className="text-center p-5">
						<Bouncy size="40" speed="1.75" color="gray" />
					</td>
				</tr>
			) : (
				data.map((item, idx) => {
					const key = item?.id ?? `row-${idx}`;
					return <RowComponent key={key} data={item} />;
				})
			)}
		</tbody>
	);
}

export default TableBody;
