import { Screen } from "./screen.entity";

export class System {
    name: string;
    screens: Screen[] = [];
    menuItems: Screen[] = [];
    permissions: any[] = [];
    seletedTab: any = RoleTabTypes.Screens;
    isActive: boolean;

    static  SystemJSON = [
        {
            "name": "Admin Panel",
            "isActive": false,
            "screens": [
              
                  {
                    "name": "Jobs",
                    "displayName": "Jobs",
                    "route": "/admin/jobs-list",
                    "icon": "fas fa-users",
                    "isActive": true,
                    "isSelected": false,
                    "extraLink": false,
                    "class": "",
                    "submenu": [],
                    "features": []
                  },
                  {
                    "name": "My Profile",
                    "displayName": "My Profile",
                    "route": "admin/my-profile",
                    "icon": "fas fa-users",
                    "isActive": true,
                    "isSelected": false,
                    "extraLink": false,
                    "class": "",
                    "submenu": [],
                    "features": []
                  },
                  {
                    "name": "Quiz",
                    "displayName": "Quiz",
                    "route": "admin/questions-list",
                    "icon": "fas fa-users",
                    "isActive": true,
                    "isSelected": false,
                    "extraLink": false,
                    "class": "",
                    "submenu": [],
                    "features": []
                  },
            ],
            "menuItems": [],
            "seletedTab": 2
        },
        {
            "name": "Mobile App",
            "isActive": true,
            "screens": [
                {
                    "name": "List",
                    "displayName": "Users",
                    "route": "/admin/users/list",
                    "icon": "fas fa-users",
                    "isActive": true,
                    "isSelected": false,
                    "features": [
                        {
                            "key": "delete",
                            "value": false
                        },
                        {
                            "key": "updateStatus",
                            "value": false
                        }
                    ]
                }
            ],
            "menuItems": [],
            "seletedTab": 1
        }
    ];
}

enum RoleTabTypes {
    MenuItems,
    Screens,
    Permissions,
}