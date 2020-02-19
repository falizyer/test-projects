import React, { PropsWithChildren, ReactNode, useState } from 'react';

export interface TabItem {
    component: ReactNode;
    name: string;
}

export interface VirtualTabProps {
    tabs: TabItem[];
    visibleTabs?: number;
}

export default function (props: PropsWithChildren<VirtualTabProps>) {
    const [ tabPage, setTabPage ] = useState(0);
    const [ tabIndex, setTabIndex ] = useState(0);
    const [ visibleTabs, setVisibleTabs ] = useState(props.visibleTabs || 5);
    const start = tabPage * visibleTabs;
    const maxPage = Math.floor(props.tabs.length / visibleTabs);
    const _prevPage = Math.max(0, tabPage - 1);
    const _nextPAge = Math.min(maxPage, tabPage + 1);

    const previousPage = () => {
        setTabPage(_prevPage);
        setTabIndex(_prevPage * visibleTabs);
    };

    const nextPage = () => {
        setTabPage(_nextPAge);
        setTabIndex(_nextPAge * visibleTabs);
    };

    const selectTab = (index: number) => () => setTabIndex(start + index);
    return (
        <div>
            <div>
                <div onClick={previousPage}>previous</div>
                {
                    props.tabs
                        .slice(start, start + visibleTabs)
                        .map((tab, index) => (
                            <div
                                key={index}
                                onClick={selectTab(index)}
                            >
                                {tab.name}
                            </div>
                        ))
                }
                <div onClick={nextPage}>next</div>
            </div>
            <div>
                {
                    <div className="virtual-tab__container">
                        {props.tabs[tabIndex]?.component}
                    </div>
                }
            </div>
        </div>
    );
}
