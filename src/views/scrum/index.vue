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
import { ref, warn, watch } from "vue";

interface ScrumBoardItem {
  title: string;
  date: Date;
  types: string[];
  comment_length: number;
  is_close: boolean;
}
interface ScrumBoardType {
  title: string;
  scrums: ScrumBoardItem[];
}

interface Ref<T> {
  value: T;
}

const board: Ref<ScrumBoardType[]> = ref([
  {
    title: "To Do",
    scrums: [
      {
        title: "todo to upload file 1",
        date: new Date(),
        types: ["Task", "Live issue"],
        comment_length: 3,
        is_close: false,
      },
      {
        title: "todo to upload file 2",
        date: new Date(),
        types: ["Task", "Live issue"],
        comment_length: 3,
        is_close: false,
      },
      {
        title: "todo to upload file 3",
        date: new Date(),
        types: ["Task", "Live issue"],
        comment_length: 3,
        is_close: false,
      },
    ],
  },
  {
    title: "Is progress",
    scrums: [
      {
        title: "Progress to upload file 1",
        date: new Date(),
        types: ["Task", "Live issue"],
        comment_length: 3,
        is_close: false,
      },
      {
        title: "Progress to upload file 2",
        date: new Date(),
        types: ["Task", "Live issue"],
        comment_length: 3,
        is_close: false,
      },
      {
        title: "Progress to upload file 3",
        date: new Date(),
        types: ["Task", "Live issue"],
        comment_length: 3,
        is_close: false,
      },
    ],
  },
  {
    title: "Submitted",
    scrums: [
      {
        title: "Submitted to upload file 1",
        date: new Date(),
        types: ["Task", "Live issue"],
        comment_length: 3,
        is_close: false,
      },
      {
        title: "Submitted to upload file 2",
        date: new Date(),
        types: ["Task", "Live issue"],
        comment_length: 3,
        is_close: false,
      },
      {
        title: "Submitted to upload file 3",
        date: new Date(),
        types: ["Task", "Live issue"],
        comment_length: 3,
        is_close: false,
      },
    ],
  },
  {
    title: "Completed",
    scrums: [
      {
        title: "Unable to upload file 4",
        date: new Date(),
        types: ["Task", "Live issue"],
        comment_length: 3,
        is_close: false,
      },
    ],
  },
  {
    title: "Completed",
    scrums: [
      {
        title: "Unable to upload file 4",
        date: new Date(),
        types: ["Task", "Live issue"],
        comment_length: 3,
        is_close: false,
      },
    ],
  },
  {
    title: "Completed",
    scrums: [
      {
        title: "Unable to upload file 4",
        date: new Date(),
        types: ["Task", "Live issue"],
        comment_length: 3,
        is_close: false,
      },
    ],
  },
  {
    title: "Completed",
    scrums: [
      {
        title: "Unable to upload file 4",
        date: new Date(),
        types: ["Task", "Live issue"],
        comment_length: 3,
        is_close: false,
      },
    ],
  },
  {
    title: "Completed",
    scrums: [
      {
        title: "Unable to upload file 4",
        date: new Date(),
        types: ["Task", "Live issue"],
        comment_length: 3,
        is_close: false,
      },
    ],
  },
  {
    title: "Completed",
    scrums: [
      {
        title: "Unable to upload file 4",
        date: new Date(),
        types: ["Task", "Live issue"],
        comment_length: 3,
        is_close: false,
      },
    ],
  },
  {
    title: "Completed",
    scrums: [
      {
        title: "Unable to upload file 4",
        date: new Date(),
        types: ["Task", "Live issue"],
        comment_length: 3,
        is_close: false,
      },
    ],
  },
  {
    title: "Completed",
    scrums: [
      {
        title: "Unable to upload file 4",
        date: new Date(),
        types: ["Task", "Live issue"],
        comment_length: 3,
        is_close: false,
      },
    ],
  },
  {
    title: "Completed",
    scrums: [
      {
        title: "Unable to upload file 4",
        date: new Date(),
        types: ["Task", "Live issue"],
        comment_length: 3,
        is_close: false,
      },
    ],
  },
  {
    title: "Completed",
    scrums: [
      {
        title: "Unable to upload file 4",
        date: new Date(),
        types: ["Task", "Live issue"],
        comment_length: 3,
        is_close: false,
      },
    ],
  },
  {
    title: "Completed",
    scrums: [
      {
        title: "Unable to upload file 4",
        date: new Date(),
        types: ["Task", "Live issue"],
        comment_length: 3,
        is_close: false,
      },
    ],
  },
  {
    title: "Completed",
    scrums: [
      {
        title: "Unable to upload file 4",
        date: new Date(),
        types: ["Task", "Live issue"],
        comment_length: 3,
        is_close: false,
      },
    ],
  },
]);

function removeBoard(event: ScrumBoardType[]) {
  board.value = event;
  console.log("remove");
}
</script>
