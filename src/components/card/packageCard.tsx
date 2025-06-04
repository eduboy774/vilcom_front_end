import { VilcomPackage } from "../../types/vilcomPackage";

type PackageCardProps = {
  pkg: VilcomPackage;
  onDelete: (uuid: string) => void;
};

export default function PackageCard({ pkg, onDelete }: PackageCardProps) {
  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <h3 className="text-lg dark:text-white/90 font-bold text-gray-800">
        {pkg.packageName}
      </h3>
      <p className="text-sm dark:text-white/90 text-gray-600">
        {pkg.packageDescription}
      </p>

      {pkg.packagePhoto && (
        <img
          src={pkg.packagePhoto}
          alt={pkg.packageName}
          className="mt-2 h-32 w-full object-cover rounded-md"
        />
      )}

      <div className="mt-2 flex items-center justify-between text-xs">
        <span className={pkg.isActive ? "text-green-600" : "text-red-600"}>
          {pkg.isActive ? "Active" : "Inactive"}
        </span>
        <button
          onClick={() => onDelete(pkg.uuid)}
          className="
          rounded 
          bg-red-500 
          px-2 py-1 
          text-white 
          hover:bg-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
