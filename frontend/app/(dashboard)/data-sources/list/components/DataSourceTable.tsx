import TableHead from '@/app/(dashboard)/data-sources/list/components/TableHead'
import { DataSource } from '@/types/data_source'
import DataSourceImage from '@/app/(dashboard)/data-sources/list/components/DataSourceImage'

const DataSourceTable = ({
  data,
  onSetAsDefaultClick,
}: {
  data: DataSource[]
  onSetAsDefaultClick: (id: number) => void
}) => {
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
              <td className='flex flex-row space-x-2'>
                <span>{item.name}</span>
                {item.is_default && (
                  <div className='badge badge-accent text-white'>default</div>
                )}
                {!item.is_default && (
                  <button
                    onClick={() => onSetAsDefaultClick(item.id)}
                    className='badge-default badge'
                  >
                    set as default
                  </button>
                )}
              </td>
              <td>{item?.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataSourceTable
