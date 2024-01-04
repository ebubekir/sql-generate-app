import { CopyBlock } from 'react-code-blocks'

const SQLReport = ({ result }: { result: any }) => {
  return (
    <div>
      <CopyBlock language={'SQL'} text={result || ''} />
    </div>
  )
}

export default SQLReport
