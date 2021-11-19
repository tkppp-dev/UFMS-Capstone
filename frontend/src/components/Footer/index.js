import React from 'react';

// style
import {
  BeforeSpan,
  FooterBody,
  FooterBottom,
  FooterContainer,
  FooterWrap,
} from './style';

function Footer() {
  return (
    <FooterContainer>
      <FooterWrap>
        <FooterBody>
          <div>
            <div>Creator</div>
            <div>
              <span>허인주</span>
              <BeforeSpan>박태경</BeforeSpan>
              <BeforeSpan>윤제혁</BeforeSpan>
              <BeforeSpan>이풍원</BeforeSpan>
            </div>
          </div>
          <div>
            <div>Partner</div>
            <div>
              <span>허인주</span>
              <BeforeSpan>박태경</BeforeSpan>
              <BeforeSpan>윤제혁</BeforeSpan>
              <BeforeSpan>이풍원</BeforeSpan>
            </div>
          </div>
          <div>
            <div>Developer</div>
            <div>
              <span>허인주</span>
              <BeforeSpan>박태경</BeforeSpan>
              <BeforeSpan>윤제혁</BeforeSpan>
              <BeforeSpan>이풍원</BeforeSpan>
            </div>
          </div>
        </FooterBody>
        <FooterBottom>
          Copyright &copy; Logo Since 2021. All rights reserved.
        </FooterBottom>
      </FooterWrap>
    </FooterContainer>
  );
}

export default Footer;
