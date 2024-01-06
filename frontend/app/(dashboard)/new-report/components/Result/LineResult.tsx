import { useGenerateQueryMutation } from '@/services/query'
import EChartsReact from 'echarts-for-react'

const LineResult = () => {
  const [, result] = useGenerateQueryMutation({
    fixedCacheKey: 'query-result',
  })

  const { data } = result

  return (
    <div className='h-[500px] w-full'>
      <EChartsReact
        option={{
          xAxis: {
            type: 'category',
            // @ts-ignore
            data: data?.xAxis,
          },
          yAxis: {
            type: 'value',
          },
          // @ts-ignore
          series: data?.series,
        }}
        style={{
          height: '500px',
        }}
      />
    </div>
  )
}

export default LineResult;
