import { useState } from 'react';
import { FiSearch, FiChevronDown, FiChevronRight } from 'react-icons/fi';

type Symptom = { id: string; label: string };
type Category = { name: string; symptoms: Symptom[] };

const CATEGORIES: Category[] = [
  {
    name: 'Estado de ánimo',
    symptoms: [
      { id: 'anhedonia', label: 'Falta de placer (anhedonia)' },
      { id: 'tristeza', label: 'Tristeza persistente' },
      { id: 'culpa', label: 'Sentimiento de culpa' },
    ],
  },
  {
    name: 'Ansiedad',
    symptoms: [
      { id: 'inquietud', label: 'Inquietud / nerviosismo' },
      { id: 'tension', label: 'Tensión muscular' },
      { id: 'preocupacion', label: 'Preocupación excesiva' },
    ],
  },
  // Añade más categorías DSM‑5 resumidas
];

interface Props {
  selected: string[];
  setSelected: (ids: string[]) => void;
}

export const SymptomChecker = ({ selected, setSelected }: Props) => {
  const [query, setQuery] = useState('');
  const [openCat, setOpenCat] = useState<string | null>(null);

  const toggleSymptom = (id: string) => {
    setSelected(
      selected.includes(id)
        ? selected.filter((s) => s !== id)
        : [...selected, id],
    );
  };

  const filtered = (cat: Category) =>
    cat.symptoms.filter((s) =>
      s.label.toLowerCase().includes(query.toLowerCase()),
    );

  return (
    <div className="space-y-4">
      {/* Buscador */}
      <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
        <FiSearch className="mr-2 text-gray-400" />
        <input
          className="flex-1 bg-transparent outline-none"
          placeholder="Buscar síntoma..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Árbol colapsable */}
      {CATEGORIES.map((cat) => {
        const list = filtered(cat);
        if (list.length === 0) return null;

        const open = openCat === cat.name;

        return (
          <div key={cat.name} className="border rounded-lg">
            <button
              onClick={() => setOpenCat(open ? null : cat.name)}
              className="w-full flex items-center justify-between px-4 py-2 font-medium"
            >
              <span>{cat.name}</span>
              {open ? <FiChevronDown /> : <FiChevronRight />}
            </button>

            {open && (
              <ul className="px-4 pb-3 space-y-1">
                {list.map((sym) => (
                  <li key={sym.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selected.includes(sym.id)}
                      onChange={() => toggleSymptom(sym.id)}
                      className="mr-2 accent-indigo-600"
                    />
                    <span className="text-sm">{sym.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
};
