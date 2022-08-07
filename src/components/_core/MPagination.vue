<template>
  <div>
    <nav class="relative z-0 inline-flex w-max-full" aria-label="Pagination">


      <a v-if="!(firstPageSelected() && hidePrevNext)" :class="[firstPageSelected() ? disabledClass : '']"
         @click="prevPage()" @keyup.enter="prevPage()" :tabindex="firstPageSelected() ? -1 : 0"
         class="relative rounded inline-flex items-center text-xs lg:text-base px-1 md:px-4 py-0 md:py-2 mx-0.5 xl:mx-2 border border-gray-300">
        <span class="sr-only">Previous</span>
        <svg width="8" height="14" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 2L2 8L8 14" stroke="#4D4D4D" stroke-width="2" stroke-linecap="square"/>
        </svg>
      </a>

      <template v-for="page in pages">

        <a :key="page.index" v-if="page.breakView" class="relative rounded inline-flex items-center text-xs lg:text-base px-1 md:px-4 py-0 md:py-2 mx-0.5 xl:mx-2" :class="[defaultClass]"
           tabindex="0">
          <slot name="breakViewContent">{{ breakViewText }}</slot>
        </a>

        <a :key="page.index" v-else-if="page.disabled" class="relative rounded inline-flex items-center text-xs lg:text-base px-1 md:px-4 py-0 md:py-2 mx-0.5 xl:mx-2" :class="[activeClass, disabledClass]"
           tabindex="0">{{ page.content }}</a>

        <a :key="page.index" v-else @click="handlePageSelected(page.index + 1)" @keyup.enter="handlePageSelected(page.index + 1)"
           class="relative rounded inline-flex items-center text-xs lg:text-base px-1 md:px-4 py-0 md:py-2 mx-0.5 xl:mx-2"
           :class="[page.selected ? activeClass : defaultClass]" tabindex="0">{{ page.content }}</a>

      </template>


      <a v-if="!(lastPageSelected() && hidePrevNext)" :class="[lastPageSelected() ? disabledClass : '']"
         @click="nextPage()" @keyup.enter="nextPage()" :tabindex="lastPageSelected() ? -1 : 0"
         class="relative rounded inline-flex items-center text-xs lg:text-base px-1 md:px-4 py-0 md:py-2 mx-0.5 xl:mx-2 border border-gray-300">
        <span class="sr-only">Next</span>
        <svg width="8" height="14" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 14L8 8L2 2" stroke="#4D4D4D" stroke-width="2" stroke-linecap="square"/>
        </svg>

      </a>


    </nav>
  </div>

</template>

<script>
export default {
  props: {
    value: {
      type: Number
    },
    pageCount: {
      type: Number,
      required: true
    },
    forcePage: {
      type: Number
    },
    clickHandler: {
      type: Function,
      default: () => {
      }
    },
    pageRange: {
      type: Number,
      default: 3
    },
    marginPages: {
      type: Number,
      default: 3
    },
    breakViewText: {
      type: String,
      default: '…'
    },
    defaultClass: {
      type: String,
      default: 'border border-gray-300 text-gray-500 hover:bg-gray-50 cursor-pointer'
    },
    activeClass: {
      type: String,
      default: 'bg-primary border border-primary text-second'
    },
    disabledClass: {
      type: String,
      default: 'cursor-not-allowed'
    },
    hidePrevNext: {
      type: Boolean,
      default: false
    }
  },
  beforeUpdate() {
    if (this.forcePage === undefined) return
    if (this.forcePage !== this.selected) {
      this.selected = this.forcePage
    }
  },
  computed: {
    selected: {
      get: function () {
        return this.value || this.innerValue
      },
      set: function (newValue) {
        this.innerValue = newValue
      }
    },
    pages: function () {
      let items = {}
      if (this.pageCount <= this.pageRange) {
        for (let index = 0; index < this.pageCount; index++) {
          let page = {
            index: index,
            content: index + 1,
            selected: index === (this.selected - 1)
          }
          items[index] = page
        }
      } else {
        const halfPageRange = Math.floor(this.pageRange / 2)
        let setPageItem = index => {
          let page = {
            index: index,
            content: index + 1,
            selected: index === (this.selected - 1)
          }
          items[index] = page
        }
        let setBreakView = index => {
          let breakView = {
            disabled: true,
            breakView: true
          }
          items[index] = breakView
        }
        // 1st - loop thru low end of margin pages
        for (let i = 0; i < this.marginPages; i++) {
          setPageItem(i);
        }
        // 2nd - loop thru selected range
        let selectedRangeLow = 0;
        if (this.selected - halfPageRange > 0) {
          selectedRangeLow = this.selected - 1 - halfPageRange;
        }
        let selectedRangeHigh = selectedRangeLow + this.pageRange - 1;
        if (selectedRangeHigh >= this.pageCount) {
          selectedRangeHigh = this.pageCount - 1;
          selectedRangeLow = selectedRangeHigh - this.pageRange + 1;
        }
        for (let i = selectedRangeLow; i <= selectedRangeHigh && i <= this.pageCount - 1; i++) {
          setPageItem(i);
        }
        // Check if there is breakView in the left of selected range
        if (selectedRangeLow > this.marginPages) {
          setBreakView(selectedRangeLow - 1)
        }
        // Check if there is breakView in the right of selected range
        if (selectedRangeHigh + 1 < this.pageCount - this.marginPages) {
          setBreakView(selectedRangeHigh + 1)
        }
        // 3rd - loop thru high end of margin pages
        for (let i = this.pageCount - 1; i >= this.pageCount - this.marginPages; i--) {
          setPageItem(i);
        }
      }
      return items
    }
  },
  data() {
    return {
      innerValue: 1,
    }
  },
  methods: {
    handlePageSelected(selected) {
      if (this.selected === selected) return
      this.innerValue = selected
      this.$emit('input', selected)
      this.clickHandler(selected)
    },
    prevPage() {
      if (this.selected <= 1) return
      this.handlePageSelected(this.selected - 1)
    },
    nextPage() {
      if (this.selected >= this.pageCount) return
      this.handlePageSelected(this.selected + 1)
    },
    firstPageSelected() {
      return this.selected === 1
    },
    lastPageSelected() {
      return (this.selected === this.pageCount) || (this.pageCount === 0)
    },
    selectFirstPage() {
      if (this.selected <= 1) return
      this.handlePageSelected(1)
    },
    selectLastPage() {
      if (this.selected >= this.pageCount) return
      this.handlePageSelected(this.pageCount)
    }
  }
}
</script>

