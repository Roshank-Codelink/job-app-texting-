// import { Extension } from '@tiptap/core';
// export const CharacterLimit = Extension.create({
//   name: 'characterLimit',
//   addOptions() {
//     return {
//       limit: 1500,
//     };
//   },
//   addProseMirrorPlugins() {
//     return [
//       new this.editor.view.Plugin({
//         props: {
//           handlePaste: (view, event) => {
//             const text = event.clipboardData.getData('text/plain');
//             const currentLength = view.state.doc.textContent.length;
//             const remaining = this.options.limit - currentLength;
//             // If no space left → block entire paste
//             if (remaining <= 0) {
//               event.preventDefault();
//               return true;
//             }
//             // If pasted text fits fully → allow default paste
//             if (text.length <= remaining) {
//               return false; // allow normal paste
//             }
//             // Trim the text to fit
//             const trimmed = text.slice(0, remaining);
//             // Insert trimmed text manually
//             event.preventDefault();
//             const { tr } = view.state;
//             const insertPos = view.state.selection.from;
//             view.dispatch(
//               tr.insertText(trimmed, insertPos, view.state.selection.to)
//             );
//             return true;
//           },
//         },
//       }),
//     ];
//   },
// });



import { Extension } from '@tiptap/core';
import { Plugin } from 'prosemirror-state';

export const CharacterLimit = Extension.create({
  name: 'characterLimit',

  addOptions() {
    return {
      limit: 1500, // Default limit
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handlePaste: (view, event) => {
            const text = event.clipboardData?.getData("text/plain") || "";

            const currentLength = view.state.doc.textContent.length;
            const remaining = this.options.limit - currentLength;

            if (remaining <= 0) {
              event.preventDefault();
              return true;
            }

            if (text.length <= remaining) {
              return false; // Normal paste OK
            }

            // Trim exactly how much can fit
            const trimmed = text.slice(0, remaining);

            event.preventDefault();

            const { tr } = view.state;
            const insertPos = view.state.selection.from;

            view.dispatch(
              tr.insertText(trimmed, insertPos, view.state.selection.to)
            );

            return true;
          },
        },
      }),
    ];
  },
});









