import { useTableStore } from "@/app/store/tableStore";
import { UserIcon } from "@heroicons/react/24/outline";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Chip,
	Divider,
} from "@nextui-org/react";

const AvailableTable = ({
	tableId,
	tableSize,
}: {
	tableId: number;
	tableSize: string;
}) => {
	const { handleTakeTable } = useTableStore();

	return (
		<div key={tableId} className="px-5">
			<Card
				className="w-72 border-none bg-background/90 dark:bg-default-100/50 "
				isBlurred
			>
				<CardHeader>
					<div className="flex gap-2">
						<Chip color="success" variant="dot">
							<p className="text-medium font-semibold ">Mesa No {tableId}</p>
						</Chip>
						<Chip variant="faded">
							<div className="flex gap-2 items-center justify-center">
								<UserIcon className="w-4 h-4" />
								<p>{tableSize}</p>
							</div>
						</Chip>
					</div>
				</CardHeader>

				<Divider />
				<CardBody>
					<Button
						onClick={() => handleTakeTable(tableId)}
						color="warning"
						variant="shadow"
					>
						Ocupar mesa
					</Button>
				</CardBody>
			</Card>
		</div>
	);
};

export default AvailableTable;
