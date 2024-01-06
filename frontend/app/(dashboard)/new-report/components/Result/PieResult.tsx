'use client'

import { useGenerateQueryMutation } from '@/services/query'
import EChartsReact from 'echarts-for-react'

const PieResult = () => {
  const [, result] = useGenerateQueryMutation({
    fixedCacheKey: 'query-result',
  })
  const { data } = result

  return (
    <div className='h-[500px] w-full p-0'>
      <EChartsReact
        option={{
          tooltip: {
            trigger: 'item',
          },
          legend: {
            top: '5%',
            left: 'center',
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center',
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: 'bold',
                },
              },
              labelLine: {
                show: false,
              },
              data:
                data &&
                // @ts-ignore
                data.map((item) => ({
                  name: item[Object.keys(item)[1]],
                  value: item.count_1,
                })),
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

export default PieResult
