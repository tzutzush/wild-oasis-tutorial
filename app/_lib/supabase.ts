import { createClient } from "@supabase/supabase-js";
import { Database } from "../_types/database.types";

export const supabase = createClient<Database>(
  process.env.SUPABASE_URL ?? "",
  process.env.SUPABASE_KEY ?? ""
);

const anyad = 'cli_HOSTED-WORK-BIZ""00152813@00HUPC0230_1727953748';
