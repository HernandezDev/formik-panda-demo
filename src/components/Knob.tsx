// Knob.tsx
import { Field, type FieldProps } from 'formik';
import { css } from '../../styled-system/css';

const MIN = 0;
const MAX = 100;
const STEP = 1;

const RADIUS = 38;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const ARC_LENGTH = CIRCUMFERENCE * 0.75;

const wrapperStyles = css({
    position: 'relative',
    width: '24',
    height: '24',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    _focusVisibleWithin: {
        outlineStyle: 'solid',
        outlineWidth: '2px',
        outlineColor: 'blue.500',
        outlineOffset: '4',
        borderRadius: 'full',
    },
});

const knobCapStyles = css({
    position: 'absolute',
    width: '16',
    height: '16',
    borderRadius: 'full',
    bg: 'white',
    // Usar token estándar de Panda ('md' o 'lg')
    boxShadow: 'md',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'gray.200',
    display: 'flex',
    justifyContent: 'center',
    pointerEvents: 'none',
});

const notchStyles = css({
    width: '1',
    height: '3',
    bg: 'blue.600',
    borderRadius: 'full',
    marginTop: '1.5',
});

const rangeStyles = css({
    position: 'absolute',
    inset: '0',
    width: 'full',
    height: 'full',
    opacity: 0,
    cursor: 'ns-resize',
});

export function Knob({ name }: { name: string }) {
    return (
        <Field name={name}>
            {({ field, form }: FieldProps<string | number>) => {
                const value = Number(field.value ?? MIN);
                const percent = Math.min(Math.max((value - MIN) / (MAX - MIN), 0), 1);
                const degrees = percent * 270 - 135;
                const currentStroke = percent * ARC_LENGTH;

                const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
                    e.preventDefault();
                    const stepDelta = e.deltaY < 0 ? STEP : -STEP;
                    const next = Math.min(Math.max(value + stepDelta, MIN), MAX);
                    if (next !== value) {
                        form.setFieldValue(name, next);
                    }
                };

                return (
                    <div className={wrapperStyles} onWheel={handleWheel}>
                        <svg
                            viewBox="0 0 100 100"
                            className={css({ width: 'full', height: 'full', transform: 'rotate(135deg)' })}
                            aria-hidden="true"
                        >
                            <circle
                                cx="50"
                                cy="50"
                                r={RADIUS}
                                fill="none"
                                stroke="var(--colors-gray-200)"
                                strokeWidth="6"
                                strokeDasharray={`${ARC_LENGTH} ${CIRCUMFERENCE}`}
                                strokeLinecap="round"
                            />
                            <circle
                                cx="50"
                                cy="50"
                                r={RADIUS}
                                fill="none"
                                stroke="var(--colors-blue-500)"
                                strokeWidth="6"
                                strokeDasharray={`${currentStroke} ${CIRCUMFERENCE}`}
                                strokeLinecap="round"
                            />
                        </svg>

                        <div className={knobCapStyles} style={{ transform: `rotate(${degrees}deg)` }}>
                            <div className={notchStyles} />
                        </div>

                        <input
                            type="range"
                            name={field.name}
                            min={MIN}
                            max={MAX}
                            step={STEP}
                            value={value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            className={rangeStyles}
                        />
                    </div>
                );
            }}
        </Field>
    );
}