// DebugValues.tsx
import { useFormikContext } from 'formik';
import { css } from '../../styled-system/css';

const debugStyles = css({
    alignSelf: 'stretch', // ignora el `alignItems: center` del padre, solo para este elemento
    width: 'full',
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