import TableHead from '@/app/(dashboard)/data-sources/list/components/TableHead'
import { DataSource } from '@/types/data_source'
import DataSourceImage from '@/app/(dashboard)/data-sources/list/components/DataSourceImage'

const DataSourceTable = ({ data }: { data: DataSource[] }) => {
  return (
    <div className=''>
      <table className='table table-zebra'>
        <TableHead />
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx} className='hover'>
              <th>
                <DataSourceImage dataSource={item.type} />
              </th>
              <td>{item?.name}</td>
              <td>{item?.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataSourceTable
