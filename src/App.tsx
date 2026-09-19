import { Formik } from 'formik'
import { FilterChips } from './components/FilterChips'
import { RangeFill } from './components/RangeFill'
import { SegmentedControl } from './components/SegmentedControl'
import { StarRating } from './components/StarRating'
import { DebugValues } from './components/DebugValues'
import { vstack } from '../styled-system/patterns'
import { css } from '../styled-system/css'

type FormValues = {
  plan: 'Free' | 'Pro' | 'Enterprise'
  rating: string
  filters: string[]
  volume: string
}

const initialValues: FormValues = {
  plan: 'Free',
  rating: '0',
  filters: [],
  volume: '50',
}

const descriptionStyles = css({
  fontSize: 'sm',
  color: 'gray.600',
  textAlign: 'center',
  maxWidth: 'md',
  lineHeight: 'relaxed',
})

function App() {
  return (
    <Formik initialValues={initialValues} onSubmit={() => { }}>
      <div className={vstack({ gap: '6', alignItems: 'center', padding: '8' })}>
        <p className={descriptionStyles}>
          Controles accesibles por mouse, teclado, gestos táctiles y lectores de pantalla impulsados exclusivamente por inputs nativos y Panda CSS.
        </p>

        <SegmentedControl name="plan" options={['Free', 'Pro', 'Enterprise'] as const} />
        <FilterChips name="filters" options={['Frontend', 'Backend', 'Design'] as const} />
        <StarRating name="rating" />
        <RangeFill name="volume" />
        <DebugValues />
      </div>
    </Formik>
  )
}

export default App