// SegmentedControl.tsx
import { Field, type FieldProps } from 'formik';
import { sva } from '../../styled-system/css';

const segmentedControlSlots = sva({
    slots: ['track', 'item', 'input'],
    base: {
        track: {
            display: 'flex',
            gap: '1',
            padding: '1',
            bg: 'gray.100',
            borderRadius: 'full',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'gray.300',
            width: 'fit',
        },
        item: {
            paddingY: '2',
            paddingX: '4',
            borderRadius: 'full',
            cursor: 'pointer',
            textAlign: 'center',
            fontWeight: 'medium',
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
                item: {
                    bg: 'blue.500',
                    color: 'white',
                },
            },
            false: {
                item: {
                    bg: 'transparent',
                    color: 'blue.700',
                    _hover: { bg: 'blue.100' },
                },
            },
        },
    },
    defaultVariants: {
        selected: false,
    },
});

type SegmentedControlProps<T extends string> = {
    name: string;
    options: readonly T[];
};

export function SegmentedControl<T extends string>({
    name,
    options,
}: SegmentedControlProps<T>) {
    const baseStyles = segmentedControlSlots();

    return (
        <Field name={name}>
            {({ field }: FieldProps<T>) => (
                <div role="radiogroup" className={baseStyles.track}>
                    {options.map((option) => {
                        const isSelected = field.value === option;
                        const itemStyles = segmentedControlSlots({ selected: isSelected });

                        return (
                            <label key={option} className={itemStyles.item}>
                                {option}
                                <input
                                    type="radio"
                                    name={field.name}
                                    value={option}
                                    checked={isSelected}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    className={baseStyles.input}
                                />
                            </label>
                        );
                    })}
                </div>
            )}
        </Field>
    );
}