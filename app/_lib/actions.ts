"use server";

import { signOut, signIn, auth } from "@/auth";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { Booking } from "../_types/booking";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

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

  const { data, error } = await supabase
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

  const response = await supabase.from("bookings").delete().eq("id", id);

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

  const { data, error } = await supabase
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
