type ClientLogLevel = "info" | "warn" | "error"

type ClientLogPayload = Record<string, string | number | boolean | null | undefined>

const DEBUG_FLAG_KEY = "runash:debug:interactions"

function canLogClientInteractions() {
  if (typeof window === "undefined") return false
  if (process.env.NODE_ENV !== "production") return true
  return window.localStorage.getItem(DEBUG_FLAG_KEY) === "1"
}

export function logClientInteraction(event: string, payload: ClientLogPayload = {}, level: ClientLogLevel = "info") {
  if (!canLogClientInteractions()) return

  const message = {
    scope: "blog-ui",
    event,
    at: new Date().toISOString(),
    ...payload,
  }

  if (level === "warn") {
    console.warn(message)
    return
  }

  if (level === "error") {
    console.error(message)
    return
  }

  console.info(message)
}
