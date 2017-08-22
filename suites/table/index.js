import Suites from 'vue-human/utils/Suites'
import table from './table'
import tableView from './tableView'
import tableColumn from './tableColumn'
import tablePaginate from './tablePaginate'
import tableTool from './tableTool'
import tableFilter from './tableFilter'
import tableGroup from './tableGroup'
import tableLimit from './tableLimit'

export default new Suites([
  table,
  tableView,
  tableColumn,
  tablePaginate,
  tableTool,
  tableFilter,
  tableGroup,
  tableLimit
])
