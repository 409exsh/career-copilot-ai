type StatCardProps = {
  title: string;
  value: string;
};

export default function StatCard({
  title,
  value,
}: StatCardProps) {
  return (
    <div className="bg-gray-950 border border-gray-800 rounded-3xl p-6">

      <p className="text-gray-400 mb-2">
        {title}
      </p>

      <h2 className="text-5xl font-bold text-white">
        {value}
      </h2>

    </div>
  );
}