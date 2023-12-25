import { useTableStore } from "@/app/store/tableStore";
import { Button, Card, CardBody, CardHeader, Chip, Divider } from "@nextui-org/react";

const AvailableTable = ({ tableId, tableSize }: { tableId: number, tableSize: string }) => {
    const {
		handleTakeTable,
	} = useTableStore();

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
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="icon icon-tabler icon-tabler-user"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="#9e9e9e"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
									<path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
								</svg>
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
