// RangeFill.tsx
import { Field, type FieldProps } from 'formik';
import { css } from '../../styled-system/css';

const MIN = 0;
const MAX = 100;

const wrapperStyles = css({
    position: 'relative',
    width: 'full',
    maxWidth: 'sm',
    height: '3',
    borderRadius: 'full',
    bg: 'gray.200',
    _focusVisibleWithin: {
        outlineStyle: 'solid',
        outlineWidth: '2px',
        outlineColor: 'blue.500',
        outlineOffset: '2',
    },
});

const fillStyles = css({
    position: 'absolute',
    inset: '0',
    bg: 'blue.500',
    borderRadius: 'full', // el redondeo ahora vive acá, no dependía del overflow del padre
    transformOrigin: 'left',
});

const thumbStyles = css({
    position: 'absolute',
    top: '[50%]',
    width: '5',
    height: '5',
    borderRadius: 'full',
    bg: 'white',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'blue.500',
    boxShadow: 'sm',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
});

const hiddenRangeStyles = css({
    position: 'absolute',
    inset: '0',
    width: 'full',
    height: 'full',
    opacity: 0,
    cursor: 'pointer',
    margin: '0',
});

type RangeFillProps = {
    name: string;
};

export function RangeFill({ name }: RangeFillProps) {
    return (
        <Field name={name}>
            {({ field }: FieldProps<string>) => {
                const value = Number(field.value ?? MIN);
                const percent = (value - MIN) / (MAX - MIN);

                return (
                    <div className={wrapperStyles}>
                        <div className={fillStyles} style={{ transform: `scaleX(${percent})` }} />
                        <div className={thumbStyles} style={{ left: `${percent * 100}%` }} />
                        <input
                            {...field}
                            type="range"
                            min={MIN}
                            max={MAX}
                            className={hiddenRangeStyles}
                        />
                    </div>
                );
            }}
        </Field>
    );
}