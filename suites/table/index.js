import Suites from 'vue-human/utils/Suites'
import table from './table'
import tableView from './tableView'
import tableColumn from './tableColumn'
import tableTool from './tableTool'
import tableFilter from './tableFilter'
import tableGroup from './tableGroup'

export default new Suites([
  table,
  tableView,
  tableColumn,
  tableTool,
  tableFilter,
  tableGroup
])
