"use server";

import { signOut, signIn, auth } from "@/auth";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";
import { newReservation, ReservationDataOutsideForm } from "@/app/_types/types";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/cabins" });
}

export async function updateProfile(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  const nationalID = formData.get("nationalID") as string;
  const [nationality, countryFlag] = (
    formData.get("nationality") as string
  ).split("%");

  const updateData = { nationalID, nationality, countryFlag };

  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId!);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile");
}

export async function deleteReservation(id: number) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  await supabase.from("bookings").delete().eq("id", id);

  revalidatePath("/account/reservations");
}

export async function updateReservation(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  const id = formData.get("bookingId")! as string;
  const guestBookings = await getBookings(session.user.guestId!);
  if (!guestBookings.some((guestBooking) => guestBooking.id === +id)) {
    throw new Error("You can't edit this.");
  }
  const numGuests = +formData.get("numGuests")! as number;
  const observations = formData.get("observations")!.slice(0, 500) as string;

  const { error } = await supabase
    .from("bookings")
    .update({ numGuests, observations })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${id}`);
  redirect("/account/reservations");
}

export async function createReservation(
  reservationData: ReservationDataOutsideForm,
  formData: FormData
) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  const newReservation: newReservation = {
    ...reservationData,
    numGuests: +formData.get("numGuests")!,
    observations: formData.get("observations")?.slice(0, 500) as string,
    guestId: +session.user.guestId!,
    extrasPrice: 0,
    hasBreakfast: false,
    isPaid: false,
    status: "unconfirmed",
    totalPrice: reservationData.cabinPrice,
  };

  const { error } = await supabase.from("bookings").insert([newReservation]);

  if (error) {
    console.error(error);
    throw new Error("Reservation could not be created");
  }

  revalidatePath(`cabins/${reservationData.cabinId}`);
  redirect("/cabins/thankyou");
}
