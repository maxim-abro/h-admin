<template>
  <div class="grid grid-cols-8 gap-4 overflow-auto">
    <div class="" v-for="board of props.boards" :key="board.title">
      <h2 class="flex justify-between items-center font-bold mb-4">
        <span>{{ board.title }}</span>
        <button>...</button>
      </h2>

      <div class="shadow-2xl p-1 border rounded bg-white cursor-grab" v-for="scrum of board.scrums" :key="scrum.title">
        <div><span class="text-xs border rounded-2xl px-1 mr-2" v-for="type of scrum.types">{{ type }}</span></div>
        <h3 class="font-bold">{{ scrum.title }}</h3>

        <div class="flex justify-end">comments {{ scrum.comment_length }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from "vue";

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

interface ComponentType {
  boards: ScrumBoard[];
}

const props = withDefaults(defineProps<ComponentType>(), {
  boards: [
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
  ] as ScrumBoard[],
});
</script>
