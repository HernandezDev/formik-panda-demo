// StarRating.tsx
import { Field, type FieldProps } from 'formik';
import { sva } from '../../styled-system/css';

const RATING_VALUES = [1, 2, 3, 4, 5] as const;

const starRatingSlots = sva({
    slots: ['root', 'star', 'input'],
    base: {
        root: {
            display: 'flex',
            gap: '1',
            width: 'fit',
        },
        star: {
            cursor: 'pointer',
            fontSize: '2xl',
            lineHeight: 'none',
            transition: 'colors',
            userSelect: 'none',
            _focusVisibleWithin: {
                outlineStyle: 'solid',
                outlineWidth: '1px',
                outlineColor: 'blue.500',
                outlineOffset: '1',
            },
        },
        input: {
            srOnly: true,
        },
    },
    variants: {
        filled: {
            true: {
                star: { color: 'yellow.400' },
            },
            false: {
                star: { color: 'gray.300' },
            },
        },
    },
    defaultVariants: {
        filled: false,
    },
});

type StarRatingProps = {
    name: string;
};

export function StarRating({ name }: StarRatingProps) {
    const baseStyles = starRatingSlots();

    return (
        <Field name={name}>
            {({ field }: FieldProps<string | number>) => {
                const numericValue = Number(field.value ?? 0);

                return (
                    <div role="radiogroup" className={baseStyles.root}>
                        {RATING_VALUES.map((value) => {
                            const isFilled = numericValue >= value;
                            const starStyles = starRatingSlots({ filled: isFilled });

                            return (
                                <label key={value} className={starStyles.star}>
                                    ★
                                    <input
                                        type="radio"
                                        name={field.name}
                                        value={value}
                                        checked={numericValue === value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        className={baseStyles.input}
                                    />
                                </label>
                            );
                        })}
                    </div>
                );
            }}
        </Field>
    );
}