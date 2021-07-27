import React, { useState, useEffect } from 'react';
import { Button, Card, Menu } from 'antd';
import { useDispatch } from 'react-redux';
import Container from '../components/Container';
import CreateBookModel from './components/CreateBookModel';
import { getBooks } from '@/store/actions/book';
import style from './index.module.scss';

const index = () => {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBooks());
    }, []);
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
