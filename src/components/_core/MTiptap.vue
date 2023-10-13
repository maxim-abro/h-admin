<template>
  <div
    v-if="editor"
    class="flex py-3 px-1 rounded-t flex-wrap gap-1 bg-zinc-800"
  >
    <button
      class="rounded px-2 text-white hover:bg-zinc-700"
      @click="editor.chain().focus().toggleBold().run()"
      :disabled="!editor.can().chain().focus().toggleBold().run()"
      :class="{ 'is-active': editor.isActive('bold') }"
      title="жирный шрифт"
    >
      <font-awesome-icon icon="bold" />
    </button>
    <button
      class="rounded px-2 text-white hover:bg-zinc-700"
      @click="editor.chain().focus().toggleItalic().run()"
      :disabled="!editor.can().chain().focus().toggleItalic().run()"
      :class="{ 'is-active': editor.isActive('italic') }"
      title="курсив"
    >
      <font-awesome-icon icon="italic" />
    </button>
    <button
      class="rounded px-2 text-white hover:bg-zinc-700"
      @click="editor.chain().focus().toggleStrike().run()"
      :disabled="!editor.can().chain().focus().toggleStrike().run()"
      :class="{ 'is-active': editor.isActive('strike') }"
      title="перечеркнутый"
    >
      <font-awesome-icon icon="strikethrough" />
    </button>
    <button
      class="rounded px-2 text-white hover:bg-zinc-700"
      @click="editor.chain().focus().toggleCode().run()"
      :disabled="!editor.can().chain().focus().toggleCode().run()"
      :class="{ 'is-active': editor.isActive('code') }"
      title="код"
    >
      <font-awesome-icon icon="code" />
    </button>
    <button
      class="rounded px-2 text-white hover:bg-zinc-700"
      @click="editor.chain().focus().unsetAllMarks().run()"
      title="очистить стили букв"
    >
      <font-awesome-icon icon="xmark" />
    </button>
    <button
      class="rounded px-2 text-white hover:bg-zinc-700"
      @click="editor.chain().focus().clearNodes().run()"
      title="очистить стили текста"
    >
      <font-awesome-icon icon="circle-nodes" />
    </button>
    <button
      class="rounded px-2 text-white hover:bg-zinc-700"
      @click="editor.chain().focus().setParagraph().run()"
      :class="{ 'is-active': editor.isActive('paragraph') }"
      title="параграф"
    >
      <font-awesome-icon icon="paragraph" />
    </button>
    <button
      class="rounded px-2 text-white hover:bg-zinc-700"
      @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
    >
      h2
    </button>
    <button
      class="rounded px-2 text-white hover:bg-zinc-700"
      @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
    >
      h3
    </button>
    <button
      class="rounded px-2 text-white hover:bg-zinc-700"
      @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
    >
      h4
    </button>
    <button
      class="rounded px-2 text-white hover:bg-zinc-700"
      @click="editor.chain().focus().toggleBulletList().run()"
      :class="{ 'is-active': editor.isActive('bulletList') }"
      title="список с точками"
    >
      <font-awesome-icon icon="list-ul" />
    </button>
    <button
      class="rounded px-2 text-white hover:bg-zinc-700"
      @click="editor.chain().focus().toggleOrderedList().run()"
      :class="{ 'is-active': editor.isActive('orderedList') }"
      title="список с цифрами"
    >
      <font-awesome-icon icon="list-ol" />
    </button>
    <button
      class="rounded px-2 text-white hover:bg-zinc-700"
      @click="editor.chain().focus().toggleCodeBlock().run()"
      :class="{ 'is-active': editor.isActive('codeBlock') }"
      title="блок кода"
    >
      <font-awesome-icon icon="laptop-code" />
    </button>
    <button
      class="rounded px-2 text-white hover:bg-zinc-700"
      @click="editor.chain().focus().toggleBlockquote().run()"
      :class="{ 'is-active': editor.isActive('blockquote') }"
      title="цитата"
    >
      <font-awesome-icon icon="quote-left" />
    </button>
    <button
      class="rounded px-2 text-white hover:bg-zinc-700"
      @click="editor.chain().focus().setHorizontalRule().run()"
      title="горизонтальная полоса"
    >
      <font-awesome-icon icon="grip-lines" />
    </button>
    <button
      class="rounded px-2 text-white hover:bg-zinc-700"
      @click="editor.chain().focus().setHardBreak().run()"
      title="следующий абзац"
    >
      <font-awesome-icon icon="turn-down" />
    </button>
    <button
      class="rounded px-2 text-white hover:bg-zinc-700"
      @click="editor.chain().focus().undo().run()"
      :disabled="!editor.can().chain().focus().undo().run()"
      title="назад"
    >
      <font-awesome-icon icon="rotate-left" />
    </button>
    <button
      class="rounded px-2 text-white hover:bg-zinc-700"
      @click="editor.chain().focus().redo().run()"
      :disabled="!editor.can().chain().focus().redo().run()"
      title="вперёд"
    >
      <font-awesome-icon icon="rotate-right" />
    </button>
  </div>
  <editor-content class="border-2 rounded w-full" :editor="editor" />
</template>

<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { ref } from "vue";

const editorData = ref("");

const props = defineProps({
  inputProp: {
    type: String,
    default: "",
  },
});
editorData.value = props.inputProp;

const emit = defineEmits(["update:modelValue"]);

function updateValue(value) {
  // console.log(value)
  emit("update:modelValue", value);
}

const editor = useEditor({
  editorProps: {
    attributes: {
      class:
        "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none w-full",
    },
  },
  onUpdate: () => {
    updateValue(editor.value.getHTML());
  },
  content: editorData.value,
  extensions: [StarterKit],
});
</script>

<style scoped>
.is-active {
  @apply bg-zinc-600;
}
.tiptap p {
  width: 100%;
}
</style>
