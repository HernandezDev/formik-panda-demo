// DebugValues.tsx
import { useFormikContext } from 'formik';
import { css } from '../../styled-system/css';

const debugStyles = css({
    marginTop: '4',
    padding: '3',
    bg: 'gray.900',
    color: 'gray.100',
    borderRadius: 'md',
    fontFamily: 'mono',
    fontSize: 'sm',
    whiteSpace: 'pre-wrap',
});

export function DebugValues() {
    const { values } = useFormikContext();

    return (
        <pre className={debugStyles}>
            {JSON.stringify(values, null, 2)}
        </pre>
    );
}