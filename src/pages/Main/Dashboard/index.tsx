import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks, createBook, createArticleAction } from '@/store/actions/book';
import style from './index.module.scss';
import { PlusOutlined, MoreOutlined } from '@ant-design/icons';
import { IState } from '@/store/reducers';
import { Collapse, Skeleton, Input } from 'antd';

const { Panel } = Collapse;

const index = () => {
    const createInputRef = useRef<Input | null>(null);

    const [isShowCreateInput, setIsShowCreateInput] = useState(false);
    const { books, loading } = useSelector((state: IState) => state.books);
    const dispatch = useDispatch();

    const callback = () => {};
    useEffect(() => {
        dispatch(getBooks());
    }, []);

    function createArticle (e: React.MouseEvent<HTMLInputElement>) {
        e.stopPropagation();
    }
    const createInputEnterHandler = async () => {
        await dispatch(createBook({ name: createInputRef.current?.state.value }));
        setIsShowCreateInput(false);
    };

    // const createArticleEnterHandler = async (_id: string|undefined) => {
    //     await dispatch(createArticleAction({ title: createArticleRef.current?.state.value, bookId: _id }));
    // };

    useEffect(() => {
        if (createInputRef.current) {
            createInputRef.current.focus();
            createInputRef.current.select();
        }
    }, [isShowCreateInput]);

    return (
        <div className={style.dashboard} >
            <section className={style.books}>
                <div className={style['books-nav']}>
                    <span className={style.title}>知识库</span>
                    <div className={style.options}>
                        <span className={style.create} onClick={() => setIsShowCreateInput(true)}><PlusOutlined /></span>
                        <span className={style.more}>
                            <MoreOutlined />
                        </span>
                    </div>
                </div>
                {
                    loading ?
                        <Skeleton />
                        : <div className={style['books-list']}>
                            <Collapse defaultActiveKey={['0']} onChange={callback} bordered={false} expandIconPosition={'right'} ghost>
                                {
                                    isShowCreateInput ? <Panel className={style.book} header={<Input defaultValue="名称" onPressEnter={createInputEnterHandler} ref={createInputRef} onBlur={createInputEnterHandler} />} key="create" /> : null
                                }
                                {books.map((item, idx) => (
                                    <Panel className={style.book} header={item?.name} key={idx} extra={<span className={style['article-create']} onClickCapture={createArticle}><PlusOutlined /></span>}>
                                        {
                                            item?.articles.map((article, i) => (
                                                <div className={style.article} key={i}>{article?.title}</div>
                                            ))
                                        }
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
