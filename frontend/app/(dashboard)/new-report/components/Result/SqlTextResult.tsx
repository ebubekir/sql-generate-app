import { useGenerateQueryMutation } from '@/services/query'
import { CopyBlock } from 'react-code-blocks'

const SqlTextResult = () => {
  const [, result] = useGenerateQueryMutation({
    fixedCacheKey: 'query-result',
  })

  return (
    <div>
      <CopyBlock language={'SQL'} text={result.data || ''} />
    </div>
  )
}

export default SqlTextResult
