import api from "@/lib/api";

/* GET organizations */
export async function getOrganizations() {
  const res = await api.get("/admin/organizations");
  return res.data;
}

/* Disable organization */
export async function disableOrganization(orgId: number) {
  const res = await api.post(`/admin/organizations/${orgId}/disable`);
  return res.data;
}

/* Enable organization */
export async function enableOrganization(orgId: number) {
  const res = await api.post(`/admin/organizations/${orgId}/enable`);
  return res.data;
}

/* List users in org */
export async function getOrgUsers(orgId: number) {
  const res = await api.get(`/admin/organizations/${orgId}/users`);
  return res.data;
}

/* Disable user */
export async function disableUser(userId: number) {
  const res = await api.post(`/admin/users/${userId}/disable`);
  return res.data;
}

/* Enable user */
export async function enableUser(userId: number) {
  const res = await api.post(`/admin/users/${userId}/enable`);
  return res.data;
}

/* Audit logs */
export async function getAuditLogs() {
  const res = await api.get("/admin/auditlogs");
  return res.data;
}
