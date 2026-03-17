import { api } from "./api";

export async function getQueue(date) {
  try {
    const response = await api.get(`/queue?date=${date}`);

    return response.data; // array of queue items
  } catch (err) {
    console.error("Error fetching queue:", err);
    return { error: "Error fetching queue" };
  }
}

export async function updateQueueStatus(queueId, data) {
  try {
    const response = await api.patch(`/queue/${queueId}`, data);
    return response.data;
  } catch (err) {
    console.error("Error updating queue status:", err);
    return { error: "Error updating queue status" };
  }
}
