import EChartsReact from 'echarts-for-react'

const LineResult = ({
  data,
}: {
  data: {
    xAxis: string[]
    series: any[]
  }
}) => {
  return (
    <div className='h-[500px] w-full'>
      <EChartsReact
        option={{
          xAxis: {
            type: 'category',
            data: data?.xAxis,
          },
          yAxis: {
            type: 'value',
          },
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
