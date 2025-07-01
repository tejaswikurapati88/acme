import "./Sidebar.css"
import { useState } from "react";

const sidebarcontent = [
    { id: 1, name: "Dashboard" },
    { id: 2, name: "Medications" },
    { id: 3, name: "About" },
    { id: 4, name: "Contact us" }
]

const Sidebar = () => {
    const [activeId, setActiveId] = useState(1);
    return (
        <div className="bg-sidebar">
            <ul>
                {sidebarcontent.map(each =>
                    <li key={each.id}>
                        <div
                            onClick={() => setActiveId(each.id)}
                            className={each.id === activeId ? "active item-cont" : "inact item-cont"}
                        >
                            <p className={each.id === activeId ? "actname name" : "inactname name"}>{each.name}</p>
                        </div>
                    </li>)}
            </ul>
        </div>
    )
}

export default Sidebar