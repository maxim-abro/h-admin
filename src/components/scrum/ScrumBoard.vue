<template>
  <div class="w-full bg-zinc-100 h-full mb-2 overflow-x-scroll relative">
    <div class="flex gap-4 h-full mt-4 absolute">
      <div class="w-[300px]" v-for="board of boardsIn" :key="board.title">
        <h2 class="flex justify-between items-center font-bold mb-4">
          <span>{{ board.title }}</span>
          <button class="relative">
            <font-awesome-icon icon="ellipsis" />
            <span class="absolute left-0 bottom-0">
              <!--
                -- todo dropdown
               -->
            </span>
          </button>
        </h2>

        <draggableComponent
          class="list-group"
          :list="board.scrums"
          group="scrums"
          @change="remove"
        >
          <template #item="{ element, idx }">
            <div class="shadow p-2 border rounded bg-white cursor-grab mb-4">
              <div>
                <span
                  class="text-xs border rounded-2xl px-1 mr-2"
                  v-for="type of element.types"
                  :key="type"
                  >{{ type }} {{ idx }}</span
                >
              </div>
              <h3 class="font-bold">{{ element.title }}</h3>

              <div class="flex items-center justify-end font-bold">
                <font-awesome-icon icon="comments" class="mr-2" />
                {{ element.comment_length }}
              </div>
            </div>
          </template>
        </draggableComponent>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import draggableComponent from "vuedraggable";

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

interface Ref<T> {
  value: T;
}

const props = defineProps<ComponentType>();

const emit = defineEmits(["remove"]);

const boardsIn: Ref<ScrumBoard[]> = ref(props.boards);
function remove(evt: { removed: string }) {
  if (evt.removed) {
    emit("remove", boardsIn.value);
  }
}
</script>
