import React, { useState } from "react";

import classNames from "classnames/bind";

import styles from "./NameCard.module.scss";

const cn = classNames.bind(styles);

interface NameCardProps {
  text: string;
  isSelected: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function NameCard({ text, isSelected, onClick }: NameCardProps) {
  return (
    <>
      <div onClick={onClick} className={!isSelected ? cn("container") : cn("container-seleted")}>
        <p>{text}</p>
      </div>
    </>
  );
}
