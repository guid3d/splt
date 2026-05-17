const SESSION_KEY = "splt-session-id";
const CONSENTS_KEY = "splt-consents";

type ConsentRecord = {
  participantId: string;
  hashedSessionId: string;
  consentGivenAt: string;
};

function getOrCreateSessionId(): string {
  let sessionId = localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

export async function getHashedSessionId(): Promise<string> {
  const sessionId = getOrCreateSessionId();
  const encoded = new TextEncoder().encode(sessionId);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function recordConsent(participantId: string, hashedSessionId: string): void {
  const raw = localStorage.getItem(CONSENTS_KEY);
  const consents: ConsentRecord[] = raw ? JSON.parse(raw) : [];

  const existing = consents.findIndex((c) => c.participantId === participantId);
  const record: ConsentRecord = {
    participantId,
    hashedSessionId,
    consentGivenAt: new Date().toISOString(),
  };

  if (existing >= 0) {
    consents[existing] = record;
  } else {
    consents.push(record);
  }

  localStorage.setItem(CONSENTS_KEY, JSON.stringify(consents));
}
