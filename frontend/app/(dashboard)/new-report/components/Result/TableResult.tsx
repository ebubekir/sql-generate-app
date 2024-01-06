import { useGenerateQueryMutation } from '@/services/query'

const TableResult = () => {
  const [, result] = useGenerateQueryMutation({
    fixedCacheKey: 'query-result',
  })
  const { data } = result

  const headers = data && Object.keys(data[0]).map((i) => i.slice(i.indexOf('.') + 1))

  return (
    <div className='w-full overflow-x-auto bg-white'>
      <table className='table '>
        <thead>
          <tr>
            {headers && headers.map((header, index) => <th key={index}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {data &&
            // @ts-ignore
            data.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? 'hover' : ''}>
                {Object.values(row).map((i, k) => (
                  // @ts-ignore
                  <td key={k}>{i}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableResult
