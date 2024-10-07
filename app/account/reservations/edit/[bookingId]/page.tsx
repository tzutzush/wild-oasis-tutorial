import { EditReservationForm } from "@/app/_components/EditReservationForm";
import { getBooking, getCabin } from "@/app/_lib/data-service";
import { Booking } from "@/app/_types/booking";
import { Cabin } from "@/app/_types/cabins";

export default async function Page({
  params,
}: {
  params: { bookingId: string };
}) {
  const reservationId = params.bookingId;
  const booking: Booking = await getBooking(+reservationId);
  const cabin: Cabin = await getCabin(+booking.cabinId!);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <EditReservationForm
        booking={booking}
        maxCapacity={cabin.maxCapacity!}
      ></EditReservationForm>
    </div>
  );
}
