import "./Sidebar.css"
import { useState } from "react";
import { Link } from "react-router-dom";

const sidebarcontent = [
    { id: 1, name: "Dashboard", link: "/" },
    { id: 2, name: "Medications", link: "/medications" },
    { id: 3, name: "About", link: "/about" },
    { id: 4, name: "Contact us", link: "/contact" }
]

const Sidebar = () => {
    const [activeId, setActiveId] = useState(1);
    return (
        <div className="bg-sidebar">
            <ul>
                {sidebarcontent.map(each =>
                    <li key={each.id}>
                        <Link to ={each.link} className="link">
                        <div
                            onClick={() => setActiveId(each.id)}
                            className={each.id === activeId ? "active item-cont" : "inact item-cont"}
                        >
                            <p className={each.id === activeId ? "actname name" : "inactname name"}>{each.name}</p>
                        </div>
                        </Link>
                    </li>)}
            </ul>
        </div>
    )
}

export default Sidebar