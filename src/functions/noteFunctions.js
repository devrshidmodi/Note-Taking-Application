import _ from "lodash";

export const noteFilterer = (notes) => {
  return _.map(notes, (note) => {
    return { text: note["text"], color: note["color"] };
  });
};