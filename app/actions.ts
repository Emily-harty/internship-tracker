// means everything in this file runs on the server, not in the visitor's browser
"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

// form data holds everything typed in the form 
// formData.get("company") reads the box named company, like reading a value from a python dictionary 
// .insert({...}) adds one new row to the table 
// || null means if this box was left empty, save nothing 
export async function addInternship(formData: FormData) {
  const { error } = await supabase.from("internships").insert({
    company: String(formData.get("company")),
    role: String(formData.get("role")),
    location: String(formData.get("location")),
    deadline: formData.get("deadline") || null,
    status: String(formData.get("status")),
    link: formData.get("link") || null,
  });

  if (error) {
    throw new Error(error.message);
  }

  // revalidatePath("/") tells Next.js the homepage data has changed and it should redraw it, so the new internship appears straight away
  revalidatePath("/");
}