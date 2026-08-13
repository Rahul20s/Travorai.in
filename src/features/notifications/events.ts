export type NotificationChannel = "in_app" | "email" | "push" | "sms" | "whatsapp";

export type NotificationEvent =
  | "trip_reminder"
  | "weather_alert"
  | "price_drop"
  | "hotel_confirmation"
  | "train_delay"
  | "flight_delay"
  | "payment_success";

export type NotificationJob = {
  userId: string;
  tripId?: string;
  event: NotificationEvent;
  channels: NotificationChannel[];
  payload: Record<string, string | number | boolean>;
};

export function createNotificationJob(job: NotificationJob) {
  return {
    ...job,
    createdAt: new Date().toISOString(),
    status: "queued" as const
  };
}
