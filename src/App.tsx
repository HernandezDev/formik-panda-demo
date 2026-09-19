import { Formik } from 'formik'
import { FilterChips } from './components/FilterChips'
import { Knob } from './components/Knob'
import { SegmentedControl } from './components/SegmentedControl'
import { StarRating } from './components/StarRating'
import { DebugValues } from './components/DebugValues'
import { vstack } from '../styled-system/patterns'

type FormValues = {
  plan: 'Free' | 'Pro' | 'Enterprise'
  rating: string
  filters: string[]
  knob: string
}

const initialValues: FormValues = {
  plan: 'Free',
  rating: '0',
  filters: [],
  knob: '50',
}

function App() {
  return (
    <Formik initialValues={initialValues} onSubmit={() => { }}>
      <div className={vstack({ gap: '6', alignItems: 'center', padding: '8' })}>
        <SegmentedControl name="plan" options={['Free', 'Pro', 'Enterprise'] as const} />
        <FilterChips name="filters" options={['Frontend', 'Backend', 'Design'] as const} />
        <StarRating name="rating" />
        <Knob name="knob" />
        <DebugValues />
      </div>
    </Formik>
  )
}

export default App
