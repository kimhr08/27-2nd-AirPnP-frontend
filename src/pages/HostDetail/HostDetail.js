import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { AiFillStar } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiOutlineSafetyCertificate } from 'react-icons/ai';
import { GrKey } from 'react-icons/gr';
import { AiOutlineCalendar } from 'react-icons/ai';

import HostLevel from './HostLevelContainer';

import { ArticleData } from './Data/ArticleData';
import { CertificationCellData } from './Data/CertificationCellData';
import { AdditionInfoListData } from './Data/AdditionInfoListData';
import { AdditionalListData } from './Data/AdditionalListData';
import { InfoListData } from './Data/InfoList';

function HostDetail() {
  const { id } = useParams();
  const [detail, setDetail] = useState({});

  useEffect(() => {
    fetch('/Data/detailData.json')
      .then(res => res.json())
      .then(data => setDetail(data.result[0]));
  }, []);

  return (
    <DetailMainWrapper>
      <DetailMainTitle>
        <DetailTopBar>
          <TopBarTitle>{detail.title}</TopBarTitle>
          <TopBarSubTitle>
            <TopLeft>
              <Category>
                <AiFillStar />
                {detail.category}
              </Category>
              <HostLevel />
              <HostLocal>{detail.local}</HostLocal>
            </TopLeft>
            <TopRight>
              <SharingPost>공유하기</SharingPost>
              <StorePost>
                <AiOutlineHeart /> 저장
              </StorePost>
            </TopRight>
          </TopBarSubTitle>
        </DetailTopBar>
      </DetailMainTitle>
      <Container>
        <MainRightBar>
          <DetailImg alt="detail-image" src="image/Detail/animal.jpg" />
          <DetailExplanation>
            <SubTitle>
              <Intro>
                <MainIntro>Niboo님이 주최하는 P&p의 자연여행</MainIntro>
                <SubIntro>
                  ✦직업: {detail.job}&nbsp; ✦경력: {detail.career}
                </SubIntro>
              </Intro>
              <ProfileImg src="image/Detail/wave.JPG" alt="profile-image" />
            </SubTitle>
            <ArticleStep>
              {ArticleData.map(list => {
                return (
                  <Article key={list.id}>
                    <ArticleIcon>{list.icon}</ArticleIcon>
                    <ArticleLetter>
                      <Bold>{list.boldText}</Bold>
                      <Light>{list.lightText}</Light>
                    </ArticleLetter>
                  </Article>
                );
              })}
            </ArticleStep>
            <Description>
              <DescriptionContent>{detail.description}</DescriptionContent>
            </Description>
            <InfoListBox>
              <BasicInfo>
                <InfoTitle>기본 정보</InfoTitle>
                {InfoListData.map(list => {
                  return (
                    <List key={list.id}>
                      <InfoListIcon>{list.icon}</InfoListIcon>
                      <InfoListLetter>{list.letter}</InfoListLetter>
                    </List>
                  );
                })}
              </BasicInfo>
              <AdditionInfo>
                <AdditionInfoTitle>추가 정보</AdditionInfoTitle>
                {AdditionInfoListData.map(list => {
                  return (
                    <AdditionInfoList key={list.id}>
                      <AdditionInfoListIcon>{list.icon}</AdditionInfoListIcon>
                      <AdditionInfoListLetter>
                        {list.letter}
                      </AdditionInfoListLetter>
                    </AdditionInfoList>
                  );
                })}
              </AdditionInfo>
            </InfoListBox>
            <MapBox>
              <HostingMapTitle>호스팅 지역</HostingMapTitle>
              <Map>지도 자리 입니당</Map>
              <LocalName>{detail.local}</LocalName>
              <LocalDes>{detail.local_description}</LocalDes>
            </MapBox>
          </DetailExplanation>
        </MainRightBar>
        <MainLeftBar>
          <Reservation>
            <ReservationTitle>
              요금을 확인하려면 날짜를 입력하세요.
            </ReservationTitle>
            <ReservationSubTitle>
              <AiFillStar />
              {detail.category}&nbsp;
              <HostLevel />
            </ReservationSubTitle>
            <ReservationDate>
              <DateStart>
                <DatePickLetter>시작</DatePickLetter>
                <DateAddLetter>날짜 추가</DateAddLetter>
              </DateStart>
              <DateEnd>
                <DatePickLetter>끝</DatePickLetter>
                <DateAddLetter>날짜 추가</DateAddLetter>
              </DateEnd>
            </ReservationDate>
            <ReservationButton>예약 가능 여부 보기</ReservationButton>
          </Reservation>
        </MainLeftBar>
      </Container>
      <ContainerBottom>
        <HostBox>
          <HostIntro>
            <HostProfile>
              <HostImg src="image/Detail/wave.JPG" alt="host-img" />
              <HostNickName>
                <HostID>호스트: {detail.host_name}님</HostID>
                <HostSignUpDate>회원 가입일: 2017년</HostSignUpDate>
              </HostNickName>
            </HostProfile>
            <CertifiCation>
              {CertificationCellData.map(list => {
                return (
                  <CertificationCell key={list.id}>
                    <CellIcon>{list.icon}</CellIcon>
                    <CellLetter>{list.letter}</CellLetter>
                  </CertificationCell>
                );
              })}
            </CertifiCation>
            <PageDes>
              <DescriptionBox>
                <DesTitle>Naniboo님은 슈퍼맨 입니다.</DesTitle>
                <DesSub>
                  슈퍼맨은 풍부한 경험과 높은 평점을 자랑하며 게스트의
                  익사이팅한 체험을 위해 최선을 다합니다.
                </DesSub>
              </DescriptionBox>
            </PageDes>
          </HostIntro>
          <hostContact>
            <Additional>
              {AdditionalListData.map(list => {
                return (
                  <AdditionalList key={list.id}>
                    <AdditionalInfo>{list.info}</AdditionalInfo>
                  </AdditionalList>
                );
              })}
            </Additional>
            <ContactButton>호스트에게 연락하기</ContactButton>
            <Caution>
              <CautionIcon>
                <AiOutlineSafetyCertificate />
              </CautionIcon>
              <CautionMessage>
                안전한 결제를 위해 에어피앤피 웹사이트나 앱 외부에서 송금하거나
                대화를 나누지 마세요.
              </CautionMessage>
            </Caution>
          </hostContact>
        </HostBox>
      </ContainerBottom>
    </DetailMainWrapper>
  );
}

