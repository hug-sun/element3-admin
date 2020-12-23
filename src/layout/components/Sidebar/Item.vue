<script>
export default {
  name: 'MenuItem',
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render() {
    const { icon, title } = this
    const vnodes = []

    if (icon) {
      if (icon.includes('el-icon')) {
        if (icon === 'el-icon-s-help') {
          vnodes.push(<i class={[icon, 'sub-el-icon']} style={'width:18px'} />)
        } else {
          vnodes.push(<i class={[icon, 'sub-el-icon']} />)
        }
      } else {
        vnodes.push(<svg-icon icon-class={icon} />)
      }
    }

    if (title) {
      vnodes.push(<span slot='title'>{title}</span>)
    }
    return vnodes
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
