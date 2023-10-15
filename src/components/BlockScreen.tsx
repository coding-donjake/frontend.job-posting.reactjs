import React, { ReactNode, useEffect, useRef } from "react";

type BlockScreenProps = {
  className?: string;
  header?: ReactNode;
  leftPanel?: ReactNode;
  rightPanel?: ReactNode;
  body: ReactNode;
  footer?: ReactNode;
};

const BlockScreen = ({
  className,
  header,
  leftPanel,
  rightPanel,
  body,
  footer,
}: BlockScreenProps) => {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      const headerHeight = headerRef.current.offsetHeight;
      const panelLeft = document.querySelector(
        ".screen-panel-left"
      ) as HTMLElement;
      const panelRight = document.querySelector(
        ".screen-panel-right"
      ) as HTMLElement;
      const body = document.querySelector(".screen-body") as HTMLElement;

      if (panelLeft) {
        panelLeft.style.maxHeight = `calc(100vh - ${headerHeight}px)`;
        panelLeft.style.top = `${headerHeight}px`;
      }
      if (panelRight) {
        panelRight.style.maxHeight = `calc(100vh - ${headerHeight}px)`;
        panelRight.style.top = `${headerHeight}px`;
      }

      body.style.minHeight = `calc(100vh - ${headerHeight}px)`;
    }
  }, []);

  return (
    <div className={"screen-block " + className}>
      <div className="screen-header" ref={headerRef}>
        {header}
      </div>
      <div className="screen-content">
        {leftPanel ? (
          <div className="screen-panel-left">{leftPanel}</div>
        ) : null}
        <div className="screen-body">{body}</div>
        {rightPanel ? (
          <div className="screen-panel-right">{rightPanel}</div>
        ) : null}
      </div>
    </div>
  );
};

export default BlockScreen;
