import { CLASH_URL } from "@/lib/apiEndPoints";

export async function fetchClashes(token: string) {
  const res = await fetch(CLASH_URL, {
    headers: {
      Authorization: token,
    },
    next: {
      revalidate: 60 * 60,
      tags: ["dashboard"],
    },
  });
  if (!res.ok) {
    throw new Error();
  }
  const response = await res.json();
  if (response?.data) {
    return response?.data;
  }
  return [];
}
