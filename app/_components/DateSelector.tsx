"use client";
// import { isWithinInterval } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "../_context/ReservationContext";
import { Cabin, Settings } from "@/app/_types/types";
import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";

function isAlreadyBooked(range: any, datesArr: any) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date: any) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({
  settings,
  bookedDates,
  cabin,
}: {
  settings: Settings;
  bookedDates: Date[];
  cabin: Cabin;
}) {
  const { range, setRange, resetRange } = useReservation();
  const displayRange = isAlreadyBooked(range, bookedDates)
    ? { to: undefined, from: undefined }
    : range;
  const { minBookingLength, maxBookingLength } = settings;
  const numNights =
    !displayRange.to || !displayRange.from
      ? 0
      : differenceInDays(displayRange.to, displayRange.from);

  const cabinPrice = numNights * (cabin.regularPrice! - cabin.discount!);

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        selected={displayRange}
        onSelect={(range) => setRange(range!)}
        className="pt-12 place-self-center"
        mode="range"
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(currentDate) =>
          isPast(currentDate) ||
          bookedDates.some((date) => isSameDay(date, currentDate))
        }
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {cabin.discount! > 0 ? (
              <>
                <span className="text-2xl">
                  ${cabin.regularPrice! - cabin.discount!}
                </span>
                <span className="line-through font-semibold text-primary-700">
                  ${cabin.regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${cabin.regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
