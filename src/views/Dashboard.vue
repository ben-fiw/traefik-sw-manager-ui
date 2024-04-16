<template>
  <div>
    <CTable striped>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">Service</CTableHeaderCell>
          <CTableHeaderCell scope="col">Status</CTableHeaderCell>
          <CTableHeaderCell scope="col">Details</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <colgroup>
          <col style="width: 10%" />
          <col style="width: 20%" />
          <col style="width: 60%" />
        </colgroup>
        <CTableRow v-for="(status, service) in systemStatus" :key="service">
          <CTableDataCell>{{ service }}</CTableDataCell>
          <CTableDataCell>
            <CBadge shape="rounded-pill" :color="status.color">{{ status.status }}</CBadge>
          </CTableDataCell>
          <CTableDataCell>{{ status.text }}</CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
    <hr />
    <CRow>
      <CCol sm="4" v-for="(status, instance) in instances" :key="instance">
        <CCard class="mb-3">
          <CCardBody>
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="card-title">{{ status.name }}</h5>
              <CBadge shape="rounded-pill" :color="status.color">{{ status.status }}</CBadge>
            </div>
            <hr />
            <p class="card-text">Version: {{ status.version }}</p>
            <p class="card-text">
              ID: <span class="text-code">{{ status.id }}</span>
            </p>
          </CCardBody>
          <CCardFooter>
            <router-link :to="{ name: 'instance.show', params: { id: status.id } }">
              <CButton color="primary">Open</CButton>
            </router-link>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import {
  CBadge,
  CCard,
  CCardFooter,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/vue'

import { RouterLink } from 'vue-router'

export default {
  name: 'Dashboard',
  components: {
    CBadge,
    CCard,
    CCardFooter,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    RouterLink,
  },
  data() {
    return {
      systemStatus: {},
      instances: [],
    }
  },
  created() {
    this.updateSystemStatus()
    this.updateInstances()

    setInterval(() => {
      this.updateSystemStatus()
      this.updateInstances()
    }, 5000)
  },
  methods: {
    updateSystemStatus() {
      // TODO: replace with api call
      let agentStatus = Math.random() < 0.95 ? 'running' : 'stopped'
      let dockerStatus = Math.random() < 0.8 ? 'running' : 'stopped'
      let traefikStatus = Math.random() < 0.8 ? 'running' : 'stopped'

      console.log('Agent:', agentStatus)
      console.log('Docker:', dockerStatus)
      console.log('Traefik:', traefikStatus)

      this.systemStatus = {
        agent: {
          status: agentStatus,
          color: agentStatus === 'running' ? 'success' : 'danger',
          text: `Agent is ${agentStatus}`,
        },
        docker: {
          status: dockerStatus,
          color: dockerStatus === 'running' ? 'success' : 'danger',
          text: `Docker is ${dockerStatus}`,
        },
        traefik: {
          status: traefikStatus,
          color: traefikStatus === 'running' ? 'success' : 'danger',
          text: `Traefik is ${traefikStatus}`,
        },
      }

      // if agent is not running, docker and traefik states are unknown
      if (agentStatus !== 'running') {
        this.systemStatus.docker = {
          status: 'unknown',
          color: 'warning',
          text: 'Docker status is unknown',
        }
        this.systemStatus.traefik = {
          status: 'unknown',
          color: 'warning',
          text: 'Traefik status is unknown',
        }
      }
    },
    updateInstances() {
      this.instances = [
        {
          name: 'Shopware Play 6.5.0.1',
          version: '6.5.0.1',
          status: 'running',
          color: 'success',
          id: '852a75a9-7a27-49ed-b68c-aa369cb49a47',
        },
      ]
    },
  },
}
</script>

<style scoped>
.table tbody tr td {
  vertical-align: middle;
}
</style>
