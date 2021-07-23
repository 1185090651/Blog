import React, { useState } from 'react';
import { Button, Card, Menu } from 'antd';
import Container from '../components/Container';
import CreateBookModel from './components/CreateBookModel';
import style from './index.module.scss';

const index = () => {
    const [visible, setVisible] = useState(false);
    return (
        <Container>
            <Card className={style.wrapper}>
                <div className={style.head}>
                    <Menu mode="horizontal" activeKey={'knowledge'}>
                        <Menu.Item key="knowledge">知识库</Menu.Item>
                    </Menu>
                    <Button type="primary" onClick={() => setVisible(true)}>
            新建知识库
                    </Button>
                    <CreateBookModel visible={visible} setVisible={setVisible} />
                </div>
                <div>xxx</div>
            </Card>
        </Container>
    );
};

export default index;
