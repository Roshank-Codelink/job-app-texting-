import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "prosemirror-state";
import { Slice, Fragment } from "prosemirror-model";

export const LimitPasteHTML = Extension.create({
    name: "limitPasteHTML",

    addProseMirrorPlugins() {
        const limit = 1500;

        return [
            new Plugin({
                key: new PluginKey('limitPasteHTML'),
                props: {
                    // Handle plain text paste - preserve line breaks
                    clipboardTextParser: (text, context, plain, view) => {
                        const currentLength = context.doc.textContent.length;
                        const remaining = limit - currentLength;

                        // If no space left, return empty slice
                        if (remaining <= 0) {
                            return Slice.empty;
                        }

                        // Truncate text to fit remaining space
                        const truncatedText = text.length > remaining ? text.substring(0, remaining) : text;
                        
                        // Split by line breaks and create paragraph nodes for each line
                        const lines = truncatedText.split(/\r\n|\r|\n/);
                        const schema = context.doc.type.schema;
                        
                        // Create paragraph nodes for each line
                        const paragraphNodes = lines.map(line => {
                            if (line.trim() === '') {
                                // Empty line - create empty paragraph
                                return schema.nodes.paragraph.create();
                            }
                            // Create text node and wrap in paragraph
                            const textNode = schema.text(line);
                            return schema.nodes.paragraph.create(null, textNode);
                        });
                        
                        const fragment = Fragment.from(paragraphNodes);
                        
                        // Return a Slice with the content
                        return new Slice(fragment, 0, 0);
                    },
                    
                    // Handle formatted content (HTML) paste
                    transformPasted: (slice, view) => {
                        const currentLength = view.state.doc.textContent.length;
                        const pastedText = slice.content.textBetween(0, slice.content.size, '\n', '\n');
                        const remaining = limit - currentLength;

                        // If paste fits completely, return as is
                        if (pastedText.length <= remaining) {
                            return slice;
                        }

                        // If no space left, return empty
                        if (remaining <= 0) {
                            return Slice.empty;
                        }

                        // Truncate the pasted content recursively
                        let charCount = 0;
                        
                        const truncateNode = (node: any, isFirstNode: boolean = false): any => {
                            if (charCount >= remaining) {
                                return null;
                            }

                            if (node.isText) {
                                const nodeText = node.text || '';
                                const availableSpace = remaining - charCount;
                                
                                if (nodeText.length <= availableSpace) {
                                    charCount += nodeText.length;
                                    return node;
                                } else {
                                    // Truncate text to fit
                                    const truncatedText = nodeText.substring(0, availableSpace);
                                    charCount += truncatedText.length;
                                    return node.type.schema.text(truncatedText, node.marks);
                                }
                            }

                            // Handle nodes with content (like paragraphs, lists, etc.)
                            if (node.content && node.content.size > 0) {
                                const newContent: any[] = [];
                                
                                node.content.forEach((childNode: any) => {
                                    if (charCount >= remaining) {
                                        return false;
                                    }
                                    const truncated = truncateNode(childNode, false);
                                    if (truncated) {
                                        newContent.push(truncated);
                                    }
                                });

                                if (newContent.length > 0) {
                                    return node.copy(Fragment.from(newContent));
                                }
                            } else if (!node.isText && node.type.name !== 'hardBreak') {
                                // Empty block node (like empty paragraph) - count as newline
                                if (!isFirstNode && charCount < remaining) {
                                    charCount += 1; // Count the paragraph break as 1 character
                                    return node;
                                }
                            } else if (node.type.name === 'hardBreak') {
                                // Hard break - count as newline
                                if (charCount < remaining) {
                                    charCount += 1;
                                    return node;
                                }
                            }

                            return null;
                        };

                        const truncatedNodes: any[] = [];
                        let isFirst = true;
                        slice.content.forEach((node: any) => {
                            if (charCount >= remaining) {
                                return false;
                            }
                            const truncated = truncateNode(node, isFirst);
                            if (truncated) {
                                truncatedNodes.push(truncated);
                                isFirst = false;
                            }
                        });

                        const newFragment = Fragment.from(truncatedNodes);
                        return new Slice(newFragment, slice.openStart, slice.openEnd);
                    },
                },
            }),
        ];
    },
});
