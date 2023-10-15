import { DataSourceType } from '@/types/data_source'
import Image from 'next/image'

const IMAGE_MAPPING = {
  MYSQL: '/mysql.png',
  POSTGRESQL: '/postgresql.png',
}

const DataSourceImage = ({ dataSource }: { dataSource: DataSourceType }) => (
  <div className="tooltip tooltip-bottom" data-tip={dataSource}>
    <Image src={IMAGE_MAPPING[dataSource]} alt={dataSource} width={25} height={25}/>
  </div>
)

export default DataSourceImage
