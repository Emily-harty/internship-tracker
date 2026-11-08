import { Suspense } from "react";
import { supabase } from "@/lib/supabase";

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
      <Suspense fallback={<p>Loading internships…</p>}>
        <InternshipTable />
      </Suspense>
    </main>
  );
}