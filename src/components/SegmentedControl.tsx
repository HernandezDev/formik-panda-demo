// SegmentedControl.tsx
import { Field, type FieldProps } from 'formik';
import { css, cva } from '../../styled-system/css';

const segmentedItem = cva({
    base: {
        padding: '2',
        paddingLeft: '4',
        paddingRight: '4',
        borderRadius: 'full',
        cursor: 'pointer',
        textAlign: 'center',
        fontWeight: 'medium',
        transition: 'colors',
        _focusVisibleWithin: {
            outlineStyle: 'solid',
            outlineWidth: '1px',
            outlineColor: 'blue.500',
            outlineOffset: '1',
        },
    },
    variants: {
        selected: {
            true: { bg: 'blue.500', color: 'white' },
            false: { bg: 'transparent', color: 'blue.700', _hover: { bg: 'blue.100' } },
        },
    },
});

const trackStyles = css({
    display: 'flex',
    gap: '1',
    padding: '1',
    bg: 'gray.100',
    borderRadius: 'full',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'gray.300',
    width: 'fit',
});

type SegmentedControlProps<T extends string> = {
    name: string;
    options: readonly T[];
};

export function SegmentedControl<T extends string>({ name, options }: SegmentedControlProps<T>) {
    return (
        <Field name={name}>
            {({ field }: FieldProps<T>) => {
                const { value: _selectedValue, ...fieldWithoutValue } = field;

                return (
                    <div role="radiogroup" className={trackStyles}>
                        {options.map((option) => (
                            <label key={option} className={segmentedItem({ selected: field.value === option })}>
                                {option}
                                <input
                                    {...fieldWithoutValue}
                                    type="radio"
                                    value={option}
                                    checked={field.value === option}
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