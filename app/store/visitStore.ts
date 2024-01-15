import { persist } from "zustand/middleware";
import { IVisit } from "../types/visit";
import { StateCreator, create } from "zustand";
import { fetchVisit, fetchVisits } from "../api/useVisits";

interface StoreState {
  visits: IVisit[] | undefined;
  visitsLoaded: boolean;
  getVisitById: (id: number) => Promise<IVisit | undefined>;
  setVisitsLoaded: (loaded: boolean) => void;
  loadVisits: () => void;
  areVisitsLoading: boolean;
}

export const useVisitStore = create<StoreState>(
  persist(
    (set) => ({
      areVisitsLoading: false,
      visits: undefined,
      visitsLoaded: false,
      setVisitsLoaded: (loaded: boolean) => set({ visitsLoaded: loaded }),
      loadVisits: async () => {
        if (!useVisitStore.getState().visitsLoaded) {
          set({ areVisitsLoading: true });
          const visits = await fetchVisits();
          set({ areVisitsLoading: false });
          set({ visits, visitsLoaded: true });
        }
      },
      getVisitById: async (id: number) => {
        try {
          const visit = await fetchVisit(id);

          return visit;
        } catch (error) {
          console.log(error);
          return undefined;
        }
      },
    }),
    {
      name: "visit-storage",
    }
  ) as StateCreator<StoreState>
);
