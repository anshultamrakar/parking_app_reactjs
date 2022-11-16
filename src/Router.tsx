import { useLocation, useNavigate, useParams } from 'react-router-dom';

const WithRouter = (Component: any) => {
    
    const Wrapper = (props: any) => {
        const navigate = useNavigate();
        const params = useParams();
        const location = useLocation();
        return (
            <Component
                navigate={navigate}
                params={params}
                location={location}
                {...props}
            />
        )
    }
    return Wrapper;
}

export default WithRouter;