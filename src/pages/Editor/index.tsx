import { Breadcrumb, Button } from 'antd';
import React from 'react';
import style from './index.module.scss';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export default function index () {
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: `
          <h2>
            Hi there,
          </h2>
          <p>
            this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
          </p>
          <ul>
            <li>
              That’s a bullet list with one …
            </li>
            <li>
              … or two list items.
            </li>
          </ul>
          <p>
            Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
          </p>
          <pre><code class="language-css">body {
      display: none;
    }</code></pre>
          <p>
            I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
          </p>
          <blockquote>
            Wow, that’s amazing. Good work, boy! 👏
            <br />
            — Mom
          </blockquote>
        `,
    });
    return (
        <div className={style.editor}>
            <div className={style['editor-header']}>
                <div className={style['editor-header-nav']}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <a href="">Application List</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>An Application</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className={style.options}>
                        <Button type="primary">保存</Button>
                    </div>
                </div>
                
            </div>
            <div className={style['editor-body']}>
                <div className={style['editor-body-bar']}>我是bar</div>
                <div className={style['editor-body-wrapper']}>
                    <div className={style.paper}>
                        <div className={style['paper-wrapper']}>
                            <div className={style['paper-wrapper-title']}>sdsdf</div>
                            <EditorContent className={style['paper-wrapper-main']} editor={editor} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
