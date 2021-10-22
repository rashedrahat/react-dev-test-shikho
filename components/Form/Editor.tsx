import React, {useEffect, useRef} from "react";

type Props = {
    onChange: (data: any) => void
    editorLoaded: boolean
    name: string
    value: any
}

function Editor({onChange, editorLoaded, name, value}: Props) {
    const editorRef: any = useRef();
    const {CKEditor, ClassicEditor} = editorRef.current || {};

    useEffect(() => {
        editorRef.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
            ClassicEditor: require("@ckeditor/ckeditor5-build-classic")
        };
    }, []);

    return (
        <div>
            {editorLoaded ? (
                <CKEditor
                    type=""
                    name={name}
                    editor={ClassicEditor}
                    data={value}
                    onChange={(event: any, editor: any) => {
                        const data = editor.getData();
                        onChange(data);
                    }}
                />
            ) : (
                <div>Editor loading</div>
            )}
        </div>
    );
}

export default Editor;