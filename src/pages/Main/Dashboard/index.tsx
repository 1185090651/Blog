import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateBookModel from './components/CreateBookModel';
import { getBooks } from '@/store/actions/book';
import style from './index.module.scss';
import { PlusOutlined } from '@ant-design/icons';
import { IState } from '@/store/reducers';
import { Collapse, Skeleton } from 'antd';

const { Panel } = Collapse;

const index = () => {
    const [visible, setVisible] = useState(false);
    const { books, loading } = useSelector((state: IState) => state.books);
    const dispatch = useDispatch();

    const callback = () => {};
    useEffect(() => {
        dispatch(getBooks());
    }, []);

    function createArticle (e: any) {
        e.stopPropagation();
        setVisible(true);

    }
    return (
        <div className={style.dashboard}>
            <section className={style.books}>
                <div className={style['books-create']}>
                    <span className={style.title}>知识库</span>
                    <span className={style.create} onClick={() => setVisible(true)}><PlusOutlined /></span>
                    <CreateBookModel visible={visible} setVisible={setVisible} />
                </div>
                {
                    loading ?
                        <Skeleton />
                        : <div className={style['books-list']}>
                            <Collapse defaultActiveKey={['1']} onChange={callback} bordered={false} expandIconPosition={'right'} ghost>
                                {books.map((item, idx) => (
                                    <Panel className={style.book} header={item?.name} key={idx} extra={<span className={style['article-create']} onClickCapture={e => {createArticle(e);}}><PlusOutlined /></span>}>
                                        <div className={style.article}>{item?.description}</div>
                                        <div className={style.article}>{item?.description}</div>
                                        <div className={style.article}>{item?.description}</div>
                                        <div className={style.article}>{item?.description}</div>
                                    </Panel>
                                ))}
                            </Collapse>
                        </div>
                }
            </section>
        </div>
    );
};

export default index;
