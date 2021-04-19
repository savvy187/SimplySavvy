import { useMemo } from 'react';
import _ from 'lodash';
import { useLocation, useRouteMatch } from 'react-router-dom';
import { ROUTES } from 'client/constants';

function useCurrentRoute({ routeMatchHook, route }) {
    const { pathname } = useLocation();
    const match = useRouteMatch(route);
    /* 
     * Defer to the real-deal holyfield routeMatch hook to
     * from react router.
    */
    if (routeMatchHook) {
        return match;
    }
    /* 
     * Testing the current pathname from react router against the
     * a regular expression associated with each of the apps routes.
    */
    const currentRoute = useMemo(() => {
        return _.find(_.values(ROUTES), (r) => r.re.test(pathname));
    }, [pathname]);
    /* 
     * none of the routes for are app are matching against the current route
     * pathname...
    */
    if (_.isEmpty(currentRoute)) {
        return {
            pathname: null,
            url: pathname
        };
    }
    /* 
     * If we mean to filter against a specific route, passed in as parameter,
     * then we'll check to see if the currentRoute that we matched against the
     * is the same as the route we're looking to filter against...
    */
    if (!_.isEmpty(route)) {
        return currentRoute.pathname === route
            ? { pathname: currentRoute.pathname, url: pathname }
            : null;
    }

    return {
        pathname: currentRoute.pathname,
        url: pathname
    };

}

export default useCurrentRoute;
