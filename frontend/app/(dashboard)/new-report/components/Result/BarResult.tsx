import { useGenerateQueryMutation } from '@/services/query'
import EChartsReact from 'echarts-for-react'

const BarResult = () => {
  const [, result] = useGenerateQueryMutation({
    fixedCacheKey: 'query-result',
  })
  const { data } = result

  console.log('data', data)

  const xAxisData =
    data &&
    // @ts-ignore
    data?.map((row) => row[Object.keys(row).find((key) => !key.startsWith('count_'))])

  const yAxisData =
    data &&
    // @ts-ignore
    data.map((row) => row[Object.keys(row).find((key) => key.startsWith('count_'))])

  return (
    <div className='h-[500px] w-full p-0'>
      <EChartsReact
        option={{
          xAxis: {
            type: 'category',
            data: xAxisData,
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: yAxisData,
              type: 'bar',
            },
          ],
        }}
        style={{
          height: '500px',
        }}
      />
    </div>
  )
}

export default BarResult
