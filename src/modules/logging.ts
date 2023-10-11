import api from "@/modules/api";
import { useAuthStore } from "@/stores/auth";

export default async function logging(
  description: string,
  type: string
): Promise<void> {
  const authStore = useAuthStore();
  await api.post("/user/logs", {
    description,
    type,
    user_id: authStore.userData.id,
    date: new Date(),
  });
}
