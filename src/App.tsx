import { Formik } from 'formik'
import { SegmentedControl } from './components/SegmentedControl'
import './App.css'

function App() {
  return (
    <Formik initialValues={{ plan: 'free' }} onSubmit={() => {}}>
      <SegmentedControl name="plan" />
    </Formik>
  )
}

export default App
