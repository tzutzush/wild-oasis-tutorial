import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { getGuest } from "@/app/_lib/data-service";
import { Guest } from "@/app/_types/types";
import { auth } from "@/auth";

export default async function Page() {
  // CHANGE
  const session = await auth();
  if (!session) throw new Error("No session");
  const guest: Guest = await getGuest(session.user.email!);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UpdateProfileForm guest={guest}>
        <SelectCountry
          defaultCountry={guest.nationality}
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        ></SelectCountry>
      </UpdateProfileForm>
    </div>
  );
}
