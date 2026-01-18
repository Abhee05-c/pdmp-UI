const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

function getAuthHeaders() {
  const token = localStorage.getItem("access_token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

/* GET organizations */
export async function getOrganizations() {
  const res = await fetch(`${API_BASE}/admin/organizations`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch organizations");
  return res.json();
}

/* Disable organization */
export async function disableOrganization(orgId: number) {
  const res = await fetch(
    `${API_BASE}/admin/organizations/${orgId}/disable`,
    { method: "POST", headers: getAuthHeaders() }
  );
  if (!res.ok) throw new Error("Failed to disable organization");
}

/* Enable organization */
export async function enableOrganization(orgId: number) {
  const res = await fetch(
    `${API_BASE}/admin/organizations/${orgId}/enable`,
    { method: "POST", headers: getAuthHeaders() }
  );
  if (!res.ok) throw new Error("Failed to enable organization");
}

/* List users in org */
export async function getOrgUsers(orgId: number) {
  const res = await fetch(
    `${API_BASE}/admin/organizations/${orgId}/users`,
    { headers: getAuthHeaders() }
  );
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

/* Disable user */
export async function disableUser(userId: number) {
  const res = await fetch(
    `${API_BASE}/admin/users/${userId}/disable`,
    { method: "POST", headers: getAuthHeaders() }
  );
  if (!res.ok) throw new Error("Failed to disable user");
}

/* Enable user */
export async function enableUser(userId: number) {
  const res = await fetch(
    `${API_BASE}/admin/users/${userId}/enable`,
    { method: "POST", headers: getAuthHeaders() }
  );
  if (!res.ok) throw new Error("Failed to enable user");
}

/* Audit logs */
export async function getAuditLogs() {
  const res = await fetch(`${API_BASE}/admin/auditlogs`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch audit logs");
  return res.json();
}
