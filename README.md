本编文章让我们一起来实现后台管理页面，包括：
- 标签管理
- 新建文章
- 文章管理

#### 管理首页
后台管理页面的主结构我们采用`antd`的相关组件。新建一个`container`，名叫`Admin`

```
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './style.css';
import AdminMenu from '../../components/AdminMenu';
import AdminIndex from '../AdminIndex';
import AdminManagerUser from '../AdminManagerUser';
import AdminManagerTags from '../AdminManagerTags';
import AdminManagerArticle from '../AdminManagerArticle';
import AdminManagerComment from '../AdminManagerComment';
import AdminNewArticle from '../AdminNewArticle';
import Detail from '../Detail';
import NotFound from '../NotFound';

class Admin extends Component {
    const { url } = this.props.match;
    return (
        <div>
            {
                <div className="admin_container">
                    <div className="menuContainer">
                        <AdminMenu />
                    </div>
                    <div className="contentContainer">
                        <Switch>
                            <Route exact path={url} component={AdminIndex}/>
                            <Route path={`${url}/managerUser`} component={AdminManagerUser}/>
                            <Route path={`${url}/managerTags`} component={AdminManagerTags}/>
                            <Route path={`${url}/newArticle`} component={AdminNewArticle}/>
                            <Route path={`${url}/managerArticle`} component={AdminManagerArticle}/>
                            <Route path={`${url}/managerComment`} component={AdminManagerComment}/>
                            <Route path={`${url}/detail`} component={Detail}/>
                            <Route component={NotFound}/>
                        </Switch
                    </div>
                </div>
            }
        </div>
    )
}
```
我们先抛开管理页面的登录验证问题，主要看一下页面结构。该页面下有以下几个路由：
- 管理页面首页`AdminIndex`
- 用户管理页面`AdminManagerUser`(我们的博客是支持用户注册的，之后会添加评论模块，预留一个用户管理)
- 标签管理页面`AdminManagerTags`
- 新建文章页面`AdminNewArticel`
- 文章管理页面`AdminManagerArticle`
- 评论管理页面`AdminManagerComment`
- 文章详情页面`Detail`(从文章管理进入)

最终，我们的管理页面是这样的：

