// PasswordStrength.tsx
import { Field, type FieldProps } from 'formik';
import { css, cva } from '../../styled-system/css';

// Validación a mano, sin Yup/Valibot — el objetivo es exponer la lógica,
// no esconderla detrás de un schema.
function getPasswordStrengthLevel(value: string): 'empty' | 'weak' | 'medium' | 'strong' {
    if (value.length === 0) return 'empty';

    const rules = [
        value.length >= 8,
        /[A-Z]/.test(value),
        /\d/.test(value),
    ];
    const passedCount = rules.filter(Boolean).length;

    if (passedCount <= 1) return 'weak';
    if (passedCount === 2) return 'medium';
    return 'strong';
}

const inputStyles = css({
    padding: '2',
    borderRadius: 'md',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'gray.300',
    width: 'full',
});

const trackStyles = css({
    marginTop: '2',
    height: '2',
    borderRadius: 'full',
    bg: 'gray.200',
    overflow: 'hidden',
});

const barStyles = cva({
    base: {
        height: 'full',
        transition: 'all',
    },
    variants: {
        level: {
            empty: { bg: 'transparent', width: '0' },
            weak: { bg: 'red.500', width: '1/3' },
            medium: { bg: 'yellow.500', width: '2/3' },
            strong: { bg: 'green.500', width: 'full' },
        },
    },
});

type PasswordStrengthProps = {
    name: string;
};

export function PasswordStrength({ name }: PasswordStrengthProps) {
    return (
        <Field name={name}>
            {({ field }: FieldProps<string>) => {
                const level = getPasswordStrengthLevel(field.value ?? '');

                return (
                    <div>
                        <input {...field} type="password" className={inputStyles} />
                        <div className={trackStyles}>
                            <div className={barStyles({ level })} />
                        </div>
                    </div>
                );
            }}
        </Field>
    );
}