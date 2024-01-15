"use client";
import { Button, Card, Image, ScrollShadow } from "@nextui-org/react";
import { ListboxWrapper } from "./components/ListBoxWrapper";
import { useUserStore } from "../store/userStore";
import { useRouter } from "next/navigation";
import Logo from "@/public/images/jefa2.png";
import { AdminItems } from "./components/admin-items";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
} from "chart.js";

interface LayoutProps {
  children: React.ReactNode;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { logout } = useUserStore();
  const router = useRouter();
  return (
    <div className="flex w-full">
      <aside className="max-w-fit bg-amber-500 min-h-screen min-w-unit-64 overflow-x-auto">
        <ScrollShadow hideScrollBar className="overflow-auto">
          <div className="flex flex-col justify-between items-center h-full">
            <ul className="py-14 flex flex-col items-center w-full">
              <ListboxWrapper>
                <Card className="border-none bg-background/80 dark:bg-default-100/50 max-w-64">
                  <Image
                    removeWrapper
                    alt="Card background"
                    className="z-0  object-cover w-full h-full "
                    src={Logo.src}
                  />
                </Card>
                <AdminItems />
              </ListboxWrapper>
            </ul>
            <Button
              className="w-40 h-12 ml-6 border-2 bg-amber-900 text-white mb-10"
              onClick={() => {
                logout();
                router.push("/");
              }}
            >
              Cerrar sesión
            </Button>
          </div>
        </ScrollShadow>
      </aside>

      <section
        className="flex-grow p-4 bg-repeat bg-center"
        style={{ backgroundImage: `url('/images/fondoLoginAct.jpg')` }}
      >
        <ScrollShadow hideScrollBar className="overflow-auto max-h-screen">
          {children}
        </ScrollShadow>
      </section>
    </div>
  );
};

export default Layout;
