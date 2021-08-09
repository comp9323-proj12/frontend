import React from 'react';
import { Row, Col, Space } from 'antd';
import styles from './index.less';
/**
 * @description footer
 */
const copyright = () => {
  return (
    <Row>
      <Col span={12}>
        <br />
        <p>
          © UNSW Sydney (CRICOS Provider No.: 00098G), 2019. The information
          contained in this Handbook is indicative only. While every effort is
          made to keep this information up-to-date, the University reserves the
          right to discontinue or vary arrangements, programs and courses at any
          time without notice and at its discretion. While the University will
          try to avoid or minimise any inconvenience, changes may also be made
          to programs, courses and staff after enrolment. The University may
          also set limits on the number of students in a course.
        </p>
      </Col>
      <Col span={2}></Col>
      <Col span={10}>
        <br />
        <p>Authorised by Deputy Vice-Chancellor (Academic)</p>
        <p>CRICOS Provider Code 00098G</p>
        <p>ABN: 57 195 873 179</p>
        <section className={styles.links}>
          <a target="_blank" href="https://www.facebook.com/">
            <img src={require('@/images/facebook.svg')} alt="facebook" />
          </a>
          <a target="_blank" href="https://www.instagram.com/">
            <img src={require('@/images/instagram.svg')} alt="ins" />
          </a>
          <a target="_blank" href="https://twitter.com/">
            <img src={require('@/images/twitter.svg')} alt="twitter" />
          </a>
        </section>
      </Col>
    </Row>
  );
};

export default copyright;
