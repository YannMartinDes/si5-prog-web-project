import { Component } from 'react';
import { FixedSizeList as List } from "react-window";
import {components} from 'react-select';


export const OptionMenuList = ({ children, ...props }) => {
  const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
  const newProps = Object.assign(props, { innerProps: rest });
  return (
    <components.Option
      {...newProps}
    >
      {children}
    </components.Option>
  );
};
// CustomOption.propTypes = {
//   innerProps: PropTypes.object.isRequired,
//   children: PropTypes.node.isRequired
// };

const height = 35;

export class MenuList extends Component {
  render() {
    const { options, children, maxHeight, getValue } = this.props;
    const [value] = getValue();
    const initialOffset = options.indexOf(value) * height;

    return (
      <List
        height={maxHeight}
        itemCount={children.length}
        itemSize={height}
        initialScrollOffset={initialOffset}
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    );
  }
}

