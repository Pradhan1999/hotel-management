/* eslint-disable no-unused-expressions */
import React from 'react';

import RichTextEditor from 'react-rte';

import 'react-tagsinput/react-tagsinput.css';

import propTypes from 'prop-types';

function AddQuestionEditor({ richText, onChange }) {
  return (
    <div className="static bg-white dark:bg-[#1b1d2a] rounded-10 shadow-[0_10px_50px_rgba(146,153,184,.19)] dark:shadow-none z-998">
      <div className="relative px-[30px] ssm:px-[15px]">
        <RichTextEditor
          placeholder="Type your message..."
          value={richText}
          onChange={onChange}
          className="bg-white dark:bg-[#1b1d2a] min-md:min-h-[300px] md:min-h-[200px] border-none [&>div]:border-regular dark:[&>div]:border-white10 [&>div>.DraftEditor-root]:font-Jost [&>div>.DraftEditor-root]:text-sm [&>div>div>div>button]:bg-none [&>div>div>div>button]:border-none [&>div>div>div>button]:py-0 [&>div>div>span>span]:border-none [&>div>div>.public-DraftEditorPlaceholder-root]:pt-5 [&>div>div>div>.public-DraftEditor-content]:pt-5 [&>div>div>div>.public-DraftEditor-content]:text-sm [&>div>div>div>.public-DraftEditor-content]:text-dark dark:[&>div>div>div>.public-DraftEditor-content]:text-white87 [&>div>div>div>.public-DraftEditor-content]:font-medium"
        />
      </div>
    </div>
  );
}

AddQuestionEditor.propTypes = {
  onChange: propTypes.func,
  richText: propTypes.string,
};

export default AddQuestionEditor;
