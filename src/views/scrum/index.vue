<template>
  <div
    class="relative h-full flex flex-auto flex-col px-4 sm:px-6 md:px-8 py-4 sm:py-6 bg-zinc-100"
  >
    <h1 class="mb-4 text-2xl font-bold">Скрам досква</h1>

    <scrum-board :boards="board"/>

  </div>
</template>

<script setup lang="ts">

import ScrumBoard from "@/components/scrum/ScrumBoard.vue";

interface ScrumBoardItem {
  title: string;
  date: Date;
  types: string[];
  comment_length: number;
  is_close: boolean;
}
interface ScrumBoard {
  title: string;
  scrums: ScrumBoardItem[];
}

const board: ScrumBoard[] = [
  {
    title: "To Do",
    scrums: [
      {
        title: "Unable to upload file",
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
        title: "Unable to upload file",
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
        title: "Unable to upload file",
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
        title: "Unable to upload file",
        date: new Date(),
        types: ["Task", "Live issue"],
        comment_length: 3,
        is_close: false,
      },
    ],
  },
]
</script>
