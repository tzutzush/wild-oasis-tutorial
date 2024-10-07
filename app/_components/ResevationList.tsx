"use client";

import { BookingWithRelatedCabin } from "@/app/_types/booking";
import ReservationCard from "@/app/_components/ReservationCard";
import { useOptimistic } from "react";
import { deleteReservation } from "@/app/_lib/actions";

export default function ReservationList({
  bookings,
}: {
  bookings: BookingWithRelatedCabin[];
}) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (currentBookings, bookingId) => {
      return currentBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId: number) {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          onDelete={handleDelete}
          booking={booking}
          key={booking.id}
        />
      ))}
    </ul>
  );
}
