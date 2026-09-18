import { Formik } from 'formik'
import { SegmentedControl } from './components/SegmentedControl'

function App() {
  return (
    <Formik initialValues={{ plan: 'free' }} onSubmit={() => { }}>
      <SegmentedControl name="plan" />
    </Formik>
  )
}

export default App
