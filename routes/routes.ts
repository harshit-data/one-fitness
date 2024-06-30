export const routes = [
    {
        href: "/workout",
        label: "Workout",
        children: [{
            href: "/dashboard",
            label: "Dashboard"
        }, {
            href: "/workout/stats",
            label: "Stats"
        }, {
            href: "/workout/goals",
            label: "Goals"
        }]
    },
    {
        href: "/routes",
        label: "Routes",
        children: [
            {
                href: "/routes",
                label:"Routes Home"
            },
            {
                href: "/routes/search",
                label:"Find Routes"
            },
            {
                href: "/routes/create",
                label:"Create Routes"
            },
            {
                href: "/routes/my_routes",
                label:"My Routes"
            }
            // find your country running routes feature to be added 
        ]

    },
    {
        href: "/community",
        label: "Community",
        children: [
            {
                href: "/activity_feed",
                label:"Acitvity Feed"
            },
            {
                href: "/challenges",
                label:"Challenges"
            },
            {
                href: "/people/friends",
                label:"Friends"
            }
        ]
    },
    {
        href: "/shop",
        label: "Shop"
    }

]