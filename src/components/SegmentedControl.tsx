// SegmentedControl.tsx
import { useField } from 'formik';
import { css, cva } from '../../styled-system/css';

const PLAN_OPTIONS = ['free', 'pro', 'enterprise'] as const;

const segmentedItem = cva({
    base: {
        padding: '2',
        borderRadius: 'md',
        cursor: 'pointer',
        textAlign: 'center',
        fontWeight: 'medium',
        transition: 'colors',
    },
    variants: {
        selected: {
            true: { bg: 'blue.500', color: 'white' },
            false: { bg: 'transparent', color: 'blue.700', _hover: { bg: 'blue.100' } },
        },
    },
});

const trackStyles = css({
    display: 'inline-flex',
    gap: '1',
    padding: '1',
    bg: 'gray.100',
    borderRadius: 'lg',
});

export function SegmentedControl({ name }: { name: string }) {
    const [field] = useField(name);

    return (
        <div role="tablist" className={trackStyles}>
            {PLAN_OPTIONS.map((option) => (
                <label
                    key={option}
                    className={segmentedItem({ selected: field.value === option })}
                >
                    {option}
                    <input
                        {...field}
                        type="radio"
                        value={option}
                        checked={field.value === option}
                        className={css({ srOnly: true })}
                    />
                </label>
            ))}
        </div>
    );
}