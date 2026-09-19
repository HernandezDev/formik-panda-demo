// FilterChips.tsx
import { Field, type FieldProps } from 'formik';
import { css, cva } from '../../styled-system/css';

const containerStyles = css({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2',
});

const chip = cva({
    base: {
        cursor: 'pointer',
        paddingX: '3',
        paddingY: '1',
        borderRadius: 'full',
        fontSize: 'sm',
        fontWeight: 'medium',
        borderWidth: '1px',
        borderStyle: 'solid',
        transition: 'colors',
    },
    variants: {
        selected: {
            true: { bg: 'blue.50', color: 'blue.700', borderColor: 'blue.500' },
            false: { bg: 'transparent', color: 'gray.700', borderColor: 'gray.300', _hover: { bg: 'gray.50' } },
        },
    },
});

type FilterChipsProps<T extends string> = {
    name: string;
    options: readonly T[];
};

export function FilterChips<T extends string>({ name, options }: FilterChipsProps<T>) {
    return (
        <div role="group" className={containerStyles}>
            {options.map((option) => (
                <Field key={option} name={name} type="checkbox" value={option}>
                    {({ field }: FieldProps<T>) => (
                        <label className={chip({ selected: field.checked })}>
                            {option}{field.checked ? ' ×' : ''}
                            <input {...field} type="checkbox" value={option} className={css({ srOnly: true })} />
                        </label>
                    )}
                </Field>
            ))}
        </div>
    );
}