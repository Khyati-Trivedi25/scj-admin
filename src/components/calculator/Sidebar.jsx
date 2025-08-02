import React from "react";
import {
  MonitorPlay,
  Video,
  BarChart3,
  BadgeDollarSign,
  Ticket,
} from "lucide-react";

const highlightColor = "cyan-400";

const sidebarSections = [
  {
    title: "AVOD",
    models: [
      { label: "CPM", key: "CPM", icon: <BarChart3 className="w-5 h-5" /> },
      { label: "CPI", key: "CPI", icon: <MonitorPlay className="w-5 h-5" /> },
      { label: "CAR", key: "CAR", icon: <Video className="w-5 h-5" /> },
      {
        label: "MG + Rev Share",
        key: "MG",
        icon: <BadgeDollarSign className="w-5 h-5" />,
      },
    ],
  },
  {
    title: "TVOD",
    models: [
      { label: "TVOD", key: "TVOD", icon: <Ticket className="w-5 h-5" /> },
    ],
  },
];

const Sidebar = ({ selectedModel, onSelectModel }) => {
  // Find which section is selected
  const selectedSection = sidebarSections.find(section =>
    section.models.some(model => model.key === selectedModel)
  );

  return (
    <aside className="scj-sidebar">
      <h2>Revenue Models</h2>
      <nav>
        {sidebarSections.map((section) => (
          <div key={section.title} className="scj-section">
            <h3 className={selectedSection && selectedSection.title === section.title ? "active" : "inactive"}>
              {section.title}
            </h3>
            <ul className="scj-nav-list">
              {section.models.map(({ label, key, icon }) => {
                const selected = selectedModel === key;
                return (
                  <li key={key}>
                    <button
                      onClick={() => onSelectModel(key)}
                      className={`scj-nav-item ${selected ? "selected" : ""}`}
                    >
                      <span className="scj-icon">{icon}</span>
                      <span className="scj-nav-text">{label}</span>
                      {selected && (
                        <span className="scj-selected-badge">Selected</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar; 