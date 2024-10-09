"use client";
import { useReservation } from "@/app/_context/ReservationContext";
import { Cabin, ReservationDataOutsideForm } from "@/app/_types/types";
import { differenceInDays } from "date-fns";
import { createReservation } from "@/app/_lib/actions";
import { useFormStatus } from "react-dom";

function ReservationForm({ cabin }: { cabin: Cabin }) {
  // CHANGE
  const { range, resetRange } = useReservation();
  const startDate = range.from!;
  const endDate = range.to!;
  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (cabin.regularPrice! - cabin.discount!);

  const reservationData: ReservationDataOutsideForm = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: cabin.id,
  };

  const createReservationWrapper = createReservation.bind(
    null,
    reservationData
  );

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          {/* <img
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={}
            alt={}
          /> */}
          <p>User</p>
        </div>
      </div>

      <form
        action={async (formData) => {
          await createReservationWrapper(formData);
          resetRange();
        }}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: cabin.maxCapacity! }, (_, i) => i + 1).map(
              (x) => (
                <option value={x} key={x}>
                  {x} {x === 1 ? "guest" : "guests"}
                </option>
              )
            )}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <p className="text-primary-300 text-base">Start by selecting dates</p>

          <Button />
        </div>
      </form>
    </div>
  );
}

function Button() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    >
      {!pending ? "Reserve now" : "Reserving..."}
    </button>
  );
}

export default ReservationForm;
