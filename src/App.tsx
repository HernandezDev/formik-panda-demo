import { Formik } from 'formik'
import { FilterChips } from './components/FilterChips'
import { SegmentedControl } from './components/SegmentedControl'
import { StarRating } from './components/StarRating'
import { DebugValues } from './components/DebugValues'



function App() {
  return (
    <Formik initialValues={{ plan: 'Free', rating: '0', filters: [] as string[] }} onSubmit={() => { }}>
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
