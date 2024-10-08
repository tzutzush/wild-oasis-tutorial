export type Guest = {
  countryFlag: string | null;
  created_at: string;
  email: string | null;
  fullName: string | null;
  id: number;
  nationalID: string | null;
  nationality: string | null;
};

export type Cabin = {
  id: number;
  name: string | null;
  maxCapacity: number | null;
  regularPrice: number | null;
  discount: number | null;
  image: string | null;
  description: string | null;
};

export type BookingWithRelatedCabin = {
  id: number;
  created_at: string;
  startDate: string | null;
  endDate: string | null;
  numNights: number | null;
  numGuests: number | null;
  totalPrice: number | null;
  guestId: number | null;
  cabinId: number | null;
  //The plural is only because of Supabase, as it is from the name
  //of the table.
  cabins: { name: string | null; image: string | null } | null;
};

export type Booking = {
  id: number;
  created_at: string;
  startDate: string | null;
  endDate: string | null;
  numNights: number | null;
  numGuests: number | null;
  totalPrice: number | null;
  guestId: number | null;
  cabinId: number | null;
};

export type Country = {
  name: string;
  flag: string;
  independent: boolean;
};

export type Settings = {
  breakfastPrice: number;
  created_at: string;
  id: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  minBookingLength: number;
};