const DetailMainWrapper = styled.main`
  width: 1200px;
  margin: 0 auto;
`;

const DetailMainTitle = styled.div`
  display: flex;
`;
const MainLeftBar = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
`;

const MainRightBar = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailTopBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  margin: 100px auto;
  width: 100%;
`;

const TopBarTitle = styled.div`
  display: flex;
  font-size: 45px;
`;
const Category = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const HostLocal = styled.span`
  margin-left: 10px;
`;
const SharingPost = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StorePost = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 15px;
`;
const TopBarSubTitle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 98%;
  margin-top: 50px;
  font-size: 18px;
`;
const Container = styled.main`
  display: flex;
`;
const TopLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TopRight = styled.div`
  display: flex;
`;

const DetailImg = styled.img`
  width: 700px;
  height: 500px;
  border-radius: 20px;
`;
const DetailExplanation = styled.div`
  width: 650px;
  margin-top: 80px;
`;
const SubTitle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 650px;
  height: 146px;
  border-bottom: ${props => props.theme.borderMiddleGray};
`;
const Intro = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 60px;
`;
const MainIntro = styled.div`
  margin-bottom: 10px;
  font-size: 27px;
`;
const SubIntro = styled.div`
  margin: 5px;
  font-size: 15px;
`;
const Article = styled.div`
  display: flex;
  margin-top: 15px;
`;

const ArticleIcon = styled.div`
  margin: 10px 0 0 10px;
  font-size: 40px;
  font-weight: 100;
`;

const ArticleLetter = styled.div`
  margin-left: 20px;
`;

const Bold = styled.h2`
  margin: 20px 0 5px 0;
  font-size: 20px;
`;

const Light = styled.h4`
  color: ${props => props.theme.middleGray};
`;
const AdditionInfoList = styled.div`
  margin: 20px 0 20px 15px;
  font-size: 30px;
`;
const AdditionInfoListIcon = styled.span`
  font-size: 20px;
`;
const AdditionInfoListLetter = styled.span`
  margin-left: 20px;
  font-size: 16px;
`;
const ProfileImg = styled.img`
  margin-top: 60px;
  width: 64px;
  height: 64px;
  border-radius: 32px;
`;
const ArticleStep = styled.div`
  width: 650px;
  height: 233px;
  height: 233px;
  border-bottom: ${props => props.theme.borderMiddleGray};
`;
const Description = styled.div`
  width: 650px;
  height: 278px;
  border-bottom: ${props => props.theme.borderMiddleGray};
`;
const DescriptionContent = styled.p`
  margin-top: 30px;
  color: ${props => props.theme.darkGray};
  font-size: 18px;
  letter-spacing: 1px;
  line-height: 30px;
`;

