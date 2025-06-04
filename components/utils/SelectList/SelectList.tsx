/* eslint-disable react/prop-types */
"use client";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface SelectOption {
  name: string;
  color?: string;
  background?: string;
  addLineAfter?: boolean;
}

interface SelectListProps {
  label?: string;
  id: string;
  selectOptions: SelectOption[];
  defaultOption: string;
  height?: string | number;
  marginB?: string | number;
  padding?: string;
  minWidth?: string;
  onChange: (item: SelectOption) => void;
  errorMsg?: string;
  lang?: string;
  backgroundColor?: string;
  borderColor?: string;
  listHeight?: string;
  listWidth?: string;
  flex?: string | number;
}

const SelectList = ({
  label,
  id,
  selectOptions,
  defaultOption,
  height,
  marginB,
  padding,
  minWidth,
  onChange,
  errorMsg,
  lang,
  backgroundColor,
  borderColor,
  listHeight,
  listWidth,
  flex,
}: SelectListProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const optionRef = useRef<HTMLUListElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const [isClicked, setIsClicked] = useState(false);
  const [isError, setIsError] = useState(false);

  const openOptionHandler = () => {
    setIsClicked(true);
    setIsOpen((prev) => !prev);
  };

  const selectOptionHandler = (item: SelectOption) => {
    setSelectedOption(item?.name);
    onChange(item);
    setIsError(false);
    setIsOpen(false);
  };

  useEffect(() => {
    if (selectedOption === defaultOption && isClicked && !isOpen) {
      setIsError(true);
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        !menuRef.current?.contains(e.target as Node) &&
        !optionRef.current?.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      className={styles.customInput}
      style={{ height, marginBottom: marginB, flex }}
    >
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.inputDiv}>
        <div
          className={isError ? styles.custSelectError : styles.custSelect}
          style={{ height, minWidth, borderColor }}
        >
          <div
            id={id}
            onClick={openOptionHandler}
            className={styles.selectedKey}
            style={{ padding, backgroundColor }}
            ref={menuRef}
          >
            <span>{selectedOption}</span>
            {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
          {isOpen && (
            <ul
              className={styles.custOptionsList}
              ref={optionRef}
              style={{ height: listHeight, width: listWidth }}
            >
              {selectOptions?.map((item, index) => (
                <li key={index}>
                  <div
                    onClick={() => selectOptionHandler(item)}
                    className={styles.custItem}
                    style={{
                      color: item?.color,
                      backgroundColor: item?.background,
                    }}
                  >
                    {item?.name}
                  </div>
                  {item?.addLineAfter && <span className={styles.hr} />}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <p className={styles.error}>{isError ? errorMsg : ""}</p>
    </div>
  );
};

SelectList.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  selectOptions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string,
      background: PropTypes.string,
      addLineAfter: PropTypes.bool,
    })
  ).isRequired,
  defaultOption: PropTypes.string.isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  marginB: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  padding: PropTypes.string,
  minWidth: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  errorMsg: PropTypes.string,
  lang: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  listHeight: PropTypes.string,
  listWidth: PropTypes.string,
  flex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default SelectList;
