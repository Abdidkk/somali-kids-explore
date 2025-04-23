
import { Button } from "@/components/ui/button";

export interface Kid {
  id: string;
  name: string;
  age: string;
}

interface KidListProps {
  kids: Kid[];
  onDelete: (id: string) => void;
}

const KidList = ({ kids, onDelete }: KidListProps) => {
  if (kids.length === 0) {
    return (
      <div className="text-gray-500 text-center py-6">
        Ingen børneprofiler oprettet endnu.
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {kids.map((kid) => (
        <li key={kid.id} className="flex justify-between items-center p-3 bg-blue-50 rounded border border-blue-200">
          <span>
            <b>{kid.name}</b> ({kid.age} år)
          </span>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(kid.id)}
          >
            Slet
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default KidList;
