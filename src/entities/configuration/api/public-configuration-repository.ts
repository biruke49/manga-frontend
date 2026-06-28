export interface PublicConfiguration {
  companyName?: string | null;
  supportEmail?: string | null;
  supportPhone?: string | null;
  defaultMetaTitle?: string | null;
  defaultMetaDescription?: string | null;
  isBeingMaintained?: boolean | null;
  address?: string | null;
  primaryCtaLabel?: string | null;
  primaryCtaHref?: string | null;
  secondaryCtaLabel?: string | null;
  secondaryCtaHref?: string | null;
  heroEyebrow?: string | null;
}

function getApiBaseUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const internalUrl = process.env.API_INTERNAL_BASE_URL;
  if (typeof window === "undefined" && internalUrl) {
    try {
      const url = new URL(internalUrl);
      if (url.port === "6000") {
        return `${process.env.FRONTEND_INTERNAL_BASE_URL || "http://localhost:6003"}/api/backend`;
      }
    } catch {}
  }

  if (configuredUrl && !configuredUrl.startsWith("/")) {
    return internalUrl || configuredUrl;
  }

  return internalUrl || "http://localhost:6000/api";
}

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    const message = payload?.message || payload?.error || `Request failed with status ${response.status}`;
    throw new Error(Array.isArray(message) ? message.join(" ") : message);
  }

  return response.json() as Promise<T>;
}

export async function getPublicConfiguration(): Promise<PublicConfiguration | null> {
  try {
    const response = await fetch(`${getApiBaseUrl()}/configurations/public`, {
      next: { revalidate: 300 },
    });

    return await parseResponse<PublicConfiguration>(response);
  } catch {
    return null;
  }
}
