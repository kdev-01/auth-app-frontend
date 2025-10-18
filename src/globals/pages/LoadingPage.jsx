import loadingIndicator from "../../assets/LoadingIndicator.gif";

function LoadingPage({ size = 64, message = "Cargando...", centered = true }) {
	return (
		<article
			className={`flex flex-col items-center gap-2 ${centered ? "justify-center h-screen w-full" : ""}`}
		>
			<img
				src={loadingIndicator}
				alt={message}
				style={{ width: size, height: size }}
			/>
			<p className="text-sm">{message}</p>
		</article>
	);
}

export default LoadingPage;
