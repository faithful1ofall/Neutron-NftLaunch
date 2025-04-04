import Link from "next/link";
import NavigationStyleWrapper from "./Navigation.style";
import menus from "@assets/data/menu/dataV3"
import menuShape from "@assets/images/project/menu-image.png"

const Navigation = () => {

    return (
        <NavigationStyleWrapper>
            <div className="navigation_links">
                {menus?.map((menu, i) => (
                    <Link key={i} href={menu.url}>
                        {menu.title} <img src={menuShape.src} alt="shape" />
                    </Link>
                ))}
            </div>
        </NavigationStyleWrapper>
    )
}

export default Navigation;