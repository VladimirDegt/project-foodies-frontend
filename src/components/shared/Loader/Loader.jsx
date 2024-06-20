import ClipLoader from 'react-spinners/ClimbingBoxLoader';

const override = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'red',
};

export const Loader = () => {
    return (
        <div className='sweet-loading'>
            <ClipLoader
                color='#050505'
                cssOverride={override}
                size={20}
                aria-label='Loading Spinner'
                data-testid='loader'
            />
        </div>
    );
};
