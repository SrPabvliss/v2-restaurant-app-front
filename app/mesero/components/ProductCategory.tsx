import {
	Card,
	CardHeader,
	CardBody,
	Divider,
	Chip,
} from "@nextui-org/react";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import { useParams, useRouter } from "next/navigation";

const ProductCategory = ({categoryId, categoryName, productsLength}:{ categoryId: number, categoryName: string, productsLength: number}) => {
	const router = useRouter();
	const { tableId } = useParams();

    return (
		<div key={categoryId}>
			<Card
				isPressable
				className="w-72 border-none bg-background/90 dark:bg-default-100/50"
				onPress={() =>
					router.push(`/mesero/mesa/${tableId}/productos/${categoryId}`)
				}
			>
				<CardHeader className="bg-amber-500 bg-opacity-80">
					<div className="flex gap-3 items-center">
						<Chip variant="faded">{categoryId}</Chip>
						<p>{categoryName}</p>
					</div>
				</CardHeader>
				<Divider />
				<CardBody>
					<div className="flex justify-around items-center">
						<p className="text-sm font-light italic">
							{productsLength}{" "}
							{productsLength == 1
								? ` opción disponible`
								: ` opciones disponibles`}
						</p>
						<div className="w-5 h-5 text-slate-400">
							<ChevronRightIcon />
						</div>
					</div>
				</CardBody>
			</Card>
		</div>
	);
};

export default ProductCategory;
