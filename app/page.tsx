// 1. Describe what an internship looks like
type Internship = {
  id: number;
  company: string;
  role: string;
  location: string;
  deadline: string;
  status: "Found" | "Applied" | "Interview" | "Offer" | "Rejected";
  link: string;
};

// 2. Some made-up data (fake companies for now)
const internships: Internship[] = [
  { id: 1, company: "Liffey Robotics", role: "Mechanical Design Intern", location: "Dublin", deadline: "2026-12-01", status: "Applied", link: "https://www.workatastartup.com/"},
  { id: 2, company: "Northbound Energy", role: "Engineering Co-op", location: "Toronto, Canada", deadline: "2026-11-30", status: "Found", link: "https://www.workatastartup.com/"},
  { id: 3, company: "Wicklow MedTech", role: "R&D Intern", location: "Bray", deadline: "2026-12-15", status: "Interview", link: "https://www.workatastartup.com/" },
  { id: 4, company: "Alpine Dynamics", role: "Summer Engineering Intern", location: "Boston, USA", deadline: "2027-01-10", status: "Found", link: "https://www.workatastartup.com/" },
  { id: 5, company: "Google", role: "Summer Engineering Intern", location: "Dublin, Ireland", deadline: "2027-01-10", status: "Found", link: "https://www.workatastartup.com/"}
];

// 3. A colour for each status
const statusColours: Record<Internship["status"], string> = {
  Found: "bg-gray-100 text-gray-800",
  Applied: "bg-blue-100 text-blue-800",
  Interview: "bg-yellow-100 text-yellow-800",
  Offer: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

// 4. The page itself
export default function Home() {
  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="mb-6 text-3xl font-bold">My Internship Tracker</h1>

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
                <a href={job.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}