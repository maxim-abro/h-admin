<template>
  <div
    class="relative h-full bg-zinc-100 flex flex-auto flex-col px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:px-8"
  >
    <h1 class="mb-8 text-2xl font-bold">Скрам доска</h1>

    <scrum-board :boards="board" @remove="removeBoard($event)" />
  </div>
</template>

<script setup lang="ts">
import ScrumBoard from "@/components/scrum/ScrumBoard.vue";
import { onMounted, ref, warn, watch } from "vue";
import api from "@/modules/api";
import { useLoadStore } from "@/stores/load";
import { useAlertStore } from "@/stores/alert";

const load = useLoadStore();
const alert = useAlertStore();
load.handleLoad();

interface ScrumTagItem {
  title: string;
  id_tag: number;
}

interface ScrumBoardItem {
  id: number;
  title: string;
  date: Date;
  is_close: boolean;
  order: number;
  scrum_tags: ScrumTagItem[];
}
interface ScrumBoardType {
  id: number;
  title: string;
  cards: string;
  scrum_tickets: ScrumBoardItem[];
}

interface Ref<T> {
  value: T;
}

const board: Ref<ScrumBoardType[]> = ref([]);

onMounted(async () => {
  const boardResponse = await api.get("/scrum/board/all");
  board.value = boardResponse.data;
  load.handleLoad();
});

async function removeBoard(event: ScrumBoardType[]) {
  load.handleLoad();
  board.value = event;
  board.value.forEach((i) => {
    const tickets: string[] = [];
    i.scrum_tickets.forEach((ticket) => {
      tickets.push(String(ticket.id));
    });
    console.log(tickets.join(","));
    i.cards = tickets.join(",");
  });
  await api.post("/scrum/board/change", {
    data: board.value.map((i) => {
      return {
        id: i.id,
        cards: i.cards,
      };
    }),
  });
  load.handleLoad();
}
</script>
