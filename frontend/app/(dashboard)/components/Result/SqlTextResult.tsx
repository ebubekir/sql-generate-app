import { CopyBlock } from 'react-code-blocks'

const SqlTextResult = ({ data }: { data: string }) => {
  return (
    <div>
      <CopyBlock language={'SQL'} text={data || ''} />
    </div>
  )
}

export default SqlTextResult
