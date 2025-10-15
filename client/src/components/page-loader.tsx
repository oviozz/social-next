import { FaSpinner } from 'react-icons/fa6';

export default function PageLoader() {
    return (
        <div className={'flex justify-center items-center h-30'}>
            <FaSpinner className={'size-9 animate-spin'} />
        </div>
    );
}
