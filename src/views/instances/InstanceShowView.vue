<template>
  <div>
    <span v-if="!instance" class="d-flex flex-column align-items-center">
      <CSpinner class="text-center" />
    </span>
    <CCard v-if="!!instance">
      <CCardHeader class="d-flex align-items-center justify-content-between">
        <span class="d-flex align-items-center">
          <h4 class="card-title d-inline-block me-3 mb-0">Instance</h4>
          <CBadge
            shape="rounded-pill"
            :color="instance.status === 'running' ? 'success' : 'danger'"
          >
            {{ instance.status }}
          </CBadge>
        </span>
        <span class="d-flex align-items-center">
          <CButton
            color="success"
            class="btn-sm mx-1"
            @click="startInstance"
            :disabled="instance.status === 'running'"
            title="Start"
          >
            <CIcon class="text-white" :icon="cilMediaPlay" />
          </CButton>
          <CButton
            color="danger"
            class="btn-sm mx-1"
            @click="stopInstance"
            :disabled="instance.status !== 'running'"
            title="Stop"
          >
            <CIcon class="text-white" :icon="cilMediaStop" />
          </CButton>
          <CButton
            color="warning"
            class="btn-sm mx-1"
            @click="restartInstance"
            :disabled="instance.status !== 'running'"
            title="Reload"
          >
            <CIcon class="text-white" :icon="cilReload" />
          </CButton>
        </span>
      </CCardHeader>
      <CCardBody>
        <div>
          <h5 class="card-title">{{ instance.name }}</h5>
        </div>
        <hr />
        <p v-if="!editMode" class="card-text">URL: {{ instance.url }}</p>
        <form v-if="editMode">
          <div class="input-group mb-3">
            <span class="input-group-text" id="label-domain">URL</span>
            <input
              type="text"
              class="form-control"
              placeholder="example.localhost"
              aria-label="Domain"
              aria-describedby="label-domain"
              v-model="instance.domain"
            />
            <span class="input-group-text" id="label-path">/</span>
            <input
              type="text"
              class="form-control"
              placeholder="Path"
              aria-label="Path"
              aria-describedby="label-path"
              v-model="instance.path"
            />
          </div>
        </form>
        <p class="card-text">Version: {{ instance.version }}</p>
        <p class="card-text">
          ID: <span class="text-code">{{ instance.id }}</span>
        </p>
        <hr />
        <router-link v-if="!editMode" :to="{ name: 'instance.edit', params: { id: instance.id } }">
          <CButton color="primary" class="me-2">Edit</CButton>
        </router-link>
        <router-link
          :to="{
            name: editMode ? 'instance.show' : 'instance.index',
            params: editMode ? { id: instance.id } : {},
          }"
        >
          <CButton color="secondary" class="me-2">Back</CButton>
        </router-link>
        <CButton v-if="!editMode" color="danger" class="me-2 text-white" onclick="deleteInstance"
          >Delete</CButton
        >
        <CButton v-if="editMode" color="primary" class="me-2 text-white" onclick="saveInstance"
          >Save</CButton
        >
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import { cilMediaPlay, cilMediaStop, cilReload } from '@coreui/icons'
import CIcon from '@coreui/icons-vue'
import { CBadge, CButton, CCard, CSpinner } from '@coreui/vue'

export default {
  name: 'Instance',
  components: {
    CBadge,
    CCard,
    CSpinner,
  },
  data() {
    return {
      instance: null,
    }
  },
  setup() {
    return {
      cilReload,
      cilMediaStop,
      cilMediaPlay,
    }
  },
  created() {
    this.updateInstance().then((instance) => {
      this.instance = instance
    })
  },
  computed: {
    editMode() {
      return this.$route.name === 'instance.edit'
    },
  },
  methods: {
    async updateInstance() {
      return {
        name: '6.6 Demo Shop',
        url: 'demo-shop.localhost/6.6.0',
        domain: 'demo-shop.localhost',
        path: '/6.6.0',
        version: '6.6.0.2',
        status: 'running',
        id: 'fae3b1b0-7b3b-4b3b-8b3b-3b3b3b3b3b3b',
      }
    },
  },
}
</script>
