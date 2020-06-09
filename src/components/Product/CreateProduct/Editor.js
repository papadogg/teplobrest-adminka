import React, { Component } from 'react';
import RichTextEditor from 'react-rte';
import './Editor.scss';

class Editor extends Component {
  state = {
    value: RichTextEditor.createValueFromString(this.props.text, 'html'),
  };
  updateText = (value) => {
    this.setState({ value });
    this.props.onChange(value.toString('html'));
  };
  render() {
    const { value } = this.state;

    return (
      <div className="editor">
        <RichTextEditor value={value} onChange={this.updateText} />
      </div>
    );
  }
}

export default Editor;
