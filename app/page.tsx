import { Suspense } from "react";
import { supabase } from "@/lib/supabase";
import { addInternship } from "./actions";

type Internship = {
  id: number;
  company: string;
  role: string;
  location: string;
  deadline: string;
  status: "Found" | "Applied" | "Interview" | "Offer" | "Rejected";
  link: string;
};

const statusColours: Record<Internship["status"], string> = {
  Found: "bg-gray-100 text-gray-800",
  Applied: "bg-blue-100 text-blue-800",
  Interview: "bg-yellow-100 text-yellow-800",
  Offer: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

// Fetches internships from Supabase and draws the table
async function InternshipTable() {
  const { data, error } = await supabase
    .from("internships")
    .select("*")
    .order("deadline", { ascending: true });

  if (error) {
    return <p className="text-red-600">Couldn&apos;t load internships: {error.message}</p>;
  }

  const internships = (data ?? []) as Internship[];

  if (internships.length === 0) {
    return <p>No internships yet.</p>;
  }

  return (
    <table className="w-full border-collapse text-left">
      <thead>
        <tr className="border-b">
          <th className="py-2">Company</th>
          <th className="py-2">Role</th>
          <th className="py-2">Location</th>
          <th className="py-2">Deadline</th>
          <th className="py-2">Status</th>
          <th className="py-2">Link</th>
        </tr>
      </thead>
      <tbody>
        {internships.map((job) => (
          <tr key={job.id} className="border-b">
            <td className="py-2">{job.company}</td>
            <td className="py-2">{job.role}</td>
            <td className="py-2">{job.location}</td>
            <td className="py-2">{job.deadline}</td>
            <td className="py-2">
              <span className={`rounded-full px-2 py-1 text-sm ${statusColours[job.status]}`}>
                {job.status}
              </span>
            </td>
            <td className="py-2">
              {job.link && (
                <a href={job.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  View
                </a>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="mb-6 text-3xl font-bold">My Internship Tracker</h1>
      {/* action={addInternship} connects the form to the server action. When you click the button, the browser sends everything to addInternship  */}
      {/* name="company" and the others are the labels each box sends. They MUST match what action.ts reads formData.get("company")), which in turn matches the database column names.*/}
      {/*  required means the box is required to be filled out. If it's left empty, the form won't submit. */}
      {/* type="date" means the box is a date picker. */}
      {/* type="url" means the box is a URL picker. */}
      {/* grid grid-cols-2 is Tailwind CSS for a 2-column grid and col-span-2 means it spans both columns. */}
      <form action={addInternship} className="mb-8 grid grid-cols-2 gap-3 rounded-lg border p-4">
        <input name="company" placeholder="Company" required className="rounded border px-3 py-2" />
        <input name="role" placeholder="Role" required className="rounded border px-3 py-2" />
        <input name="location" placeholder="Location" required className="rounded border px-3 py-2" />
        <input name="deadline" type="date" className="rounded border px-3 py-2" />
        <select name="status" defaultValue="Found" className="rounded border px-3 py-2">
          <option>Found</option>
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
        <input name="link" type="url" placeholder="Link to posting" className="rounded border px-3 py-2" />
        <button type="submit" className="col-span-2 rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
          Add internship
        </button>
</form>
      <Suspense fallback={<p>Loading internships…</p>}>
        <InternshipTable />
      </Suspense>
    </main>
  );
}