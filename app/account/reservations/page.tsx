import ReservationCard from "@/app/_components/ReservationCard";
import { getBookings } from "@/app/_lib/data-service";
import { Booking } from "@/app/_types/types";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  const bookings: Booking[] = await getBookings(session?.user.guestId!);

  return (
    <div>
      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ul className="space-y-6">
          {bookings.map((booking) => (
            <ReservationCard booking={booking} key={booking.id} />
          ))}
        </ul>
      )}
    </div>
  );
}
