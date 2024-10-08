import ReservationList from "@/app/_components/ResevationList";
import { getBookings } from "@/app/_lib/data-service";
import { BookingWithRelatedCabin } from "@/app/_types/types";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  if (!session) throw new Error("You are not logged in.");
  const bookings: BookingWithRelatedCabin[] = await getBookings(
    session.user.guestId!
  );

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
        <ReservationList bookings={bookings} />
      )}
    </div>
  );
}
