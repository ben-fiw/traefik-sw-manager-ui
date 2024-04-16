<template>
  <div>
    <CTable>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Name</CTableHeaderCell>
          <CTableHeaderCell>URL</CTableHeaderCell>
          <CTableHeaderCell>Version</CTableHeaderCell>
          <CTableHeaderCell>Status</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow v-for="conainer in data" :key="conainer.id">
          <CTableDataCell>
            <router-link :to="{ name: 'instance.show', params: { id: conainer.id } }">
              {{ conainer.name }}
            </router-link>
          </CTableDataCell>
          <CTableDataCell>{{ conainer.url }}</CTableDataCell>
          <CTableDataCell>{{ conainer.version }}</CTableDataCell>
          <CTableDataCell>
            <CBadge
              shape="rounded-pill"
              :color="conainer.status === 'running' ? 'success' : 'danger'"
            >
              {{ conainer.status }}
            </CBadge>
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
  </div>
</template>

<script>
import {
  CBadge,
  CTable,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/vue'

export default {
  name: 'InstanceIndexView',
  components: {
    CBadge,
    CTable,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
  },
  data() {
    return {
      data: [],
    }
  },
  created() {
    this.data = this.updateData()
  },
  methods: {
    updateData() {
      return [
        {
          name: '6.6 Demo Shop',
          url: 'demo-shop.localhost/6.6.0',
          version: '6.6.0.2',
          status: 'running',
          id: 'fae3b1b0-7b3b-4b3b-8b3b-3b3b3b3b3b3b',
        },
        {
          name: 'Schwälbchen Demo',
          url: 'schwaelbchen.localhost',
          version: '6.6.1.1',
          status: 'stopped',
          id: 'fae3b1b0-7b3b-4b3b-8b3b-acacacacacac',
        },
      ]
    },
  },
}
</script>
