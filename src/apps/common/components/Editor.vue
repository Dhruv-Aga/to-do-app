// Special CKEditor Component for HTML Input
<template>
  <ckeditor
    :editor="editor"
    style="height: 99%; width: 99%; margin: 0; padding: 0; z-index:10"
    v-model="field.description"
    :config="editorImageConfig"
  ></ckeditor>
</template>

<style type="text/css">
.ck.ck-editor__editable_inline {
  margin: 0;
}

.ck-content .image {
  margin: 0;
}
</style>
<script>
import HTTP from '@/plugins/http-common'
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  name: 'Editor',
  props: ['field'],
  components: {
    ckeditor: CKEditor.component
  },
  data: () => {
    return {
      editor: ClassicEditor,
      editorImageConfig: {
        image: {
          toolbar: [
            'imageTextAlternative',
            '|',
            'imageStyle:alignLeft',
            'imageStyle:full',
            'imageStyle:alignRight'
          ]
        },
        ckfinder: {
          uploadUrl:
            HTTP.defaults.baseURL +
            'users/upload?command=QuickUpload&type=Files&responseType=json&authorization=' + HTTP.defaults.headers.authorization
        }
      }
    }
  }
}
</script>
