// StarRating.tsx
import { Field, type FieldProps } from 'formik';
import { css, cva } from '../../styled-system/css';

const RATING_VALUES = [1, 2, 3, 4, 5] as const;

const rowStyles = css({
    display: 'flex',
    gap: '1',
    width: 'fit',
});

const star = cva({
    base: {
        cursor: 'pointer',
        fontSize: '2xl',
        transition: 'colors',
        _focusVisibleWithin: {
            outlineStyle: 'solid',
            outlineWidth: '1px',
            outlineColor: 'blue.500',
            outlineOffset: '1',
        },
    },
    variants: {
        filled: {
            true: { color: 'yellow.400' },
            false: { color: 'gray.300' },
        },
    },
});

type StarRatingProps = {
    name: string;
};

export function StarRating({ name }: StarRatingProps) {
    return (
        <Field name={name}>
            {({ field }: FieldProps<string>) => {
                const { value: _selectedValue, ...fieldWithoutValue } = field;

                return (
                    <div role="radiogroup" className={rowStyles}>
                        {RATING_VALUES.map((value) => (
                            <label key={value} className={star({ filled: Number(field.value) >= value })}>
                                ★
                                <input
                                    {...fieldWithoutValue}
                                    type="radio"
                                    value={value}
                                    checked={field.value === String(value)}
                                    className={css({ srOnly: true })}
                                />
                            </label>
                        ))}
                    </div>
                );
            }}
        </Field>
    );
}