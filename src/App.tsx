import { Formik } from 'formik'
import { SegmentedControl } from './components/SegmentedControl'
import { DebugValues } from './components/DebugValues'



function App() {
  return (
    <Formik initialValues={{ plan: 'Free' }} onSubmit={() => { }}>
      <>
        <SegmentedControl name="plan" options={['Free', 'Pro', 'Enterprise'] as const} />
        <DebugValues />
      </>
    </Formik>
  )
}

export default App
