import { Menu, Icon } from 'antd';
import Link from 'umi/link';
import config from '../config/config';

const routerArr = config.routes[0].routes;

const defaultIconName = 'tags-o';

const lastPathName = url => {
  let pieces = url.split('/');
  return pieces[pieces.length - 1];
};

class MenuNew extends React.Component {
  render() {
    let rows = [];

    for (let i = 0; i < routerArr.length; i++) {
      let item = routerArr[i];

      if (item.routes) {
        let title = lastPathName(item.path);
        title = title.replace(/^\S/, s => s.toUpperCase());

        rows.push(
          <Menu.SubMenu
            key='sub1'
            title={<span><Icon type={ item.icon ? item.icon : defaultIconName } /><span>{ title }</span></span>}
          >
            {
              item.routes.map((ii, index) => (
                <Menu.Item key={ i.toString() + '-' + index.toString() } title={ lastPathName(ii.component) }>
                  <Link to={ ii.path }>
                    <Icon type={ ii.icon ? ii.icon : defaultIconName } />
                    <span>{ lastPathName(ii.component) }</span>
                  </Link>
                </Menu.Item>
              ))
            }
          </Menu.SubMenu>
        );

      } else {
        rows.push(
          <Menu.Item key={ i.toString() }>
            <Link to={ item.path }>
              <Icon type={ item.icon ? item.icon : defaultIconName } />
              <span>{ lastPathName(item.component) }</span>
            </Link>
          </Menu.Item>
        );
      }
    }
    return (
      <Menu theme='dark' mode='inline' defaultSelectedKeys={ ['1'] }>
        { rows }
      </Menu>
    );
  }
}

export default MenuNew;
