import { DbMgr } from "@/wab/server/db/DbMgr";
import { ApiProjectWebhook } from "@/wab/shared/ApiSchema";
import axios, { AddressFamily, Method } from "axios";
import dns from "dns";
import isPrivateIp from "private-ip";
export async function triggerWebhook(
  mgr: DbMgr,
  projectId: string,
  webhook: Omit<ApiProjectWebhook, "id">
) {
  const response = await triggerWebhookOnly(webhook);
  const method = webhook.method as Method;
  const url = webhook.url;
  return await addEvent(mgr, projectId, method, url, response);
}

export async function triggerWebhookOnly(
  webhook: Omit<ApiProjectWebhook, "id">
) {
  const method = webhook.method as Method;
  const url = webhook.url;
  const payload = webhook.payload;

  const headers = {};
  for (const { key, value } of webhook.headers ?? []) {
    headers[key] = value;
  }

  let response: { status: number; data: string };
  try {
    const resp = await axios.request({
      method,
      url,
      headers,
      data: payload,
      // Disable redirects to avoid SSRF attacks.
      maxRedirects: 0,
      // Disable axios default transform to always get a string response.
      transformResponse: (res) => res,
    });
    response = { status: resp.status, data: resp.data };
  } catch (error) {
    response = {
      status: error.response?.status,
      data: error.response?.data,
    };
  }

  return response;
}

async function addEvent(
  mgr: DbMgr,
  projectId: string,
  method: string,
  url: string,
  response: { status: number; data: string }
) {
  return await mgr.createProjectWebhookEvent({
    projectId,
    method,
    url,
    status: response?.status || 0,
    response: response?.data || "",
  });
}
