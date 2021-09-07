import React, { useState, useEffect } from "react";

import "./Tabs.css";

const Tab = ({ children, active = 0 }) => {
  const [activeTab, setActiveTab] = useState(active);
  const [tabsData, setTabsData] = useState([]);

  useEffect(() => {
    let data = [];

    React.Children.forEach(children, (element) => {
      if (!React.isValidElement(element)) return;

      const {
        props: { tab, onTabSelected, children },
      } = element;
      data.push({ tab, onTabSelected, children });
    });

    setTabsData(data);
  }, [children]);

  return (
    <div>
      <ul className="nav">
        {tabsData.map(({ tab }, idx) => (
          <div className={`nav-link${idx === activeTab ? "_active" : ""}`}>
            <li>
              <a
                href="#"
                onClick={() => {
                  setActiveTab(idx);
                  tabsData[idx].onTabSelected();
                }}
              >
                {tab}
              </a>
            </li>
          </div>
        ))}
      </ul>
      <div className="tab-content">
        {tabsData[activeTab] && tabsData[activeTab].children}
      </div>
    </div>
  );
};

const TabPane = ({ children }) => {
  return { children };
};

Tab.TabPane = TabPane;

export default Tab;