const InfoListBox = styled.div`
  display: flex;
  width: 650px;
  height: 478px;
  border-bottom: ${props => props.theme.borderMiddleGray};
`;
const BasicInfo = styled.div`
  width: 400px;
  margin: 100px 0 0 10px;
`;
const AdditionInfo = styled.div`
  width: 340px;
  margin: 100px 0 0 20px;
`;
const InfoTitle = styled.h1`
  margin: 0 0 50px 10px;
  font-size: 20px;
`;

const List = styled.div`
  margin: 20px 0 20px 15px;
  font-size: 30px;
`;

const InfoListIcon = styled.span`
  font-size: 20px;
`;

const InfoListLetter = styled.span`
  margin-left: 20px;
  font-size: 16px;
`;

const AdditionInfoTitle = styled.h1`
  margin: 0 0 50px 10px;
  font-size: 20px;
`;
const Reservation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: sticky;
  top: 300px;
  width: 400px;
  height: 400px;
  margin: 0 0 30px 50px;
  border-radius: 30px;
  box-shadow: 1px 1px 10px 8px rgba(0, 0, 0, 0.2);
`;
const ReservationTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 380px;
  height: 30px;
  margin-top: 40px;
  font-size: 25px;
`;
const ReservationSubTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 15px 0 0 15px;
  font-size: 15px;
`;
const ReservationDate = styled.div`
  display: flex;
  width: 350px;
  height: 100px;
  margin-top: 30px;
  border-radius: 20px;
  border: ${props => props.theme.borderMiddleGray};
`;
const DateStart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  margin-left: 15px;
  border-right: ${props => props.theme.borderMiddleGray};
`;
const DateEnd = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  margin-left: 15px;
`;
const DatePickLetter = styled.span`
  font-size: 20px;
  margin-bottom: 13px;
`;
const DateAddLetter = styled.span`
  color: ${props => props.theme.middleGray};
  font-size: 15px;
`;
const ReservationButton = styled.button`
  width: 250px;
  height: 50px;
  margin-top: 50px;
  background-color: ${props => props.theme.highlight};
  color: white;
  font-size: 16px;
  font-weight: 500;
  border-radius: 20px;
  border: 0.5px solid black;
`;
const ContainerBottom = styled.div`
  display: flex;
  flex-direction: column;
`;
const MapBox = styled.div`
  width: 700px;
  height: 700px;
  margin-top: 20px;
`;
const HostingMapTitle = styled.div`
  margin: 20px;
  font-size: 30px;
`;
const Map = styled.div`
  width: 700px;
  height: 500px;
  margin-left: 15px;
  border: 1px solid black;
`;
const LocalName = styled.div`
  margin: 20px 0 0 25px;
  font-size: 20px;
`;
const LocalDes = styled.p`
  width: 700px;
  margin: 30px 0 0 20px;
`;
const HostBox = styled.div`
  display: flex;
  width: 1200px;
  height: 500px;
  border-top: ${props => props.theme.borderMiddleGray};
`;

const HostIntro = styled.div`
  width: 50%;
  height: 500px;
  margin: 70px 0 0 0 20px;
`;

const HostProfile = styled.div`
  display: flex;
  margin: 60px 0 20px 10px;
`;
const HostImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;
const HostNickName = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0 0 15px;
`;
const HostID = styled.span`
  font-size: 30px;
  margin-bottom: 5px;
`;
const HostSignUpDate = styled.span`
  color: ${props => props.theme.middleGray};
`;
const CertifiCation = styled.div`
  display: flex;
  margin: 30px 0 0 15px;
`;
const CertificationCell = styled.div`
  display: flex;
  margin-right: 10px;
`;

const CellIcon = styled.div`
  font-size: 18px;
`;

const CellLetter = styled.span`
  margin: 2px 0 0 10px;
`;
const PageDes = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px 0 0 15px;
`;

const DescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const DesTitle = styled.span`
  margin: 20px 0;
  font-size: 20px;
`;

const DesSub = styled.p`
  width: 400px;
`;
const hostContact = styled.div`
  display: flex;
  flex-direction: column;
`;
const Additional = styled.div`
  display: flex;
  flex-direction: column;
  margin: 70px 0 50px 100px;
`;
const AdditionalList = styled.span`
  margin-bottom: 13px;
`;
const AdditionalInfo = styled.span`
  font-size: 15px;
`;
const ContactButton = styled.button`
  width: 190px;
  height: 50px;
  margin: 0 0 50px 100px;
  font-size: 15px;
  border-radius: 20px;
  background: none;
  border: 1px solid black;
`;
const Caution = styled.div`
  display: flex;
  margin-left: 90px;
`;
const CautionMessage = styled.div`
  width: 300px;
  margin-left: 10px;
  line-height: 20px;
  letter-spacing: 0.5px;
`;
const CautionIcon = styled.div`
  font-size: 25px;
`;

export default HostDetail;
