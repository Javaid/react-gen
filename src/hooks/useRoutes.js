import { useCallback, useEffect, useState } from "react";
import { routes as ROUTES } from '../data/constant';
import * as Component from '../pages';
import * as Layout from "../layout"
import { getRoutes } from "../services/Routes";

const useRoutes = (returnedValue = "") => {
    const [routes, setRoutes] = useState([]);
    const [sidebarMenu, setSidebarMenu] = useState([]);
    const [layoutIndex, setLayoutIndex] = useState(0);
    // add menu and sub menu route in single array to find jsx element
    const getAllRoutes = useCallback((routes) => {
        routes = routes.map(route => {
            return [...[route], ...getChild(route?.children)]
        })
        routes = routes.flat() || [];
        // find layout compoent for adding private routes in browser router
        routes[layoutIndex].isLayout = true;
        return routes
    }, [layoutIndex])

    useEffect(() => {
        async function fetchRoutesData() {
            const data = await getRoutes();
            const findLayoutIndex = data.findIndex(d => d.element === ROUTES.DEFAULT_LAYOUT_COMPONENT);
            setLayoutIndex(findLayoutIndex)
            const sidebarLinks = getSideBarLinks(data[findLayoutIndex].children || []);
            let routes = getAllRoutes(data);
            routes = getRoutesComponent(routes);
            setRoutes(routes);
            setSidebarMenu(sidebarLinks);
        }
        fetchRoutesData()
    }, [getAllRoutes])

    // Get Child component 
    function getChild(routes) {
        if (routes) {
            routes = routes.map(route => {
                if (route.children && route.children.length > 0) {
                    return route.children
                }
                return [route]
            })
            return routes.flat()
        }
        return []
    }
    //  Get element JSX component value based on element name
    const getRoutesComponent = (routes) => {
        return routes.map(route => {
            // layout and pages creation
            const GenaricComponent = route.element === ROUTES.DEFAULT_LAYOUT_COMPONENT ? Layout[route.element] : Component[route.element]
            route.element = <GenaricComponent />;
            // set error component creation
            const ErrorComponent = Component[route.errorElement] || Component[ROUTES.DEFAULT_ERROR_COMPONENT];
            route.errorElement = <ErrorComponent />
            return route;
        })

    }

    const getSideBarLinks = (routes) => routes.map(route => {
        return {
            label: route.label,
            path: route.path,
            sub_menu: route.children || []
        }
    })

    return returnedValue === ROUTES.GET_ROUTES ? routes : returnedValue === ROUTES.GET_SIDEBAR_MENU ? sidebarMenu : [routes, sidebarMenu];
};

export default useRoutes;