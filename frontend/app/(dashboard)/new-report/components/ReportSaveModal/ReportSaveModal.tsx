import Modal from '@/app/components/Modal'
import {
  getCorrectJoinsList,
  useConditionReducer,
  useReportReducer,
} from '@/app/(dashboard)/new-report/reducer'
import { useDispatch } from 'react-redux'
import TextInput from '@/app/components/FormInputs/TextInput'
import React, { useState } from 'react'
import { generateQueryRequest } from '@/services/query'
import { getCorrectConditions } from '@/app/(dashboard)/new-report/components/Condition/reducer'
import { SaveReport } from '@/types/report'
import { useAddReportMutation } from '@/services/report'

const ReportSaveModal = () => {
  const { saveModal, tableName, columnList, joinsList, reportType, reportTypeConfig } =
    useReportReducer()
  const conditionReducer = useConditionReducer()
  const dispatch = useDispatch()
  const [inputs, setInputs] = useState<{
    name: string
    description?: string | null
  }>({
    name: '',
    description: null,
  })
  const [addReport, result] = useAddReportMutation()

  const onSaveBtnClick = () => {
    if (tableName) {
      const requestConfig = generateQueryRequest({
        tableName: tableName,
        conditions: getCorrectConditions(conditionReducer),
        columnList: columnList,
        joinsList: getCorrectJoinsList(joinsList),
        reportType: reportType,
        reportConfig: reportTypeConfig,
      })

      const report: SaveReport = {
        name: inputs.name,
        description: inputs.description,
        request_schema: requestConfig,
        report_type: reportType,
      }
      addReport(report)
    }
  }

  return (
    <Modal
      isOpen={saveModal}
      setIsOpen={() => {
        dispatch({ type: 'toggleSaveModal' })
      }}
      title={'Save Report'}
      actionButtons={false}
    >
      <div className='flex w-full flex-col space-y-4'>
        <div className='flex w-full flex-col space-y-4'>
          <TextInput
            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
            label='Report Name'
            placeholder={'Type your report name...'}
          />
          <TextInput
            onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
            label='Description (optional)'
            placeholder={'Type your report description...'}
          />
        </div>
        <div className='flex space-x-2'>
          <button
            onClick={onSaveBtnClick}
            disabled={result.isLoading}
            className='btn btn-success btn-outline'
          >
            {result.isLoading ? (
              <span className='loading loading-spinner loading-sm'></span>
            ) : (
              'SAVE'
            )}
          </button>
          <button
            onClick={() => dispatch({ type: 'toggleSaveModal' })}
            className='btn btn-error btn-outline'
          >
            CANCEL
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ReportSaveModal
