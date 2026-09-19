import { Formik } from 'formik'
import { FilterChips } from './components/FilterChips'
import { SegmentedControl } from './components/SegmentedControl'
import { StarRating } from './components/StarRating'
import { DebugValues } from './components/DebugValues'

type FormValues = {
  plan: 'Free' | 'Pro' | 'Enterprise'
  rating: string
  filters: string[]
}

const initialValues: FormValues = {
  plan: 'Free',
  rating: '0',
  filters: [],
}

function App() {
  return (
    <Formik initialValues={initialValues} onSubmit={() => { }}>
      <>
        <SegmentedControl name="plan" options={['Free', 'Pro', 'Enterprise'] as const} />
        <FilterChips name="filters" options={['Frontend', 'Backend', 'Design'] as const} />
        <StarRating name="rating" />
        <DebugValues />
      </>
    </Formik>
  )
}

export default App
