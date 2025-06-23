function DashboardContent({ title, description, children }) {
	return (
		<main className="rounded-2xl border border-gray-200 bg-white">
			<section className="px-6 py-5">
				<h3 className="text-base font-medium">{title}</h3>

				{description && (
					<p className="mt-1 text-sm text-gray-500">{description}</p>
				)}
			</section>

			<section className="p-4 border-t border-gray-100">
				<div className="space-y-6">{children}</div>
			</section>
		</main>
	);
}

export default DashboardContent;
