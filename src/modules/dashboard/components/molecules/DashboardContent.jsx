function DashboardContent({ heading, title, description, children }) {
	return (
		<main className="flex-1 min-h-full rounded-2xl border border-gray-200 bg-white">
			<header className="px-6 py-5">
				{heading && <div>{heading}</div>}
				{title && <h3 className="text-base font-medium">{title}</h3>}
				{description && (
					<p className="mt-1 text-sm text-gray-500">{description}</p>
				)}
			</header>

			<section className="px-6 py-5 border-t border-gray-100">
				{children}
			</section>
		</main>
	);
}

export default DashboardContent;
