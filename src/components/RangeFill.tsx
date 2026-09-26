// RangeFill.tsx
import { Field, type FieldProps } from 'formik';
import { sva } from '../../styled-system/css';

const MIN = 0;
const MAX = 100;
const THUMB_SIZE = 20;

const rangeFillSlots = sva({
    slots: ['root', 'fill', 'thumb', 'input'],
    base: {
        root: {
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
        },
        fill: {
            position: 'absolute',
            inset: '0',
            bg: 'blue.500',
            borderRadius: 'full',
            transformOrigin: 'left',
        },
        thumb: {
            position: 'absolute',
            top: '1/2',
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
        },
        input: {
            position: 'absolute',
            inset: '0',
            width: 'full',
            height: 'full',
            opacity: 0,
            cursor: 'pointer',
            margin: '0',
        },
    },
});

type RangeFillProps = {
    name: string;
};

export function RangeFill({ name }: RangeFillProps) {
    const styles = rangeFillSlots();

    return (
        <Field name={name}>
            {({ field }: FieldProps<string | number>) => {
                const value = Number(field.value ?? MIN);
                const rawPercent = (value - MIN) / (MAX - MIN);
                const percent = Math.min(Math.max(rawPercent, 0), 1);
                const thumbOffset = (0.5 - percent) * THUMB_SIZE;
                const thumbLeft = `calc(${percent * 100}% + ${thumbOffset}px)`;

                return (
                    <div className={styles.root}>
                        <div className={styles.fill} style={{ width: `${percent * 100}%` }} />
                        <div className={styles.thumb} style={{ left: thumbLeft }} />
                        <input
                            type="range"
                            name={field.name}
                            min={MIN}
                            max={MAX}
                            value={value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            className={styles.input}
                        />
                    </div>
                );
            }}
        </Field>
    );
}