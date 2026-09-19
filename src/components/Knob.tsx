// Knob.tsx
import { Field, type FieldProps } from 'formik';
import { css } from '../../styled-system/css';

const MIN = 0;
const MAX = 100;

// Geometría del arco: r=38 -> perímetro completo = 2 * PI * 38 ≈ 238.76
// Un arco de 270° ocupa el 75% del perímetro = ~179
const RADIUS = 38;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const ARC_LENGTH = CIRCUMFERENCE * 0.75; // 270°

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
    boxShadow: 'lg',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'gray.200',
    display: 'flex',
    justifyContent: 'center',
    pointerEvents: 'none',
});

// La muesca física en la parte superior del cuerpo rotatorio
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
    cursor: 'pointer',
});

export function Knob({ name }: { name: string }) {
    return (
        <Field name={name}>
            {({ field }: FieldProps<string>) => {
                const value = Number(field.value ?? MIN);
                const percent = Math.min(Math.max((value - MIN) / (MAX - MIN), 0), 1);
                const degrees = percent * 270 - 135; // de -135° a +135°
                const currentStroke = percent * ARC_LENGTH;

                return (
                    <div className={wrapperStyles}>
                        {/* 1. Track de fondo y progreso activo */}
                        <svg
                            viewBox="0 0 100 100"
                            className={css({ width: 'full', height: 'full', transform: 'rotate(135deg)' })}
                        >
                            {/* Pista base de 270° */}
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
                            {/* Progreso coloreado */}
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

                        {/* 2. Cuerpo cilíndrico del knob que rota físicamente */}
                        <div
                            className={knobCapStyles}
                            style={{ transform: `rotate(${degrees}deg)` }}
                        >
                            <div className={notchStyles} />
                        </div>

                        {/* 3. Input range accesible nativo invisible encima */}
                        <input
                            {...field}
                            type="range"
                            min={MIN}
                            max={MAX}
                            value={value}
                            className={rangeStyles}
                        />
                    </div>
                );
            }}
        </Field>
    );
}