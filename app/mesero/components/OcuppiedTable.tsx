import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Chip,
	Divider,
} from "@nextui-org/react";
import { useTableStore } from "@/app/store/tableStore";
import { useRouter } from "next/navigation";
import { UserIcon } from "@heroicons/react/24/outline";

const OcuppiedTable = ({
	tableId,
	tableSize,
}: {
	tableId: number;
	tableSize: string;
}) => {
    
	const router = useRouter();
	const {	handleEmptyTable } = useTableStore();

	return (
		<div key={tableId} className="px-5">
			<Card className="w-72 border-none bg-background/90 dark:bg-default-100/50">
				<CardHeader>
					<div className="flex gap-2">
						<Chip color="danger" variant="dot">
							<p className="text-medium font-semibold ">Mesa No {tableId}</p>
						</Chip>
						<Chip variant="faded">
							<div className="flex gap-2 items-center justify-center">
								<UserIcon className="w-4 h-4"  />
								<p>{tableSize}</p>
							</div>
						</Chip>
					</div>
				</CardHeader>

				<Divider />
				<CardBody>
					<div className="flex gap-2">
						<Button
							onClick={() => handleEmptyTable(tableId)}
							color="warning"
							variant="shadow"
							className="flex-1"
						>
							Desocupar mesa
						</Button>
						<Button
							onClick={() => router.push(`mesero/mesa/${tableId}`)}
							color="warning"
							variant="shadow"
							className="flex-1"
						>
							Orden
						</Button>
					</div>
				</CardBody>
			</Card>
		</div>
	);
};

export default OcuppiedTable;
