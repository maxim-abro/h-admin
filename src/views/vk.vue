<template>
  <h1 class="text-3xl font-bold mb-5">Vk статистика</h1>

  <m-load v-if="data.load" />
  <div class="grid grid-cols-2 gap-5 mb-5" v-if="!data.load">
    <m-card class="">
      <h2 class="text-xl font-medium mb-2">Заходы на страницу</h2>
      <m-line-chart :chart-data="data.statistic" />
    </m-card>
    <m-card class="">
      <h2 class="text-xl font-medium mb-2">Посты в очереди</h2>

      <table class="table table_hoverable w-full mt-3">
        <thead>
          <tr class="py-4 text-center">
            <th class="ltr:text-left rtl:text-right uppercase">#</th>
            <th class="ltr:text-left rtl:text-right uppercase">Сообщение</th>
            <th class="ltr:text-left rtl:text-right uppercase">Действие</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(queue, idx) of data.queues"
            :key="queue.uin"
            class="border-y border-y-2"
          >
            <td class="py-4 text-center">{{ idx + 1 }}</td>
            <td class="py-4 text-center">
              {{ queue.message.substring(0, 40) + "..." }}
            </td>
            <td class="py-4 text-center">
              <button
                class="rounded text-red-500 rounded-full border border-2 border-red-500 w-10 h-10"
                @click="deleteQueue(queue.uin)"
              >
                <font-awesome-icon icon="trash-can" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </m-card>
    <m-card class="">
      <form>
        <label for="message" class="mb-2 font-bold block">Сообщение</label>
        <textarea
          name="description"
          class="block mb-5 placeholder-zinc-800 text-zinc-900 border border-zinc-300 bg-white focus:outline-0 rounded p-2 box-border w-full focus:outline-0 focus:ring focus:ring-primary"
          v-model="data.message"
        ></textarea>

        <label for="file" class="mb-2 font-bold block">Картинка</label>
        <input
          type="file"
          class="focus:outline-0 placeholder-zinc-800 bg-white border border-zinc-300 rounded p-2 w-full my-3 focus:outline-0 focus:ring focus:ring-primary"
        />

        <m-button color="primary">Добавить</m-button>
      </form>
    </m-card>
  </div>
</template>

<script setup lang="ts">
import MCard from "@/components/_core/MCard.vue";
import MLoad from "@/components/_core/MLoad.vue";
import MButton from "@/components/_core/MButton.vue";
import MLineChart from "@/components/charts/MLineChart.vue";
import { onMounted, reactive, computed, watch } from "vue";
import http from "@/modules/api";

const data = reactive({
  statistic: {} as object,
  queues: [] as object[],
  load: true as boolean,
  message: "" as string,
  image: "" as string,
});

onMounted(async () => {
  const resStatistic = await http.get("/admin/statistic/vk");
  const resQueue = await http.get("/queue_vk/all");
  data.statistic = resStatistic.data;
  data.queues = resQueue.data;

  data.load = false;
});

const deleteQueue = async (uin: string) => {
  try {
    await http.delete(`/queue_vk/delete/${uin}`);
    // @ts-ignore
    data.queues = data.queues.filter((i) => i.uin !== uin);
  } catch (e) {
    console.log(e);
  }
};

watch(
  () => data.message,
  (value) => {
    data.message = value.replace(/\r?\n/g, "\n");
  }
);

const inputImage = async (event: any) => {
  try {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);

    const res = await http.post("/upload_vk", formData);

    data.image = res.data;
  } catch (e) {
    console.log(e);
  }
};

const handleForm = async () => {
  try {
    await http.post("/queue_vk", { message: data.message, image: data.image });

    data.image = "";
    data.message = "";
  } catch (e) {
    console.log(e);
  }
};
</script>
