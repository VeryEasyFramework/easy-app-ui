<template>
  <div class="files-wrapper flex">
    <div
        ref="dropZoneEl"
        class="drop-zone flex-grow"
        @click="openFileDialog"
        @dragenter="draggingOver = true"
        @drop.prevent.stop="onDrop">
      <Transition name="pop">
        <div
            ref="dropCircle"
            v-if="draggingOver"
            class="drop-circle"></div>
      </Transition>
      <div class="img-label">
        <p>Drag & Drop your files or <span>Browse</span></p>
      </div>
      <div class="uploading-wrap">
        <div
            v-for="(item, index) in files"
            :class="{ uploading: item.uploading }"
            :key="index">
          <div class="load-file-bar">
            <p>{{ item.file.name }}</p>
            <div
                class="pie"
                :style="`--p:${item.progress}`"
                style="--b: 2px">
              <span>{{ `${item.progress}` }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <input
        class="file-input"
        type="file"
        @change="handleFileInput"
        ref="fileInputEl"
        :multiple="!singleFile"/>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const draggingOver = ref(false)
const dropCircle = ref<HTMLElement>()
const dropZoneEl = ref<HTMLElement>()
const fileInputEl = ref<HTMLInputElement>()
const circleTop = ref('0')
const circleLeft = ref('0')
const files = ref<
    {
      progress: string
      uploading: boolean
      uid: string
      file: File
    }[]
>([])
const props = withDefaults(
    defineProps<{
      entity?: string
      id?: string
      field?: string
      // folder?: string,
      private?: 1 | 0
      singleFile?: boolean
      beforeUpload?: () => Promise<any>
    }>(),
    {
      private: 0,
      entity: '',
      id: '',
      field: '',
      beforeUpload: async () => {
        return
      },
    }
)

/**
 * Drag and drop
 */
import {onMounted, onUnmounted} from 'vue'
import {generateId} from "@/utils/index.ts";

function onDrop(e) {
  hideCircle(e)
  preventDefaults(e)
  const filesToAdd = e.dataTransfer.files
  addFiles(filesToAdd)
}

function openFileDialog() {
  fileInputEl.value?.click()
}

function onDragOver(e) {
  if (!draggingOver.value) return
  // set the position of the circle to the cursor
  const parentEl = dropZoneEl.value?.getBoundingClientRect()
  const x = e.clientX - parentEl.left
  const y = e.clientY - parentEl.top
  circleLeft.value = `${x}px`
  circleTop.value = `${y}px`
  //if the cursor is outside the dropzone, hide the circle
  if (x < 0 || x > parentEl.width || y < 0 || y > parentEl.height) {
    draggingOver.value = false
  }
}

function handleFileInput(e) {
  const filesToAdd = e.target.files
  addFiles(filesToAdd)
}

function preventDefaults(e) {
  e.preventDefault()
}

function hideCircle(e) {
  draggingOver.value = false
}

const events = ['dragenter', 'dragover', 'dragleave', 'drop']

onMounted(() => {
  events.forEach((event) => {
    document.addEventListener(event, preventDefaults)
  })
  document.addEventListener('dragover', onDragOver)
})

onUnmounted(() => {
  document.removeEventListener('dragover', onDragOver)
  events.forEach((event) => {
    document.removeEventListener(event, preventDefaults)
  })
})

/**
 * managing files
 */

function addFiles(addedFiles: FileList) {
  if (props.singleFile && files.value.length > 1) return
  for (let i = 0; i < addedFiles.length; i++) {
    files.value.push({
      file: addedFiles[i],
      uid: generateId(),
      progress: '',
      uploading: false,
    })
  }
  uploadFiles()
}

/**
 *
 *
 */
const emit = defineEmits(['complete', 'done'])

/**
 *
 * server stuff
 */

function uploadFiles() {
  files.value.forEach((item) => {
    item.uploading = true
    // bagelApp.uploadFile({
    //     filename: item.file.name,
    //     file: item.file,
    //     entity: props.entity,
    //     id: props.id,
    //     uid: item.uid,
    //     field: props.field,
    //     is_private: props.private ? '1' : '0',
    //     progressCallback: updateProgress,
    //     completeCallback: uploadCompleteCallback,
    //     errorCallback: () => {
    //         console.log('error')
    //     },
    // })
  })
}

function updateProgress(e: ProgressEvent, uid: string) {
  files.value.find((item) => item.uid == uid).progress = ((e.loaded / e.total) * 100).toFixed(0)
}

function uploadCompleteCallback(file: FileEntity, uid: string) {
  files.value.forEach((item, index) => {
    if (item.uid === uid) {
      files.value.splice(index, 1)
    }
  })
  emit('complete', file)
  if (files.value.length == 0) {
    fileInputEl.value.value = ''
    emit('done')
  }
}
</script>
<style>
.uploading-wrap {
  width: 100%;
}

.uploading {
  margin: 0.5rem;
}

.img-label .icon-font {
  font-size: 30px;
  margin-bottom: 10px;
}

.img-label span {
  text-decoration: underline;
}

.file-input {
  display: none;
}

.files-wrapper {
  flex-direction: column;
  border-radius: 10px;
  /*overflow: hidden;*/
  min-height: 100px;
  font-size: var(--input-font-size);
}

.drop-zone {
  background-color: var(--bgl-bg);
  height: 100%;
  width: 100%;
  flex-grow: 1;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: var(--bgl-transition);
  outline: dashed 1px var(--bgl-black-tint);
  border-radius: 10px;
  padding: 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--input-color);
}

.drop-zone:hover {
  color: var(--bgl-blue);
  outline: dashed 1px var(--bgl-blue-tint);
}

.drop-circle {
  pointer-events: none;
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: var(--bgl-blue-tint);
  display: flex;
  top: v-bind(circleTop);
  left: v-bind(circleLeft);
  transform: translate(-50%, -50%) scale(1);
  transform-origin: left top;
}

/* .drop-circle.active {
    color: red;
    background-color: black;
    transform: translate(-50%, -50%) scale(1);
    transition: transform 0.2s ease-in-out;
} */
.load-file-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bgl-white);
  border-radius: var(--btn-border-radius);
  width: 100%;
  color: var(--input-color);
  height: var(--btn-height);
  padding: 0.5rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
  white-space: nowrap;
}

.load-file-bar p {
  width: calc(100% - 40px);
  overflow: hidden;
  text-overflow: ellipsis;
}

.load-file-bar span {
  font-size: 10px;
}

.pie {
  width: 30px;
  height: 30px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pie:before {
  content: '';
  position: absolute;
  border-radius: 50%;
  inset: 0;
  background: conic-gradient(var(--bgl-blue) calc(var(--p) * 1%), #0000 0);
  -webkit-mask: radial-gradient(
      farthest-side,
      #0000 calc(99% - var(--b)),
      #000 calc(100% - var(--b))
  );
  mask: radial-gradient(farthest-side, #0000 calc(99% - var(--b)), #000 calc(100% - var(--b)));
}
</style>
<style>
.pop-enter-active {
  transition: scale 0.2s cubic-bezier(0.55, 0, 0.1, 1);
}

.pop-leave-active {
  transition: scale 0.2s cubic-bezier(0.55, 0, 0.1, 1);
}

.pop-enter-from,
.pop-leave-to {
  scale: 0;
}
</style>
