import { Formik } from 'formik'
import { SegmentedControl } from './components/SegmentedControl'
import { StarRating } from './components/StarRating'
import { DebugValues } from './components/DebugValues'



function App() {
  return (
    <Formik initialValues={{ plan: 'Free', rating: '0' }} onSubmit={() => { }}>
      <>
        <SegmentedControl name="plan" options={['Free', 'Pro', 'Enterprise'] as const} />
        <StarRating name="rating" />
        <DebugValues />
      </>
    </Formik>
  )
}

export default App
