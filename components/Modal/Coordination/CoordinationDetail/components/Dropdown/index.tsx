import React, { useEffect, useState } from "react";

import Image from "next/image";

import classNames from "classnames/bind";

import styles from "./Dropdown.module.scss";

const cn = classNames.bind(styles);

interface Group {
  crewId: number;
  crewName: string;
  labelColor: string;
}

interface DropdownProps {
  groups: Group[];
  onChange: (selectedGroupId: number) => void;
}

const Dropdown = ({ groups, onChange }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);

  useEffect(() => {
    if (groups.length > 0) {
      setSelectedGroup(groups[0].crewId);
      onChange(groups[1].crewId);
    }
  }, [groups]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (crewId: number) => {
    setSelectedGroup(crewId);
    onChange(crewId);
    setIsOpen(false);
  };

  return (
    <div className={cn("dropdown-container")}>
      <label className={cn("dropdown-label")}>
        <p>조율할 그룹 및 인원 선택</p>
      </label>
      <div className={cn("dropdown")} onClick={toggleDropdown}>
        <div className={cn("selected-option")}>
          <div
            className={cn("color-indicator")}
            style={{
              backgroundColor: selectedGroup
                ? groups.find((group) => group.crewId === selectedGroup)?.labelColor
                : "transparent",
            }}
          ></div>
          <span>{groups.find((group) => group.crewId === selectedGroup)?.crewName}</span>
          <Image
            src={!isOpen ? "/icons/dropdown-up.svg" : "/icons/dropdown-down.svg"}
            className={cn("dropdown-icon")}
            width={20}
            height={20}
            alt="드롭다운 업다운 아이콘"
          />
        </div>
        {isOpen && (
          <div className={cn("dropdown-options")}>
            {groups.map((group) => (
              <div
                key={group.crewId}
                className={cn("option")}
                onClick={() => handleOptionClick(group.crewId)}
              >
                <div
                  className={cn("color-indicator")}
                  style={{ backgroundColor: group.labelColor }}
                ></div>
                {group.crewName}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
