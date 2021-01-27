import Vue from 'vue'
import Clipboard from 'clipboard'
// import { useMessage } from 'element3'

// const Message = useMessage()
function clipboardSuccess() {
  this.$message({
    message: 'Copy successfully',
    type: 'success',
    duration: 1500,
  })
}

function clipboardError() {
  Message({
    message: 'Copy failed',
    type: 'error',
  })
}

export default function handleClipboard(text, event) {
  const clipboard = new Clipboard(event.target, {
    text: () => text,
  })
  clipboard.on('success', () => {
    clipboardSuccess()
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError()
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
