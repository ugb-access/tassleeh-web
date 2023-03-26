import { WithContext as ReactTags } from 'react-tag-input';
import React from 'react';

const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const TagsInput = ({ handleAddition, handleDelete, handleTagClick, handleDrag, tags, onChange, name }) => {

  return (
    <div className=''>
      <ReactTags
        name={name}
        onChange={onChange}
        tags={tags}
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        handleTagClick={handleTagClick}
        inputFieldPosition="top"
        autocomplete
        placeholder={'Product Keywords'}
      />
    </div>
  );
};
export default TagsInput;


