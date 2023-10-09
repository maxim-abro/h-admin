<template>
  <div class="w-full bg-zinc-100 h-full mb-2 overflow-x-scroll relative">
    <div class="flex gap-4 h-full mt-4 absolute">
      <div class="w-[300px]" v-for="(board, _idx) of boardsIn" :key="_idx">
        <h2 class="flex justify-between items-center font-bold mb-4">
          <span>{{ board.title }}</span>
          <button
            class="relative overflow-visible hover:bg-zinc-300 px-2 rounded"
            @click="board.isSettingsOpen = !board.isSettingsOpen"
          >
            <font-awesome-icon icon="ellipsis" />
            <ul
              v-if="board.isSettingsOpen"
              class="absolute right -0 bottom-0 translate-y-full -translate-x-full shadow-sm bg-white p-2 rounded"
            >
              <li class="hover:bg-zinc-200 rounded px-1 text">Переименовать</li>
              <li class="hover:bg-zinc-200 rounded px-1 text">
                Новая карточка
              </li>
              <li class="hover:bg-zinc-200 rounded px-1 text">Удалить</li>
            </ul>
          </button>
        </h2>

        <draggableComponent
          class="list-group"
          :list="board.scrum_tickets"
          group="scrums"
          @change="remove"
        >
          <template #item="{ element, idx }">
            <div
              class="p-2 border rounded bg-white cursor-grab mb-4 hover:drop-shadow-xl"
            >
              <div>
                <span
                  class="text-xs border rounded-2xl px-1 mr-2"
                  v-for="tag of element.scrum_tags"
                  :key="tag.id"
                  >{{ tag.title }} {{ idx }}</span
                >
              </div>
              <h3 class="font-bold">{{ element.title }}</h3>

              <div class="flex items-center justify-end font-bold">
                <font-awesome-icon icon="comments" class="mr-2" />
                <!-- @todo               {{ element.comment_length }}-->
              </div>
            </div>
          </template>
        </draggableComponent>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from "vue";
import draggableComponent from "vuedraggable";

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
  isSettingsOpen?: boolean;
}

interface ComponentType {
  boards: ScrumBoardType[];
}

interface Ref<T> {
  value: T;
}

const props = defineProps<ComponentType>();

const emit = defineEmits(["remove"]);

const boardsIn: Ref<ScrumBoardType[]> = ref([]);

watch(
  () => props.boards,
  () => {
    boardsIn.value = props.boards;
  }
);
function remove(evt: { removed: string; moved: string }) {
  if (evt.removed || evt.moved) {
    emit("remove", boardsIn.value);
  }
}
</script>
