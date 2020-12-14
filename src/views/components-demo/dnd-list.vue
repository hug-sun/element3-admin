<template>
  <div class="components-container">
    <aside>
      drag-list base on
      <a
        href="https://github.com/SortableJS/vue.draggable.next"
        target="_blank"
      >Vue.Draggable</a>
    </aside>
    <div class="editor-container">
      <dnd-list list1-title="List" list2-title="Article pool" />
    </div>
  </div>
</template>

<script>
import DndList from '@/components/DndList'
import { fetchList } from '@/api/article'

export default {
  name: 'DndListDemo',
  components: { DndList },
}
</script>
