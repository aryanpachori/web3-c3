import { Input } from "@/components/ui/input";
export default function Launchpad() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center  ">
      <h1 className="text-6xl font-bold font-mono ">Solana token launchpad</h1>

      <div className="mt-5 space-y-4  w-64">
        <Input placeholder="John Doe" />
        <Input placeholder="Symbol" />
        <Input placeholder="Image URL" />
        <Input placeholder="Inital supply" />
        <button className="border border-gray-800 rounded p-2 bg-gray-900">
          Create Token
        </button>
      </div>
    </div>
  );
}
