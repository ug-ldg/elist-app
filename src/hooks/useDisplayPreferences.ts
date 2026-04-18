import { useState } from 'react'

type DisplayPreferences = {
  showCreatedAt: boolean
  showUpdatedAt: boolean
  showStatus: boolean
  showIcon: boolean
}

function load(): DisplayPreferences {
  try {
    const stored = localStorage.getItem('displayPreferences')
    if (stored) return { showCreatedAt: true, showUpdatedAt: true, showStatus: true, showIcon: true, ...JSON.parse(stored) }
  } catch {}
  return { showCreatedAt: true, showUpdatedAt: true, showStatus: true, showIcon: true }
}

function save(prefs: DisplayPreferences) {
  localStorage.setItem('displayPreferences', JSON.stringify(prefs))
}

const listeners = new Set<() => void>()
let current = load()

export function useDisplayPreferences() {
  const [, forceUpdate] = useState(0)

  function toggle(key: keyof DisplayPreferences) {
    current = { ...current, [key]: !current[key] }
    save(current)
    listeners.forEach(l => l())
  }

  useState(() => {
    const notify = () => forceUpdate(n => n + 1)
    listeners.add(notify)
    return () => { listeners.delete(notify) }
  })

  return { prefs: current, toggle }
}