![屏幕快照 2017-10-30 上午10.40.59.png](http://upload-images.jianshu.io/upload_images/1224641-a8efbc3e0be062f4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

先创建一个菜单组件，用于显示左侧的菜单，命名为`AdminMenu`：
```
import React, { Component } from 'react';
import { Menu, Icon } from 'antd';

const menus = [
    {url: '/', name: '首页', iconType: 'home'},
    {url: '/managerUser', name: '用户管理', iconType: 'usergroup-delete'},
    {url: '/newArticle', name: '发文', iconType: 'file-text'},
    {url: '/managerTags', name: '标签管理', iconType: 'tags-o'},
    {url: '/managerArticle', name: '文章管理', iconType: 'edit'},
    {url: '/managerComment', name: '评论管理', iconType: 'message'},
];

export default class AdminMenu extends Component {

    render() {
        return(
            <div>
                <Menu
                    selectedKeys={[this.props.url]}
                    mode="inline"
                    theme="dark"
                    onClick={({key}) => {
                        this.props.changeUrl(key);
                        this.props.history.push(`/admin${key}`)
                    }}
                >
                {
                    menus.map( (item, index) =>
                        <Menu.Item key={item.url}>
                            <Icon type={item.iconType} />
                            <span>{item.name}</span>
                        </Menu.Item>
                    )
                }
                </Menu>
            </div>
        )
    }
}
```
我们新建了一个数组`menus`用于包含所有的菜单，这里的`iconType`可以在[这里](https://ant.design/components/icon-cn/)挑选你喜欢的图标。菜单部分我们使用了`antd`的组件`Menu`，它提供了很多参数，具体功能可以查看[这里](https://ant.design/components/menu-cn/)。它实现的功能是，每点击一个菜单时，执行：
```
 this.props.history.push(`/admin${key}`)
 ```
跳转到相应的管理页面。

#### 用户管理

![屏幕快照 2017-10-30 上午11.00.16.png](http://upload-images.jianshu.io/upload_images/1224641-a926751dbd0a84ac.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

用户管理页面用于管理所有的注册用户(有关注册和数据管理的内容，我们会在第三部分：React技术栈+Express+Mongodb实现个人博客 -- Part 3 Express + Mongodb创建Server端中展开介绍），这里我们先完成页面展示。

用户管理页面，我们将用到`antd design`中的`Table`组件，详细内容在[这里](https://ant.design/components/table-cn/)，它需要传入两个基本参数:
- `dateSource` 用于展示的数据
- `column` 每一列的数据结构及索引

ok，开始编写`AdminManagerUser`：
```
import React, { Component } from 'react';
import './style.css';
import { Tabel } from  'antd';

const dataSource = [{
    key: '1',
    username: 'sam',
    _id: '59ed8b13a1bbb459a27259e5',
    password: 'e823e452fce2153808e13ec6b7a95fcf',
    type: 'admin'
},{
    key: '2',
    username: 'sam2',
    _id: '59ed8b13a1bbb459a27259e3',
    password: 'e823e452fce2153808e13ec6b7a95fcf',
    type: 'user'
}];

const columns = [{
    title: '姓名',
    dataIndex: 'username',
    key: 'name'
}, {
    title: 'ID',
    dataIndex: '_id',
    key: 'ID',
}, {
    title: '密码(加密后)',
    dataIndex: 'password',
    key: 'password',
}
, {
    title: '身份',
    dataIndex: 'type',
    key: 'address',
}];

class AdminManagerUser extends Component {

    render() {
        return (
            <div>
                <h2>用户管理</h2>
                <Table
                    className="table"
                    pagination={false}
                    columns={columns}
                    dataSource={dataSource}/>
            </div>
        )
    }
}
```

有关分页的问题，这里先不涉及，会在`Redux`那一节补充。

#### 标签管理

![屏幕快照 2017-10-30 上午11.24.54.png](http://upload-images.jianshu.io/upload_images/1224641-a2f0499454624b8d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
这一部分，会用到`antd`中的`Tag, Input, Tooltip, Button`组件，页面中的主要操作有：
- 已有标签展示
- 添加调迁
- 删除标签

初始化`state`，默认展示一些标签：
```
    constructor(props){
        super(props);
        this.state={
            tags: ['首页', 'iOS', 'Python'],
            inputVisible: false,
            inputValue: '',
        }
    }
```
`tags`是我们要展示的已有标签，`inputVisible`用于控制`New Tag`这个按钮，当为`false`时这里显示添加按钮，当为`ture`时，显示输入框。`inputValue`表示输入标签的内容。

在开始之前，先安装一个`lodash`，方便进行数组的增删减操作：
```
npm install --save lodash
```
##### 1.标签展示
```
    render() {
        const { inputVisible, inputValue } = this.state;
        const { tags } = this.state;
        return  (
            <div>
                <h2>标签管理</h2>
                {tags.map( (tag, index) => {
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                        <Tag className="tagStyle" key={index} closable={index != 0} afterClose={ () => this.handleDelete(tag) }>
                            {isLongTag ? `${tag.slice(0,20)}...` : tag}
                        </Tag>
                    );
                    return isLongTag ? <Tooltip key={tag} title={tag}>{tagElem}</Tooltip> : tagElem;
                })}
                {inputVisible && (
                    <Input
                        className="tagStyle"
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        tyle={{ width: 108 }}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                )}
                { !inputVisible && (
                    <Button
                        className="tagStyle"
                        size="samll"
                        type="dashed"
                        onClick={this.showInput}
                    >+ New Tag</Button>
                )}
            </div>
        )
    }
```
以上是标签显示部分的代码，有几点细节要细说一下：
- 第一个标签(首页)不能删除，所以在`Tag`下我们加入了`closable={index != 0}`逻辑
- 当标签的长度大于20时，只显示一部分，并通过`Tooltip`显示全部内容
- 使用`inputVisible`来控制显示输入框，还是添加标签的按钮

##### 2.开始添加标签
`showInput `方法，用于改变`state`中`inputVisible`的值，通过`render`方法改变按钮状态：
```
    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };
```
`Input`组件中有两个方法:
- `handleInputChange`，当输入内容发生改变时调用
- `handleInputConfirm`，点击空白区域，或是按下回车时调用，表示确定输入

```
    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    };

    handleInputConfirm = () => {
        // 添加标签
        if (this.state.inputValue.length > 0) {
            this.state.tags.push(this.state.inputValue)
            this.setState({
                tags: this.state.tags,
            });
        }
        this.setState({
            inputVisible: false,
            inputValue: '',
        });        
    };

```
##### 3.删除标签
引入`lodash`:
```
import _ from 'lodash';
```
`lodash`可用于处理数组的增删减查，很方便。
```
    handleDelete = (removeTag) => {
        _.remove(this.state.tags, tag => tag === removeTag);
        this.setState({ tags: this.state.tags })
    }
```
好啦，标签管理搞定：


![屏幕快照 2017-10-30 下午3.35.01.png](http://upload-images.jianshu.io/upload_images/1224641-63d5274f8184c719.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 文章列表
文章列表主要有以下功能：
- 展示文章
- 文章的编辑
- 删除文章
- 查看文章详情

![屏幕快照 2017-10-30 下午3.40.09.png](http://upload-images.jianshu.io/upload_images/1224641-9a65bb0ee609692a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

我们先制造两篇文章的假数据用户展示：
```
const articleList = [{
    title: '文章标题1',
    author: 'sam',
    viewCount: '12',
    time: '2017-10-19',
    _id: '1213123',
    isPublish: '已发布'
},{
    title: '文章标题2',
    author: 'sam',
    viewCount: '132',
    time: '2017-10-19',
    _id: '12131232323',
    isPublish: '草稿'
}];
```
在`render`方法中编写展示文章的逻辑：
```
    render() {
        return  (
            <div>
                <h2>文章列表</h2>
                <div className="adminArticleListContainer">
                    {
                        articleList.map( (article, index) {
                            <ManagerArticleCell
                                edit_article={(id) => this.edit_article(id)}
                                history={this.props.history}
                                getArticleDetail={(id) => this.getArticleDetail(id)}
                                delete={(id) => this.delete(id)}
                                key={index}
                                data={article}
                            />
                        })
                    }
                </div>
            </div>
        )
    }
```
- `ManagerArticleCell`是我们创建的一个`component`，显示文章的功能区域
```
import React from 'react';
import './style.css';
import  { Button } from 'antd';

export const ManagerArticleCell = (props)=>(
    <div className="managerArticleCellContainer">
        <div className="cellAboutArticle">
            <p className="articleTitle">{props.data.title}</p>
            <p className="articleInfo">
                <span>作者:{props.data.author}</span>
                <span>阅读数:{props.data.viewCount}</span>
                <span>评论数:{props.data.commentCount}</span>
                <span>发表时间:{props.data.time}</span>
            </p>
        </div>
        <div className="cellState">
            <span>
                {props.data.isPublish?'已发布':'草稿'}
            </span>
        </div>
        <div className="cellOperation">
            <Button type='primary' icon="edit" onClick={()=>{props.edit_article(props.data._id);props.history.push('/admin/newArticle')}}>编辑</Button>
            <Button type='primary' icon="delete" onClick={()=>props.delete(props.data._id)}>删除</Button>
            <Button type='primary' icon="eye-o" onClick={()=>{props.history.push(`/detail/${props.data._id}`,{id:props.data._id});props.getArticleDetail(props.data._id)}}>查看</Button>
        </div>
    </div>
);
```
- `delete`方法表示删除文章
删除方法需要有个确认提醒，这里我们引入`antd`中的`Modal`组件：
```
import { Modal } from 'antd';
const confirm = Modal.confirm
```
当`delete`方法被`active`时，我们执行下面的方法：
```
    delete = (id) => {
        var that = this;
        confirm({
          title: '确定要删除该篇文章吗？',
          content: '删除后将无法恢复',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
              _.remove(that.state.articleList, article => article._id === id);
              that.setState({ articleList: that.state.articleList });
          },
          onCancel() {
            console.log('Cancel');
          },
        });
    }
```

![屏幕快照 2017-10-30 下午4.33.00.png](http://upload-images.jianshu.io/upload_images/1224641-fe1f58f764effbcc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


- `edit_article`方法用于跳转到`/admin/newArticle`路径下开始编辑文章
- `getArticleDetail`方法，通过传递的文章`id`，跳转到`/detail`路径下，显示文章详情
以上两个方法在本篇文章中先不展开，后续文章里会有具体实现。

#### 新建文章
发文页面包含以下功能：
- 填写标题
- 文章正文
- 选择分类
- 文章的发布，保存，预览功能

如下图所示：

![屏幕快照 2017-10-30 下午4.35.27.png](http://upload-images.jianshu.io/upload_images/1224641-bc0b9f5138c409f7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 1.页面展示
页面展示部分包括一个标题`Input`，文章正文`textarea`, 标签选择`Select`，以及底部的三个按钮`Button`，其中`Input, Select，Button`我们都使用`antd`提供的组件：
```
    render() {
        return  (
            <div className="adminNewArticle">
                <h2>新建文章</h2>
                <div className="container">
                    <span className="subTitle">标题</span>
                    <Input
                        className="titleInput"
                        placeholder={'请输入文章标题'}
                        type='text'
                        value={this.state.title}
                        onChange={this.titleOnChange.bind(this)}
                    />
                    <span className="subTitle">正文</span>
                    <textarea
                        className="textArea"
                        value={this.state.content}
                        onChange={this.onChanges.bind(this)}
                    />
                    <span className="subTitle">分类</span>
                    <Select
                        mode='multiple'
                        className='titleInput'
                        placeholder='请选择分类'
                        onChange={this.selectTags.bind(this)}
                        value={this.state.tags}
                    >
                        {
                            tags.map( (item) => (
                                <Select.Option key={item}>{item}</Select.Option>
                            ))
                        }
                    </Select>
                    <div className="bottomContainer">
                        <Button type="primary" onClick={this.publishArticle.bind(this)} className="buttonStyle">发布</Button>
                        <Button type="primary" onClick={this.saveArticle.bind(this)} className="buttonStyle">保存</Button>
                        <Button type="primary" onClick={this.preView.bind(this)} className="buttonStyle">预览</Button>
                    </div>
                </div>

                <Modal
                    visible={this.state.modalVisible}
                    title="文章预览"
                    onOk={this.handleOk.bind(this)}
                    width={'900px'}
                    onCancel={this.handleOk.bind(this)}
                    footer={null}
                >
                    <div className="modalContainer">
                        <div id='preview' className="markdown_body">
                            {remark().use(reactRenderer).processSync(this.state.content).contents}
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
```
组件`Select`有很多种选择方式，包括单选，多选，详情看[这里](https://ant.design/components/select-cn/)

预览部分我们使用`antd`中的组件`Modal`，显示内容同文章详情页一样，我们使用`remark`来渲染`markdown`内容：

![屏幕快照 2017-10-30 下午5.46.21.png](http://upload-images.jianshu.io/upload_images/1224641-9bb6fcedfc145704.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 评论管理

待补充

#### 总结
本篇文章主要介绍了管理页面的展示和基本逻辑，数据上的操作逻辑，我们会在之后的文章里补充。本篇文章对应的源码在这里：[React技术栈+Express+Mongodb实现个人博客 -- Part 2 后台管理页面](https://github.com/sam408130/react-blog/tree/part2)。


#### 系列文章
[React技术栈+Express+Mongodb实现个人博客](http://www.jianshu.com/p/e8d68f9e29c6)
[React技术栈+Express+Mongodb实现个人博客 -- Part 1 博客页面展示](http://www.jianshu.com/p/3ed54d305d8e)
[React技术栈+Express+Mongodb实现个人博客 -- Part 2 后台管理页面](http://www.jianshu.com/p/3367c374f179)
React技术栈+Express+Mongodb实现个人博客 -- Part 3 Express + Mongodb创建Server端
React技术栈+Express+Mongodb实现个人博客 -- Part 4 使用Webpack
React技术栈+Express+Mongodb实现个人博客 -- Part 5 使用Redux
React技术栈+Express+Mongodb实现个人博客 -- Part 6 项目部署
