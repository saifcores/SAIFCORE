"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

export type ThemePreference = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

type ThemeState = {
  preference: ThemePreference;
  theme: ResolvedTheme;
};

const STORAGE_KEY = "theme";

const ThemeContext = createContext<{
  preference: ThemePreference;
  theme: ResolvedTheme;
  setPreference: (next: ThemePreference) => void;
} | null>(null);

const SERVER_THEME_STATE: ThemeState = {
  preference: "dark",
  theme: "dark",
};

let cachedSnapshot: ThemeState = SERVER_THEME_STATE;
const listeners = new Set<() => void>();

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function readStoredPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
  } catch {
    // localStorage unavailable
  }
  return "dark";
}

function resolveTheme(preference: ThemePreference): ResolvedTheme {
  if (preference === "system") return getSystemTheme();
  return preference;
}

function applyTheme(preference: ThemePreference) {
  const resolved = resolveTheme(preference);
  document.documentElement.dataset.theme = resolved;
  document.documentElement.dataset.themePreference = preference;
  try {
    localStorage.setItem(STORAGE_KEY, preference);
  } catch {
    // localStorage unavailable
  }
}

function readPreferenceFromDocument(): ThemePreference | null {
  const stored = document.documentElement.dataset.themePreference;
  if (stored === "light" || stored === "dark" || stored === "system") {
    return stored;
  }
  return null;
}

function readClientState(): ThemeState {
  const preference = readPreferenceFromDocument() ?? readStoredPreference();
  const applied = document.documentElement.dataset.theme;
  const theme: ResolvedTheme =
    applied === "light" || applied === "dark"
      ? applied
      : resolveTheme(preference);
  return { preference, theme };
}

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function getClientSnapshot(): ThemeState {
  const next = readClientState();
  if (
    next.preference === cachedSnapshot.preference &&
    next.theme === cachedSnapshot.theme
  ) {
    return cachedSnapshot;
  }
  cachedSnapshot = next;
  return cachedSnapshot;
}

function getServerSnapshot(): ThemeState {
  return SERVER_THEME_STATE;
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onMediaChange = () => {
    if (readStoredPreference() !== "system") return;
    document.documentElement.dataset.theme = getSystemTheme();
    emitChange();
  };
  media.addEventListener("change", onMediaChange);

  return () => {
    listeners.delete(onStoreChange);
    media.removeEventListener("change", onMediaChange);
  };
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const state = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  const setPreference = useCallback((next: ThemePreference) => {
    applyTheme(next);
    emitChange();
  }, []);

  const value = useMemo(
    () => ({
      preference: state.preference,
      theme: state.theme,
      setPreference,
    }),
    [setPreference, state.preference, state.theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

/** @deprecated Use `useTheme().setPreference` — kept for any legacy callers. */
export function useThemeToggle() {
  const { theme, setPreference } = useTheme();
  return {
    theme,
    toggle: () => setPreference(theme === "dark" ? "light" : "dark"),
  };
}
