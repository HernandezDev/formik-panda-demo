// FilterChips.tsx
import { Field, type FieldProps } from 'formik';
import { sva } from '../../styled-system/css';

const filterChipsSlots = sva({
    slots: ['root', 'chip', 'input'],
    base: {
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2',
        },
        chip: {
            cursor: 'pointer',
            paddingX: '3',
            paddingY: '1',
            borderRadius: 'full',
            fontSize: 'sm',
            fontWeight: 'medium',
            borderWidth: '1px',
            borderStyle: 'solid',
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
        selected: {
            true: {
                chip: {
                    bg: 'blue.50',
                    color: 'blue.700',
                    borderColor: 'blue.500',
                },
            },
            false: {
                chip: {
                    bg: 'transparent',
                    color: 'gray.700',
                    borderColor: 'gray.300',
                    _hover: { bg: 'gray.50' },
                },
            },
        },
    },
    defaultVariants: {
        selected: false,
    },
});

type FilterChipsProps<T extends string> = {
    name: string;
    options: readonly T[];
};

export function FilterChips<T extends string>({ name, options }: FilterChipsProps<T>) {
    const baseStyles = filterChipsSlots();

    return (
        <div role="group" className={baseStyles.root}>
            {options.map((option) => (
                <Field key={option} name={name} type="checkbox" value={option}>
                    {({ field }: FieldProps<T>) => {
                        const isSelected = Boolean(field.checked);
                        const chipStyles = filterChipsSlots({ selected: isSelected });

                        return (
                            <label className={chipStyles.chip}>
                                {option}
                                {isSelected && <span aria-hidden="true"> ×</span>}
                                <input
                                    {...field}
                                    type="checkbox"
                                    value={option}
                                    className={baseStyles.input}
                                />
                            </label>
                        );
                    }}
                </Field>
            ))}
        </div>
    );
}