import React, { useEffect, useState } from "react";

const languages = [
  {
    id: "da-so",
    label: "Dansk → Somalisk",
    from: {
      name: "Dansk",
      flag: (
        <svg width="32" height="20" viewBox="0 0 32 20">
          <rect width="32" height="20" fill="#C60C30" rx="3" />
          <rect x="10" width="4" height="20" fill="#fff" />
          <rect y="8" width="32" height="4" fill="#fff" />
        </svg>
      ),
    },
    to: {
      name: "Somali",
      flag: (
        <svg width="32" height="20" viewBox="0 0 32 20">
          <rect width="32" height="20" fill="#4CA6FE" rx="3" />
          <path d="M16 5l1.05 3.1H20l-2.5 1.8 1.05 3.1L16 11.2l-2.5 1.8 1.08-3.1-2.5-1.8h2.92L16 5z" fill="#fff" />
        </svg>
      ),
    },
  },
  {
    id: "sv-so",
    label: "Svensk → Somalisk",
    from: {
      name: "Svensk",
      flag: (
        <svg width="32" height="20" viewBox="0 0 32 20">
          <rect width="32" height="20" fill="#006aa7" rx="3" />
          <rect x="9" width="4" height="20" fill="#fecc00" />
          <rect y="8" width="32" height="4" fill="#fecc00" />
        </svg>
      ),
    },
    to: {
      name: "Somali",
      flag: (
        <svg width="32" height="20" viewBox="0 0 32 20">
          <rect width="32" height="20" fill="#4CA6FE" rx="3" />
          <path d="M16 5l1.05 3.1H20l-2.5 1.8 1.05 3.1L16 11.2l-2.5 1.8 1.08-3.1-2.5-1.8h2.92L16 5z" fill="#fff" />
        </svg>
      ),
    },
  },
  {
    id: "no-so",
    label: "Norsk → Somalisk",
    from: {
      name: "Norsk",
      flag: (
        <svg width="32" height="20" viewBox="0 0 32 20">
          <rect width="32" height="20" fill="#ba0c2f" rx="3" />
          <rect x="10" width="4" height="20" fill="#fff" />
          <rect y="8" width="32" height="4" fill="#fff" />
          <rect x="12" width="2" height="20" fill="#00205b" />
          <rect y="10" width="32" height="2" fill="#00205b" />
        </svg>
      ),
    },
    to: {
      name: "Somali",
      flag: (
        <svg width="32" height="20" viewBox="0 0 32 20">
          <rect width="32" height="20" fill="#4CA6FE" rx="3" />
          <path d="M16 5l1.05 3.1H20l-2.5 1.8 1.05 3.1L16 11.2l-2.5 1.8 1.08-3.1-2.5-1.8h2.92L16 5z" fill="#fff" />
        </svg>
      ),
    },
  },
];

const LOCAL_STORAGE_KEY = "dugsi_language_selection";

interface LanguageSelectionModalProps {
  open: boolean;
  onSelect: (langId: string) => void;
}

const LanguageSelectionModal: React.FC<LanguageSelectionModalProps> = ({
  open,
  onSelect,
}) => {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (selected) {
      setTimeout(() => {
        onSelect(selected);
      }, 200);
    }
  }, [selected, onSelect]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur flex items-center justify-center animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-8 flex flex-col items-center relative">
        <div className="flex flex-col gap-5 w-full">
          {languages.map((option) => (
            <button
              type="button"
              key={option.id}
              onClick={() => setSelected(option.id)}
              className={`flex items-center justify-between rounded-xl border-2 transition-colors px-4 py-3 shadow-sm bg-white hover:bg-purple-50 gap-4 border-gray-200 ${
                selected === option.id
                  ? "border-purple-600 ring-2 ring-purple-200"
                  : "hover:border-purple-400"
              }`}
            >
              <span className="flex items-center gap-3">
                {option.from.flag}
                <span className="font-semibold text-gray-900">{option.from.name}</span>
                <span className="mx-1 text-lg text-gray-400">→</span>
                {option.to.flag}
                <span className="font-semibold text-gray-900">{option.to.name}</span>
              </span>
              <span className="ml-2 text-xs text-purple-600 font-semibold">
                {option.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export function useLanguageSelection() {
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setSelectedLang(stored);
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  }, []);

  const selectLanguage = (langId: string) => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, langId);
    setSelectedLang(langId);
    setShowModal(false);
  };

  return {
    selectedLang,
    showModal,
    selectLanguage,
  };
}

export default LanguageSelectionModal;
