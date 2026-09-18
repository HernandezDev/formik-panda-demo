import { Formik } from 'formik'
import { SegmentedControl } from './components/SegmentedControl'
import { DebugValues } from './components/DebugValues'



function App() {
  return (
    <Formik initialValues={{ plan: 'free' }} onSubmit={() => { }}>
      <>
        <SegmentedControl name="plan" options={['free', 'pro', 'enterprise'] as const} />
        <DebugValues />
      </>
    </Formik>
  )
}

export default App
