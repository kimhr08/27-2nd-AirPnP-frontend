import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import AutoCompleteInput from './AutoCompleteInput/AutoCompleteInput';
import DayPicker from '../../DayPicker/DayPicker';

const ExtendedSearchBar = ({ setIsSearchExtend }) => {
  const [searchInput, setSearchInput] = useState('');
  const [dateInput, setDateInput] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [isDisappear, setIsDisappear] = useState(ANIMATION_APPEAR);
  const [isAutoCompleteOpen, setIsAutoCompleteOpen] = useState(false);
  const categoryInputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIsDisappear(ANIMATION_NONE);
    }, 600);
  }, []);

  const adjustDate = (type, date) => {
    if (type === 'startDate' && date > dateInput.endDate) {
      setDateInput({
        startDate: date,
        endDate: date,
      });
    } else {
      setDateInput(prevDate => ({ ...prevDate, [type]: date }));
    }
  };

  const changeSearchInput = e => {
    setSearchInput(() => e.target.value);
  };

  const onSearch = e => {
    e.preventDefault();
    const { startDate, endDate } = dateInput;
    const term = Math.round((endDate - startDate) / (24 * 60 * 60 * 1000)) + 1;
    navigate(
      `/list?start=${parseDate(startDate)}&end=${parseDate(
        endDate
      )}&category=${searchInput}&term=${term}`
    );
    setIsSearchExtend(false);
  };

  const parseDate = date => {
    const year = date.getFullYear();
    const month = 1 + date.getMonth();
    const day = date.getDate();

    return year + '-' + month + '-' + day;
  };

  const disappearNav = () => {
    setIsDisappear(ANIMATION_DISAPPEAR);
    setTimeout(() => {
      setIsSearchExtend(false);
    }, 600);
  };

  return (
    <>
      <BackGround onClick={disappearNav} isDisappear={isDisappear} />
      <SearchPannel isDisappear={isDisappear}>
        <PannelButton onClick={() => categoryInputRef.current.focus()}>
          <ButtonName>재능</ButtonName>
          <CategoryInput
            value={searchInput}
            type="text"
            placeholder="어떤 재능을 찾으시나요?"
            onChange={changeSearchInput}
            ref={categoryInputRef}
            onFocus={() => setIsAutoCompleteOpen(true)}
            onBlur={() =>
              setTimeout(() => {
                setIsAutoCompleteOpen(false);
              }, 100)
            }
          />
        </PannelButton>
        {isAutoCompleteOpen && (
          <AutoCompleteInput
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
        )}
        <DayPicker type="start" dateInput={dateInput} adjustDate={adjustDate} />
        <DayPicker type="end" dateInput={dateInput} adjustDate={adjustDate} />
        <SearchClick onClick={onSearch}>
          <BiSearch />
        </SearchClick>
      </SearchPannel>
    </>
  );
};

export default ExtendedSearchBar;

const ANIMATION_DISAPPEAR = 'disappear';
const ANIMATION_APPEAR = 'appear';
const ANIMATION_NONE = '';

const BackGround = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  animation: ${({ isDisappear }) =>
      !isDisappear
        ? ''
        : isDisappear === 'disappear'
        ? BackgroundDisappear
        : BackgroundAppear}
    0.6s ease;
  z-index: 997;
`;

const SearchPannel = styled.form`
  position: absolute;
  display: flex;
  align-items: center;
  top: 90px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  border: 1px solid ${({ theme }) => theme.lightGray};
  border-radius: 45px;
  z-index: 999;
  animation: ${({ isDisappear }) =>
      !isDisappear ? '' : isDisappear === 'disappear' ? Disappear : Appear}
    0.6s ease;
`;

const PannelButton = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  padding: 18px 30px;
  margin-right: 2px;
  border-radius: 50px;
  border-color: transparent;
  background-color: white;
  transition: 0.4s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 3px 0 ${({ theme }) => theme.middleGray};
  }
`;

const Appear = keyframes`
  0%{
    opacity: 0;
    top: 70px;
  }
  100% {
    opacity:1;
  }
`;

const BackgroundAppear = keyframes`
  0%{
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Disappear = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    top: 70px;
  }
`;

const BackgroundDisappear = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const SearchClick = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  padding: 16px;
  border-radius: 50px;
  border-color: transparent;
  width: auto;
  background-color: ${({ theme }) => theme.highlight};
  font-size: 24px;
  color: ${({ theme }) => theme.white};
  cursor: pointer;
`;

const ButtonName = styled.p`
  margin: 0 0 4px 2px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.black};
`;

const CategoryInput = styled.input`
  min-width: 200px;
  border: none;

  &:focus {
    outline: none;
  }
`;
