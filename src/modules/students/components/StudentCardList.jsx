import { ChaoticOrbit } from "ldrs/react";
import StudentCard from "./molecules/StudentCard";

function StudentCardList({ isLoading, data }) {
	return (
		<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
			{isLoading ? (
				<div className="flex w-full h-11 items-center justify-center col-span-full">
					<ChaoticOrbit size="30" speed="1.5" color="gray" />
				</div>
			) : (
				data.map((item) => <StudentCard key={item.id} student={item} />)
			)}
		</div>
	);
}

export default StudentCardList;
