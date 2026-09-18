import { Formik, useFormikContext } from 'formik'
import { SegmentedControl } from './components/SegmentedControl'

function DebugPlan() {
  const { values } = useFormikContext<{ plan: string }>()

  return <pre>Seleccionado: {values.plan}</pre>
}

function App() {
  return (
    <Formik initialValues={{ plan: 'free' }} onSubmit={() => { }}>
      <>
        <SegmentedControl name="plan" options={['free', 'pro', 'enterprise'] as const} />
        <DebugPlan />
      </>
    </Formik>
  )
}

export default App
