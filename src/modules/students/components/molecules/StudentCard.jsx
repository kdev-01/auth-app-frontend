import { Avatar, InfoItem } from "@globals/components";
import { calculateAge } from "@globals/utils";
import { LuTimer } from "react-icons/lu";

function StudentCard({ student }) {
	return (
		<article className="flex border border-gray-300 rounded-xl">
			<Avatar
				src={student.url}
				alt={`${student.firstName} ${student.lastName}`}
				size="w-30 h-30"
				isCircle={false}
			/>
			<div className="m-3 flex flex-col">
				<section className="mb-2">
					<h2 className="font-semibold text-base leading-tight">
						{`${student.firstName} ${student.lastName}`}
					</h2>
					<span className="text-xs">{student.nationalID}</span>
				</section>

				<section>
					<InfoItem icon={LuTimer}>
						{calculateAge(student.dateOfBirth)}
					</InfoItem>
					{student.dateOfBirth}
				</section>
			</div>
		</article>
	);
}

export default StudentCard;
