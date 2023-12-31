import CollapseArea from '@/app/(dashboard)/new-report/components/CollapseArea'
import { useReportReducer } from '@/app/(dashboard)/new-report/reducer'
import { useGetColumnListFromMultipleTablesQuery } from '@/services/data_source'
import { useState } from 'react'
import Loading from '@/app/(dashboard)/components/Loading'
import { useDispatch } from 'react-redux'

const ColumnSelection = () => {
  const { tableList } = useReportReducer()
  const dispatch = useDispatch()

  const { data, isLoading } = useGetColumnListFromMultipleTablesQuery(tableList, {
    skip: tableList.length === 0,
  })
  const [checkList, setCheckList] = useState<{ [name: string]: boolean }>()

  return (
    <CollapseArea title={'2. Select Columns'}>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='flex flex-col space-y-4'>
          {data &&
            Object.keys(data).map((tableName, index) => (
              <div key={index}>
                <div className='divider-primary divider'>{tableName}</div>
                <div className='flex flex-col space-y-2'>
                  {data[tableName]?.map((item, key) => (
                    <label
                      key={key}
                      className=' flex cursor-pointer items-center space-x-4'
                    >
                      <input
                        type='checkbox'
                        name={`${tableName}.${item.name}`}
                        className='checkbox-primary checkbox'
                        onChange={(e) => {
                          const tmpCheckList = { ...checkList }
                          tmpCheckList[`${tableName}.${item.name}`] = e.target.checked
                          setCheckList(tmpCheckList)
                          dispatch({
                            type: 'dispatchColumnList',
                            payload: {
                              columns: Object.keys(tmpCheckList).filter(
                                (col) => tmpCheckList[col]
                              ),
                            },
                          })
                        }}
                      />
                      <div className='flex space-x-2'>
                        <span>{item.name}</span>
                        <span className={'text-gray-300'}>{item.type}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </CollapseArea>
  )
}

export default ColumnSelection
