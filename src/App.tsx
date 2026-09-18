import { Formik } from 'formik'
import { PasswordStrength } from './components/PasswordStrength'
import { SegmentedControl } from './components/SegmentedControl'
import { DebugValues } from './components/DebugValues'



function App() {
  return (
    <Formik initialValues={{ plan: 'free', password: '' }} onSubmit={() => { }}>
      <>
        <SegmentedControl name="plan" options={['free', 'pro', 'enterprise'] as const} />
        <PasswordStrength name="password" />
        <DebugValues />
      </>
    </Formik>
  )
}

export default App
