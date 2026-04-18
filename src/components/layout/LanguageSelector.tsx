import { useState, useRef, useEffect } from 'react'
import i18n from '../../i18n'

const languages = [
  { code: 'en', label: 'English', flag: 'gb' },
  { code: 'fr', label: 'Français', flag: 'fr' },
  { code: 'es', label: 'Español', flag: 'es' },
  { code: 'ja', label: '日本語', flag: 'jp' },
]

export default function LanguageSelector() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const current = languages.find(l => l.code === i18n.language) ?? languages[0]

  function changeLanguage(code: string) {
    i18n.changeLanguage(code)
    localStorage.setItem('language', code)
    setOpen(false)
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-[#F2F2F7] border-none cursor-pointer hover:bg-gray-200 transition-colors"
      >
        <span className="flex items-center gap-2 text-sm text-[#1C1C1E]">
          <span className={`fi fi-${current.flag} rounded-sm`} />
          {current.label}
        </span>
        <span className="text-[#8E8E93] text-xs">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-[#E5E5EA] overflow-hidden z-50">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm border-none cursor-pointer transition-colors ${
                lang.code === i18n.language
                  ? 'bg-[#007AFF] text-white'
                  : 'bg-white text-[#1C1C1E] hover:bg-[#F2F2F7]'
              }`}
            >
              <span className={`fi fi-${lang.flag} rounded-sm`} />
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
