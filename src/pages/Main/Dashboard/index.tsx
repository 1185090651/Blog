import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateBookModel from './components/CreateBookModel';
import { getBooks } from '@/store/actions/book';
import style from './index.module.scss';
import { PlusOutlined } from '@ant-design/icons';
import { IState } from '@/store/reducers';
import { Skeleton } from 'antd';

const index = () => {
    const [visible, setVisible] = useState(false);
    const { books, loading, error } = useSelector((state: IState) => state.books);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBooks());
    }, []);
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
                            {books.map((item, idx) => (
                                <div className={`${style.book} ${idx === 1 ? style.active : ''}`} key={idx}>
                                    <div className={style['book-name']}>{item?.name}</div>
                                    <div className={style['book-description']}>{item?.description}</div>
                                </div>
                            ))}
                        </div>
                }
            </section>
        </div>
    );
};

export default index;
