import CabinComponent from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import ReservationReminder from "@/app/_components/ReservationReminder";
import Spinner from "@/app/_components/Spinner";
import { getCabin } from "@/app/_lib/data-service";
import { Cabin } from "@/app/_types/types";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: { cabinId: string };
}) {
  const cabin: Cabin = await getCabin(+params.cabinId);

  return (
    <>
      <div className="max-w-6xl mx-auto mt-8">
        <CabinComponent cabin={cabin}></CabinComponent>

        <div>
          <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
            Reserve today. Pay on arrival.
          </h2>
          <Suspense fallback={<Spinner />}>
            <Reservation cabin={cabin}></Reservation>
            <ReservationReminder></ReservationReminder>
          </Suspense>
        </div>
      </div>
    </>
  );
}
