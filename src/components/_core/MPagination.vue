<template>
  <div>
    <nav class="relative z-0 inline-flex w-max-full" aria-label="Pagination">
      <a
        v-if="!(firstPageSelected() && hidePrevNext)"
        :class="[firstPageSelected() ? disabledClass : '']"
        @click="prevPage()"
        @keyup.enter="prevPage()"
        :tabindex="firstPageSelected() ? -1 : 0"
        class="relative rounded inline-flex items-center text-xs lg:text-base px-1 md:px-4 py-0 md:py-2 mx-0.5 xl:mx-2 border border-gray-300"
      >
        <span class="sr-only">Previous</span>
        <svg
          width="8"
          height="14"
          viewBox="0 0 10 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 2L2 8L8 14"
            stroke="#4D4D4D"
            stroke-width="2"
            stroke-linecap="square"
          />
        </svg>
      </a>

      <template v-for="page in pages">
        <a
          :key="page.index"
          v-if="page.breakView"
          class="relative rounded inline-flex items-center text-xs lg:text-base px-1 md:px-4 py-0 md:py-2 mx-0.5 xl:mx-2"
          :class="[defaultClass]"
          tabindex="0"
        >
          <slot name="breakViewContent">{{ breakViewText }}</slot>
        </a>

        <a
          :key="page.index"
          v-else-if="page.disabled"
          class="relative rounded inline-flex items-center text-xs lg:text-base px-1 md:px-4 py-0 md:py-2 mx-0.5 xl:mx-2"
          :class="[activeClass, disabledClass]"
          tabindex="0"
          >{{ page.content }}</a
        >

        <a
          :key="page.index"
          v-else
          @click="handlePageSelected(page.index + 1)"
          @keyup.enter="handlePageSelected(page.index + 1)"
          class="relative rounded inline-flex items-center text-xs lg:text-base px-1 md:px-4 py-0 md:py-2 mx-0.5 xl:mx-2"
          :class="[page.selected ? activeClass : defaultClass]"
          tabindex="0"
          >{{ page.content }}</a
        >
      </template>

      <a
        v-if="!(lastPageSelected() && hidePrevNext)"
        :class="[lastPageSelected() ? disabledClass : '']"
        @click="nextPage()"
        @keyup.enter="nextPage()"
        :tabindex="lastPageSelected() ? -1 : 0"
        class="relative rounded inline-flex items-center text-xs lg:text-base px-1 md:px-4 py-0 md:py-2 mx-0.5 xl:mx-2 border border-gray-300"
      >
        <span class="sr-only">Next</span>
        <svg
          width="8"
          height="14"
          viewBox="0 0 10 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 14L8 8L2 2"
            stroke="#4D4D4D"
            stroke-width="2"
            stroke-linecap="square"
          />
        </svg>
      </a>
    </nav>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    value: {
      type: Number,
    },
    pageCount: {
      type: Number,
      required: true,
    },
    forcePage: {
      type: Number,
    },
    clickHandler: {
      type: Function,
      default: () => {},
    },
    pageRange: {
      type: Number,
      default: 3,
    },
    marginPages: {
      type: Number,
      default: 3,
    },
    breakViewText: {
      type: String,
      default: "…",
    },
    defaultClass: {
      type: String,
      default:
        "border border-gray-300 text-gray-500 hover:bg-gray-50 cursor-pointer",
    },
    activeClass: {
      type: String,
      default: "bg-primary border border-primary text-second",
    },
    disabledClass: {
      type: String,
      default: "cursor-not-allowed",
    },
    hidePrevNext: {
      type: Boolean,
      default: false,
    },
  },
  beforeUpdate() {
    // @ts-ignore
    if (this.forcePage === undefined) return;
    // @ts-ignore
    if (this.forcePage !== this.selected) {
      // @ts-ignore
      this.selected = this.forcePage;
    }
  },
  computed: {
    selected: {
      // @ts-ignore
      get: function () {
        // @ts-ignore
        return this.value || this.innerValue;
      },
      // @ts-ignore
      set: function (newValue) {
        // @ts-ignore
        this.innerValue = newValue;
      },
    },
    pages: function () {
      const items = {};
      // @ts-ignore
      if (this.pageCount <= this.pageRange) {
        // @ts-ignore
        for (let index = 0; index < this.pageCount; index++) {
          const page = {
            index: index,
            content: index + 1,
            // @ts-ignore
            selected: index === this.selected - 1,
          };
          // @ts-ignore
          items[index] = page;
        }
      } else {
        // @ts-ignore
        // @ts-ignore
        const halfPageRange = Math.floor(this.pageRange / 2);
        // @ts-ignore
        // @ts-ignore
        const setPageItem = (index) => {
          const page = {
            index: index,
            content: index + 1,
            // @ts-ignore
            // @ts-ignore
            selected: index === this.selected - 1,
          };
          // @ts-ignore
          // @ts-ignore
          items[index] = page;
        };
        // @ts-ignore
        // @ts-ignore
        const setBreakView = (index) => {
          const breakView = {
            disabled: true,
            breakView: true,
          };
          // @ts-ignore
          // @ts-ignore
          items[index] = breakView;
        };
        // 1st - loop thru low end of margin pages
        // @ts-ignore
        // @ts-ignore
        for (let i = 0; i < this.marginPages; i++) {
          setPageItem(i);
        }
        // 2nd - loop thru selected range
        let selectedRangeLow = 0;
        // @ts-ignore
        // @ts-ignore
        if (this.selected - halfPageRange > 0) {
          // @ts-ignore
          // @ts-ignore
          selectedRangeLow = this.selected - 1 - halfPageRange;
        }
        // @ts-ignore
        // @ts-ignore
        let selectedRangeHigh = selectedRangeLow + this.pageRange - 1;
        // @ts-ignore
        // @ts-ignore
        if (selectedRangeHigh >= this.pageCount) {
          // @ts-ignore
          // @ts-ignore
          selectedRangeHigh = this.pageCount - 1;
          // @ts-ignore
          // @ts-ignore
          selectedRangeLow = selectedRangeHigh - this.pageRange + 1;
        }
        for (
          let i = selectedRangeLow;
          // @ts-ignore
          // @ts-ignore
          i <= selectedRangeHigh && i <= this.pageCount - 1;
          i++
        ) {
          setPageItem(i);
        }
        // Check if there is breakView in the left of selected range
        // @ts-ignore
        // @ts-ignore
        if (selectedRangeLow > this.marginPages) {
          setBreakView(selectedRangeLow - 1);
        }
        // Check if there is breakView in the right of selected range
        // @ts-ignore
        // @ts-ignore
        if (selectedRangeHigh + 1 < this.pageCount - this.marginPages) {
          setBreakView(selectedRangeHigh + 1);
        }
        // 3rd - loop thru high end of margin pages
        for (
            // @ts-ignore
          let i = this.pageCount - 1;
          // @ts-ignore
          i >= this.pageCount - this.marginPages;
          i--
        ) {
          setPageItem(i);
        }
      }
      return items;
    },
  },
  data() {
    return {
      innerValue: 1,
    };
  },
  methods: {
    // @ts-ignore
    handlePageSelected(selected) {
      // @ts-ignore
      if (this.selected === selected) return;
      // @ts-ignore
      this.innerValue = selected;
      // @ts-ignore
      this.$emit("input", selected);
      // @ts-ignore
      this.clickHandler(selected);
    },
    prevPage() {
      // @ts-ignore
      if (this.selected <= 1) return;
      // @ts-ignore
      this.handlePageSelected(this.selected - 1);
    },
    nextPage() {
      // @ts-ignore
      if (this.selected >= this.pageCount) return;
      // @ts-ignore
      this.handlePageSelected(this.selected + 1);
    },
    // @ts-ignore
    firstPageSelected() {
      // @ts-ignore
      return this.selected === 1;
    },
    // @ts-ignore
    lastPageSelected() {
      // @ts-ignore
      return this.selected === this.pageCount || this.pageCount === 0;
    },
    selectFirstPage() {
      // @ts-ignore
      if (this.selected <= 1) return;
      this.handlePageSelected(1);
    },
    selectLastPage() {
      // @ts-ignore
      if (this.selected >= this.pageCount) return;
      // @ts-ignore
      this.handlePageSelected(this.pageCount);
    },
  },
};
</script>
